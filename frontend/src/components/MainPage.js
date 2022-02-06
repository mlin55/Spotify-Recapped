import SongTable from './SongTable';
import ArtistTable from './ArtistTable';
import GenreTable from './GenreTable';
import Icons from './Icons';

import { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

export default () => {

    const [profile, setProfile] = useState();
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
              <>
                {/* Loading spinner code from loading.io */}
                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </>
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
                setProfile(data.data.userProfile);
            }
            fetchData();
        },
    []);


    
    useEffect(() => {
        console.log(profile);
    }, [profile]);
    

    return(
        <div id='body'>
          <div id='main-page-background'>
            <Icons />
            <h1 style={{marginTop: '4%', marginBottom: '2%'}}>Welcome to Statify{profile != null && ', ' + profile.body.display_name}</h1>
            <h4>Use the dropdowns below to display data from different categories and time periods.</h4>
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
            {
                (songs != null && artists != null && genres != null) && 
                <div>
                  <h4>Category: {settings.category}</h4>
                  <h4 style={{ 
                    marginBottom: '10%'
                  }}>Timeframe: {displayTimeframe()}</h4>
                </div>
            }
            {displayTable()}
            <div id='footer'>
              <p>Made by Matthew Lin, © 2022. Special thanks to Spotify for providing the API necessary to build this project.</p>
            </div>
          </div>
        </div>
    );
}