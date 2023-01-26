import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const amount = document.querySelector('input[name=amount]');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const submit = form.querySelector('button');

submit.classList.add('submit');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
 createPromiseXTimes();
  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
    // console.log(delay);
  });
}

function createPromiseXTimes() {
  let repeated = 1;
  let intervalStep;  
  const intervalTask = setInterval(doTask, intervalStep);
  
  function doTask() {
    let promiseDelay = Number(delay.value);
    if (repeated <= amount.value) {
      repeated === 1
        ? intervalStep = promiseDelay
        : intervalStep = step.value;
      if (repeated > 1) {
        promiseDelay += intervalStep * (repeated - 1);
      }
      createPromise(repeated, promiseDelay)
        .then(({ position, delay }) => {
          // console.log('delay: ', delay);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      repeated += 1;
    } else {
      clearInterval(intervalTask);
    }
  }
}