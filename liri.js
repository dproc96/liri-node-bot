require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var method = process.argv[2];
var input = process.argv.slice(3).join(" ");

function execute() {
    switch(method) {
        case "concert-this":
            concertThis();
            break;
        
        case "spotify-this-song":
            spotifyThis();
            break;
    
        case "movie-this":
            movieThis();
            break;
    
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

function logResult(result) {
    fs.appendFile("log.txt", result, function(error) {
        console.log(error);
    })
}

function concertThis() {
    axios
        .get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function(response){
            response.data.forEach(concert => {
                console.log("====================================================");
                console.log(concert.lineup.join(" and "))
                console.log(concert.venue.name);
                console.log(`${concert.venue.city}, ${concert.venue.country}`);
                console.log(moment(concert.datetime).format("dddd, MMMM Do YYYY, h:mm a"));
                console.log("====================================================");
                logResult(JSON.stringify(concert, null, 2));
            })
        })
        .catch(function(error){
            console.log(error);
        })
}

function spotifyThis() {
    spotify.search({type: "track", query: input}, function(error, response) {
        if (error) {
            console.log(error);
        }
        console.log(response.tracks.items);
        response.tracks.items.forEach(track => {
            console.log("====================================================");
            console.log(track.name);
            console.log(`By ${track.artists.map(x => { return x.name }).join(", ")}`);
            console.log(moment(track.release_date).format("YYYY"));
            console.log(`Link: ${track.external_urls.spotify}`)
            console.log("====================================================");
            logResult(JSON.stringify(track, null, 2));
        })
    })
}

function movieThis() {
    axios
        .get(`http://www.omdbapi.com/?t=${input}&apikey=trilogy`)
        .then(function(response) {
            console.log("====================================================");
            console.log(`${response.data.Title} (${response.data.Year})`);
            console.log("----------------------------------------------------");
            console.log(`IMDB Score: ${response.data.Ratings.filter(x => {return x.Source === "Internet Movie Database"})[0].Value}`)
            console.log(`Rotten Tomatoes Score: ${response.data.Ratings.filter(x => { return x.Source === "Rotten Tomatoes" })[0].Value}`)
            console.log("----------------------------------------------------");
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log("----------------------------------------------------");
            console.log(response.data.Plot);
            console.log("----------------------------------------------------");
            console.log(response.data.Actors);
            console.log("====================================================");
            logResult(JSON.stringify(response, null, 2));
        })
        .catch(function(error) {
            console.log(error);
        })
}

function doWhatItSays() {
    fs.readFile("random.txt", {encoding: "utf8"}, function(error, data) {
        if (error) {
            console.log(error)
        }
        let responseArray = data.split(",");
        method = responseArray[0];
        input = responseArray.slice(1).join(" ");
        execute();
    })
}

execute();