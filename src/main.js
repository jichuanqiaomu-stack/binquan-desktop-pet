const path = require('node:path');
const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
  screen
} = require('electron');

let mainWindow;
let alwaysOnTop = true;
const hasSingleInstanceLock = app.requestSingleInstanceLock();

if (!hasSingleInstanceLock) {
  app.quit();
}

if (hasSingleInstanceLock) {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.showInactive();
    mainWindow.moveTop();
  });
}

function createWindow() {
  const workAreas = screen.getAllDisplays().map((display) => display.workArea);
  const x = Math.min(...workAreas.map((area) => area.x));
  const y = Math.min(...workAreas.map((area) => area.y));
  const right = Math.max(...workAreas.map((area) => area.x + area.width));
  const bottom = Math.max(...workAreas.map((area) => area.y + area.height));
  const width = right - x;
  const height = bottom - y;

  mainWindow = new BrowserWindow({
    width,
    height,
    x,
    y,
    frame: false,
    transparent: true,
    focusable: false,
    resizable: false,
    movable: true,
    hasShadow: false,
    skipTaskbar: false,
    alwaysOnTop,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setAlwaysOnTop(alwaysOnTop, 'floating');
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

function registerSkinShortcuts() {
  const shortcuts = [
    ['F7', 'idle'],
    ['F8', 'dialogue'],
    ['F9', 'solo']
  ];

  shortcuts.forEach(([key, scene]) => {
    globalShortcut.register(key, () => {
      if (!mainWindow || mainWindow.isDestroyed()) return;
      mainWindow.webContents.send('pet:skin-action', scene);
    });
  });
}

app.whenReady().then(() => {
  if (!hasSingleInstanceLock) return;
  if (process.platform === 'darwin') app.dock.hide();
  Menu.setApplicationMenu(null);
  createWindow();
  registerSkinShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('pet:set-ignore-mouse-events', (_event, ignore) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.setIgnoreMouseEvents(Boolean(ignore), { forward: true });
});

ipcMain.on('pet:context-menu', () => {
  if (!mainWindow) return;

  const template = [
    {
      label: alwaysOnTop ? '取消置顶' : '始终置顶',
      click: () => {
        alwaysOnTop = !alwaysOnTop;
        mainWindow.setAlwaysOnTop(alwaysOnTop, 'floating');
      }
    },
    { type: 'separator' },
    {
      label: '放大',
      click: () => mainWindow.webContents.send('pet:menu-action', 'scale-up')
    },
    {
      label: '缩小',
      click: () => mainWindow.webContents.send('pet:menu-action', 'scale-down')
    },
    {
      label: '重置位置',
      click: () => mainWindow.webContents.send('pet:menu-action', 'reset')
    },
    { type: 'separator' },
    {
      label: '躲一下',
      click: () => {
        mainWindow.hide();
        setTimeout(() => {
          if (!mainWindow.isDestroyed()) mainWindow.show();
        }, 5000);
      }
    },
    {
      label: '退出',
      click: () => app.quit()
    }
  ];

  Menu.buildFromTemplate(template).popup({ window: mainWindow });
});
