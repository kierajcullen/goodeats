var searchBtn = document.getElementById("search-btn");
var mealList = document.getElementById("meal");
var mealDetailsContent = document.querySelector(".meal-details-content");
var recipeClose = document.getElementById("close-recipe");

// event listeners
searchBtn.addEventListener("click", function (event) {
  console.log(event.target);
  console.log("searchBtn");
  getMealList(event);
});
mealList.addEventListener("click", function (event) {
  console.log(event.target);
  console.log("mealList");
  getMealRecipe(event);
});
//gives you the ability to x out of recipe information
recipeClose.addEventListener("click", (event) => {
  console.log(event.target);
  console.log("recipeClose");
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// get meal list that matches with the ingredients
function getMealList() {
  var searchInputTxt = document.getElementById("user-ingredient").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    // use arrow function, replace traditional function
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">View Details</a>
                        </div>
                    </div>
                `;
        });
        console.log(meal);
        mealList.classList.remove("notFound");
      } else {
        html = "Couldn't find any recipes. Try again.";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(event) {
  if (event.target.classList.contains("recipe-btn")) {
    // make sure that what your clicking is the recipe-btn before preventDefault
    event.preventDefault();
    let mealItem = event.target.parentElement.parentElement;
    console.log(mealItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      // gets the modal to appear
      .then((data) => RecipeModal(data.meals));
  }
}

function searchRecipe() {
  // trim and set value
  var recipeSearch = $("#user-recipe").val().trim();
  // var recipeSearch = $("#input2").val().trim();
  if (recipeSearch === "") {
    return;
  }
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
                    <div class = "meal-item">
                        <div class = "meal-img">
                            <img src = "${meals[i].recipe.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meals[i].recipe.label}</h3>
                              <a href="${meals[i].recipe.url}" target="_blank">Click Here For Recipe Information</a>
                        </div>
                    </div>
                `;
      }
      console.log(meals);
      mealList.classList.remove("notFound");
    } else {
      html = "Couldn't find any recipes. Try again.";
      mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
  });
}

$("#recipe-search-btn").on("click", searchRecipe);

function RecipeModal(meal) {
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
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
