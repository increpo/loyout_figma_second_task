import SwapiService from '../../services/swapi-service.js';
import React, {Component} from 'react';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
//import PlanetDetails from '../planet-details';
//import StarshipDetails from '../starship-details';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import Spiner from '../spiner';
//import PeoplePage from '../people-page';
import ItemDetails, {Record} from '../item-details/item-details';
//import ItemList from '../item-list';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
//import {withData} from '../hoc-helpers';
import {PersonList, PlanetList, StarshipList,
				PersonDetails, PlanerDetails, StarshipDetails} from '../sw-components';
import {SwapiServiceProvider} from '../swapi-service-context';

export default class App extends Component{
	constructor(){
		super();
		this.state = {
			showRandomPlanet: true,
			hasError: false,
			selectedPerson: 4,
		};

		this.swapiService = new SwapiService();

		this.toggleRandomPlanet = () => {
			this.setState((state) => {
				return { showRandomPlanet: !state.showRandomPlanet }
			});
		};
	}

	componentDidMount(){

		this.onPersonSelected = (id)=>{
			this.setState({selectedPerson: id});
		}
	};

	componentDidCatch() {
		this.setState( {hasError: true});
		console.log('u are have an error');
	}

	render(){
		const randomPlanet = this.state.showRandomPlanet ? 
														<RandomPlanet/> : null;
		if (this.state.hasError){
			return <ErrorIndicator/>
		}

		const {selectedPerson} = this.state;


		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.swapiService}>
					<div className='star-db-app'>
						<Header />
						{randomPlanet}
						<button 
								className='toggle-planet btn btn-warning btn-lg'
								onClick={this.toggleRandomPlanet}>
								Toggle Random Planet 
						</button>
						<ErrorButton/>
						<ErrorBoundry>
							<Row 
								left={<PersonList onItemSelected={this.onPersonSelected}/>}
								right={<PersonDetails itemId={selectedPerson}/>}
							/>
						</ErrorBoundry>

						<ErrorBoundry>
							<PlanetList 
									onItemSelected={this.onPersonSelected}/>
						</ErrorBoundry>
						<ErrorBoundry>
							<StarshipList 
									onItemSelected={this.onPersonSelected}/>
						</ErrorBoundry>
					</div>
				</SwapiServiceProvider>
			</ErrorBoundry>
		)
	}
};

const json = `{
    "displayedName": {
        "displayedName": {
            "value": [
                "Профиль маячковый ПВХ 10 мм L3м"
            ],
            "description": "Полное наименование товара для клиента"
            }
        },
    "stock": {
        "stocks": {
                "34": {
                "2": "35",
                "3": "42",
                "4": "58",
                "5": "57",
                "6": "112",
                "20": "51",
                "22": "78",
                "26": "34",
                "32": "22",
                "35": "358",
                "40": "28",
                "43": "68",
                "45": "58",
                "49": "31",
                "51": "29",
                "56": "42",
                "62": "26",
                "64": "0",
                "65": "57",
                "86": "15",
                "114": "41",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
}`;

const data = JSON.parse(json);
const productName = data.displayedName.displayedName.value[0];
const stores = data.stock.stocks[34];
//const storesWithGood = [];
//for (let key in stores){stores[key] > 0 ? storesWithGood.push(stores[key]) : null};
//const goods = [];
//storesWithGood.forEach((item)=>goods.push(parseInt(item)));
//const maxGood = Math.max(...goods);

//let storeMaxGood;
const storeData=[];
for (let key in stores){ storeData.push({ store: key, goods: parseInt(stores[key]) }) };
//const storess = Object.entries(stores);
//const storessWithGood = storess.map(({key, value})=>value>0);
//console.log(result);
const storesWithGood = [];
storeData.forEach(({store, goods})=> { goods > 0 ? storesWithGood.push(store): null });
let maxGood = 0;
storeData.forEach( ({store, goods}) => {maxGood = goods > maxGood ? goods : maxGood });
const storeMaxGood = storeData.find( ({goods}) => goods === maxGood );

console.log(storeMaxGood);
//StoresWithGood();