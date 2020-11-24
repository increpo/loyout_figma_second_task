export {createMessageUnder};


function createMessageUnder(buttom, divClass, style, space) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  message.classList.add(divClass);
  //message.innerHTML = "goodmorning";
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:absolute";
  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = getCoords(buttom, space);
  //let coords = buttom.getBoundingClientRect();
  message.style.left = coords.left + "px";
  style == 'top' ? message.style.top = coords.top + "px" : message.style.top = coords.bottom + "px";
  //message.style.top = coords.top + "px";

  return message;
}

// получаем координаты элемента в контексте документа
function getCoords(buttom, space) {
  let box = buttom.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset+space,
  };
}



