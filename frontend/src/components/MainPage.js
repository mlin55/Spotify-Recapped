import SongTable from './SongTable';
import ArtistTable from './ArtistTable';
import GenreTable from './GenreTable';

import { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

export default () => {

    const [songs, setSongs] = useState();
    const [artists, setArtists] = useState();
    const [genres, setGenres] = useState();

    const [settings, setSettings] = useState({
        category: "Songs",
        timeframe: "shortTerm"
    });

    const displayTable = () => {
        if (songs == null || artists == null || genres == null) {
            return (
              <></>
            );
        }
        if (settings.category == "Songs") {
            let songsToDisplay = songs.shortTerm;
            if (settings.timeframe == "mediumTerm") {
                songsToDisplay = songs.mediumTerm;
            } else if (settings.timeframe == "longTerm") {
                songsToDisplay = songs.longTerm;
            }
            return (
              <SongTable songs={songsToDisplay} />
            );
        } else if (settings.category == "Artists") {
            let artistsToDisplay = artists.shortTerm;
            if (settings.timeframe == "mediumTerm") {
                artistsToDisplay = artists.mediumTerm;
            } else if (settings.timeframe == "longTerm") {
                artistsToDisplay = artists.longTerm;
            }
            return (
              <ArtistTable artists={artistsToDisplay} />
            );
        } else {
            let genresToDisplay = genres.shortTerm;
            if (settings.timeframe == "mediumTerm") {
                console.log("HELLO!!!");
                genresToDisplay = genres.mediumTerm;
            } else if (settings.timeframe == "longTerm") {
                genresToDisplay = genres.longTerm;
            }
            return (
              <GenreTable genres={genresToDisplay} />
            );
        }
    }

    const displayTimeframe = () => {
        if (settings.timeframe == "shortTerm") {
            return "Last 4 weeks";
        } else if (settings.timeframe == "mediumTerm") {
            return "Last 6 months";
        } else {
            return "All time";
        }
    }

    useEffect(() => {
            async function fetchData() {
                let data = await axios.get(process.env.REACT_APP_API_URL);
                setSongs(data.data.topSongs);
                setArtists(data.data.topArtists);
                setGenres(data.data.topGenres);

                console.log(data.data.topGenres);
            }
            fetchData();
        },
    []);


    useEffect(() => {
        console.log(settings);
    }, [settings]);


    return(
        <>
          <div id='main-page-background'>
            <h1 style={{marginTop: '4%'}}>Statify</h1>
            <div id='dropdown-wrapper'>
              <DropdownButton className='dropdown' variant='secondary' size='lg' title='Category'>
                <Dropdown.Item onClick={() => setSettings({
                    category: "Songs",
                    timeframe: settings.timeframe
                })}>
                  Songs
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSettings({
                    category: "Artists",
                    timeframe: settings.timeframe
                })}>
                  Artists
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSettings({
                    category: "Genres",
                    timeframe: settings.timeframe
                })}>
                  Genres
                </Dropdown.Item>
              </DropdownButton>
              <DropdownButton className='dropdown' variant='secondary' size='lg' title='Timeframe'>
                <Dropdown.Item onClick={() => setSettings({
                    category: settings.category,
                    timeframe: "shortTerm"
                })}>
                  Last month
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSettings({
                    category: settings.category,
                    timeframe: "mediumTerm"
                })}>
                  Last 6 months
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSettings({
                    category: settings.category,
                    timeframe: "longTerm"
                })}>
                  All time
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <h4>Category: {settings.category}</h4>
            <h4>Timeframe: {displayTimeframe()}</h4>
            {displayTable()}
          </div>
        </>
    );
}