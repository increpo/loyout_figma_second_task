//import '../components/bootstrap.min.css';
export default class SwapiService {
	constructor() {
		this._apiBase = 'https://swapi.dev/api';
		this._imageBase = 'https://starwars-visualguide.com/assets/img';

		this.getResource = async (url) => {
			const res = await fetch(`${this._apiBase}${url}`);
			//console.log(this._apiBase);

			if (!res.ok){
				throw new Error(`Could not Fetch ${url}` 
					+ `, received ${res.status}`);
			};
			const body = await res.json();

			return body;
		};


		this.getAllPeople = async () => {
			const people = await this.getResource(`/people/`);
			return people.results.map(
					(people)=>{ return this._transformPerson(people) }
				);
		};

		this.getPerson = async (id) => {
			const person = await this.getResource(`/people/${id}/`);
			return this._transformPerson(person);
		};
	
		this.getAllPlanets = async () => {
			const planets = await this.getResource('/planets/');
			return planets.results.map(
					(planets)=>{ return this._transformPlanet(planets) }
				);
		}

		this.getPlanet = async (id) => {
			const planet = await this.getResource(`/planets/${id}/`);
			return this._transformPlanet(planet);
		}

		this.getAllStarships = async () => {
			const starships = await this.getResource('/starships/');
			return starships.results.map(
					(starships)=>{ return this._transformStarship(starships) }
				);
		};

		this.getStarship = async (id) => {
			const starship = await this.getResource(`/starships/${id}/`);
			return this._transformStarship(starship);
		};

		this._extractId = (item) => {
			const idRegExp = /\/([0-9]*)\/$/;
			const id = item.url.match(idRegExp)[1];
			return id;
		}

		this._transformPlanet = (planet) => {
			return {
					id: this._extractId(planet),
					name: planet.name,
					population: planet.population,
					rotationPeriod: planet.rotation_period,
					diameter: planet.diameter,
					climate: planet.climate,
			};
		};

		this._transformStarship = (starship) => {
			return {
				id: this._extractId(starship),
				name: starship.name,
				model: starship.model,
				manufacturer: starship.manufacturer,
				costInCredits: starship.cost_in_credits,
				length: starship.length,
				crew: starship.crew,
				passengers: starship.passengers,
				cargoCapacity: starship.cargo_capacity,
				starshipClass: starship.starship_class,
			};
		};

		this._transformPerson = (person) => {
			return {
				id: this._extractId(person),
				name: person.name,
				gender: person.gender,
				birthYear: person.birth_year,
				eyeColor: person.eye_color,
			};
		};

		this.getPersonImage = ({id}) => {
			return `${this._imageBase}/characters/${id}.jpg`;
		};

		this.getPlanetImage = ({id}) => {
			return `${this._imageBase}/planets/${id}.jpg`;
		}

		this.getStarshipImage = ({id}) => {
			return `${this._imageBase}/starships/${id}.jpg`;
		}
	}
};

//const swapi = new SwapiService();

// swapi.getAllPeople().then((body)=>{
// 	console.log(body);
// 	//document.body.outerHTML+=`<ul>${body.map((el)=>{return `<li>${el.name}</li>`})}</ul>`;
// 	body.forEach((el)=>{document.body.querySelector('.starDBApp').outerHTML+= `<li>${el.name}</li>`});
// });

// swapi.getPerson(4).then((person)=>{
// 	document.body.outerHTML += `<div>The forth person is: ${person.name}</div>`;
// 	console.log(person);
// });

// swapi.getAllPlanets().then((planets)=>{
// 	const element = document.createElement('ol');
// 	element.className='planet-list';
// 	element.innerHTML = 'Planet list: ';

// 	planets.forEach((planet)=>{
// 		element.innerHTML += `<li>${planet.name}</li>`;
// 	});
// 	document.body.append(element);
// });

// swapi.getPlanet(5).then((planet)=>{
// 	document.body.innerHTML += `<button type='button'>The 5th planet is: ${planet.name}</button>`;
// })

// swapi.getAllStarships().then((starships)=>{
// 	const element = document.createElement('ul');
// 	element.className='starships-list';
// 	element.innerHTML = 'Starship list: '
// 	starships.forEach((starship)=>{
// 		element.innerHTML+=`<li>${starship.name}</li>`;
// 	});
// 	document.body.append(element);
// });

// swapi.getStarship(5).then((starship)=>{
// 	document.body.innerHTML += `<input placeholder=${starship.name}>`;
// })
