// require("dotenv").config();

//add the code required to import the keys.js file and store it in a variable
// You should then be able to access your keys information like so


//   var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:



// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var axios = require("axios");

var movieName = process.argv[2]

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);
if (movieName == ""){
  console.log("http://www.omdbapi.com/?t=" + Mr.Nobody + "&y=&plot=short&apikey=trilogy")
  console.log(response.data)
}
axios.get(queryUrl).then(
  
    function(response) {
    console.log(response.data)
    console.log("Title: "+ response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Ratings :"+ response.data.imbdRating);
    console.log("Released: " + response.data.Released);
    console.log("Language: " + response.data.Language);
    console.log("Plot: "+ response.data.Plot)
    console.log("Actors: " + response.data.Actors)
    console.log("Country: " + response.data.Country)
    }
  
);

var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);
});