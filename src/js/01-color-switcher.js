/*
Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону 
<body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» 
зміна кольору фону повинна зупинятися.

УВАГА
Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, 
щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
*/

//after the first click btn start has to be disable
//after click btn stop btn start becomes enabled

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
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
