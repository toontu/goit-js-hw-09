import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputPicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');

startBtn.disabled = true;

// const now = Date.now();
let delta = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < Date.now()) {
      // или (selectedDates[0] < new Date())
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      delta = selectedDates[0].getTime() - Date.now();
      // console.log(delta);
    }
  },
};

flatpickr(inputPicker, options);

let timerId = null;

const onStartBtnClick = () => {
  //   console.log(delta);

  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(delta);
    // console.log(days, hours, minutes, seconds);

    delta -= 1000;
    console.log(delta);

    if (delta <= 0) {
      clearInterval(timerId);
    }

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    startBtn.disabled = true;
  }, 1000);
};

const addLeadingZero = value => {
  return String(value).padStart(2, 0);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', onStartBtnClick);
