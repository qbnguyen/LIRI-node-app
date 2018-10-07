require("dotenv").config();
var keys = require("./keys.js")
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var actions = process.argv[2];
var title = process.argv.slice(3).join(" ");



//add the code required to import the keys.js file and store it in a variable
// You should then be able to access your keys information like so
function bands(){
  var queryUrl = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(
    function (response){
      console.log(response.data);
      if (response.data.length == 0){
        console.log("sorry try again");
        return;
      }
      console.log("concerts for " + title);
      for (var i =0 ; i < response.data.length; i++){
      console.log(response.data[i].venue.city + "," + (response.data[i].venue.region || response.data[i].venue.country) + " at " + response.data[i].venue.name + " on the following day " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
    }
  }
  );

}

function spotify(){
var spotify = new Spotify(keys.spotify);
if (!title){
  title = "All The Small Things";
}
spotify
  .search({ type: 'track', query: title }, function (error, data){
    if (error){
      
      return;
    }
    var songs = data.tracks.items;
    
    for (var i= 0; i < 5; i++){
      console.log(songs[i].name);
      var artistArray = songs[i].artists;
      var artists = [];
      for (var j = 0 ; j < artistArray.length; j++){
        artists.push(artistArray[i].name);
      }
      console.log("artists: " + artists.join(", "));
      if (songs[i].preview_url){
        console.log("preview: " + songs[i].preview_url);
      }
      console.log("album name: " + songs[i].album.name);
      console.log("--------------------------");
    }
  });
  
}


function movie(){
  
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

if (!title) {
title = "Mr Nobody";
  console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
	 	console.log("It's on Netflix!")
}
axios.get(queryUrl).then(
  
    function(response) {
      
    // console.log(response.data)
    console.log("Title: "+ response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Ratings :"+ response.data.imbdRating);
    console.log("Released: " + response.data.Released);
    console.log("Language: " + response.data.Language);
    console.log("Plot: "+ response.data.Plot)
    console.log("Actors: " + response.data.Actors)
    console.log("Country: " + response.data.Country)

    if (response.data.Ratings[1]) {
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        }
      }
  
  );
}

function random(){

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  actions = dataArr[0];
  title = dataArr[1];
  // We will then re-display the content as an array for later use.
  runActions();
   
});
}
function runActions(){
switch(actions){
  case "concert-this":
      bands();
    break;
  case "spotify-this-song":
      spotify();
    break;
  case "movie-this":
      movie();
    break;
  case "do-what-this-says":
      random();
    break;
  default:
    console.log("Pick one of the commands!");
}
}
runActions();