const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.classList.add('switcher-start');
stopBtn.classList.add('switcher-stop');
startBtn.disabled = false;
stopBtn.disabled = true;

let intervalColorId;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() {
  clearInterval(intervalColorId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  intervalColorId = setInterval(setBodyBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function setBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
