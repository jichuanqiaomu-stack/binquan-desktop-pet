const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopPet', {
  openMenu: () => ipcRenderer.send('pet:context-menu'),
  setIgnoreMouseEvents: (ignore) => {
    ipcRenderer.send('pet:set-ignore-mouse-events', ignore);
  },
  onMenuAction: (callback) => {
    ipcRenderer.on('pet:menu-action', (_event, action) => callback(action));
  },
  onSkinAction: (callback) => {
    ipcRenderer.on('pet:skin-action', (_event, scene) => callback(scene));
  }
});
