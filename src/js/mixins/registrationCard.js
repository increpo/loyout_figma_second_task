import {createMessageCenter} from '../mixins/createMessageCenter.js';

export {RegistrationCard};

class RegistrationCard {
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
		let message = createMessageCenter(`${this.page_name}`, `${this.class_name}-open`, 150, 230);
		message.append(this.createCardContentConteiner(this.content));
		document.body.append(message);
	}

	createCardContentConteiner(content) {
		let cardConteiner = document.createElement('div');
		cardConteiner.className = `${this.class_name}`;
		cardConteiner.innerHTML = ` 
					<div class="registration">
						<div class="registration__head">Регистрация аккаунта</div>
						<div class="registration__form-name">
							<div class="drop__main">
								<div class="drop__form">Имя</div>
							</div>
						</div>
						<div class="registration__form-surname">
							<div class="drop__main">
								<div class="drop__form">Фамилия</div>
							</div>
						</div>
						<div class="registration__check">
							<div class="registration__check-icon checked"></div>
							<div class="registration__check-text checked">мужчина</div>
							<div class="registration__check-icon"></div>
							<div class="registration__check-text">женщина</div>
						</div>
						<div class="registration__birthday">
							<div class="drop__head">
								<div class="drop__title">дата рождения</div>
							</div>
							<div class="drop__main">
								<div class="drop__form">ДД.ММ.ГГГГ</div>
							</div>
						</div>
						<div class="registration__enter__data">
							<div class="drop__head">
								<div class="drop__title">данные для входа в сервис</div>
							</div>
							<div class="drop__main">
								<div class="drop__form">Email</div>
							</div>
						</div>
						<div class="registration__pass">
							<div class="drop__main">
								<div class="drop__form">Пароль</div>
							</div>
						</div>
						<div class="registration__offers">
							<div class="offers__toggle">
								<div class="offers__toggle-item"></div>
							</div>
							<div class="offers__text">Получать спецпредложения</div>
						</div>
						<div class="registration__button__pay">
							<div class="button__item">
								<div class="item__text">Перейти к оплате</div>
								<div class="item__icon">arrow_forward</div>
							</div>
						</div>
						<div class="registration__enter">
							<div class="registration__enter__info">Уже есть аккаунт на Toxin</div>
							<div class="registration__enter__btn bord">
								<div class="button__item">
									<div class="item__text">войти</div>
								</div>
							</div>
						</div>
					</div>`;
		//cardConteiner.append(this.createCardContent(content));
		//document.querySelector(`.${this.class_name}-open`).append(cardConteiner);

		return cardConteiner;
	}
}