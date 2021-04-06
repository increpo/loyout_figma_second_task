import React from 'react';
import ReactDOM from 'react-dom';

import './lifeGame';
// class Square extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			value: null,
// 		};
// 	}

// 	render() {
// 		return (
// 			<button
// 				className="square"
// 				onClick={ () => this.props.onClick()}
// 			>
// 				{this.props.value}
// 			</button>
// 		);
// 	}
// }

function Square(props){
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true
	// 	};
	// }

	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick = { () => this.props.onClick(i)}
			/>
		);
	}

	render() {
		// const winner = calculateWinner(this.state.squares);
		// let status;
		// if (winner){
		// 	status = 'Победитель: ' + winner;
		// } else {
		// 	status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');
		// };
		//const status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');

		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

		handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step %2) === 0,
		});
	}	

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move} >
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'Победитель: ' + winner;
		} else {
			status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares = {current.squares}
						onClick = {(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares){
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i=0; i<lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================
document.querySelector('.react-element') ? ReactDOM.render(
	<Game />,
	document.querySelector('.react-element')
) : '';


function formatName(user){
	return user.firstName + ' ' + user.lastName;
};
//let user;
const user = {
	firstName: 'Harper',
	lastName: 'Perez'
};

const element = (
	<h1>
		Hello, {formatName(user)}!
	</h1>
);

function getGreeting(user){
	if(user){
		return <h1>Hello, {formatName(user)}!</h1>;
	}
	return <h1>Hello, Stranger!</h1>;
};

document.querySelector('.react-next-element') ? ReactDOM.render(
	getGreeting(user),
	document.querySelector('.react-next-element')
) : '';

function tick(){
	const element = (
		<div>
			{getGreeting(user)}
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	);
	document.querySelector('.react-next-element') ? ReactDOM.render(<div>{element} <App/></div>, document.querySelector('.react-next-element')) : '';
}

setInterval(tick, 1000);

function Welcome(props){
	return <h1>Hello, {props.name}</h1>;
};

function App(){
	return (
		<div>
			<Welcome name="Sara" />
			<Welcome name="Cahal" />
			<Welcome name="Edite" />
		</div>
	);
};

const INTERVAL = 100;
let total = 0;

class Timer extends React.Component{
	constructor(props){
		super(props);
		this.state = {value: 0};
	}

	increment(){
		this.setState({value: this.state.value + 1});
	}

	componentDidMount(){
		this.timerID = setInterval(() => this.increment(), 1000/INTERVAL);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	render(){
		const value = this.state.value;

		return (
			<div>
				<p>Таймер:</p>
				<p>
					<span>{Math.round(value/INTERVAL/60/60)} : </span>
					<span>{Math.round(value/INTERVAL/60)} : </span>
					<span>{Math.round(value/INTERVAL)} . </span>
					<span>{value % INTERVAL}</span>
				</p>
			</div>
		);
	}
}

//document.querySelector('.react-timer-element') ? ReactDOM.render(<Timer />, document.querySelector('.react-timer-element')) : '';

//setInterval(increment, 1000/INTERVAL);

// const array = [[0,0,0,1],[1,0,1,0],[0,0,1,0],[0,0,1,1]];
// // for (let i=0; i<array.length; i++){
// // 	switch(i) {
// // 		case 0:
// // 			firstRow(array);
// // 			break;
// // 		case array.length-1:
// // 			console.log('lastRow(array)');
// // 			break;
// // 		default: 
// // 			middleRow(array, i);
// // 	}
// // }

// function firstRow(ar){
// 	for (let i=0; i<ar.length; i++){
// 		switch(i) {
// 			case 0:
// 				firstItem(ar, i);
// 				break;
// 			case ar.length-1:
// 				lastItem(ar, i);
// 				break;
// 			default: 
// 				middleItem(ar, i);
// 		}
// 	}
// }

// function middleRow(ar, i){
// 	for (let l=0; l<ar.length; l++){
// 		switch(l) {
// 			case 0:
// 				firstItemMiddle(ar, i, l);
// 				break;
// 			case ar.length-1:
// 				console.log('lastItemMiddle(ar, i)');
// 				break;
// 			default: 
// 				middleItemMiddle(ar, i, l);
// 		}
// 	}
// };

// function firstItem(ar, i){
// 	if(ar[0][0]){
// 		if(!ar[0][1] && !ar[1][0] || !ar[0][1] && !ar[1][1] || !ar[1][0] && !ar[1][1]){
// 			array[0][0]=0;
// 			//console.log(array[0][0]);
// 		};
// 	} else {
// 		if(ar[0][1] && ar[1][0] && ar[1][1]){
// 			array[0][0]=1;
// 			//console.log(array[0][0]);
// 		}
// 	};
// };

// function middleItem(ar, i){
// 	if(ar[0][i]){
// 		switch(ar[0][i-1] + ar[0][i+1] + ar[1][i-1] + ar[1][i] + ar[1][i+1]){
// 			case 0:
// 			case 1:
// 			case 4:
// 			case 5:
// 				ar[0][i]=0;
// 				console.log(i + ' is ' + ar[0][i]);
// 				break;
// 		}
// 	} else {
// 		switch(ar[0][i-1] + ar[0][i+1] + ar[1][i-1] + ar[1][i] + ar[1][i+1]){
// 			case 3:
// 				ar[0][i]=1;
// 				console.log(i + ' is ' + ar[0][i]);
// 				break;
// 		}
// 	}
// }

// function lastItem(ar, i){
// 	if(ar[0][ar.length-1]){
// 		switch (ar[0][ar.length-2]+ar[1][ar.length-2]+ar[1][ar.length-1]){
// 			case 0:
// 			case 1:
// 				ar[0][ar.length-1] = 0;
// 				console.log('last item : ' + ar[0][ar.length-1]);
// 				break;
// 		} 
// 	}	else {
// 		switch (ar[0][ar.length-2]+ar[1][ar.length-2]+ar[1][ar.length-1]) {
// 			case 3:
// 				ar[0][ar.length-1] = 1;
// 				console.log('last item : ' + ar[0][ar.length-1]);
// 				break;
// 		}
// 	}
// }

// function firstItemMiddle(ar, i, l){
// 	if(ar[i][0]){
// 		switch (ar[i-1][0]+ar[i-1][1]+ar[i][1]+ar[i+1][0]+ar[i+1][0]){
// 			case 0:
// 			case 1:
// 			case 4:
// 			case 5:
// 				ar[i][0]=0;
// 				console.log(i + ' item: ' + ar[i][0]);
// 				break;
// 		};
// 	} else {
// 		switch (ar[i-1][0]+ar[i-1][1]+ar[i][1]+ar[i+1][0]+ar[i+1][0]){
// 			case 3:
// 				ar[i][0]=1;
// 				console.log(i + ' item: ' + ar[i][0]);
// 				break;
// 		}
// 	}
// };

// function middleItemMiddle(ar, i, l){
// 	if(ar[i][l]){
// 		switch (ar[i-1][l-1]+ar[i-1][l]+ar[i-1][l+1]+ar[i][l-1]+ar[i][l]+ar[i][l+1]+ar[i+1][l-1]+ar[i+1][l]+ar[i+1][l+1]){
// 			case 2:
// 			case 3:
// 				break;
// 			default:
// 				ar[i][l]=0;
// 				console.log('midle of ' + i + ' : ' + l + ' = ' + ar[i][l]);
// 		}
// 	} else {
// 		switch (ar[i-1][l-1]+ar[i-1][l]+ar[i-1][l+1]+ar[i][l-1]+ar[i][l]+ar[i][l+1]+ar[i+1][l-1]+ar[i+1][l]+ar[i+1][l+1]){
// 			case 3:
// 				ar[i][l]=1;
// 				console.log('midle of ' + i + ' : ' + l + ' = ' + ar[i][l]);
// 		};
// 	};
// };

// function gameZ(ar){
// 	for (let i=0; i<ar.length; i++){
// 		for (let l=0; l<ar[i].length; l++){
// 			// for (let n=-1; n<2; n++){
// 			// 	for (let m=-1; m<2; m++){
// 			// 		let a=n+i;
// 			// 		let b=m+l;
// 			// 		if (a!=-1 && b!=-1){

// 			// 		}
// 			// 	};
// 			// };
// 			allItems(ar, i, l);
// 			//for (let n=-1;)
// 		};
// 	};
// 	return ar;
// };

//const arr3=[];
//arr2.forEach((item)=>arr3.push(item));
//console.log(arr2);


//setInterval(gameControl, 1000);

// const reader = new FileReader();

// reader.readAsArrayBuffer('./file.scv')

// const g1=[[1,0,1,0],[0,1,0,1]];
// const g2=[[1,0,1,0],[0,1,0,1]];
// console.log(!(g1 > g2 || g1 < g2));

// const ar=[[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18]];
// //const i=0;
// //console.log('show array: ' + (ar[-1] ? ar[1-1][i-1]??10 : 20 + ar[1] ? ar[1][2]??12 : 0));

// for (let i=0; i<ar.length; i++){
// 		for (let l=0; l<ar[i].length; l++){

// 			console.log( (ar[i-1] ? (ar[i-1][l-1] ? ar[i-1][l-1]: 0) : 0) 
// 									+ (ar[i-1] ? ar[i-1][l] : 0)
// 									+ (ar[i-1] ? (ar[i-1][l+1] ? ar[i-1][l+1] : 0) : 0)
// 									+ (ar[i][l-1] ? ar[i][l-1] : 0)
// 									+ (ar[i][l+1] ? ar[i][l+1] : 0)
// 									+ (ar[i+1] ? (ar[i+1][l-1] ? ar[i+1][l-1] : 0) : 0)
// 									+ (ar[i+1] ? ar[i+1][l] : 0)
// 									+ (ar[i+1] ? (ar[i+1][l+1] ? ar[i+1][l+1] : 0) : 0)
// 									);
// 		};
// };
//console.log('show array: ' );

//const r = game(arr2);
//console.log(arr2, r);


const matrixExample = [
   [ 1, 2, 3, 4 ],
   [ 4, 5, 6, 5 ],
   [ 7, 8, 9, 7 ],
   [ 7, 8, 9, 7 ]
 ];

function sumUpDiagonals(matrix) {
	let sumMain=0;
	let sumSec=0;
  for (let a=0; a<matrix.length; a++){
  	sumMain+=matrix[a][a];
   	sumSec+=matrix[a][matrix.length-1-a];
  };
	
  return {sumMain: sumMain, sumSec: sumSec};
}

console.log(sumUpDiagonals(matrixExample));

// function isEven(num:number): boolean {
//     // Returns True if **num** is even or False if it is odd.
//     return Boolean(num % 2);
// }

// test("Тест функции isEven()", function() {
//    ok(isEven(8) == true);
//    ok(isEven(9) == false);
// });