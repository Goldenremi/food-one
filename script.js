//
let mealsObject;
let pageHistory = ["#homepage"];
let sortedMeals;
let homeMealsWrapper = document.getElementById("home-meals-wrapper");
let homeCategoriesWrapper = document.getElementById("home-categories-wrapper");
let homeSearchSuggestions = document.getElementById("home-search-suggestions");
let homeSearch = document.getElementById("home-search");
let cartItems = document.querySelector(".cart-main-items");
let cartTotalPrice = document.querySelector(".cart-total-price");
let profileButton = document.querySelector(".profile-button");
let profileBackButton = document.querySelector(
	"[data-function='profile-back-button']"
);
let profileInputs = Array.from(document.querySelectorAll("#profile input"));
let filteredMeals;

let servercart = {
	bolu123: {
		items: [
			{
				time: 13203948,
				itemId: 1004,
				price: 1000,
			},
		],
		totalPrice: 1000,
	},
};

let servermeals = {
	1000: {
		id: 1000,
		title: "Fried rice and chicken",
		category: "Rice",
		price: 500,
		rating: 3.5,
		images: {
			one: "./files/one.jpg",
			two: "./files/two.jpg",
			three: "./files/three.jpg",
		},
	},

	1001: {
		id: 1001,
		title: "Jollof rice and chicken",
		category: "Swallow",
		price: 50,
		rating: 3.2,
		images: {
			one: "./files/two.jpg",
			two: "./files/one.jpg",
			three: "./files/three.jpg",
		},
	},

	1002: {
		id: 1002,
		title: "Spanish rice and chicken",
		category: "Bokotoo",
		price: 530,
		rating: 2.5,
		images: {
			one: "./files/three.jpg",
			two: "./files/two.jpg",
			three: "./files/one.jpg",
		},
	},

	1003: {
		id: 1003,
		title: "Fried ice and chicken",
		category: "Rici",
		price: 5020,
		rating: 3.25,
		images: {
			one: "./files/one.jpg",
			two: "./files/two.jpg",
			three: "./files/three.jpg",
		},
	},

	1004: {
		id: 1004,
		title: "Fried rice and chicken",
		category: "Rice",
		price: 503,
		rating: 3.0,
		images: {
			one: "./files/one.jpg",
			two: "./files/two.jpg",
			three: "./files/three.jpg",
		},
	},

	1005: {
		id: 1005,
		title: "Frichicken",
		category: "Chicken",
		price: 100,
		rating: 4.5,
		images: {
			one: "./files/one.jpg",
			two: "./files/two.jpg",
			three: "./files/three.jpg",
		},
	},
};

currentPage = pageHistory[pageHistory.length - 1];
immediatePastPage = pageHistory[pageHistory.length - 2];

//Profile button handler
const ProfileButtonCLickHandler = () => {
	profileButton.addEventListener("click", (event) => {
		if (event.target.textContent === "Edit detail") {
			profileInputs.map((profileInput) => {
				console.log("hereee");
				profileInput.disabled = false;
				event.target.textContent = "Submit";
			});
		}
	});
};

profileBackButton.addEventListener("click", () => {
	if (profileButton.textContent === "Edit detail") {
		changeLocation(currentPage, immediatePastPage, true);
	} else {
			document.querySelector(".unchanged-profile").classList
		.remove("hide");
	}
});

document.querySelector(".unchanged-profile-yes").addEventListener("click", ()=>{
	changeLocation(currentPage, immediatePastPage, true)
	profileInputs.map((profileInput) => {
				console.log("hereee");
				profileInput.disabled = true;
				profileButton.textContent = "Edit detail"})
	document.querySelector(".unchanged-profile").classList.add('hide')

})


document.querySelector(".unchanged-profile-no").addEventListener("click", ()=>{
	document.querySelector(".unchanged-profile").classList.add('hide')
})
//Link default remover
const linkDefault = () => {
	Array.from(document.querySelectorAll("a")).map((link) =>
		link.addEventListener("click", (event) => event.preventDefault())
	);
};
linkDefault();


	Array.from(document.querySelectorAll("button")).map((link) =>
		link.addEventListener("click", (event) => event.preventDefault())
	);


const AddToCartClickHandler = () => {
	let addToCartButton = document.querySelector("[data-function='add-to-cart']");
	addToCartButton.addEventListener("click", (event) => {
		console.log(event.target.dataset.mealId);
		AddtoCart("bolu123", event.target.dataset.mealId);
		RenderCart();
	});
};

const AddtoCart = (username, mealId) => {
	servercart[username].items.push({
		time: Date.now(),
		itemId: mealId,
		price: mealsObject[mealId].price,
	});
	servercart[username].totalPrice = servercart[username].items.reduce(
		(acc, item) => {
			console.log(item.price, acc);
			return item.price + acc;
		},
		0
	);
};

const RemoveFromCartClickHandler = () => {
	let removeFromCartButtons = Array.from(
		document.querySelectorAll("[data-function='remove-from-cart']")
	);
	removeFromCartButtons.map((removeFromCartButton) => {
		removeFromCartButton.addEventListener("click", (event) => {
			console.log(event.target.dataset.mealId);
			RemoveFromCart("bolu123", event.target.dataset.mealId);
			RenderCart();
			console.log("oops");
		});
	});
};

const RemoveFromCart = (username, mealId) => {
	servercart[username].items = servercart[username].items.filter(
		(item) => item.itemId !== mealId
	);
	servercart[username].totalPrice = servercart[username].items.reduce(
		(acc, item) => {
			console.log(item.price, acc);
			return item.price + acc;
		},
		0
	);
};

const RenderCart = () => {
	cartItems.innerHTML = "";
	cartTotalPrice.textContent = `totalPrice ${servercart.bolu123.totalPrice}`;
	servercart.bolu123.items.map((item) => {
		console.log(mealsObject[item.itemId].images.one);
		cartItems.insertAdjacentHTML(
			"beforeend",

			`<div>
					<div class="cart-item">
						<div class="cart-item-image">
							<img
								src=${mealsObject[item.itemId].images.one}
								alt="seafood-shrimp-image"
							/>
						</div>
						<div>
							<p class="cart-item-name">${mealsObject[item.itemId].title}</p>
							<div class="cart-item-stars">a</div>
							<p class="cart-item-price">$3 per plate</p>
						</div>
						<p class="cart-item-plates">Number of plates</p>
						<span> yo </span>
						<p class="cart-item-total-price">${mealsObject[item.itemId].price}</p>
						<span> yo2 </span>
					</div>
					<button data-function="remove-from-cart" data-meal-id=${
						item.itemId
					}><img src="./files/delete.png" alt="" /></button>
				</div>`
		);
	});
	RemoveFromCartClickHandler();
};

const openViewMeal = (mealId) => {
	document.querySelector(".view-meal-card").innerHTML = "";
	document.querySelector(".view-meal-card").insertAdjacentHTML(
		"beforeend",
		`
			<div class="view-meal-image-wrapper">
					<img class="view-meal-image"src=${mealsObject[mealId].images.one} alt="seafood-shrimp-image" />
				</div>
				<p id="view-meal-title">${mealsObject[mealId].title}</p>
				<p id="view-meal-stars"></p>
				<p id="view-meal-price">N ${mealsObject[mealId].price}</p>
				<button class="view-meal-atc-button" data-function="add-to-cart" data-meal-id=${mealId}>
					Add to cart
					<img
						src="./files/seafood_shrimp.png"
						alt="seafood-shrimp-image"
					/>
				</button>
				`
	);
	AddToCartClickHandler();
};

//Page changers
Array.from(document.querySelectorAll("[data-destination]")).map((navigator) =>
	navigator.addEventListener("click", (event) => {
		changeLocation(currentPage, navigator.dataset.destination);
	})
);

//All back buttons
Array.from(document.querySelectorAll("[data-id='back-button']")).map(
	(backButton) =>
		backButton.addEventListener("click", (event) =>
			changeLocation(currentPage, immediatePastPage, true)
		)
);

//Change location
const changeLocation = (location, destination, back) => {
	if (currentPage !== destination) {
		back ? pageHistory.pop() : pageHistory.push(destination);
		document.querySelector(location).classList.add("hide");
		console.log(document.querySelector(destination).classList)
		document.querySelector(destination).classList.remove("hide");
		currentPage = pageHistory[pageHistory.length - 1];
		immediatePastPage = pageHistory[pageHistory.length - 2];
	}
};

//homepage

// const OnHomeLoad = (sort) => {
// 	if (mealsObject === undefined) {
// 		fetch("http://localhost:2000")
// 			.then((res) => res.json())
// 			.then((data) => {
// 				mealsObject = data;
// 				sortedMeals = Object.values(mealsObject);
// 				DisplayHomeMeals(sortedMeals);
// 			});
// 	}
// };

const OnHomeLoad = (sort) => {
	mealsObject = servermeals;
	sortedMeals = Object.values(mealsObject);
	DisplayHomeMeals(sortedMeals);
	RenderCart();
	ProfileButtonCLickHandler();
};

//Homepage category buttons

const DisplayHomeMeals = (meals) => {
	let categories = ["All"];
	homeMealsWrapper.innerHTML = "";
	homeCategoriesWrapper.innerHTML = "";
	meals.map((meal) => {
		if (!categories.includes(meal.category)) {
			categories.push(meal.category);
		}
		homeMealsWrapper.insertAdjacentHTML(
			"beforeend",
			`<div data-function="homepage-view-meal" data-meal-id=${meal.id}>
							<div class="image-wrapper">
							<img src=${meal.images.one} alt="seafood-shrimp-image" />
							<button class="view-details">View <span>.</span></button>
						</div>
						<p>${meal.title}</p>
						<div class="stars"></div>
						<p>N${meal.price} per plate</p>
						</div>`
		);
	});
	categories.map((category) =>
		homeCategoriesWrapper.insertAdjacentHTML(
			"beforeend",
			`<a href="" data-id="home-category">${category}</a>`
		)
	);

	AddHomeCategoryClickListener();
	AddHomeMealClickListener();
};

const AddHomeCategoryClickListener = () => {
	linkDefault();
	Array.from(document.querySelectorAll("[data-id='home-category']")).map(
		(category) =>
			category.addEventListener("click", (event) => {
				if (category.textContent !== "All") {
					let results = sortedMeals.filter((meal) =>
						meal.category
							.toLowerCase()
							.includes(category.textContent.toLowerCase())
					);
					filteredMeals = results;
					DisplayHomeMeals(filteredMeals);
				} else {
					DisplayHomeMeals(sortedMeals);
				}
			})
	);
};

const AddHomeMealClickListener = () => {
	Array.from(
		document.querySelectorAll("[data-function='homepage-view-meal']")
	).map((viewDetails) => {
		viewDetails.addEventListener("click", (event) => {
			changeLocation(currentPage, "#view-meal");
			openViewMeal(viewDetails.dataset["mealId"]);
		});
	});
};

//Homepage search bar
Array.from(document.querySelectorAll("[type='search']")).map((searchbar) =>
	searchbar.addEventListener("input", (event) => {
		homeSearchSuggestions.innerHTML = "";
		if (event.target.value !== "") {
			let results = sortedMeals.filter((meal) =>
				meal.title.toLowerCase().includes(event.target.value.toLowerCase())
			);
			console.log(results);
			filteredMeals = results;
			homeSearchSuggestions.innerHTML = "";
			results
				.slice(0, 3)
				.map((possible) =>
					homeSearchSuggestions.insertAdjacentHTML(
						"beforeend",
						`<li data-function="home-search-suggestion" data-meal-id=${possible.id}> ${possible.title}</li>`
					)
				);
		} else {
			filteredMeals = sortedMeals;
		}
		searchResultClickHandler();
	})
);

const Sorter = (property) => {
	let sortingArray = [];
	let sortedArray = [];
	for (let i = 0; i < sortedMeals.length; i++) {
		sortingArray.push(sortedMeals[i][property]);
		sortingArray.sort((a, b) => b - a);
		sortedArray.splice(
			sortingArray.indexOf(sortedMeals[i][property]),
			0,
			sortedMeals[i]
		);
	}
	// console.log(sortedMeals)
	// console.log(sortingArray)
	// console.log(sortedArray)
	// console.log(sortedArray.map(meal=>meal[property]))
	sortedMeals = sortedArray;
};

const searchResultClickHandler = () => {
	Array.from(
		document.querySelectorAll("[data-function='home-search-suggestion']")
	).map((homeSearchSuggestion) =>
		homeSearchSuggestion.addEventListener("click", (event) => {
			changeLocation(currentPage, "#view-meal");
			homeSearchSuggestions.innerHTML = "";
			openViewMeal(event.target.dataset["mealId"]);
		})
	);
};

OnHomeLoad();

homeSearch.addEventListener("submit", (event) => {
	event.preventDefault();
	DisplayHomeMeals(filteredMeals);
});

//View-meal

// Array.from(document.querySelectorAll()).map((e) => e.addEventListener("click",  () =>changeLocation("#homepage", "#sidebar-settings"))

//obtaining data
// fetch('http://localhost:2000')
// .then(res=> res.json())
// .then(console.log)

// fetch ('http://localhost:2000/signin',{

//     method:'post',
//     headers:{'Content-Type':'application/json'},
//     body:JSON.stringify(
//     	{
//         	email:'john@gmail.com',
//         	password:'cookies'
//         }
//     )
// 	})
