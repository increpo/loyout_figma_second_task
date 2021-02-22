import React, { Component } from 'react';
import Spiner from '../spiner';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export {
  Record
};

export default class ItemDetails extends Component {
  constructor(){
    super();
    this.state = {
      item: null,
      showSpiner: true,
      image: null,
    };
  }

  componentDidMount(){
    this.updateItem();
  }

  updateItem() {
    const {itemId, getData, getImageURL} = this.props;
    if (!itemId) {
      return;
    };

    getData(itemId)
          .then((item)=>{ 
                this.setState({
                  item, 
                  showSpiner: false,
                  image: getImageURL(item),
                })
          })
          .catch((err) => {this.onError(err)} );

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.itemId !== prevProps.itemId){
      this.setState({showSpiner: true});
      this.updateItem();
    };
  }

  onError(){
    //this.setState({showSpiner: true,});
    return <ErrorBoundry/>;
  }

  render() {
    if(this.state.showSpiner){
      return <Spiner/>;
    };

    const {item, image} = this.state;
    return (
        <div className="item-details card">
          <img className="item-image"
            src={image} />

          <div className="card-body">
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
              {React.Children.map(this.props.children,
                (child) => {
                  return React.cloneElement(child, {item});
                })
              }
            </ul>
            <ErrorButton/>
          </div>
        </div>
    )
  }
}

