
//document.getElementsByClassName('landing__text')[0].style.background = 'green'; //work


//document.querySelector('.landing__text').style.background='pink'; //work

//alert(document.querySelector('.landing__text').parentNode.textContent); //work

//setInterval(() => document.querySelector('.landing__text').hidden = !document.querySelector('.landing__text').hidden, 1000);

//document.body.style.background = 'red'; // сделать фон красным

//setTimeout(() => document.body.style.background = '', 8000); // вернуть назад

//создание поптотипа, для использования с любыми тегами
//Element.prototype.sayTagName = function(){
//  alert(this.tagName);
//};
//document.body.sayTagName();

//let newElem = document.createElement('div');
//newElem.className = 'alert';
//newElem.innerHTML = '<strong>Всем привет!</strong> Вы прочитали важное сообщение.';

//document.querySelector('.landing__text').parentNode.append(newElem);
//document.body.append(newElem);

//alert(getComputedStyle(document.querySelector('.landing__text')).color);

//alert(document.doctype);

//

//'use strict';

const Today = new Date();
//let today = new Date();

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


Element.prototype.calendar = function(){
  this.insertAdjacentHTML("afterbegin", `<div class="card__calendar">
    <div class="calendar">
      <div class="calendar__head">
        <div class="head__item">arrow_back</div>
        <div class="head__item-text">${getMonth[Today.getMonth()]} ${Today.getFullYear()}</div>
        <div class="head__item">arrow_forward</div>
      </div>
      <div class="calendar__content">
        <div class="calendar__content-weeks"></div>
        <div class="calendar__content-days"></div>
        <div class="calendar__decision"><div class="decision-clear">очистить</div><div class="decision-apply">применить</div></div></div>
    </div>`);
};

//<div class="calendar__slider"></div>
//<div class="calendar__content-weeks"><p>Пн</p><p>Вт</p><p>Ср</p><p>Чт</p><p>Пт</p><p>Сб</p><p>Вс</p></div>
//<div class="calendar__content-days"><p class="light">29</p><p class="light">30</p><p class="light">31</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p><p class="light">1</p></div>
// Element.prototype.caldays = function(days) {
//   for (let day = 1; day <= days; day++) {
//     let newelement = document.createElement('p');
//     newelement.innerHTML += day;
//     this.before(newelement);
//   };
// };
const FirstDay = new Date();
FirstDay.setDate(1);
let lastCalDays = FirstDay.getDay()-1;
FirstDay.setDate(-FirstDay.getDay()+1);
let firstCalDay = FirstDay.getDate();
//alert(lastCalDays);
//alert(firstCalDay);
//alert(FirstDay);
let firstMonthDay = new Date();
firstMonthDay.setDate(1);
//alert (firstMonthDay);
let nextMonth = 0;
let previousMonth = 0;



Element.prototype.caldays = function(date) {
  let calDay = new Date(date);
  calDay = getCalendarStartDate(calDay);
  //alert(calDay);
  let lastCalDays = getMonthStartDay(date);
  for (let i = 1; i < 36; i++) {
    let newelement = document.createElement('div');
    newelement.classList.add('dayCont');
    //newelement.innerHTML += '<p></p>';
    if ((calDay.getDate() > 10 && i < 8) || (calDay.getDate() < 10 && i > 20) ) {
      newelement.classList.add('light');
    };
    valueDate = +calDay; //.getDate()+":"+(calDay.getMonth()+1)+":"+calDay.getFullYear();
    newelement.innerHTML = `<p value=${valueDate}>${calDay.getDate()}</p>`;
    if (calDay.getMonth() == Today.getMonth() && calDay.getFullYear() == Today.getFullYear() && calDay.getDate() == Today.getDate()) {
      newelement.innerHTML = `<p class='today'>${calDay.getDate()}</p>`;
      //alert(calDay.getDate +" == "+Today.getDate);
    };
    this.append(newelement);
    calDay.setDate(calDay.getDate()+1);
  };

};

function getCalendarStartDate(date) {
  date.setDate(1);
  date.setDate(date.getDate()-getMonthStartDay(date)+1);
  return date;
};

function getMonthStartDay(date){
  date.setDate(1);
  let monthStartDay = date.getDay() == 0 ? 7 : date.getDay();
  return monthStartDay;
};

let calendarLeafDate = new Date();
//let calendarCounter = 0;

function calendarLeaf(calendarCounter=1) {
  //calendarCounter += calendarCount;
  //alert('hi');
  calendarLeafDate.setMonth(calendarLeafDate.getMonth()+calendarCounter);
  document.body.querySelector('.calendar__content-days').innerHTML = '';
  //alert(calendarLeafDate);
  document.body.querySelector('.calendar__content-days').caldays(calendarLeafDate);
  document.querySelector('.head__item-text').innerHTML = `${getMonth[calendarLeafDate.getMonth()]} ${calendarLeafDate.getFullYear()}`;
};


Element.prototype.calweeks = function() {
  let weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  for (let week of weeks) {
    let newelement = document.createElement('p');
    newelement.innerHTML += week;
    //return newelement;
    this.append(newelement);
    //this.innerHTML += newelement;
  };
};


// получаем координаты элемента в контексте документа
function getCoords(buttom) {
  let box = buttom.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset,
  };
};

function createMessageUnder(buttom, html) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  message.classList.add('landing__calendar');
  // для стилей лучше было бы использовать css-класс здесь

  message.style.cssText = "position:absolute";

  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = getCoords(buttom);
  //let coords = buttom.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";
  message.calendar();
  //message.innerHTML = html;

  return message;
};

let buttomArrival = document.querySelector('.landing__form-find').querySelector('.date__arrival');
let buttomDeparture = document.querySelector('.landing__form-find').querySelector('.date__departure');

let calendar_day;

buttomArrival.onclick = openCalendar;
buttomDeparture.onclick = openCalendar;

function openCalendar(){
  if (!document.querySelector('.landing__calendar')) {
    let message = createMessageUnder(this, "hello");
    document.body.append(message);
    //let today = new Date();
    document.body.querySelector('.calendar__content-days').caldays(new Date());
    document.body.querySelector('.calendar__content-weeks').calweeks();
    //document.querySelector('.landing__calendar').querySelector('.head__item').addEventListener("click", checkCalendarLeaf);
    document.querySelector('.calendar__head').addEventListener('click', checkCalendarLeaf);
    document.querySelector('.calendar__content-days').addEventListener('click', checkDay);
    } else {
    document.querySelector('.landing__calendar').remove();
    calendarLeafDate= new Date();
  };
};

function checkCalendarLeaf(event){
  //if (document.querySelector('.landing__calendar')) {
  //calendarCounter += m;
  //calendarCounter = 1;
  if (event.target.innerHTML == "arrow_back") {
    calendarLeaf(-1);
  } else if (event.target.innerHTML == "arrow_forward") {
    calendarLeaf(1);
  };
  //calendarLeaf();
  //alert(event.target.innerHTML);
  //document.querySelector('.landing__calendar').querySelector('.head__item').onclick = calendarLeaf;
  //};
};

function setCheckedTime(sourceDate) {
  let date = new Date();
  date.setFullYear(sourceDate.getFullYear());
  date.setMonth(sourceDate.getMonth());
  date.setDate(event.target.innerHTML);
  return date;
}

let checkDayCounter=1;

let arrivalDate = new Date();
let departureDate = new Date();
function checkDay(event){
  //alert(event.target.innerHTML);
  let  days = document.querySelector('.calendar__content-days');
  event.target.classList.add('checked');
  //alert (event.target.innerHTML);
  switch (checkDayCounter){
    case 2:
      departureDate = new Date(+event.target.getAttribute('value'));
      //alert(departureDate);
      //alert(event.target.getAttribute('value'));
      if (departureDate < arrivalDate) {
        document.querySelector('.date__departure').querySelector('.drop__form').innerHTML = `${arrivalDate.getDate()+":"+(arrivalDate.getMonth()+1)+":"+arrivalDate.getFullYear()}`;
        document.querySelector('.date__arrival').querySelector('.drop__form').innerHTML = `${departureDate.getDate()+":"+(departureDate.getMonth()+1)+":"+departureDate.getFullYear()}`;
      } else {
        document.querySelector('.date__departure').querySelector('.drop__form').innerHTML = `${departureDate.getDate()+":"+(departureDate.getMonth()+1)+":"+departureDate.getFullYear()}`;
      };
      //alert (departureDate);
      let firstChecked = days.querySelectorAll('.checked')[0];
      let secondChecked = days.querySelectorAll('.checked')[1];
      if (secondChecked == undefined && arrivalDate < departureDate){
        firstChecked = days.querySelector('p');
        secondChecked = days.querySelectorAll('.checked')[0];
      } else if (secondChecked == undefined && arrivalDate > departureDate){
        firstChecked = days.querySelectorAll('.checked')[0];
        secondChecked = days.querySelectorAll('p')[34];
      };
      for (let i=0; i<36; i++) {
        if (days.querySelectorAll('p')[i] == firstChecked) {
          //document.querySelector('.calendar__content-days').querySelectorAll('p')[i].classList.add('slider');
          days.querySelectorAll('div')[i].style.boxShadow = 'inset 20px 0px #fff';
          for (let n=i; n<36; n++) {
            days.querySelectorAll('div')[n].classList.add('slider');
            if (days.querySelectorAll('p')[n] == secondChecked) {
              //alert(secondChecked);
              days.querySelectorAll('div')[n].style.boxShadow = 'inset -20px 0px #fff';
              break;
            };
          };
        };
      };
      //alert(event.target.nodeName);
      break;
    case 3:
      arrivalDate = setCheckedTime(calendarLeafDate);
      //alert (arrivalDate);
      for (item of days.querySelectorAll('.checked')) {
        //alert(event.target.innerHTML);
        item.classList.remove('checked');
        item.parentElement.style.boxShadow = 'none';
      };
      for (item of days.querySelectorAll('.slider')) {
        //alert(event.target.innerHTML);
        item.classList.remove('slider');
      };
      document.querySelector('.date__arrival').querySelector('.drop__form').innerHTML = "ДД:ММ:ГГГГ";
      document.querySelector('.date__departure').querySelector('.drop__form').innerHTML = "ДД:ММ:ГГГГ";
      checkDayCounter = 1;
      event.target.classList.add('checked');
    case 1:
      arrivalDate = new Date(+event.target.getAttribute('value'));
      //alert (arrivalDate);
      document.querySelector('.date__arrival').querySelector('.drop__form').innerHTML = `${arrivalDate.getDate()+":"+(arrivalDate.getMonth()+1)+":"+arrivalDate.getFullYear()}`;
      break;
    default:
      checkDayCounter = 1;
      break;
  };
  checkDayCounter++;
  //if (checkDayCounter == 2) {
  //  for (item of document.querySelector('.calendar__content-days').querySelectorAll('.checked')) {
  //    //alert(event.target.innerHTML);
  //    item.classList.remove('checked');
  //  };
  //  checkDayCounter = 0;
  //};
};


//alert(calendar_day);
//calendar_day.onclick = checkedDay;

// Использование:
// добавим сообщение на страницу на 5 секунд
//let message = createMessageUnder(buttom);
//document.body.append(message);
//buttom.onclick.append(message);

//let message = createMessageUnder(buttom);
//document.body.append(message);

//let landText = function() {
//  if (!document.querySelector('.landing__text').getAttribute('hidden')) {
//      document.querySelector('.landing__text').setAttribute('hidden', 'true');
//      alert('buttom is hiden' + document.querySelector('.landing__text').getAttribute('hidden'));
//  } else {
//    document.querySelector('.landing__text').removeAttribute('hidden');
//    alert('buttom is not hiden' + document.querySelector('.landing__text').getAttribute('hidden'));
//  };
//};

//buttom.onclick = function(){
//  buttom.classList.toggle('hidden');
//};
