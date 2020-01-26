document.addEventListener('DOMContentLoaded', function () {

// Create an initial data list
	let list = `[
		{
			"petName": "Name1",
			"petOwner": "petOwner1",
			"date": "date1",
			"time": "time1",
			"textarea": "textarea1"
		},
		{
			"petName": "Name2",
			"petOwner": "petOwner2",
			"date": "date2",
			"time": "time2",
			"textarea": "textarea2"
		}
	]`;

	let petName = document.querySelector('#Pet_Name');
	let petOwner = document.querySelector('#Pet_Owner');
	let date = document.querySelector('#Date');
	let time = document.querySelector('#Time');
	let textarea = document.querySelector('textarea');
	let form = document.querySelector('form');
	let information = document.querySelector('.information');
	let searchField = document.querySelector('#search');
	let select = document.querySelector('select');

// Create a function doMarkup(arr) to draw data array onthe page

	function remove(array, index) {
		array.splice(index, 1);
		localStorage.setItem('newArray', JSON.stringify(array));
	}

	function doMarkup(arr) {
		information.innerHTML = '';

		arr.map((item, index, currentArr) => {
			let newDiv = document.createElement('div');
			newDiv.className = 'pets';
			let new_h2 = document.createElement('h2');
			let new_p1 = document.createElement('p');
			let new_p2 = document.createElement('p');
			let newSpan = document.createElement('span');
			new_p1.className = 'owner';
			new_p1.textContent = item.petOwner;
			new_p2.className = 'notes';
			new_p2.textContent = item.textarea;
			new_h2.textContent = item.petName;
			newSpan.textContent = `${item.date} ${item.time.split(':')[0]}:${item.time.split(':')[1]}`;
			let newButton = document.createElement('button');
			newButton.className = 'remove';

			newButton.addEventListener('click', () => {
				// currentArr.splice(index, 1);
				remove(currentArr, index)
				doMarkup(arr);
			});

			newDiv.appendChild(newButton);
			newDiv.appendChild(new_h2);
			newDiv.appendChild(newSpan);
			newDiv.appendChild(new_p1);
			newDiv.appendChild(new_p2);
			information.appendChild(newDiv);

		});
	}

// Draw data array onthe page

let array = localStorage.getItem('newArray') ? JSON.parse(localStorage.getItem('newArray')) : JSON.parse(list);

doMarkup(array);

// Add submit event to form

	function add(data) {
		array.push(data);
		localStorage.setItem('newArray', JSON.stringify(array));
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault(); //отмена действия браузера
		let newObject = {
				petName: petName.value,
				petOwner: petOwner.value,
				date: date.value,
				time: time.value,
				textarea: textarea.value,
		};
		add(newObject);
		form.reset();
		doMarkup(array);
	});

// Add change event to searchField to find different data

	function compare(str, target){
		let str1 = str.toLowerCase();
		let target1 = target.toLowerCase();
		let pos = str1.indexOf(target1);
		return pos !== -1;
	}

	searchField.addEventListener('input', () => {
		let newArray = array.filter(item => {
			return compare(item.petName, searchField.value) || compare(item.petOwner, searchField.value) || compare(item.date, searchField.value) || compare(item.time, searchField.value) || compare(item.textarea, searchField.value);
		});
		doMarkup(newArray);
		if(searchField.value === ''){
			doMarkup(array);
		}
	});

// Add change event to select element to sort data

	select.addEventListener('change', (e) => {

		let currentSort = select.options[select.selectedIndex].value;
		if(currentSort === 'time') {
			array.sort((a, b) => parseInt(a[currentSort]) - parseInt(b[currentSort]));
		} else if(currentSort === 'date') {
			array.sort((a, b) => new Date(a[currentSort]) - new Date(b[currentSort]));
		} else if(currentSort === 'petOwner') {
			array.sort((a, b) => {
				let nameA = a.petOwner.toLowerCase(), nameB = b.petOwner.toLowerCase();
				if (nameA > nameB) return -1;
				if (nameA < nameB) return 1;
				return 0;
			});
		} else if(currentSort === 'petName') {
			array.sort((a, b) => {
				let nameA = a.petName.toLowerCase(), nameB = b.petName.toLowerCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
		}

		doMarkup(array);
	});

// Wrap/unwrap the form field

	let pl = document.querySelector('.pl');
	let wrap = document.querySelector('.wrap');

	pl.addEventListener('click', () => {
		if (wrap.style.display == 'none'){
			wrap.style.display = 'block';
		} else {
				wrap.style.display = 'none';
		}
	});

});