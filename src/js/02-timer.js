/*
Виконуй це завдання у файлах 02-timer.html і 02-timer.js.
 Напиши скрипт таймера, який здійснює зворотний відлік до 
 певної дати. Такий таймер може використовуватися у блогах та 
 інтернет-магазинах, сторінках реєстрації подій, під час 
 технічного обслуговування тощо. 
Подивися демо-відео роботи таймера.

HTML містить готову розмітку таймера, поля вибору кінцевої дати і 
кнопку, по кліку на яку, таймер повинен запускатися.
 Додай мінімальне оформлення елементів інтерфейсу.
*/
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const isPastDate = selectedDate =>
  selectedDate - Date.now() <= 0 ? true : false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isPastDate(selectedDates[0])) {
      Notify.failure('Qui timide rogat docet negare');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    } 
  },
};
const calendar = flatpickr(dateTimePicker, options);
console.log('calendar', calendar);
console.log('selecteddates are:',calendar.selectedDates);
const selectedDate = calendar.selectedDates[0];
console.log('selectedDate is', selectedDate);
let timerId;

// startBtn.addEventListener('click', onStartBtnClick);
  

function onStartBtnClick() {
  console.log('start');
  if (!timerId) {
    timerId = setInterval(countDownTimeToSelectedDate, 1000);
  }
}

function countDownTimeToSelectedDate() {
  const now = Date.now();
  
  console.log('selectedDate:', calendar.selectedDates[0], 'now:', now);
  // console.log('selected date in ms:', Date.parse(selectedDate));
  // const diff = selectedDate - now;
  // console.log('func diff is:', diff);
  const diff = calendar.selectedDates[0] - Date.now();
console.log('func diff is', diff);
  const remainTime = convertMs(diff);
  startBtn.disabled = false;
  daysEl.textContent = `${remainTime.days}`;
  hoursEl.textContent = `${remainTime.hours}`;
  minutesEl.textContent = `${remainTime.minutes}`;
  secondsEl.textContent = `${remainTime.seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
   // Remaining days
  const days = Math.floor(ms / day);
  console.log(days);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
countDownTimeToSelectedDate();

// let isTimerRun = true;
// const newYearDate = new Date(`Jan 1, ${new Date().getFullYear() + 1}`);

// countDownTimeToNY();
// let timerIds = setInterval(countDownTimeToNY, 1000);

// stopBtnEl.addEventListener('click', () => {
//   stopInterval();
//   if (!isTimerRun) {
//     continueBtnEl.disabled = false;
//     continueBtnEl.addEventListener('click', continueInterval);
//   }
// });

// function countDownTimeToNY() {
//   const now = Date.now();
//   console.log(now);
//   const diff = newYearDate - now; // скільки мілісекунд лишилось до Нового року
// console.log(diff);
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   // timeEl.textContent = `${days} d. ${hours} h. ${minutes} m. ${seconds} s.`;
// console.log(`${days} d. ${hours} h. ${minutes} m. ${seconds} s.`);
//   if (diff <= 0) {
//     stopInterval();
//     // timeEl.textContent = 'Happy New Year!';
//     console.log('Happy New Year!');
//   }
// }

// function continueInterval() {
//   isTimerRun = true;
//   continueBtnEl.disabled = true;
//   alert('Continue');
//   timerId = setInterval(countDownTimeToNY, 1000);
// }

// function stopInterval() {
//   isTimerRun = false;
//   clearInterval(timerId);
//   alert('The timer has been stopped!');
// }
