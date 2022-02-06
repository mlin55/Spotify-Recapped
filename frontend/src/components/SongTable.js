import { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import QuestionIcon from '../images/question-icon.png';

export default ({songs}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const displayList = (items) => {
        let list = "";
        for (let i = 0; i < items.length; i++) {
            list += items[i];
            if (i != items.length - 1) {
                list += ", ";
            }
        }
        if (list == "") {
            list = "Sorry, Spotify doesn't store that data currently :("
        }
        return list;
    }

    return(
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Relative Popularity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This column of the table displays the popularity of each song across Spotify's entire userbase relative to the other songs shown. This is different from the song's rank, which is based on how much you have listened to each song. For example, a relative popularity of 1 indicates that song is the most listened to song in the table across the Spotify userbase, even though it might have a different rank based on your own listening.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Got it
            </Button>
          </Modal.Footer>
        </Modal>
        <Table variant='dark' className='table' striped bordered>
          <tr>
            <th className='padding-column'></th>
            <th id='song-rank-column'>
              Rank
            </th>
            <th className='padding-column'></th>
            <th id='song-column'>
              Song
            </th>
            <th id='song-artists-column'>
              Artists
            </th>
            <th id='album-column'>
              Album
            </th>
            <th className='padding-column'></th>
            <th id='song-popularity-column'>
              Relative popularity
              <button id='song-question-click' onClick={handleShow}>
                <img src={QuestionIcon} className='question-icon' />
              </button>
            </th>
            <th className='padding-column'></th>
          </tr>
          {songs.map((song, i) => (
              <tr key={i}>
                <td></td>
                <td>
                    {i + 1}.
                </td>
                <td></td>
                <td>
                  <img src={song.image.url} className='image' />{song.name}
                </td>
                <td>
                    {displayList(song.artists)}
                </td>
                <td>
                    {song.album}
                </td>
                <td></td>
                <td>
                  {song.popularity}.
                </td>
                <td></td>
              </tr>
          ))}
        </Table>
      </>
    );
}