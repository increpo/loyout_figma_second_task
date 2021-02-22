import React, {Component} from 'react';
import './people-page.css';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
//import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import Row from '../row';

export default class PeoplePage extends Component {
	constructor(){
		super();
		this.state={
			selectedPerson: 3,
			hasError: false,
		}
		this.swapiService = new SwapiService();
		this.onPersonSelected = (id) => {
			this.setState({selectedPerson: id});
		}
	}

	render(){
		const itemList = (
			<ItemList 
					onItemSelected={this.onPersonSelected}
					getData = {this.swapiService.getAllPeople}>

				{ (item) => ( `Name: ${item.name}; 
											Birth Year: ${item.birthYear}`)}

			</ItemList>

		);

		const personDetails = (
			<ItemDetails itemId={this.state.selectedPerson}/>
		);

		return (
			<ErrorBoundry>
				<Row left={itemList} 
						right={personDetails} />
			</ErrorBoundry>
		);
	}
}