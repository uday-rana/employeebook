let pageHeading = document.querySelector(`#mainShowcase`).querySelector(`h1`);
let pageOneBtn = document.querySelector(`#btnPage1`);
let pageTwoBtn = document.querySelector(`#btnPage2`);

window.addEventListener(`load`, function (e) {
	fetchData(1);
});

pageOneBtn.onclick = function (e) {
	pageHeading.innerHTML = `Page 1`
	clearData();
	fetchData(1);
};

pageTwoBtn.onclick = function (e) {
	pageHeading.innerText = `Page 2`
	clearData();
	fetchData(2);
};

function fetchData(page) {
	let xhr = new XMLHttpRequest();
	let url = `https://reqres.in/api/users?page=${page}`;

	xhr.addEventListener(`load`, function (e) {
		let data = this.responseText;
		console.log(`Fetched data:`, data);
		data = JSON.parse(data);
		console.log(`Parsed data:`, data);
		data = data.data;
		console.log(`Data array:`, data);

		data.forEach(function (person) {
			let fullName = `${person.first_name} ${person.last_name}`;

			let card = document.createElement(`article`);
			card.classList.add(`card`);

			let header = document.createElement(`header`);
			header.innerHTML = `<h2>${fullName}</h2>`;

			let avatar = document.createElement(`img`);
			avatar.setAttribute(`src`, person.avatar);
			avatar.setAttribute(`alt`, `${fullName}'s avatar`);

			let content = document.createElement(`div`);
			content.classList.add(`content`);
			content.innerHTML = `<p><strong>Email: </strong>${person.email}</p>`;

			card.appendChild(header);
			card.appendChild(avatar);
			card.appendChild(content);
			document.querySelector(`div.cards`).appendChild(card);
		});
	});

	xhr.open(`GET`, url);
	xhr.send();
}

function clearData() {
	document.querySelector(`div.cards`).innerHTML = ``;
}
