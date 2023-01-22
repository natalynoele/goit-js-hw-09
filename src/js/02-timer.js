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

const selectedDate = calendar.selectedDates[0];

let timerId;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (!timerId) {
    timerId = setInterval(countDownTimeToSelectedDate, 1000);
  }
}

function countDownTimeToSelectedDate() {
  const now = Date.now();
  const diff = calendar.selectedDates[0] - Date.now();
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
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
