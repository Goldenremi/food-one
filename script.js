// Array.from(document.querySelectorAll()).map((e) => e.addEventListener("click",  () =>changeLocation("#homepage", "#sidebar-settings"))

let pageHistory = ["#homepage"];
currentPage = pageHistory[pageHistory.length - 1];
immediatePastPage = pageHistory[pageHistory.length - 2];

Array.from(document.querySelectorAll("a")).map((link) =>
	link.addEventListener("click", (event) => event.preventDefault())
);

const changeLocation = (location, destination, back) => {
	if (currentPage !== destination) {
		back ? pageHistory.pop() : pageHistory.push(destination);
		document.querySelector(location).classList.add("hide");
		document.querySelector(destination).classList.remove("hide");
		currentPage = pageHistory[pageHistory.length - 1];
		immediatePastPage = pageHistory[pageHistory.length - 2];
	}
};

//Page changers
Array.from(document.querySelectorAll("[data-destination]")).map((navigator) =>
	navigator.addEventListener("click", (event) => {
		changeLocation(currentPage, navigator.dataset.destination);
	})
);

//Homepage category buttons
Array.from(document.querySelectorAll("[data-id='home-category']")).map(
	(category) =>
		category.addEventListener("click", (event) => {
			changeLocation(currentPage, "#category");
			document.querySelector("#category-footer-text").textContent =
				category.textContent;
		})
);

//All back buttons
Array.from(document.querySelectorAll("[data-id='back-button']")).map(
	(backButton) =>
		backButton.addEventListener("click", (event) =>
			changeLocation(currentPage, immediatePastPage, true)
		)
);
