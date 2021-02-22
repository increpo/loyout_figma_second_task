import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
	constructor(){
		super();
	};

	render(){
		const {label, done,
					important, onDeleted,
					onToggleImportant, onToggleDone
					} = this.props;
		let classNames = 'todo-list-item';
		if(done){
			classNames += ' done';
			//onToggleDone(this.state.id);
		};
		if (important){
			classNames +=' important';
		};

		// const style = {
		// 	color: important ? 'steelblue' : 'black',
		// 	fontWeight: important ? 'bold' : 'normal'
		// }
		return (
			<span className={classNames}>
				<span className='todo-list-item-label'
							//style={style}
							onClick={onToggleDone}>
					{label}
				</span>
				<button type='button'
								className='btn btn-outline-success btn-sm float-right'
								onClick={onToggleImportant}>
					<i className='fa fa-exclamation'></i>
				</button>
				<button type='button'
								className='btn btn-outline-danger btn-sm float-right'
								onClick={onDeleted}>
					<i className='fa fa-trash'></i>
				</button>
			</span>
		);
	}
};
