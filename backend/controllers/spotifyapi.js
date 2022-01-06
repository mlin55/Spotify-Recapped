export const getTopArtists = async (timeRange, lim, spotifyApi) => {
    const data = await spotifyApi.getMyTopArtists({time_range: timeRange, limit: lim});
    const artists = data.body.items;
    const parsedArtistData = [];
    for (let artist of artists) {
        parsedArtistData.push({
            name: artist.name,
            images: artist.images,
            genres: artist.genres,
            popularity: artist.popularity
        });
    }
    return parsedArtistData;
}

export const getTopSongs = async (timeRange, lim, spotifyApi) => {
    const data = await spotifyApi.getMyTopTracks({time_range: timeRange, limit: lim});
    const songs = data.body.items;
    const parsedSongData = [];
    for (let song of songs) {
        const artists = []
        for (let artist of song.artists) {
            artists.push(artist.name);
        }
        parsedSongData.push({
            name: song.name,
            artists: artists,
            popularity: song.popularity,
            album: song.album.name
        });
    }
    return parsedSongData;
}

export const getTopGenres = (topArtists) => {
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
       while (idx < rankedGenres.length && genreToScore(rankedGenres[idx]) < score) {
            idx++;
       }
       rankedGenres.splice(idx, 0, genre);
   }
   return rankedGenres;
}