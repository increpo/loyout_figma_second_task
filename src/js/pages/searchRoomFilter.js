import {FormDrop} from '../mixins/formDrop';
import {CheckList} from '../mixins/checkList';
import {createMessageUnder} from '../mixins/createMessage.js';


if (document.querySelector('.searchRoom')) {
	document.querySelector('.menu__facilities').querySelector('.drop__main').addEventListener('click', menuFacilitiesHandler);
	document.querySelector('.menu__additional').querySelector('.check__menu').addEventListener('click', menuAdditionalHandler);
	document.body.firstElementChild.addEventListener('click', eventHendler);

	let menuFacilitiesContent = {
		items: [
			{item: 'спальни', number: 2},
			{item: 'кровати', number: 2},
			{item: 'ванные комнаты', number: 0},
		],
		//clear: 'clear',
		//apply: 'apply',
	};

	let menuFacilities = new FormDrop('menu__facilities', menuFacilitiesContent);

	function menuFacilitiesHandler() {
		//alert(event.currentTarget.className);
		menuFacilities.openMenu();
		//event.stopPropagation()
	};

	let menuAdditionalContent = {
		//title: 'дополнительные удобства',
		//menu: 'keyboard_arrow_down',
		items: [{text : 'Завтрак'},
				{text : 'Письменный стол', check: 'check'},
				{text : 'стул для кормления', check: 'check'},
				{text : 'кроватка'},
				{text : 'телевизор', check: 'check'},
				{text : 'шампунь'},
				{text : 'телевизор'},
				{text : 'шампунь', check: 'check'}]
	};

	let menuAdditional = new CheckList('menu__additional', menuAdditionalContent);

	function menuAdditionalHandler() {
		menuAdditional.openMenu();
	}

	function eventHendler() {
		menuFacilities.removeMenuConteiner();
		menuAdditional.removeMenuConteiner();
	};

}