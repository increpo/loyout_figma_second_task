import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
	constructor() {
		super();
		this.state = {
			label: ''
		}

		this.onLabelChange = () => {
			this.setState({label: event.target.value});
		};

		this.onSubmit = () => {
			event.preventDefault();
			this.props.onItemAdded(this.state.label);
			this.setState({label: ''});
		};
	}

	render(){
		const {onItemAdded} = this.props;
		return (
			<form className='item-add-form d-flex'
						onSubmit={this.onSubmit}>
				<input type='text'
								className='form-control'
								onChange={this.onLabelChange}
								placeholder='What needs to be done'
								value={this.state.label}/>
				<button className='btn btn-outline-secondary'>
					Add Item
				</button>
			</form>
		);
	};
};

