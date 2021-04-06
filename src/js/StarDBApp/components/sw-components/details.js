import React, {Component} from 'react';
import ItemDetails, {Record} from '../item-details';
import {SwapiServiceConsumer} from '../swapi-service-context';

const PersonDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({getPerson, getPersonImage}) => {
					return (
						<ItemDetails
								itemId={itemId}
								getData= {getPerson}
								getImageURL={getPersonImage}
						>
							<Record field='gender' label='Gender: '/>
							<Record field='eyeColor' label='Eye Color: ' />
						</ItemDetails>
					)
				}
			}
		</SwapiServiceConsumer>
	);
};

const StarshipDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({ getStarship, getStarshipImage }) => {
					return (
						<ItemDetails 
								itemId={itemId}
								getData= {getStarship}
								getImageURL={getStarshipImage}
						>
							<Record field='model' label='Model: '/>
							<Record field='starshipClass' label='Starship Class: '/>
							<Record field='costInCredits' label='Cost: '/>
							<Record field='length' label='Length: '/>
						</ItemDetails>
					)
				}
			}
		</SwapiServiceConsumer>
	);
};

const PlanetDetails = ({itemId}) => {
	return (
		<SwapiServiceConsumer>
			{
				({ getPlanet, getPlanetImage }) => {
					return (
						<ItemDetails 
								itemId={itemId}
								getData= {getPlanet}
								getImageURL={getPlanetImage}
						>
							<Record fields='climate' label='Climete' />
						</ItemDetails>
					)
				}
			}
		</SwapiServiceConsumer>
	);
};


export {
	PersonDetails,
	PlanetDetails,
	StarshipDetails,
};