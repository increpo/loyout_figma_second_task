export {createMessageCenter}; 

function createMessageCenter(pageClass = document.body, divClass, spaceX, spaceY) {
	// создаём элемент, который будет содержать сообщение
	let message = document.createElement('div');
	message.classList.add(divClass);
	// для стилей лучше было бы использовать css-класс здесь
	message.style.cssText = "position:absolute";
	// устанавливаем координаты элементу, не забываем про "px"!
	let coords = getCoords(document.body.firstElementChild.children[1]);
	message.style.left = (coords.right - coords.left)/2 - spaceX + "px";
	message.style.top = (coords.bottom - coords.top)/2 - spaceY + "px";
	//message.style.top = coords.top + "px";

	return message;
}

	// получаем координаты элемента в контексте документа
function getCoords(buttom) {
	let box = buttom.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset,
		bottom: box.bottom + pageYOffset,
		right: box.right + pageXOffset,
	};
}