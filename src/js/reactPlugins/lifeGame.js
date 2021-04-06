console.log(`Добро пожаловать в жизнь клетки!!! Вызовите функцию "createGame()" и
								передайте в качестве аргумента значение высоты и ширины доски либо 
								текст с ссылкой URL на файл с параметрами доски!`);


window.createGame = (
	function (x=4, y=4){
		if((typeof x)=="string"){
			descFromFile(x);
		} else if ((typeof x) == "number"){
			descFromParams(Math.round(x),Math.round(y));
		} else {(console.log(`Введенные данные не являются 
						строковыми либо числовыси значаниями, повторите ввод`))};
	}
)

async function descFromFile(url){
	let response = await fetch(url)
											.then(response=>response.text());

	const newArr = response.trim().split('\n');
	const newArrMap = newArr.map((item)=>item.split(','));
	const newArrMapParse = [];
	for (let i in newArr){
		newArrMapParse[i] = [];
		newArrMapParse[i] = newArrMap[i].map((item)=>parseInt(item));
	};

	gameControl(newArrMapParse);
};

function descFromParams(width, height){
	const newdesc = [];
	for (let i=0; i<height; i++){
		newdesc[i]=[];
		for(let j=0; j<width; j++){
			newdesc[i][j] = Math.round(Math.random());
		};
	};

	gameControl(newdesc);
};

function gameControl(array){
	const arr=[[]];
		
		for(let h in array){
			arr[0].push([]);
			array[h].forEach((item)=>arr[0][h].push(item));
		}

	do{
		let r = game(...arr.slice(-1));
		arr.push([]);

		for(let a in r[1]){
			arr[arr.length-1].push([]);
			r[1][a].forEach((item)=>arr[arr.length-1][a].push(item));
		}

	} while (arr.slice(-1)[0] > arr.slice(-2)[0] || arr.slice(-1)[0] < arr.slice(-2)[0]);
	console.log('finish');
	console.log(arr);
};

function game(ar){
	const arrayGame=[];
		for (let a=0 ; a<ar.length ; a++){
			arrayGame[a]=[]; 
			for(let h=0; h<ar[a].length ; h++){
				ar[a][h] ? (arrayGame[a][h]=1) : (arrayGame[a][h]=0);
			}
		};
	for (let i=0; i<ar.length; i++){
		for (let l=0; l<ar[i].length; l++){
			allItems(arrayGame, ar, i, l);
		};
	};
	console.log(arrayGame, ar);
	return [ar, arrayGame];
};

function allItems(arrayGame, ar, i, l){
	if(ar[i][l]){
		switch (
						(ar[i-1] ? (ar[i-1][l-1] ? ar[i-1][l-1]: 0) : 0) 
							+ (ar[i-1] ? ar[i-1][l] : 0)
							+ (ar[i-1] ? (ar[i-1][l+1] ? ar[i-1][l+1] : 0) : 0)
							+ (ar[i][l-1] ? ar[i][l-1] : 0)
							+ (ar[i][l+1] ? ar[i][l+1] : 0)
							+ (ar[i+1] ? (ar[i+1][l-1] ? ar[i+1][l-1] : 0) : 0)
							+ (ar[i+1] ? ar[i+1][l] : 0)
							+ (ar[i+1] ? (ar[i+1][l+1] ? ar[i+1][l+1] : 0) : 0)
		){
			case 2:
			case 3:
				break;
			default:
				arrayGame[i][l]=0;
		}
	} else {
		switch (
				(ar[i-1] ? (ar[i-1][l-1] ? ar[i-1][l-1]: 0) : 0) 
					+ (ar[i-1] ? ar[i-1][l] : 0)
					+ (ar[i-1] ? (ar[i-1][l+1] ? ar[i-1][l+1] : 0) : 0)
					+ (ar[i][l-1] ? ar[i][l-1] : 0)
					+ (ar[i][l+1] ? ar[i][l+1] : 0)
					+ (ar[i+1] ? (ar[i+1][l-1] ? ar[i+1][l-1] : 0) : 0)
					+ (ar[i+1] ? ar[i+1][l] : 0)
					+ (ar[i+1] ? (ar[i+1][l+1] ? ar[i+1][l+1] : 0) : 0)
			){
			case 3:
				arrayGame[i][l]=1;
				break;
		};
	};
};









//gameControl(arr10);

// import * as file from './desc.csv';
// console.log('file is: ');
// console.log(file);
// console.log('json is: ');
// const newDesc = [];
// for (let i in file){
// 	newDesc[i]=[];
// 	file[i].forEach((item)=>newDesc[i].push(parseInt(item)));
// }

//console.log(newDesc);


//const reader = new FileReader();
//reader.readAsArrayBuffer(file);
//const desc = file;
//let decoder = new TextDecoder();
//console.log(decoder.decode(desc));

// function getFile(fname)
// {
//     var opener = new ActiveXObject("Scripting.FileSystemObject");
//     var pointer = opener.OpenTextFile(fname, 1, true);
//     var cont = pointer.ReadAll();
//     pointer.Close();
//     return cont;
// }





// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.text();
//   console.log('from fetch: ');
//   console.log(json);
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// const desc = fetch('/assets/img/desc.csv')
// 	    .then(function(response) {
// 	      if (response.ok) {
// 	        console.log(response.text());
// 	      }
// 	      throw new Error('Не удалось загрузить файл.');
// 	    })
// 	    .catch(function(error) {
// 	      console.error('Произошла ошибка при попытке отобразить файл: ' + error.message);
// 	    })

//console.log(JSON.parse(desc));

const ar=[
							[1,1,0,1,1,0],
							[0,1,0,0,0,1],
							[0,1,1,0,1,0],
							[1,0,1,0,1,0]
						];

let neighbour_cell;

function gameLive(){
	for (let i = 0; i < ar.lenght; i++){
		for (let l = 0; l < ar[i].length; l++){
			//array to collect live neighbour cells
			const live = []

			//cycle to check 8 neighbour cells
			for(let m = -1; m <= 1; m++){
				for(let n = -1; n <= 1; n++){
					let a = n + i;
					let b = m + l;

					//not a neighbour but the current cell itself
					if(a == 0 && b == 0) continue;

					neighbour_cell = ar[a][b];
					// neighbour cell doesn't exist

					if(neighbour_cell == undefined) continue;

					if(neighbour_cell == 1) {
						live.push(1);
					}
					//live << if neighbour_cell == 1;
					//add 1 to array live
					// live << if neighbour_cell == 1
				}
			}

			if (ar[i][l] == 1 && live.count < 2){ar[i][l] = 0};

			if (ar[i][l] == 1 && (live.count == 2 || live.count == 3)){ar[i][l] = 0};
			if (ar[i][l] == 1 && live.count > 3){ar[i][l] = 0};

			if (ar[i][l] == 0 && live.count == 3){ar[i][l] = 1};
		}
	}
}