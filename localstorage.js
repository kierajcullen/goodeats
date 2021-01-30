
function storedRecipes() {

    var storedInput = JSON.parse(localStorage.getItem("input1"));
  if (storedInput !== null) {
      input = storedInput;
    }
   renderInput();
  }
  
  function storedInput() {
    localStorage.setItem("input1", JSON.stringify(input));
  }
   var inputText = storedInput.value.trim();
  

    if (inputText === "") {
      return;
    }

    storedInput();
    renderInput();





// function mySavedRecipes() {
//     var myInput = document.getElementById("input1").value;
//     localStorage.setItem("input1", myInput);
//   }
// function myPastRecipes() {
//     var myInput = localStorage.getItem("myInput");
//     document.getElementById("input1").value = myInput;

//   }

//   console.log(mySavedRecipes)
//   console.log(myPastRecipes)