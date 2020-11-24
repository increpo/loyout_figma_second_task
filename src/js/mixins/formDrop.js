import {createMessageUnder} from '../mixins/createMessage.js';

export {FormDrop};

let content = {
		title: 'title666',
		desc: 'description666',
		form: 'form',
		menu: 'menu',
		items: [
			{item: 'item666', number: 8},
			{item: 'item777', number: 0},
		],
		clear: 'clear',
		apply: 'apply',
		slider: 1,
		comment: 'it is sliders comment',
		paginationLastNum: 15,
		comment: 'it is paginations comment',
};

let secondContent = 0;

class FormDrop {
	constructor(class_name, content) {
		this.class_name = class_name;
		this.content = content;
		//this.events = events;
	}

	openMenu() {
		if (!document.querySelector(`.${this.class_name}-drop`)) {
			this.createMenuConteiner();
			event.stopPropagation()
		} else {
			this.removeMenuConteiner();
			//event.stopPropagation()
		}
	}
	removeMenuConteiner() {
		if (document.querySelector(`.${this.class_name}-drop`)) {
			document.querySelector(`.${this.class_name}-drop`).remove();
			document.querySelector(`.${this.class_name}`).querySelector('.drop__main').classList.remove('open');
		}
	}

	createMenuConteiner(){
		if (secondContent){
			this.content=secondContent;
		};
		//alert(secondContent);
		//this.content = content;
		let message = createMessageUnder(event.currentTarget, `${this.class_name}-drop`, '', 0);
		document.body.append(message);

		document.querySelector(`.${this.class_name}-drop`).append(this.createDropConteiner(this.content));
		//alert(document.querySelector(`.${this.class_name}`).parentElement);
		document.querySelector(`.${this.class_name}`).querySelector('.drop__main').classList.add('open');

		this.itemEvents();
	}

	createDropConteiner(content) {
		let fragment = new DocumentFragment();

		let dropConteiner = document.createElement('div');
		dropConteiner.className = this.class_name;
		let eventStyle = getComputedStyle(event.currentTarget);
		//alert(eventStyle.borderWidth);
		dropConteiner.style.width = ((parseFloat(eventStyle.width) + parseFloat(eventStyle.borderWidth)*2)+"px");
		dropConteiner.style.background = 'white';
		dropConteiner.style.margin = 0;
		dropConteiner.append(this.createFormDrop(content));
		fragment.append(dropConteiner);

		return fragment;
	}

	createFormDrop(content) {
		this.content = content;
		let fragment = new DocumentFragment();

		// let dropConteiner = document.createElement('div');
		// 	dropConteiner.className = this.class_name;
		// 	let eventStyle = getComputedStyle(event.currentTarget);
		// 	//alert(eventStyle.borderWidth);
		// 	dropConteiner.style.width = ((parseFloat(eventStyle.width) + parseFloat(eventStyle.borderWidth)*2)+"px");
		// 	dropConteiner.style.background = 'white';
		// 	dropConteiner.style.margin = 0;
			
		// 	fragment.append(dropConteiner);

		if (this.content.title || this.content.desc){
			let head = document.createElement('div');
			head.className = 'drop__head';
			
			head.innerHTML = `<div class='drop__title'>${this.content.title}</div>
									<div class='drop__desc'>${this.content.desc}</div>`;

			fragment.append(head);
		};

		if (this.content.form) {
			let dropMain = document.createElement('div');
			let condition = (this.content.items) ? 'open' : '';
			dropMain.className = `drop__main ${condition}`;

			dropMain.innerHTML = `<div class='drop__form'>${this.content.form}</div>
										<div class='drop__menu'>${this.content.menu}</div>`;
			fragment.append(dropMain);
		};

		if (this.content.items) {
			let itemsConteiner = document.createElement('div');
			itemsConteiner.className = 'drop__items';
			let itemNumberSumm = 0;

			for (let item in this.content.items) {
				//alert(this.content.items[item].item);
				let itemContent = document.createElement('div');
				let light = (this.content.items[item].number == 0) ? 'light' : '';
				itemContent.className = `drop__item ${light}`;
				itemContent.innerHTML = `<div class='item-text'>${this.content.items[item].item}</div>
												<div class='item-minus'>-</div>
												<div class='item-number'>${this.content.items[item].number}</div>
												<div class='item-plus'>+</div>`;

				itemsConteiner.append(itemContent);
				itemNumberSumm += this.content.items[item].number;
			};

			if (this.content.clear || this.content.apply) {
				let decision = document.createElement('div');
				decision.className = 'drop__decision';
				decision.innerHTML = `<div class='decision-clr ${(itemNumberSumm == 0) ? '' : 'filled'}'>${this.content.clear}</div>
											<div class='decision-apply'>${this.content.apply}</div>`;
				
				itemsConteiner.append(decision);
			};

			fragment.append(itemsConteiner);
		};

		if (this.content.slider) {
			let slider = document.createElement('div');
			slider.className = 'slider';
			slider.innerHTML = `<div class='line'></div>
										<div class='rangeLine'></div>
										<div class='round start'></div>
										<div class='round end'></div>`;

			fragment.append(slider);
		};

		if (this.content.comment) {
			let comment = document.createElement('div');
			comment.className = 'comment';
			comment.innerHTML = this.content.comment;

			fragment.append(comment);
		};

		if (this.content.paginationLastNum) {
			let pagination = document.createElement('div');
			pagination.className = 'pagination';
			pagination.innerHTML = `<div class='pagItems'>
													<div class='pagItem pagStart'>1</div>
													<div class='pagItem pagMiddle'>2</div>
													<div class='pagItem pagMiddle'>3</div>
													<div class='pagItem pagMiddle'>...</div>
													<div class='pagItem pagMiddle'>${this.content.paginationLastNum}</div>
													<div class='pagItem pagEnd'>arrow_forward</div>
											</div>
											<div class='comment'>${this.content.comment}</div>`;
			
			fragment.append(pagination);
		}

		return fragment;
	}

	itemEvents() {
		//this.item = items;
		let items = this.content.items;
		let content = this.content;
		let class_name = this.class_name;
		let home = this;
		//document.querySelector(`.${this.class_name}-drop`).querySelectorAll('.drop__item')[item].addEventListener('click', function(){itemHandler(item, cont);});
		if (this.content.items) {
			for (let item in this.content.items) {
				document.querySelector(`.${this.class_name}-drop`).querySelectorAll('.drop__item')[item].addEventListener('click', function(){itemHandler(item);});
			};
			if (this.content.clear || this.content.apply) {
				document.querySelector(`.${this.class_name}-drop`).querySelector('.drop__decision').addEventListener('click', function(){decisionHandler()});
			};
		};

		function decisionHandler(){
			//alert(event.target.className);
			if (event.target.classList.contains('decision-clr')) {
				for (let item in content.items) {
					content.items[item].number = 0;
				};
				render(home);
			};
			if (event.target.classList.contains('decision-apply')){
				home.openMenu();
				//alert(home.content.items[0].number);
			};
		};
		//itemHandler(this.item, cont);
		function itemHandler(item) {
			//let items = this.content.items;
			//alert(items[item].number);
			if (event.target.innerHTML == '-') {
				items[item].number = (items[item].number == 0) ? 0 : items[item].number-1;
				//alert(content.items[0].item);
			};
			if (event.target.innerHTML == '+') {
				items[item].number = (items[item].number == 99) ? 99 : items[item].number+1;
				//alert(content.items[0].item);
			};

			//cont.content = content;
			secondContent = content;
			render(home);
			updateMainForm();
		}

		function updateMainForm(){
			let text = '';
			let i = 0;
			for (let item in items) {
				if (content.items[item].number) {
					switch (i) {
						case 0:
							text = text + `${content.items[item].number} ${content.items[item].item}`;
							break;
						case 1:
							text = text + `, ${content.items[item].number} ${content.items[item].item}`;
							break;
						case 2:
							text = text + `, ...`;
							break;
					};
					//alert('item:' + item + "i:" + i);
					i += 1;
				};
			};
			//alert(text);
			document.querySelector(`.${home.class_name}`).querySelector('.drop__form').innerHTML = (text) ? text : 'Сделайте свой выбор';
		}

		function render(home) {
			//alert(event.target.parentElement);
			document.querySelector(`.${class_name}-drop`).querySelector(`.${class_name}`).innerHTML = '';
			document.querySelector(`.${class_name}-drop`).querySelector(`.${class_name}`).append(home.createFormDrop(content));
			//alert(content.items[0].item);
			updateMainForm();
			home.itemEvents();
		}
		//alert(this.secondContent);
	}
}