import {createMessageCenter} from '../mixins/createMessageCenter.js';

export {EnterCard};

class EnterCard {
	constructor(page_name, class_name, content) {
		this.class_name = class_name;
		this.content = content;
		this.page_name = page_name;
	}

	openCard() {
		if(!document.querySelector(`.${this.class_name}-open`)) {
			this.createCardConteiner();
			//alert('hi');
			event.stopPropagation();
		} else {
			this.removeCardConteiner();
		}
	}

	removeCardConteiner() {
		if(document.querySelector(`.${this.class_name}-open`)) {
			document.querySelector(`.${this.class_name}-open`).remove();
		}
	}

	createCardConteiner(){
		//alert('createCardCenter()');
		let message = createMessageCenter(`${this.page_name}`, `${this.class_name}-open`, 150, 130);
		message.append(this.createCardContentConteiner(this.content));
		document.body.append(message);
	}

	createCardContentConteiner(content) {
		let cardConteiner = document.createElement('div');
		cardConteiner.className = `${this.class_name}`;
		cardConteiner.innerHTML = `
						<div class="enter">
							<div class="enter__head">Войти</div>
							<div class="enter__form-email">
								<div class="drop__main">
									<div class="drop__form">Email</div>
								</div>
							</div>
							<div class="enter__form-pass">
								<div class="drop__main">
									<div class="drop__form">Пароль</div>
								</div>
							</div>
							<div class="enter__btn-enter">
								<div class="button__item">
									<div class="item__text">войти </div>
									<div class="item__icon">arrow_forward</div>
								</div>
							</div>
							<div class="enter__accaunt">
								<div class="accaunt__info">Нет аккаунта на Toxin?</div>
								<div class="accaunt__btn-create bord">
									<div class="button__item">
										<div class="item__text">создать</div>
									</div>
								</div>
							</div>
						</div>`;
		//cardConteiner.append(this.createCardContent(content));
		//document.querySelector(`.${this.class_name}-open`).append(cardConteiner);

		return cardConteiner;
	}
}