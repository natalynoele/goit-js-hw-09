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
  let repeated = 1;
  const intervalTask = setInterval(doTask, step.value);
  function doTask() {
    let promiseDelay = Number(delay.value);
    if (repeated <= amount.value) {
      if (repeated > 1){
        promiseDelay += Number(step.value) * (repeated - 1);
      }
      createPromise(repeated, promiseDelay)
        .then(({ position, delay }) => {
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
  });
}
