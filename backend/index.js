import { getTopArtists, getTopSongs, getTopGenres } from './controllers/spotifyapi.js';

import SpotifyWebApi from 'spotify-web-api-node';
import express from 'express';

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
    redirectUri: 'http://localhost:8888/callback'
});
  
const app = express();

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

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.send('Success! You can now close the window.');

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
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
});

app.get('/topartists', async (req, res) => {
    res.send(await getTopArtists('short_term', '20', spotifyApi));
})


app.listen(8888, () =>
    console.log(
        'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
    )
);