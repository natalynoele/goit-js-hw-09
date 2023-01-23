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
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
const calendar = flatpickr(dateTimePicker, options);
let timerId;

startBtn.classList.add('start-timer');
startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (!timerId) {
    timerId = setInterval(countDownTimeToSelectedDate, 1000);
    startBtn.disabled = true;
  }
}

function countDownTimeToSelectedDate() {
  const now = Date.now();
  const diff = calendar.selectedDates[0] - now; 
  const remainTime = convertMs(diff);

  startBtn.disabled = false;

  daysEl.textContent = `${addLeadingZero(remainTime.days)}`;
  hoursEl.textContent = `${addLeadingZero(remainTime.hours)}`;
  minutesEl.textContent = `${addLeadingZero(remainTime.minutes)}`;
  secondsEl.textContent = `${addLeadingZero(remainTime.seconds)}`;
  
  if (diff <= 0) {
    stopInterval();
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    Notify.success('The great day has arrived');
  }
}

function stopInterval() {
  isTimerRun = false;
  clearInterval(timerId);  
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

function addLeadingZero(value) {
  if (value < 10) {
    value = value.toString().padStart(2, '0');
  }
  return value;
}
