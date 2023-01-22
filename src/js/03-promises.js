/*

HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку 
в мілісекундах, крок збільшення затримки для 
кожного промісу після першого і кількість промісів, яку необхідно створити.
Напиши скрипт, який на момент сабміту форми викликає функцію
 createPromise(position, delay) стільки разів, скільки ввели в поле amount.
  Під час кожного виклику передай їй номер промісу (position), що створюється,
  і затримку,
 враховуючи першу затримку (delay), введену користувачем, і крок (step).
 Доповни код функції createPromise таким чином, щоб вона повертала 
 один проміс, який виконується або відхиляється через delay часу. 
 Значенням промісу повинен бути об'єкт, в якому будуть властивості position 
 і delay зі значеннями однойменних параметрів. Використовуй початковий код 
 функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
*/

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const refs = {
  amount: document.querySelector('input[name=amount]'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  submit: document.querySelector('button'),
};

form.addEventListener('input', onFormTextFieldInput);
form.addEventListener('submit', (event) => {
  event.preventDefault();
    runFunctionXTimes(createPromise, refs.step.value, refs.amount.value);

})

function onFormTextFieldInput(event) {
  
}

  function runFunctionXTimes(callback, interval, repeatTimes) {
    let repeated = 0;
    const intervalTask = setInterval(doTask, interval);

    function doTask() {
      if (repeated < repeatTimes) {
        callback();
        repeated += 1;
      } else {
        clearInterval(intervalTask);
      }
    }
  } 

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
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
  return promise;
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
