import { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

export default () => {

  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  let data = {};


  useEffect( () => {
          async function fetchData() {
            console.log("API URL: " + process.env.REACT_APP_API_URL);
            data = await axios.get(process.env.REACT_APP_API_URL);
            console.log(data);
          }
          fetchData();
      },
  []);

  return(
    <>
      <div className='background' style={{    
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
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
    </>
  );
}