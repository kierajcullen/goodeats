// Declare Variable
var displayRecipe = [];
// hide recipe search history at the beginning of the script, display once the user.... idk, clicks the button ?
$(".save-recipes").hide();

function searchRecipe() {
  // trim and set value
  var recipeSearch = $("#recipe-search").val().trim();
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
    var recipeInformation = response.hits;
    for (var i = 0; i < recipeInformation.length; i++) {
      // make a div
      var recipeDiv = $("<div>").addClass("recipeDiv");
      var title = $("<h3>").text(recipeInformation[i].recipe.label);
      // var recipeUrl = $(recipeDiv).text(recipeInformation[i].recipe.url);
      // allow you to put html
      // template literals
      var recipeUrl = $("<p>").html(
        `<a href=${recipeInformation[i].recipe.url} target="_blank"> Click Here for Recipe Information</a>`
      );
      var recipeImg = $("<img>").attr({
        src: recipeInformation[i].recipe.image,
        alt: "Recipe Image",
        height: "100px",
      });
      console.log(recipeInformation[i].recipe.uri);
      //grab url from json and add link to image
      recipeDiv.append(title, recipeImg, recipeUrl);

      $(".recipe-return").append(recipeDiv);
      $(".save-recipes").show();
    }
  });
}

function searchByIngredient() {
  $(".recipe-return").empty();
  // new ajax call here
  // get back every single input and add to our array
  var getIngredients = [];
  var ingLog = $(".ing");
  console.log(ingLog);
  for (var i = 0; i < ingLog.length; i++) {
    var currentInput = $(ingLog[i]).val().trim();
    // only do this if there is something in the input field
    if (currentInput != "") {
      console.log(currentInput);
      // add to get ingredients array
      getIngredients.push(currentInput);
    }
  }
  //now convert to string... converting array to string with commas
  var ingredientString = getIngredients.toString();
  console.log(ingredientString);
  var apiKey = "9d5a77b29f904cdf819fe2652076ae55";
  var queryUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&apiKey=${apiKey}`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    // response returns an array in this case, see console
    for (var i = 0; i < response.length; i++) {
      console.log(response[i]);
      var ingDiv = $("<div>").addClass("recipeDiv");
      var title = $("<h3>").text(response[i].title);
      var recipeUrl = $("<p>").html(
        `<a href=${response[i].image} target="_blank"> Click Here for Recipe Information</a>`
      );
      $(ingDiv).append(title);
      console.log(title);
      $(".recipe-return").append(title);
    }
    console.log(queryUrl);
    console.log(response);
  });
}

// var recipeInformation = response.hits;
// for (var i = 0; i < recipeInformation.length; i++) {
//   // make a div
//   var recipeDiv = $("<div>").addClass("recipeDiv");
//   var title = $("<h3>").text(recipeInformation[i].recipe.label);
//   // var recipeUrl = $(recipeDiv).text(recipeInformation[i].recipe.url);
//   // allow you to put html
//   // template literals
//   var recipeUrl = $("<p>").html(
//     `<a href=${recipeInformation[i].recipe.url} target="_blank"> Click Here for Recipe Information</a>`
//   );
//   var recipeImg = $("<img>").attr({
//     src: recipeInformation[i].recipe.image,
//     alt: "Recipe Image",
//     height: "100px",
//   });
//   console.log(recipeInformation[i].recipe.uri);
//   //grab url from json and add link to image
//   recipeDiv.append(title, recipeImg, recipeUrl);

//   $(".recipe-return").append(recipeDiv);
//   $(".save-recipes").show();
// }

$("#recipe-search-btn").on("click", searchRecipe);

$(".clickMe").on("click", searchByIngredient);

// create seperate script file for localStorage
function recipeHistory() {
  var localSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  // var localSearchHistory = getLocalSearchHistory;
  console.log(localSearchHistory);
  // if (getLocalSearchHistory === null) {
  //   createHistory();
  //   getLocalSearchHistory = localStorage.getItem("searchHistory");
  //   localSearchHistory = JSON.parse(getLocalSearchHistory);
  // }
  for (var i = 0; i < localSearchHistory.length; i++) {
    // add a list element to display history, local storage
    var recipeInfo = $("<li>");
    recipeInfo.text(localSearchHistory[i].city);
    //prepend or append?
    $("#search-history").prepend(historyInfo);
    console.log(historyInfo);
    $("#search-history-container").show();
  }
  return (searchHistoryArray = localSearchHistory);
}

// loop through the array of hits, print out whatever you want

// make a call to the api
// make this call within a function once the user clicks the fridge handle
