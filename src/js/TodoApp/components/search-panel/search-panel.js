import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
	constructor(){
		super();
		this.state = {
			term: ''
		};
		this.onChange = () => {
			const term = event.target.value;
			this.setState({
				term: term
			});
			this.props.onChange(term);
		}
	}

	render(){
		const searchText = 'search here';
		const searchStyle = {
								fontSize: '20px'
		};
		return (
			<input placeholder={searchText} 
					style={searchStyle}
					className='forn-control search-input'
					onChange={this.onChange}
					value={this.state.term}
			/>
		);
	};
};
