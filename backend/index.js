var SpotifyWebApi = require('spotify-web-api-node');
var express = require('express');
require('dotenv').config();
var cors = require('cors');

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.BACKEND_URL + '/callback'
});
  
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to the Spotify Recapped backend.");
})

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);

            res.redirect(process.env.FRONTEND_URL);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });

});

app.get('/info', async (req, res) => {
    const userProfile = await spotifyApi.getMe();

    
    const topArtists = {
        shortTerm: await getTopArtists('short_term', '50', spotifyApi),
        mediumTerm: await getTopArtists('medium_term', '50', spotifyApi),
        longTerm: await getTopArtists('long_term', '50', spotifyApi),
    };
    
    
    
    const topSongs = {
        shortTerm: await getTopSongs('short_term', '50', spotifyApi),
        mediumTerm: await getTopSongs('medium_term', '50', spotifyApi),
        longTerm: await getTopSongs('long_term', '50', spotifyApi),
    }
    
    const topGenres = {
        shortTerm: getTopGenres(topArtists.shortTerm),
        mediumTerm: getTopGenres(topArtists.mediumTerm),
        longTerm: getTopGenres(topArtists.longTerm),
    }
    
    res.send({
        userProfile: userProfile,
        topArtists: topArtists,
        topSongs: topSongs,
        topGenres: topGenres
    });

});

app.get('/test', async (req, res) => {
    const data = await spotifyApi.getMyTopTracks({time_range: 'short_term', limit: '50'});
    res.send(data);
});


app.listen(process.env.PORT, () =>
    console.log(
        "HTTP Server up. Now go to " + process.env.BACKEND_URL +"/login in your browser." 
    )
);



const getTopArtists = async (timeRange, lim, spotifyApi) => {
    const data = await spotifyApi.getMyTopArtists({time_range: timeRange, limit: lim});
    const artists = data.body.items;

    const sortedByPop = [];
    for (let artist of artists) {
        sortedByPop.push(artist);
    }
    sortedByPop.sort((a, b) => a.popularity > b.popularity ? -1 : 1);
    const map = new Map();
    for (let i = 0; i < sortedByPop.length; i++) {
        map.set(sortedByPop[i].name, i + 1);
    }

    const parsedArtistData = [];
    for (let artist of artists) {
        for (let i = 0; i < artist.genres.length; i++) {
            artist.genres[i] = artist.genres[i].slice(0, 1).toUpperCase() + artist.genres[i].slice(1);
        }

        parsedArtistData.push({
            name: artist.name,
            images: artist.images,
            genres: artist.genres,
            popularity: map.get(artist.name)
        });
    }
    return parsedArtistData;
}

const getTopSongs = async (timeRange, lim, spotifyApi) => {
    const data = await spotifyApi.getMyTopTracks({time_range: timeRange, limit: lim});
    const songs = data.body.items;

    const sortedByPop = [];
    for (let song of songs) {
        sortedByPop.push(song);
    }
    sortedByPop.sort((a, b) => a.popularity > b.popularity ? -1 : 1);
    const map = new Map();
    for (let i = 0; i < sortedByPop.length; i++) {
        map.set(sortedByPop[i].name, i + 1);
    }

    const parsedSongData = [];
    for (let song of songs) {
        const artists = []
        for (let artist of song.artists) {
            artists.push(artist.name);
        }
        parsedSongData.push({
            name: song.name,
            artists: artists,
            popularity: map.get(song.name),
            album: song.album.name,
            image: song.album.images[0]
        });
    }
    return parsedSongData;
}

const getTopGenres = (topArtists) => {
      /*
          each genre is given a weighted score and ranked based on the user's top artists
          the weighting is: 100, 98, 96 ... 2 points for each rank from 1-50
          for example, if the user's top artist is Taylor Swift, then pop gets 100 points because Swift is ranked first
      */
    const genreToScore = new Map();
    let points = 100;
    for (let artist of topArtists) {
          for (let genre of artist.genres) {
              if (genreToScore.has(genre)) {
                  genreToScore.set(genre, genreToScore.get(genre) + points);
              } else {
                  genreToScore.set(genre, points);
              }
          }
          points -= 2;
    }
    const rankedGenres = [];
    for (const [genre, score] of genreToScore.entries()) {
        let idx = 0;
        while (idx < rankedGenres.length && genreToScore.get(rankedGenres[idx]) < score) {
            idx++;
        }
        rankedGenres.splice(idx, 0, genre);
    }
    return rankedGenres;
}