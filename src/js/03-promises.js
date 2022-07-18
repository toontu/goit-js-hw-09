import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
// const formSubmitBtn = document.querySelector('[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const onFormSubmit = event => {
  event.preventDefault();
  // console.log(event);

  const amount = Number(amountInput.value);
  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

formEl.addEventListener('submit', onFormSubmit);
