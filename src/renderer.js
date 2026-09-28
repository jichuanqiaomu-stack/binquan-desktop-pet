const stage = document.getElementById('stage');
const hearts = document.getElementById('hearts');
const duoInteraction = document.getElementById('duo-interaction');
const pets = {
  lv: document.getElementById('lv'),
  zhong: document.getElementById('zhong')
};

const petImages = {
  lv: pets.lv.querySelector('img'),
  zhong: pets.zhong.querySelector('img')
};

const images = {
  lv: {
    idle: [
      './assets/states/lv-idle-1.png',
      './assets/states/lv-idle-2.png',
      './assets/states/lv-idle-3.png'
    ],
    dialogue: './assets/states/lv-dialogue.png',
    solo: './assets/states/lv-solo.png',
    far: './assets/states/lv-far.png',
    approach: './assets/states/lv-approach.png',
    moods: {
      care: './assets/states/lv-mood-care.png',
      shy: './assets/states/lv-mood-shy.png',
      surprised: './assets/states/lv-mood-surprised.png',
      angry: './assets/states/lv-mood-angry.png',
      sad: './assets/states/lv-mood-sad.png',
      happy: './assets/states/lv-mood-happy.png',
      disdain: './assets/states/lv-mood-disdain.png'
    }
  },
  zhong: {
    idle: [
      './assets/states/zhong-idle-1.png',
      './assets/states/zhong-idle-2.png',
      './assets/states/zhong-idle-3.png'
    ],
    dialogue: './assets/states/zhong-dialogue.png',
    solo: './assets/states/zhong-solo.png',
    far: './assets/states/zhong-far.png',
    approach: './assets/states/zhong-approach.png',
    moods: {
      care: './assets/states/zhong-mood-care.png',
      shy: './assets/states/zhong-mood-shy.png',
      surprised: './assets/states/zhong-mood-surprised.png',
      angry: './assets/states/zhong-mood-angry.png',
      sad: './assets/states/zhong-mood-sad.png',
      happy: './assets/states/zhong-mood-happy.png',
      disdain: './assets/states/zhong-mood-disdain.png'
    }
  }
};

const soloLines = {
  lv: '苍生我要救，钟离权我也要救。',
  zhong: '骗术的最高境界，就是瞒天过海。'
};

const moodClickResponses = {
  lv: {
    care: '这就是你怕雨的原因吗',
    shy: '',
    surprised: '啊',
    angry: '行行行就你知道',
    sad: '师兄，没做错。'
  },
  zhong: {
    care: '你没事吧，师弟！',
    shy: '别这样...',
    surprised: '哇塞这是什么东西！',
    angry: '我偏要大说特说！',
    sad: '我错了！我错了还不行吗！'
  }
};

const idleDialogues = [
  {
    turns: [
      {
        id: 'lv',
        text: '师兄，你知道吗？能再遇见你，我好开心',
        mood: 'shy'
      },
      { id: 'zhong', text: '师弟……', mood: 'shy' }
    ]
  },
  {
    turns: [
      { id: 'zhong', text: '师弟~师弟~', mood: 'happy' },
      { id: 'lv', text: '干嘛' },
      { id: 'zhong', text: '想你了嘛~', mood: 'happy' },
      { id: 'lv', text: '我也想你', mood: 'shy' },
      { id: 'zhong', text: '', mood: 'shy' }
    ]
  },
  {
    turns: [
      {
        id: 'lv',
        text: '你怕下雨……你有心事为什么从来不说',
        mood: 'care'
      },
      {
        id: 'zhong',
        text: '没有什么好回忆……都过去了',
        mood: 'care'
      },
      { id: 'lv', text: '没有', mood: 'sad' },
      { id: 'zhong', text: '什么没有', mood: 'care' },
      { id: 'lv', text: '你还会痛', mood: 'care' },
      { id: 'zhong', text: '我是人我当然会痛', mood: 'care' },
      {
        id: 'lv',
        text: '以后可以跟我说，无论什么事，我都会站在你身边',
        mood: 'shy'
      }
    ]
  },
  {
    turns: [
      {
        id: 'zhong',
        text: '你凭啥不让我说话？我偏要大说特说！',
        mood: 'angry'
      },
      { id: 'lv', text: '好了好了别演了', mood: 'angry' },
      { id: 'zhong', text: '师弟，你一直这么刻薄吗', mood: 'sad' }
    ]
  },
  {
    turns: [
      {
        id: 'zhong',
        text: '我好伤心！好伤心！谁偷吃了我的大包子！',
        mood: 'sad'
      },
      { id: 'lv', text: '我吃的' },
      {
        id: 'zhong',
        text: '你怎么可以……你怎么可以……明明我这么相信你……',
        mood: 'sad'
      },
      { id: 'lv', text: '别callback了，你真好意思', mood: 'disdain' },
      { id: 'zhong', text: '对不起', mood: 'care' },
      { id: 'lv', text: '不准说对不起', mood: 'care' }
    ]
  },
  {
    turns: [
      { id: 'zhong', text: '我说师弟，你就这么爱我？', mood: 'disdain' },
      { id: 'lv', text: '对，从第一眼的时候……', mood: 'shy' },
      { id: 'zhong', text: '好了打住', mood: 'shy' },
      { id: 'lv', text: '可是……' },
      { id: 'zhong', text: '师兄说了算' },
      { id: 'lv', text: '好吧' }
    ]
  },
  {
    turns: [
      {
        id: 'lv',
        text: '15年了……这次别再把我一个人留下',
        mood: 'sad'
      },
      {
        id: 'zhong',
        text: '啥话不说就跑的谜语人是不是你',
        mood: 'disdain'
      },
      { id: 'lv', text: '以后不会了' }
    ]
  },
  {
    turns: [
      { id: 'lv', text: '钱没了可以再赚，良心要是没了……' },
      { id: 'zhong', text: '赚的更多呀~', mood: 'happy' }
    ]
  },
  {
    turns: [
      { id: 'lv', text: '这一次，你来做主', mood: 'shy' },
      { id: 'zhong', text: '', mood: 'surprised' }
    ]
  }
];

const distanceLimits = {
  near: 210,
  nearReset: 330,
  far: 760,
  farReset: 620
};

let currentScene = 'idle';
let sceneVersion = 0;
let interactionVersion = 0;
let scale = 0.72;
let drag = null;
let dialogueBusy = false;
let distanceBusy = false;
let nearArmed = true;
let farArmed = true;
let ignoringMouse = true;
let idleChatTimer = null;
let idleConversationBusy = false;
let idleConversationVersion = 0;
let lastIdleDialogueIndex = -1;
const blinkTimers = { lv: null, zhong: null };
const blinkTokens = { lv: 0, zhong: 0 };
const expressionTimers = { lv: null, zhong: null };
const lastMood = { lv: null, zhong: null };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getPetX(id) {
  return Number.parseFloat(pets[id].style.getPropertyValue('--x')) || 0;
}

function getPetY(id) {
  return Number.parseFloat(pets[id].style.getPropertyValue('--y')) || 0;
}

function setPetX(id, x) {
  const halfWidth = (pets[id].offsetWidth * scale) / 2;
  const max = Math.max(halfWidth, stage.clientWidth - halfWidth);
  pets[id].style.setProperty('--x', `${clamp(x, halfWidth, max)}px`);
}

function setPetY(id, y) {
  const visibleHeight = pets[id].offsetHeight * scale;
  const max = Math.max(0, stage.clientHeight - visibleHeight);
  pets[id].style.setProperty('--y', `${clamp(y, 0, max)}px`);
}

function setPetPosition(id, x, y) {
  setPetX(id, x);
  setPetY(id, y);
}

function setPetImage(id, source) {
  petImages[id].src = source;
}

function clearMood(id) {
  pets[id].classList.remove('happy', 'startled', 'lean-left', 'lean-right');
}

function mood(id, className, duration = 700) {
  clearMood(id);
  pets[id].classList.add(className);
  window.setTimeout(() => clearMood(id), duration);
}

function clearSpeech() {
  Object.values(pets).forEach((pet) => {
    window.clearTimeout(pet.speechTimer);
    pet.classList.remove('speaking');
  });
}

function say(id, text, duration = 2800) {
  const pet = pets[id];
  const bubble = pet.querySelector('.bubble');
  bubble.textContent = text;
  pet.classList.add('speaking');
  window.clearTimeout(pet.speechTimer);
  pet.speechTimer = window.setTimeout(() => {
    pet.classList.remove('speaking');
  }, duration);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function clearIdleChatTimer() {
  window.clearTimeout(idleChatTimer);
  idleChatTimer = null;
}

function cancelIdleConversation(restore = false) {
  const wasBusy = idleConversationBusy;
  clearIdleChatTimer();
  idleConversationVersion += 1;
  idleConversationBusy = false;

  if (restore && wasBusy && currentScene === 'idle') {
    clearSpeech();
    stopBlinking();
    clearExpressions();
    startIdle(sceneVersion);
  }
}

function getSpeechDuration(text) {
  return clamp(1900 + text.length * 115, 2400, 4400);
}

function pickIdleDialogue() {
  const choices = idleDialogues
    .map((dialogue, index) => ({ dialogue, index }))
    .filter(({ index }) => index !== lastIdleDialogueIndex);
  const choice = choices[Math.floor(Math.random() * choices.length)];
  lastIdleDialogueIndex = choice.index;
  return choice.dialogue;
}

function scheduleIdleConversation(version, delay = 18000 + Math.random() * 16000) {
  clearIdleChatTimer();
  idleChatTimer = window.setTimeout(() => {
    if (
      sceneVersion !== version ||
      currentScene !== 'idle' ||
      drag ||
      dialogueBusy ||
      distanceBusy ||
      idleConversationBusy
    ) {
      return;
    }

    if (getPetDistance() > distanceLimits.farReset) {
      scheduleIdleConversation(version, 9000 + Math.random() * 6000);
      return;
    }

    playIdleConversation(version);
  }, delay);
}

async function playIdleConversation(version) {
  if (
    sceneVersion !== version ||
    currentScene !== 'idle' ||
    drag ||
    dialogueBusy ||
    distanceBusy ||
    idleConversationBusy
  ) {
    return;
  }

  idleConversationBusy = true;
  clearIdleChatTimer();
  const token = ++idleConversationVersion;
  const dialogue = pickIdleDialogue();

  stopBlinking();
  clearExpressions();
  clearSpeech();
  setPetImage('lv', images.lv.idle[0]);
  setPetImage('zhong', images.zhong.idle[0]);

  for (const turn of dialogue.turns) {
    if (
      token !== idleConversationVersion ||
      sceneVersion !== version ||
      currentScene !== 'idle'
    ) {
      return;
    }

    clearSpeech();
    setPetImage(
      turn.id,
      turn.mood ? images[turn.id].moods[turn.mood] : images[turn.id].idle[0]
    );

    if (!turn.text) {
      await wait(1800);
      continue;
    }

    const duration = getSpeechDuration(turn.text);
    say(turn.id, turn.text, duration);
    await wait(duration - 420);
  }

  await wait(650);
  if (
    token !== idleConversationVersion ||
    sceneVersion !== version ||
    currentScene !== 'idle'
  ) {
    return;
  }

  idleConversationBusy = false;
  restoreCurrentScene();
}

function stopBlink(id) {
  window.clearTimeout(blinkTimers[id]);
  blinkTimers[id] = null;
  blinkTokens[id] += 1;
}

function stopBlinking() {
  Object.keys(blinkTimers).forEach(stopBlink);
}

function clearExpressions() {
  Object.keys(expressionTimers).forEach((id) => {
    window.clearTimeout(expressionTimers[id]);
    expressionTimers[id] = null;
  });
}

function scheduleBlink(id, version, initialDelay = 0) {
  const token = blinkTokens[id];
  const delay = initialDelay || 2800 + Math.random() * 4200;
  blinkTimers[id] = window.setTimeout(async () => {
    if (
      blinkTokens[id] !== token ||
      sceneVersion !== version ||
      currentScene !== 'idle' ||
      distanceBusy ||
      idleConversationBusy
    ) {
      return;
    }

    setPetImage(id, images[id].idle[1]);
    await wait(110);
    if (blinkTokens[id] !== token || sceneVersion !== version) return;

    setPetImage(id, images[id].idle[2]);
    await wait(240);
    if (blinkTokens[id] !== token || sceneVersion !== version) return;

    setPetImage(id, images[id].idle[0]);
    scheduleBlink(id, version);
  }, delay);
}

function startIdle(version) {
  setPetImage('lv', images.lv.idle[0]);
  setPetImage('zhong', images.zhong.idle[0]);
  scheduleBlink('lv', version, 1600 + Math.random() * 1800);
  scheduleBlink('zhong', version, 2600 + Math.random() * 2200);
  scheduleIdleConversation(version);
}

function revealPets() {
  Object.values(pets).forEach((pet) => pet.classList.remove('hidden-for-duo'));
  duoInteraction.classList.remove('visible');
}

function applyCurrentSceneImages() {
  if (currentScene === 'idle') {
    startIdle(sceneVersion);
    return;
  }

  setPetImage('lv', images.lv[currentScene]);
  setPetImage('zhong', images.zhong[currentScene]);
}

function restoreCurrentScene() {
  revealPets();
  stopBlinking();
  clearExpressions();
  clearSpeech();
  applyCurrentSceneImages();
}

function showScene(scene) {
  cancelIdleConversation(false);
  currentScene = scene;
  sceneVersion += 1;
  interactionVersion += 1;
  dialogueBusy = false;
  distanceBusy = false;
  revealPets();
  stopBlinking();
  clearExpressions();
  clearSpeech();
  Object.keys(pets).forEach(clearMood);
  applyCurrentSceneImages();
}

function popHearts(count, x, y) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.left = `${x - 24 + Math.random() * 48}px`;
    heart.style.bottom = `${y}px`;
    heart.style.setProperty('--drift', `${-26 + Math.random() * 52}px`);
    heart.style.animationDelay = `${i * 120}ms`;
    hearts.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1700 + i * 120);
  }
}

function pickMood(id) {
  const choices = Object.keys(moodClickResponses[id]).filter(
    (name) => name !== lastMood[id]
  );
  const choice = choices[Math.floor(Math.random() * choices.length)];
  lastMood[id] = choice;
  return choice;
}

function playExpression(id) {
  if (
    currentScene !== 'idle' ||
    dialogueBusy ||
    distanceBusy ||
    idleConversationBusy
  ) {
    return;
  }

  cancelIdleConversation(false);
  stopBlink(id);
  window.clearTimeout(expressionTimers[id]);
  clearSpeech();
  const version = sceneVersion;
  const moodName = pickMood(id);
  const line = moodClickResponses[id][moodName];
  const duration = moodName === 'shy' && id === 'lv' ? 2600 : 3400;
  setPetImage(id, images[id].moods[moodName]);

  if (moodName === 'shy' && id === 'lv') {
    popHearts(5, getPetX(id), getPetY(id) + 175 * scale);
  } else {
    say(id, line, duration);
  }

  expressionTimers[id] = window.setTimeout(() => {
    if (
      sceneVersion !== version ||
      currentScene !== 'idle' ||
      distanceBusy
    ) {
      return;
    }
    expressionTimers[id] = null;
    setPetImage(id, images[id].idle[0]);
    scheduleBlink(id, version, 1200 + Math.random() * 1600);
    scheduleIdleConversation(version);
  }, duration);
}

async function playDialogue() {
  if (currentScene !== 'dialogue' || dialogueBusy || distanceBusy) return;

  dialogueBusy = true;
  const version = sceneVersion;
  const middleX = (getPetX('lv') + getPetX('zhong')) / 2;
  const middleY = (getPetY('lv') + getPetY('zhong')) / 2;

  setPetPosition('lv', middleX - 82, middleY);
  setPetPosition('zhong', middleX + 82, middleY);
  mood('lv', 'lean-right', 1600);
  mood('zhong', 'lean-left', 1600);
  say('lv', '在蓬莱假扮神仙是什么罪？', 3200);

  await wait(1550);
  if (sceneVersion !== version || currentScene !== 'dialogue') return;

  mood('zhong', 'startled', 650);
  say('zhong', '死罪~', 2300);

  await wait(1250);
  if (sceneVersion !== version || currentScene !== 'dialogue') return;

  mood('lv', 'happy', 700);
  mood('zhong', 'happy', 700);
  popHearts(5, middleX, middleY + 175 * scale);
  dialogueBusy = false;
}

function playSolo(id) {
  if (currentScene !== 'solo' || distanceBusy) return;
  mood(id, 'happy', 620);
  say(id, soloLines[id], 4000);
}

async function playFarInteraction() {
  if (distanceBusy || dialogueBusy) return;

  cancelIdleConversation(false);
  distanceBusy = true;
  const token = ++interactionVersion;
  stopBlinking();
  clearExpressions();
  clearSpeech();
  revealPets();
  setPetImage('lv', images.lv.far);
  setPetImage('zhong', images.zhong.far);

  mood('zhong', 'lean-left', 900);
  say('zhong', '师弟，你在吗？', 3600);

  await wait(900);
  if (interactionVersion !== token) return;

  mood('lv', 'startled', 700);
  say('lv', '钟离权？钟离权！', 3400);

  await wait(3400);
  if (interactionVersion !== token) return;

  distanceBusy = false;
  restoreCurrentScene();
}

async function playNearInteraction() {
  if (distanceBusy || dialogueBusy) return;

  cancelIdleConversation(false);
  distanceBusy = true;
  const token = ++interactionVersion;
  const middleX = (getPetX('lv') + getPetX('zhong')) / 2;
  const middleY = (getPetY('lv') + getPetY('zhong')) / 2;

  stopBlinking();
  clearExpressions();
  clearSpeech();
  revealPets();
  setPetImage('lv', images.lv.approach);
  setPetImage('zhong', images.zhong.approach);
  setPetPosition('lv', middleX - 80, middleY);
  setPetPosition('zhong', middleX + 80, middleY);
  mood('lv', 'lean-right', 900);
  mood('zhong', 'lean-left', 900);

  await wait(760);
  if (interactionVersion !== token) return;

  pets.lv.classList.add('hidden-for-duo');
  pets.zhong.classList.add('hidden-for-duo');
  duoInteraction.style.setProperty('--duo-x', `${middleX}px`);
  duoInteraction.style.setProperty('--duo-y', `${middleY}px`);
  duoInteraction.classList.add('visible');
  popHearts(6, middleX, middleY + 180 * scale);

  await wait(2600);
  if (interactionVersion !== token) return;

  distanceBusy = false;
  restoreCurrentScene();
}

function getPetDistance() {
  return Math.hypot(
    getPetX('lv') - getPetX('zhong'),
    getPetY('lv') - getPetY('zhong')
  );
}

function evaluateDistance() {
  const distance = getPetDistance();

  if (distance > distanceLimits.nearReset) nearArmed = true;
  if (distance < distanceLimits.farReset) farArmed = true;
  if (distanceBusy || dialogueBusy) return;

  if (distance <= distanceLimits.near && nearArmed) {
    nearArmed = false;
    farArmed = true;
    playNearInteraction();
  } else if (distance >= distanceLimits.far && farArmed) {
    farArmed = false;
    nearArmed = true;
    playFarInteraction();
  }
}

function handlePetClick(id) {
  if (distanceBusy) return;

  if (currentScene === 'dialogue' && id === 'lv') {
    playDialogue();
  } else if (currentScene === 'solo') {
    playSolo(id);
  } else if (currentScene === 'idle') {
    playExpression(id);
  }
}

function handlePetPointerDown(event, id) {
  if (event.button !== 0 || distanceBusy) return;
  cancelIdleConversation(true);
  clearIdleChatTimer();
  drag = {
    id,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: getPetX(id),
    originY: getPetY(id),
    moved: false
  };
  pets[id].classList.add('dragging');
  pets[id].setPointerCapture(event.pointerId);
}

function handlePetPointerMove(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - drag.startX;
  const deltaY = event.clientY - drag.startY;
  if (Math.hypot(deltaX, deltaY) > 5) drag.moved = true;
  setPetPosition(drag.id, drag.originX + deltaX, drag.originY - deltaY);
}

function finishDrag(event, cancelled = false) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const { id, moved, pointerId } = drag;
  drag = null;
  pets[id].classList.remove('dragging');
  if (pets[id].hasPointerCapture(pointerId)) {
    pets[id].releasePointerCapture(pointerId);
  }

  if (!cancelled && moved) {
    evaluateDistance();
    if (currentScene === 'idle' && !distanceBusy) {
      scheduleIdleConversation(sceneVersion);
    }
  } else if (!cancelled) {
    handlePetClick(id);
  } else if (currentScene === 'idle') {
    scheduleIdleConversation(sceneVersion);
  }
}

function setMouseIgnored(ignore) {
  if (ignoringMouse === ignore) return;
  ignoringMouse = ignore;
  window.desktopPet.setIgnoreMouseEvents(ignore);
}

function updateMousePassthrough(event) {
  if (drag) {
    setMouseIgnored(false);
    return;
  }
  const target = document.elementFromPoint(event.clientX, event.clientY);
  setMouseIgnored(!target?.closest('.pet'));
}

function clampPetPositions() {
  Object.keys(pets).forEach((id) => {
    setPetPosition(id, getPetX(id), getPetY(id));
  });
}

function resetPets() {
  scale = 0.72;
  nearArmed = true;
  farArmed = true;
  document.documentElement.style.setProperty('--pet-scale', scale);
  setPetPosition('lv', stage.clientWidth - 410, 22);
  setPetPosition('zhong', stage.clientWidth - 180, 22);
  showScene('idle');
}

Object.entries(pets).forEach(([id, pet]) => {
  pet.addEventListener('pointerdown', (event) => handlePetPointerDown(event, id));
  pet.addEventListener('pointermove', handlePetPointerMove);
  pet.addEventListener('pointerup', (event) => finishDrag(event));
  pet.addEventListener('pointercancel', (event) => finishDrag(event, true));
});

document.addEventListener('mousemove', updateMousePassthrough);
document.addEventListener('mouseleave', () => setMouseIgnored(true));
document.addEventListener('contextmenu', (event) => {
  if (!event.target.closest('.pet')) return;
  event.preventDefault();
  window.desktopPet.openMenu();
});

window.desktopPet.onSkinAction((scene) => {
  if (['idle', 'dialogue', 'solo'].includes(scene)) showScene(scene);
});

window.desktopPet.onMenuAction((action) => {
  if (action === 'scale-up') {
    scale = Math.min(1, scale + 0.06);
    document.documentElement.style.setProperty('--pet-scale', scale);
    clampPetPositions();
  }
  if (action === 'scale-down') {
    scale = Math.max(0.48, scale - 0.06);
    document.documentElement.style.setProperty('--pet-scale', scale);
    clampPetPositions();
  }
  if (action === 'reset') resetPets();
});

window.addEventListener('resize', clampPetPositions);

Object.values(images).forEach((petSet) => {
  [
    ...petSet.idle,
    petSet.dialogue,
    petSet.solo,
    petSet.far,
    petSet.approach,
    ...Object.values(petSet.moods)
  ].forEach((source) => {
    const image = new Image();
    image.src = source;
  });
});

const duoPreload = new Image();
duoPreload.src = './assets/states/duo-cuddle.png';

resetPets();
