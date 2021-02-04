// declare variables at the top
// both search buttons have the same class
var searchBtn = document.getElementById("search-btn");
// id of meal for recipe search results
var instructions = document.getElementById("meal");

var recipeDetailsContent = document.querySelector(".recipe-details-content");
var recipeClose = document.getElementById("close-recipe");
// push local storage to this empty array, don't forget to stringify and parse the information (depending upon which way you're working)
var previousSearches = [];
// construct the javascript value or object
var storageSearches = JSON.parse(localStorage.getItem("searches"));

// check if the local storage exists (check true or false)
// if true, reset to storage searches value
if (storageSearches) {
  // "resetting" array, getting new items from local storage
  // === checks equality
  // = reassigns variable
  previousSearches = storageSearches;
}

// event listeners, listening for that CLICK... check out those closer to the bottom of the page
// make sure we are targeting the right thing
searchBtn.addEventListener("click", function (event) {
  console.log(event.target);
  console.log("searchBtn");
  getRecipeList(event);
});
instructions.addEventListener("click", function (event) {
  console.log(event.target);
  console.log("instructions");
  getInstructions(event);
});
//gives you the ability to x out of recipe information
recipeClose.addEventListener("click", (event) => {
  console.log(event.target);
  console.log("recipeClose");
  recipeDetailsContent.parentElement.classList.remove("showRecipe");
});

// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// get meal list that matches with the ingredients
function getRecipeList() {
  var searchInputTxt = document.getElementById("user-ingredient").value.trim();
  // add to array, for local storage purposes
  previousSearches.push(searchInputTxt);
  // make an array with local storage, user search history
  // searches=key value=array
  localStorage.setItem("searches", JSON.stringify(previousSearches));
  fetch(
    // use one as the api key
    // fetch this call
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    // use arrow function, replace traditional function
    .then((results) => results.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          // display recipe image when searching by ingredient
          html += `
                    <div class = "recipe-item" data-id = "${meal.idMeal}">
                        <div class = "recipe-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "recipe-title">
                            <h3>${meal.strMeal}</h3>
                            <a href = "" class = "recipe-btn">View Details</a>
                        </div>
                    </div>
                `;
        });
        console.log(meal);
        instructions.classList.remove("notFound");
      } else {
        html = "Couldn't find any recipes. Try again.";
        instructions.classList.add("notFound");
      }
      instructions.innerHTML = html;
    });
}

// add to local storage

// get recipe instructions
function getInstructions(event) {
  // if you click view details, which displays the instructions, title and picture (potentially grab new items)
  if (event.target.classList.contains("recipe-btn")) {
    // make sure that what your clicking is the recipe-btn before preventDefault
    event.preventDefault();
    let mealItem = event.target.parentElement.parentElement;
    console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      // turns api call into an object
      // results, response etc. are interchangeable
      .then((results) => results.json())
      // gets the modal to appear
      // look at style sheet for display styling, particularly display block and display none
      .then((data) => recipeModal(data.meals));
  }
}

function searchRecipe() {
  // trim and set value
  var recipeSearch = $("#user-recipe").val().trim();
  // var recipeSearch = $("#input2").val().trim();
  if (recipeSearch === "") {
    return;
  }
  // adding to previous search array, override in local storage
  // add as many things as you want and override with the previous value
  previousSearches.push(recipeSearch);
  // make an array with local storage, user search history
  // searches=key value=array
  localStorage.setItem("searches", JSON.stringify(previousSearches));
  getRecipe(recipeSearch);
  console.log(recipeSearch);
}

function getRecipe(search) {
  // empty out the whole div
  $(".recipe-return").empty();

  var appKey = "f6ebefb8e953ba8b5064c032bfe9e61f";
  var appID = "e24e99ff";
  // var queryURL = weatherAPI + "q=" + search + units + APIkey;
  var queryURL = `https://api.edamam.com/search?q=${search}&app_id=${appID}&app_key=${appKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(queryURL);
    console.log(response);
    // display in recipe book, use class recipes for now
    // $(".recipes").text(response.hits);
    console.log(response.hits);
    var meals = response.hits;
    let html = "";
    if (meals) {
      for (var i = 0; i < meals.length; i++) {
        // if (data.meals) {
        //   data.meals.forEach((meal) => {
        //make the url accessible in here to avoid making another id call
        console.log(meals[i].recipe.url);
        html += `
                    <div class = "recipe-item">
                        <div class = "recipe-img">
                            <img src = "${meals[i].recipe.image}" alt = "food">
                        </div>
                        <div class = "recipe-title">
                            <h3>${meals[i].recipe.label}</h3>
                              <a href="${meals[i].recipe.url}" target="_blank">Click Here For Recipe Information</a>
                        </div>
                    </div>
                `;
      }
      console.log(meals);
      instructions.classList.remove("notFound");
    } else {
      html = "Couldn't find any recipes. Try again.";
      instructions.classList.add("notFound");
    }
    instructions.innerHTML = html;
  });
}

// event handler
$("#recipe-search-btn").on("click", searchRecipe);
$("#recipe-history-btn").on("click", showHistory);
$("#hide-search").on("click", function () {
  $("#recipe-history").html("");
});
// search by ingredient modal

function showHistory(event) {
  event.preventDefault();
  if (storageSearches) {
    // "resetting" array, getting new items from local storage
    // === checks equality
    // = reassigns variable
    previousSearches = storageSearches;
  }
  for (var i = 0; i < previousSearches.length; i++) {
    var search = $("<li>").text(previousSearches[i]);
    $("#recipe-history").append(search);
  }
}

function recipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  var html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "recipe-image">
        </div>
    `;
  // change content of meal detail content
  recipeDetailsContent.innerHTML = html;
  recipeDetailsContent.parentElement.classList.add("showRecipe");
}
