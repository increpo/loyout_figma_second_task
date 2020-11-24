import {createMessageUnder} from '../mixins/createMessage.js';

if (document.querySelector('.landing__content')){
  document.querySelector('.landing__content').addEventListener('click', guestsToggle);
};

function guestsToggle(){
  if ((!event.target.closest('.drop__main'))
    && (document.querySelector('.guests__choice'))) {
      document.querySelector('.guests__choice').remove();
  };
};

if (document.querySelector('.find__guests')){
  let buttom = document.querySelector('.find__guests').querySelector('.drop__main');

  buttom.addEventListener('click', openGuestsChoice);
};


function openGuestsChoice(){
  if (!document.querySelector('.guests__choice')) {
    let message = createMessageUnder(event.currentTarget, 'guests__choice', 'top');
    document.body.append(message);
    createGuestsChoice();
    guests_events();
    } else {
    document.querySelector('.guests__choice').remove();
  };
};

let adults = 0;
let childrens = 0;
let babies = 0;

let guests_message = function() {
  switch (adults + childrens + babies) {
    case 0:
      return "Сколько гостей";
      break;
    case 1:
      return `${adults + childrens + babies} гость`;
      break;
    case 100:
      return `${adults + childrens + babies} гостей`;
      break;
    default:
      return `${adults + childrens + babies} гостя`;
  };
};

function createGuestsChoice() {
  document.querySelector('.guests__choice').guests();
};

Element.prototype.guests = function(){
  this.insertAdjacentHTML("afterbegin", `
    <div class="find__guests" style="width: 286px; margin-top: 0;">
      <div class="drop__main open" style="background: white;">
        <div class="drop__form">Сколько гостей</div>
        <div class="drop__menu">keyboard_arrow_down</div>
      </div>
      <div class="drop__items" style="background: white;">
        <div class="drop__item light">
          <div class="item-text">взрослые</div>
          <div class="item-minus">-</div>
          <div class="item-number">0</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__item light">
          <div class="item-text">дети</div>
          <div class="item-minus">-</div>
          <div class="item-number">0</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__item light">
          <div class="item-text">младенцы</div>
          <div class="item-minus">-</div>
          <div class="item-number">0</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__decision"><div class="decision-clr">очистить</div><div class="decision-apply">применить</div></div></div>
      </div>
  `);
  render();
};

function guests_events(){
  for (let i=0; i<3; i++){
    document.querySelector('.guests__choice').querySelectorAll('.drop__item')[i].addEventListener('click', guests_select);
  };
  //document.querySelector('.guests__choice').querySelectorAll('.drop__item')[0].addEventListener('click', guests_select);
  //document.querySelector('.guests__choice').querySelector('.drop__item')[1].addEventListener('click', guests_select);
  //document.querySelector('.guests__choice').querySelector('.drop__item')[2].addEventListener('click', guests_select);
  document.querySelector('.guests__choice').querySelector('.decision-clr').addEventListener('click', decisions);
//  render();
  document.querySelector('.guests__choice').querySelector('.decision-apply').addEventListener('click', guestsToggle);
  document.querySelector('.guests__choice').querySelector('.drop__main').addEventListener('click', menuToggle);
};

function menuToggle() {
  if (document.querySelector('.guests__choice')) {
      document.querySelector('.guests__choice').remove();
  };
};

function guests_select() {
  //alert(`${event.target.innerHTML}`);
  switch (event.target.parentElement.firstElementChild.innerHTML){
    case 'взрослые':
      adults=guests_calc(adults);
      break;
    case 'дети':
      childrens=guests_calc(childrens);
      break;
    case 'младенцы':
      babies=guests_calc(babies);
      break;
  };
  render();
  //guests_events();
};

function guests_calc(guest){
  switch (event.target.innerHTML){
    case '-':
      guest = (guest == 0) ? 0 : guest-1;
      break;
    case '+':
      guest = (guest == 99) ? 99 : guest+1;
      break;
  };
  event.target.parentElement.children[2].innerHTML = guest;
  return guest;
};

function borders_control() {
  for (let i=0; i<3; i++){
    if (document.querySelector('.guests__choice').querySelectorAll('.drop__item')[i].children[2].innerHTML == 0) {
      document.querySelector('.guests__choice').querySelectorAll('.drop__item')[i].classList.add('light');
    } else {
      document.querySelector('.guests__choice').querySelectorAll('.drop__item')[i].classList.remove('light');
    };
  };
};

function render(){
  //alert(document.querySelector('.guests__choice').querySelector('.drop__main').querySelector('.drop__form').innerHTML);
  document.querySelector('.guests__choice').querySelector('.drop__main').querySelector('.drop__form').innerHTML = guests_message();
  document.querySelector('.find__guests').querySelector('.drop__form').innerHTML = guests_message();
  numbers_control();
  if (adults+childrens+babies > 0) {
    document.querySelector('.guests__choice').querySelector('.decision-clr').classList.add('filled');
  } else {
    document.querySelector('.guests__choice').querySelector('.decision-clr').classList.remove('filled');
  };
  borders_control();
};

function numbers_control(){
  for (let i=0; i<3; i++){
    let itemNumber = document.querySelector('.guests__choice').querySelectorAll('.drop__item')[i].children[2];
    switch (i){
      case 0:
        itemNumber.innerHTML = adults;
        break;
      case 1:
        itemNumber.innerHTML = childrens;
        break;
      case 2:
        itemNumber.innerHTML = babies;
        break;
    };
  };
};

function decisions(){
  //alert(event.target.className);
  switch (event.target.className){
    case 'decision-clr filled':
      adults=childrens=babies=0;
      render();
  };
};
