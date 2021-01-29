// Declare Variable
var appKey = "f6ebefb8e953ba8b5064c032bfe9e61f";
var appID = "e24e99ff";
//add search parameter
// var queryURL = `https://api.edamam.com/search?q=chicken&app_id=${appID}&app_key=${appKey}`;

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
      console.log(recipeInformation[i].recipe.label);
    }
  });
}
$(".clickMe").on("click", searchRecipe);

// loop through the array of hits, print out whatever you want

// make a call to the api
// make this call within a function once the user clicks the fridge handle
