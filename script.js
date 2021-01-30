// Declare Variable

//add search parameter
// var queryURL = `https://api.edamam.com/search?q=chicken&app_id=${appID}&app_key=${appKey}`;

var displayRecipe = [];

function searchRecipe() {
  // trim and set value
  var recipeSearch = $("#input1").val().trim();
  if (recipeSearch === "") {
    return;
  }
  getRecipe(recipeSearch);
  console.log(recipeSearch);
}

function getRecipe(search) {
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
        `<a href=${recipeInformation[i].recipe.url} target="_blank"> link to recipe</a>`
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
      // console.log(recipeInformation[i].recipe.label);
      // $(".recipes").text(recipeInformation[i].recipe.label);
      // $(".url").text(recipeInformation[i].recipe.url);
      //randomize output somehow
      // var randomRecipe = Math.floor(Math.random() * displayRecipe.length);
      // var randomRecipe = displayRecipe[randomRecipe];
    }
  });
}
$(".clickMe").on("click", searchRecipe);

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
