import React, { Component } from 'react';
import Spiner from '../spiner';
import ErrorIndicator from '../error-indicator';
import './random-planet.css';

import SwapiService from '../../services/swapi-service';

export default class RandomPlanet extends Component {
  constructor(){
    super();
    this.swapiService = new SwapiService();
    this.state = {
      planet: {},
      loading: true,
      error: false,
    };
  };

  componentDidMount(){
    console.log('componetnDidMount()');

    this.onPlanetLoaded = (planet) => {
      this.setState({planet,
                    loading: false,
                    error: false,});
    };

    this.onError = (err) => {
      this.setState({error: true,
                  loading: false,});
    };

    this.updatePlanets = ()=>{
      const id = Math.round(Math.random()*24)+3;
      this.swapiService.getPlanet(id)
        .then((planet)=>{this.onPlanetLoaded(planet)})
        .catch((err) => {this.onError(err)});
      //console.log('this.updatePlanets()');
    };

    //console.log('constructor()');

    this.updatePlanets();
    this.interval = setInterval(()=>this.updatePlanets(), 5000);
  };


  componentWillUnmount(){
    clearInterval(this.interval);
  };

  render() {
    //console.log('render()');
    const {planet, loading, error} = this.state;
    const hasData = !(loading || error);
    const spiner = loading ? <Spiner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;
    const errorMessage = error ? <ErrorIndicator/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spiner}
        {content}
        {errorMessage}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const { id,
          name,
          population,
          rotationPeriod,
          diameter,
        } = planet;
  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
