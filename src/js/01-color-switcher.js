const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;
stopBtn.disabled = true;

const changeBodyColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const onStartBtnClick = () => {
  intervalId = setInterval(changeBodyColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

const onStopBtnClick = () => {
  clearInterval(intervalId);
};

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

//
//
// let intervalId = null;
// stopBtn.disabled = true;

//   intervalId = setInterval(() => {
//     bodyEl.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// });

// startBtn.addEventListener('click', () => {
//   startBtn.disabled = true;
//   stopBtn.disabled = false;

// stopBtn.addEventListener('click', () => {
//   clearInterval(intervalId);
// });
