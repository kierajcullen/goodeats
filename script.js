// make a call to the api
var appKey = "f6ebefb8e953ba8b5064c032bfe9e61f";
var appID = "e24e99ff";
//add search parameter
var queryURL = `https://api.edamam.com/api/nutrition-details?app_id=${appID}&app_key=${appKey}`;
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(queryURL);
  console.log(response);
});
