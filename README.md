# liri-node-bot
A Siri type Node.js application for finding music and movies

## Dependencies
This application contains a package.json allowing you to simply enter the folder in your terminal window and input

```
npm install
```

and have all dependencies installed. These include Spotify, Moment, Axios, and Dotenv

## To Use
In order to use this application, you must create a file called .env in the main folder. Then you need to acquire a Spotify API key and client secret and enter the following in the .env file without any quotation marks:

```
# Spotify API keys

SPOTIFY_ID=YOUR_API_KEY
SPOTIFY_SECRET=YOUR_CLIENT_SECRET
```
The application will then be ready to use via:

```
node liri.js
```

## Uses

### Search Spotify
```
node liri.js spotify-this-song The Rainbow Connection
```

### Search Concerts
```
node liri.js concert-this The Rolling Stones
```

### Search Movies
```
node liri.js movie-this Muppet Treasure Island
```
