import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/modal';
import Lottery from './components/lottery';
import HistoryList from './components/historyList';
import './index.css';


let itemList;

let giftList = [];

let lastGift = null;

let money = 200;

let price = 200;

function render() {
	ReactDOM.render(
		<div>
			<p>当前矿石数:{money}</p>
			<div id="lottery">
				<Lottery itemList={itemList} price={price} draw={draw} modal={Modal} actionEnd={actionEnd} />
			</div>
			<HistoryList list={giftList} />
		</div>,
		document.getElementById('root')
	);
}

function draw(){
	if(money >= price){
		money -= price;
		render();
		return fetch("https://qczxb8.fn.thelarkcloud.com/draw").then(x=>x.json()).then(x=>{
			lastGift = x.id; 
			return x;
		});
	}
	else{
		return Promise.resolve({code: 1, msg: "矿石不够！"});
	}
}

function actionEnd(){
	let date = new Date();
	giftList.push({
		message: "🎉 恭喜抽中" + itemList[lastGift].name,
		date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
	})

	render();
}

fetch("https://qczxb8.fn.thelarkcloud.com/getLotteryMessage").then(res => res.json()).then(data => {
	itemList = data.giftList;
	itemList.map((value) => {
		value.unlockAt = new Date(value.unlockAt);
		return value;
	})
	money = data.money;
	price = data.price;
	render();
})

