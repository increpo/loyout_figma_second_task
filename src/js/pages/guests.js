document.querySelector('.landing__content').addEventListener('click', guestsToggle);

function guestsToggle(){
  if ((!event.target.closest(".drop__main"))
    && (document.querySelector('.guests__choice'))) {
      document.querySelector('.guests__choice').remove();
  };
};




let buttom = document.querySelector('.find__guests').querySelector('.drop__main');

buttom.addEventListener('click', openGuestsChoice);

function openGuestsChoice(){
  if (!document.querySelector('.guests__choice')) {
    let message = createMessageUnder(buttom = this, divClass = 'guests__choice');
    document.body.append(message);
    createGuestsChoice();
    guests_events();
    } else {
    document.querySelector('.guests__choice').remove();
  };
};

function createMessageUnder(buttom, divClass) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  message.classList.add(divClass);
  //message.innerHTML = "goodmorning";
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:absolute";
  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = getCoords(buttom);
  //let coords = buttom.getBoundingClientRect();
  message.style.left = coords.left + "px";
  message.style.top = coords.top + "px";

  return message;
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

let adults = 0;
let childrens = 0;
let babies = 0;

let guests_message = function() {
  switch (adults + childrens + babies) {
    case 0:
      return `Сколько гостей`;
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
        <div class="drop__form">'Сколько гостей'</div>
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
};

function guests_events(){
  document.querySelector('.guests__choice').addEventListener('click', guests_select);
  document.querySelector('.guests__choice').querySelector('.drop__decision').addEventListener('click', decisions);
  render();
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
  guests_events();
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
  borders_control();
  document.querySelector('.find__guests').querySelector('.drop__form').innerHTML = guests_message();
  numbers_control();
  if (adults+childrens+babies > 0) {
    document.querySelector('.guests__choice').querySelector('.decision-clr').classList.add('filled');
  } else {
    document.querySelector('.guests__choice').querySelector('.decision-clr').classList.remove('filled');
  };
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
      break;
    case 'decision-apply':
      guestsToggle();
      break;
  };
  render();
};

function guests_number(){
  //alert(event.target.previousElementSibling.innerHTML);
  alert(`${event.currentTarget.firstElementChild.innerHTML}`);

   // if (event.target.previousElementSibling.innerHTML == 'младенцы'){
   //   babies = (babies == 0) ? 0 : --babies;
   //   alert(`${babies}`);
   //   //document.querySelector('.guests__choice').querySelector('.item-text').
   // };
   // if (event.target.previousElementSibling.previousElementSibling.innerHTML == 'младенцы'){
   //   alert(`${babies}`);
   // };
   //guests_events();
};
