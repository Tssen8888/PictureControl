// 访问electron对象
const {
	remote,
	ipcRenderer
} = require('electron');
// 访问node模块
const fs = require('fs');
const path = require('path');
import {
	testLoad
} from './other.load.js';
// 访问window对象
window.isClient = true;
// 绑定方法到window对象
window.sayHello = () => console.log('hello');
document.addEventListener('DOMContentLoaded', () => {
	document.body.appendChild(div);
	document.body.appendChild(btn1);
	document.body.appendChild(btn2);
	document.body.appendChild(p);
	testLoad();
});
