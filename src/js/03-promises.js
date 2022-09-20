import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

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

const onSubmitClick = event => {
  event.preventDefault();
  // console.log(event);

  const amount = Number(amountInput.value);
  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);

  for (let i = 1; i <= amount; i += 1) {
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
    delay += step;
  }
};

formEl.addEventListener('submit', onSubmitClick);

//
// вариант решения через элементы формы:
//
// const onSubmitClick = event => {
//   event.preventDefault();
//   const { amount, delay, step } = event.target.elements;
//   // console.log(event.target.elements);

//   let amountVal = Number(amount.value);
//   let delayVal = Number(delay.value);
//   let steptVal = Number(step.value);

//   for (let i = 0; i < amountVal; i += 1) {
//     createPromise(i + 1, delayVal)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//     delayVal += steptVal;
//   }
// };

// formEl.addEventListener('submit', onSubmitClick);
