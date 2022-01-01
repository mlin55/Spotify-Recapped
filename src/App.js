import './App.css';

import { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';


function App() {

    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);

    return (
        <div className="App">
            <div id='wrapper'>
              <h1>Statify</h1>
              <h4>Welcome to Statify! Here you can view your top most played songs, artists, and genres from various periods of time. Think of it as a Spotify Wrapped that you can access at any time during the year. Your listening data remains 100% private: we don't save any of it. Just log in with the button below and you're all set!</h4>
              <Button variant='Secondary' className="btn-secondary">
                Login
              </Button>
              <div id='dropdown-wrapper'>
                <DropdownButton className='dropdown' variant='secondary' size='lg' title='Category'>
                  <Dropdown.Item>
                    Songs
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Artists
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Genres
                  </Dropdown.Item>
                </DropdownButton>
                <DropdownButton className='dropdown' variant='secondary' size='lg' title='Time period'>
                  <Dropdown.Item>
                    Last month
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Last 6 months
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    All time
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <table>
                <tr>
                  <th>
                    Rank
                  </th>
                  <th>
                    Song/Artist/Genre
                  </th>
                </tr>
              </table>
            </div>
            <div id='footer'>
              <p>Made by Matthew Lin, © 2022. DISCLAIMER: This project is not affiliated with Spotify in any way.</p>
            </div>
        </div>
    );
}

export default App;
