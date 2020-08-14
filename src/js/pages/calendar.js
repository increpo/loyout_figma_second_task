
//'use strict';
let status=0;
if (document.querySelector('.landing__form-find')) {
  let buttomArrival = document.querySelector('.landing__form-find').querySelector('.date__arrival');
  let buttomDeparture = document.querySelector('.landing__form-find').querySelector('.date__departure');

  buttomArrival.onclick = openCalendar;
  buttomDeparture.onclick = openCalendar;
};

function openCalendar(){
  if (!document.querySelector('.landing__calendar')) {
    let message = createMessageUnder(buttom = this, divClass = 'landing__calendar');
    document.body.append(message);
    makeCalendar();
    } else {
    document.querySelector('.landing__calendar').remove();
  };
};

function createMessageUnder(buttom, divClass) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  message.classList.add(divClass);
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:absolute";
  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = getCoords(buttom);
  //let coords = buttom.getBoundingClientRect();
  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  return message;
};

// получаем координаты элемента в контексте документа
function getCoords(buttom) {
  let box = buttom.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset+8,
  };
};

function makeCalendar(date = new Date()) {
  if (document.querySelector('.card__calendar')) {
    document.querySelector('.card__calendar').remove();
  };
  let calendarMainDiv = document.querySelector('.landing__calendar');
  calendarMainDiv.calendar(date);
  document.body.querySelector('.calendar__content-weeks').calweeks();
  document.body.querySelector('.calendar__content-days').caldays(date);
  getCalendarCheckedDays(firstClickValue, secondClickValue);
  listenEvents();
};

function listenEvents(){
  document.querySelector('.calendar__head').addEventListener('click', checkCalendarLeaf);
  document.querySelector('.calendar__content-days').addEventListener('click', checkDay);
  document.querySelector('.decision-clear').addEventListener('click', clearCheckedDays);
  document.querySelector('.decision-apply').addEventListener('click', applyCheckedDays);
};

Element.prototype.calendar = function(date=new Date()){
  this.insertAdjacentHTML("afterbegin", `<div class="card__calendar">
    <div class="calendar">
      <div class="calendar__head">
        <div class="head__item">arrow_back</div>
        <div class="head__item-text">${getMonth[date.getMonth()]} ${date.getFullYear()}</div>
        <div class="head__item">arrow_forward</div>
      </div>
      <div class="calendar__content">
        <div class="calendar__content-weeks"></div>
        <div class="calendar__content-days"></div>
        <div class="calendar__decision"><div class="decision-clear">очистить</div><div class="decision-apply">применить</div></div></div>
    </div>`);
};

let getMonth = {
 0:"Январь",
 1:"Февраль",
 2:"Март",
 3:"Апрель",
 4:"Май",
 5:"Июнь",
 6:"Июль",
 7:"Август",
 8:"Сентябрь",
 9:"Октябрь",
 10:"Ноябрь",
 11:"Декабрь",
};

Element.prototype.calweeks = function() {
  let weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  for (let week of weeks) {
    let newelement = document.createElement('p');
    newelement.innerHTML += week;
    //return newelement;
    this.append(newelement);
  };
};

const Today = new Date();

Element.prototype.caldays = function(date=+(new Date())) {
  let calendarDay = getCalendarStartDate(new Date(date));
  for (let i = 1; i < 36; i++) {
    let newelement = document.createElement('div');
    newelement.setAttribute('value', `${+calendarDay}`);
    newelement.classList.add('dayCont');

    if ((calendarDay.getDate() > 10 && i < 8) || (calendarDay.getDate() < 10 && i > 20) ) {
      newelement.classList.add('light');
    };
    newelement.innerHTML = `<p value=${+calendarDay}>${calendarDay.getDate()}</p>`;
    if (calendarDay.getMonth() == Today.getMonth() && calendarDay.getFullYear() == Today.getFullYear() && calendarDay.getDate() == Today.getDate()) {
      newelement.innerHTML = `<p class='today'>${calendarDay.getDate()}</p>`;
    };
    this.append(newelement);
    calendarDay.setDate(calendarDay.getDate()+1);
  };
};


const FirstDay = new Date();
FirstDay.setDate(1);
FirstDay.setDate(-FirstDay.getDay()+1);
let firstCalDay = FirstDay.getDate();
let firstMonthDay = new Date();
firstMonthDay.setDate(1);


function getCalendarStartDate(date) {
  date.setHours(0,0,0,0);
  date.setDate(1);
  let monthStartDay = date.getDay() == 0 ? 7 : date.getDay();
  date.setDate(date.getDate()-monthStartDay+1);
  return date;
};

let calendarLeafDate = new Date();

function calendarLeaf(calendarCounter=1) {
  calendarLeafDate.setMonth(calendarLeafDate.getMonth()+calendarCounter);
  makeCalendar(calendarLeafDate);
};

let arrivalDate;
let departureDate;


function checkCalendarLeaf(event){
  if (event.target.innerHTML == "arrow_back") {
    calendarLeaf(-1);
  } else if (event.target.innerHTML == "arrow_forward") {
    calendarLeaf(1);
  };
};

function fullFormFromCalendar(departureDate, arrivalDate) {
  if (!+departureDate){
    document.querySelector('.date__departure').querySelector('.drop__form').innerHTML = "ДД:ММ:ГГГГ";
  } else {
    document.querySelector('.date__departure').querySelector('.drop__form').innerHTML = `${getDoubleString(departureDate.getDate())+":"+(getDoubleString(departureDate.getMonth()+1))+":"+departureDate.getFullYear()}`;

  };
  if (!+arrivalDate){
    document.querySelector('.date__arrival').querySelector('.drop__form').innerHTML = "ДД:ММ:ГГГГ";
  } else {
    document.querySelector('.date__arrival').querySelector('.drop__form').innerHTML = `${getDoubleString(arrivalDate.getDate())+":"+(getDoubleString(arrivalDate.getMonth()+1))+":"+arrivalDate.getFullYear()}`;
  };
};

function getDoubleString(number){
  if (number<10){
    number = "0"+number;
  };
  return number;
};

let firstClickValue=0;
let secondClickValue=0;
let checkDayCounter=1;
function checkDay(event){
  let  days = document.querySelector('.calendar__content-days');
  switch (checkDayCounter) {
    case 2:
      secondClickValue = +event.target.getAttribute('value');
      break;
    case 3:
      firstClickValue=0;
      secondClickValue=0;
      checkDayCounter = 1;
    case 1:
      firstClickValue = +event.target.getAttribute('value');
      break;
    default:
      firstClick=0;
      secondClick=0;
      firstClickValue=0;
      secondClickValue=0;
      break;
  };
  checkDayCounter++;
  makeCalendar(calendarLeafDate);
};

function clearCheckedDays(){
  firstClickValue=0;
  secondClickValue=0;
  checkDayCounter = 1;
  arrivalDate = 0;
  departureDate = 0;
  makeCalendar(calendarLeafDate);
};

function applyCheckedDays(){
  document.querySelector('.landing__calendar').remove();
};

function getCalendarCheckedDays(firstClickValue=0, secondClickValue=0){
  arrivalDate = getArrivalDapertureDates(firstClickValue, secondClickValue).arrivalDate;
  departureDate = getArrivalDapertureDates(firstClickValue, secondClickValue).departureDate;
  fullFormFromCalendar(departureDate, arrivalDate);
  getSlider(firstClickValue, secondClickValue);
};


function getArrivalDapertureDates(firstClickValue=0, secondClickValue=0) {
  let arrivalDate, departureDate;
  if (+firstClickValue != 0 && +secondClickValue != 0 && +firstClickValue > +secondClickValue) {
    arrivalDate = new Date(+secondClickValue);
    departureDate = new Date(+firstClickValue);
  } else {
    departureDate = new Date(+secondClickValue);
    arrivalDate = new Date(+firstClickValue);
  };
  return {arrivalDate: arrivalDate, departureDate: departureDate};
};

function getSlider(firstClickValue=0, secondClickValue=0){
  let  days = document.querySelector('.calendar__content-days');
  arrivalDate = getArrivalDapertureDates(firstClickValue, secondClickValue).arrivalDate;
  departureDate = getArrivalDapertureDates(firstClickValue, secondClickValue).departureDate;
  let sliderValues = getSliderValues(arrivalDate, departureDate);
  let sliderStartValue = sliderValues.sliderStartValue;
  let sliderStopValue = sliderValues.sliderStopValue;
  let boxShadowLeft = 'inset 20px 0px #fff';
  let boxShadowRight = 'inset -20px 0px #fff';
  for (let i=0; i<35; i++) {
    if (!sliderStopValue){
      days.querySelectorAll('p')[i].classList.remove('checked');
      days.querySelectorAll('div')[i].classList.remove('slider');
      days.querySelectorAll('div')[i].style.boxShadow = 'none';
    };
    if (+days.querySelectorAll('p')[i].getAttribute('value') == sliderStartValue) {
      if (+arrivalDate == +departureDate && +arrivalDate) {
        days.querySelectorAll('p')[i].classList.add('checked');
        break;
      };
      if (+arrivalDate == +sliderStartValue && sliderStartValue != 0) {
        days.querySelectorAll('p')[i].classList.add('checked');
        days.querySelectorAll('div')[i].style.boxShadow = boxShadowLeft;
      };
      if (sliderStopValue) {
        for (let n=i; n<35; n++) {
          days.querySelectorAll('div')[n].classList.add('slider');
          if (days.querySelectorAll('p')[n].getAttribute('value') == sliderStopValue) {
            days.querySelectorAll('div')[n].style.boxShadow = 'none';
            if (+departureDate == sliderStopValue) {
              days.querySelectorAll('p')[n].classList.add('checked');
              days.querySelectorAll('div')[n].style.boxShadow = boxShadowRight;
            };
            break;
          };
        };
      };
    };
  };
};

function getSliderValues(arrivalDate, departureDate){
  let days = document.querySelector('.calendar__content-days');
  let sliderStartValue = +arrivalDate;
  let sliderStopValue = +departureDate;
  if (+arrivalDate && +arrivalDate < days.querySelectorAll('p')[0].getAttribute('value')){
    sliderStartValue = days.querySelectorAll('p')[0].getAttribute('value');
    boxShadowLeft = "none";
  };
  if (+departureDate && +departureDate > days.querySelectorAll('p')[34].getAttribute('value')){
    sliderStopValue = days.querySelectorAll('p')[34].getAttribute('value');
    boxShadowRight = "none";
  };
  if (+arrivalDate < days.querySelectorAll('p')[0].getAttribute('value') && +departureDate < days.querySelectorAll('p')[0].getAttribute('value')){
    sliderStartValue = +arrivalDate;
    sliderStopValue = +departureDate;
  };
  return {sliderStartValue: sliderStartValue,
          sliderStopValue: sliderStopValue,};
};
