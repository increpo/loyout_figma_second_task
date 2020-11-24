import {FormDrop} from '../mixins/formDrop';
import {createMessageUnder} from '../mixins/createMessage.js';


if (document.querySelector('.searchRoom')) {
	document.querySelector('.menu__facilities').querySelector('.drop__main').addEventListener('click', menuFacilities);
	document.body.firstElementChild.addEventListener('click', eventHendler);

	let content = {
		items: [
			{item: 'спальни', number: 2},
			{item: 'кровати', number: 2},
			{item: 'ванные комнаты', number: 0},
		],
		//clear: 'clear',
		//apply: 'apply',
	};

	let menu = new FormDrop('menu__facilities', content);

	function menuFacilities() {
		//alert(event.currentTarget.className);
		menu.openMenu();
		//event.stopPropagation()
	};

	function eventHendler() {
		menu.removeMenuConteiner();
	};

}