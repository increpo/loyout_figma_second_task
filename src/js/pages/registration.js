import {RegistrationCard} from '../mixins/registrationCard.js';
import {EnterCard} from '../mixins/enterCard.js';

if (document.querySelector('.accaunt__btn-registration')){
	document.querySelector('.accaunt__btn-registration').addEventListener('click', registrationHandler);
};

if (document.querySelector('.accaunt__btn-enter')){
	document.querySelector('.accaunt__btn-enter').addEventListener('click', enterHandler);
};

document.querySelector('.wrapper__pages').addEventListener('click', bodyHandler);

let content = {};

let registration = new RegistrationCard('registration', 'registration__card', content);
function registrationHandler() {
	registration.openCard();
	enterCard.removeCardConteiner();
}

let enterCard = new EnterCard('registration', 'enter__card', content);
function enterHandler() {
	enterCard.openCard();
	registration.removeCardConteiner();
}


function bodyHandler() {
	enterCard.removeCardConteiner();
	registration.removeCardConteiner();
}