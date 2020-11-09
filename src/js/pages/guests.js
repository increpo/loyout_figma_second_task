let buttom = document.querySelector('.find__guests').querySelector('.drop__main');

buttom.addEventListener('click', openGuestsChoice);

function openGuestsChoice(){
  if (!document.querySelector('.guests__choice')) {
    let message = createMessageUnder(buttom = this, divClass = 'guests__choice');
    document.body.append(message);
    createGuestsChoice();
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

function createGuestsChoice() {
  document.querySelector('.guests__choice').guests();
};

let adults = 1;
let childrens = 0;
let babies = 0;


Element.prototype.guests = function(){
  this.insertAdjacentHTML("afterbegin", `
    <div class="find__guests" style="width: 286px; margin-top: 0;">
      <div class="drop__main open" style="background: white;">
        <div class="drop__form">Сколько гостей</div>
        <div class="drop__menu">keyboard_arrow_down</div>
      </div>
      <div class="drop__items" style="background: white;">
        <div class="drop__item">
          <div class="item-text">взрослые</div>
          <div class="item-minus">-</div>
          <div class="item-number">${adults}</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__item">
          <div class="item-text">дети</div>
          <div class="item-minus">-</div>
          <div class="item-number">${childrens}</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__item">
          <div class="item-text">младенцы</div>
          <div class="item-minus">-</div>
          <div class="item-number">${babies}</div>
          <div class="item-plus">+</div>
        </div>
        <div class="drop__decision"><div class="decision-clr">очистить</div><div class="decision-apply">применить</div></div></div>
      </div>
  `);
};
