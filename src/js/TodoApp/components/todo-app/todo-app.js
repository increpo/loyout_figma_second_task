import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './todo-app.css';

export default class App extends Component {
	constructor() {
		super();
		this.firstID = 0;
		this.state = {
			todoData: [
				this.createTodoItem('Drink coffee'),
				this.createTodoItem('Build React App'),
				this.createTodoItem('Have A Lunch'),
			],
			term: '',
			filter: 'all', //active, all, done
		};
		this.deleteItem = (id) => {
			this.setState(({todoData})=> {
				const idx = todoData.findIndex((el) => el.id === id);
				const newArray = [
					...todoData.slice(0, idx),
					...todoData.slice(idx+1),
				];
				return {
					todoData: newArray,
				}
			});
		};
		this.addItem = (text = 'this is text') => {
			this.setState(({todoData}) => {
				const newItem = this.createTodoItem(text);

				return {
					todoData: [...todoData,
												newItem,] 
				};
			})
		};
		this.onToggleImportant = (id) => {
			this.setState(({todoData})=>{
				return {
					todoData: this.toggleProperty(todoData, id, 'important')
				}
			})

		};

		this.onToggleDone = (id) => {
			this.setState(({todoData})=>{
				return {
					todoData: this.toggleProperty(todoData, id, 'done')
				};
			});
		};

		this.onSearchChange = (term) => {
			this.setState({term});
		};

		this.onFilterChange = (filter)=>{
			this.setState({filter});
		}
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el)=>el.id===id);
		const oldItem = arr[idx];
		const newItem = {...oldItem, [propName]: !oldItem[propName]};
		return [...arr.slice(0, idx),
						newItem,
						...arr.slice(idx+1)];
	}

	createTodoItem(label){
		const arrId = [];
		this.state ? this.state.todoData.forEach((el)=> {arrId.push(el.id)}) : arrId.push(this.firstID++);
		let maxId = Math.max(...arrId);
		let newId = ++maxId;

		return {
			label,
			important: false,
			done: false,
			id: newId
		}
	};

	search(items, term) {
		if (term.length === 0) {
			return items;
		};
		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
	};

	filter(items, filter) {
		switch(filter){
			case 'all': 
				return items;
			case 'active':
				return items.filter((item)=>!item.done);
			case 'done':
				return items.filter((item)=>item.done);
			default:
				return items;
		}
	}

	render(){
		const {todoData, term, filter} = this.state;
		const visibleItems = this.filter(this.search(todoData, term), filter);
		const doneCount = todoData.filter((el)=>el.done).length;
		const todoCount = todoData.length - doneCount;
			return (
				<div className='todo-app'>
					<AppHeader toDo={todoCount} done={doneCount}/>
					<div className='search-panel d-flex'>
						<SearchPanel onChange={this.onSearchChange}/>
						<ItemStatusFilter filter = {filter}
															onFilterChange = {this.onFilterChange}/>
					</div>
					<TodoList todos={visibleItems}
										onDeleted={this.deleteItem}
										onToggleImportant={this.onToggleImportant}
										onToggleDone={this.onToggleDone}
					/>
					<ItemAddForm onItemAdded={this.addItem}/>
				</div>
		);
	}
};
