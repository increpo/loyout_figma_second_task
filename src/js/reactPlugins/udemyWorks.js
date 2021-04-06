import React from 'react';
import ReactDOM from 'react-dom';

function TodoItem(){
	return(
		<span>Drink Coffee</span>
	);
};

function TodoList(){
	return(
		<ul>
			<li><TodoItem/></li>
			<li><TodoItem/></li>
			<li><TodoItem/></li>
		</ul>
	)
}

const arr = ['1', '3', '2', '4'];
const res = arr
	.map((el) => parseInt(el))
	.filter((num) => num%2)
	.reduce((max, value) => Math.max(max, value), 0);

const person = {
	name: {
		first: 'Peter',
		last: 'Smith'
	},
	age: 17,
	role: 'admin'
};

const {first: firstName, last: lastName} = person.name;
const {permission: {surName: nameSur = 'doggi'} = {}} = person;
//const {name: {first, last}} = person;
const {role = 'user'} = person; //'user' - значеиние по умолчанию, на случай отсутвия role в массиве person
//console.log(firstName, lastName, role, nameSur);

function connect({
	host = 'locolhost',
	port = 1234,
	user = 'guest'
} = {}){
	console.log('user: ', user, 'port: ', port, 'host: ', host);
}

//connect({port: 1111});

const dict = {
	duck: 'quck',
	dog: 'wuff',
	mouse: 'squeak',
	hamster: 'squeak'
};

const {duck, ...otherAnimals} = dict;
//console.log(otherAnimals);

const rest = Object.entries(dict)
	.filter(([, value]) => value === 'squeak')
	.map(([key]) => key);

//console.log(rest);

const prefix = '_nur_';
const data = {
	[prefix + 'name']: 'Bob',
	[prefix + 'age']: 23
};

//console.log(data);

const line = [[10, 17], [14, 7]];
const [[p1x, p1y], [p2x, p2y], [t1 = 33, t2 = 44] = [55, 66]] = line;
//console.log(p1x, p1y, p2x, p2y, t1, t2);

const defaults = {
	host: 'localhost',
	dbName: 'blog',
	user: 'admin'
};

const opts = {
	user: 'John',
	password: 'utopia'
};

const newUser = Object.assign({}, defaults, opts);
const port = 8000;
const anotherUser = {
	...defaults,
	...opts,
	port,
	connect() {
		return 4+1;
	}
};

//console.log(defaults, newUser, anotherUser);

const animal = {
	say: function(){
		console.log(this.name, 'goes', this.voice);
	}
};

const dog = {
	name: 'dog',
	voice: 'woof',
};
Object.setPrototypeOf(dog, animal);//устанавливает прототип из animal в dog

const cat ={
	name: 'cat',
	voice: 'meow',
};
Object.setPrototypeOf(cat, animal);

function Animal(name, voice) {
	this.name = name;
	this.voice = voice;
};
Animal.prototype.say = function(){
	console.log(this.name, 'goes', this.voice);
};

const fox = new Animal('fox', 'firfir');

class Beast {
	constructor(name, voice){
		this.name = name;
		this.voice = voice;
	}

	say() {
		console.log(this.name, 'says', this.voice);
	}
}

class Bird extends Beast {
	constructor(name, voice, canFly){
		super(name, voice);
		//super.say();
		this.canFly = canFly;
	}

	say(){
		console.log('Birds don\'t like to talk');
	}
};

const ducks = new Bird('duck', 'quack', true);
//ducks.say();

//fox.say();
//dog.say();

class Counter {
	constructor(){
		this.count = 1;
		this.increment = () => {
			console.log(this.count += Counter.incrementStep);
		};
	};
};

Counter.incrementStep = 12;


const cnt = new Counter();
//setTimeout(cnt.increment, 1000);

document.querySelector('.react-udemy-first-element') ? ReactDOM.render(<TodoList/>, document.querySelector('.react-udemy-first-step')) : '';