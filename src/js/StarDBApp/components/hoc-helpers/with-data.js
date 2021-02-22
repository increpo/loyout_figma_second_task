import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import Spiner from '../spiner';
import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';

const withData = (View, getData) => {
  return class extends Component {
    constructor(){
      super();
      this.state = {
        data: null,
        error: false,
      };
    };

    componentDidMount(){

      getData().then(
                  (data)=>{ 
                      this.setState( { data } );
                  } )
              .catch((err)=>{this.onError(err)});

      this.onError = (err)=> {
        this.setState({error: true,});
        console.log('Das ist error');
      };
    };

    render(){
      const {error, data} = this.state;
      const errorMessage = error ? <ErrorIndicator/> : null;
      if (!data){ return <div><Spiner/> {errorMessage}</div>};

      return <View {...this.props} data={data} />
    }

  };
};

export default withData;