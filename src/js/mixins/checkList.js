import {createMessageUnder} from '../mixins/createMessage.js';

export {CheckList};

//необходимо импортировать данный модуль;
// создать переменную с new Checklist,
// в качестве аргументов необходимо передать:
//		первый аргумент: класс элемента,
//			который будет вызывать появление чек-листа (кнопки),
//			так же этот класс будет использоваться в качестве основного класса 
//			самого чек-листа, так что в css файле в это классе должен быть миксин check_list
//		второй аргумент: объект content, из переменных которых и будет состоять чек-лист.
//дальше необходимо создать обработчик событий и вызвать метод openMenu();
//например :
// let menuAdditionalContent = {
// 	title: 'дополнительные удобства',
// 	menu: 'keyboard_arrow_down',
// 	items: [{text : 'Завтрак'},
// 			{text : 'Письменный стол', comment: 'some comments', check: 'check'},
// 			{text : 'стул для кормления', comment: 'some comments', check: 'check'},
// 			{text : 'кроватка', comment: 'some comments'},
// 			{text : 'телевизор', comment: 'some comments', check: 'check'},
// 			{text : 'шампунь', check: 'check'},
// 			{text : 'телевизор'},
// 			{text : 'шампунь', check: 'check'}]
// };
//let menuAdditional = new CheckList('menu__additional', menuAdditionalContent);
//	function menuAdditionalHandler() {
//		menuAdditional.openMenu();
//	}

let secondContent = 0;

class CheckList {
	constructor(class_name, content) {
		this.class_name = class_name;
		this.content = content;
	}

	openMenu() {
		if (!document.querySelector(`.${this.class_name}-drop`)) {
			this.createMenuConteiner();
			event.stopPropagation();
		} else {
			this.removeMenuConteiner();
		}
	}

	removeMenuConteiner(){
		if (document.querySelector(`.${this.class_name}-drop`)) {
			document.querySelector(`.${this.class_name}-drop`).remove();
			document.querySelector(`.${this.class_name}`).querySelector('.check__menu').classList.remove('open');
		}
	}

	createMenuConteiner() {
		let message = createMessageUnder(event.currentTarget.parentElement, `${this.class_name}-drop`, '', 0);
		message.append(this.createCheckListConteiner(this.content));
		document.body.append(message);
		document.querySelector(`.${this.class_name}`).querySelector('.check__menu').classList.add('open');
		this.checkEvents();
	}

	createCheckListConteiner(content) {
		let checkListConteiner = document.createElement('div');
		checkListConteiner.className = this.class_name;
		let eventStyle = getComputedStyle(event.currentTarget.parentElement);
		checkListConteiner.style.width = (parseFloat(eventStyle.width) + parseFloat(eventStyle.borderWidth) * 2 ) + "px";
		checkListConteiner.style.background = "white";
		checkListConteiner.style.margin = 0;
		checkListConteiner.append(this.createCheckList(content));

		return checkListConteiner;
	}

	createCheckList(content) {
		this.content = content;
		let checkListFragment = new DocumentFragment();

		if (this.content.title || this.content.menu) {
			let head = document.createElement('div');
			head.className = 'check__head';
			head.innerHTML = `<div class='check__title'>${this.content.title ? this.content.title : ''}</div>
									<div class='check__menu'>${this.content.menu ? this.content.menu : ''}</div>`;

			checkListFragment.append(head);
		}

		if(this.content.items){
			let items = document.createElement('div');
			items.className = 'check__items';

			for (let item in this.content.items){
				let itemContent = document.createElement('div');
				itemContent.className = `check__item ${this.content.items[item].check ? 'check' : ''}`;
				itemContent.innerHTML = `<div class='item-checkbox'>
														<div class='checkbox-icon'>
																<p>${this.content.items[item].check ? this.content.items[item].check : ''}</p>
													</div></div>
												<div class='item-text ${this.content.items[item].comment ? 'bold' : ''}'>${this.content.items[item].text}</div>
												<div class='item-comment'>${this.content.items[item].comment ? this.content.items[item].comment : ''}</div>`;

				items.append(itemContent);
			}

			checkListFragment.append(items);
		}

		return checkListFragment;
	}

	checkEvents() {
		let home = this;
		let items = this.content.items;

		for (let item in items) {
			document.querySelector(`.${this.class_name}-drop`).querySelectorAll('.check__item')[item].querySelector('.item-checkbox').addEventListener('click', function() {eventsHandler(item);});
		}

		function eventsHandler(item) {
			items[item].check = items[item].check ? '' : 'check';
			secondContent=home.content;
			home.render(home.content);
			//alert(item);
		}
	}

	render(content) {
		document.querySelector(`.${this.class_name}-drop`).innerHTML = '';
		document.querySelector(`.${this.class_name}-drop`).append(this.createCheckListConteiner(content));

		this.checkEvents();
	}
}