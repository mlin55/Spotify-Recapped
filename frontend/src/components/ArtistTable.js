import { useState } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import QuestionIcon from '../images/question-icon.png';

export default ({artists}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(artists);

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
            This column of the table displays the popularity of each artist across Spotify's entire userbase relative to the other artists shown. This is different from the artist's rank, which is based on how much you have listened to each artist. For example, a relative popularity of 1 indicates that artist is the most listened to artist in the table across the Spotify userbase, even though they might have a different rank based on your own listening.
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
            <th id='artist-rank-column'>
              Rank
            </th>
            <th className='padding-column'></th>
            <th id='artist-artist-column'>
              Artist
            </th>
            <th id='genres-column'>
              Genres
            </th>
            <th id='artist-popularity-column'>
              Relative popularity
              <button id='artist-question-click' onClick={handleShow}>
                <img src={QuestionIcon} className='question-icon' />
              </button>
            </th>
            <th className='padding-column'></th>
          </tr>
          {artists.map((artist, i) => (
              <tr key={i}>
                <td></td>
                <td>
                    {i + 1}.
                </td>
                <td></td>
                <td>
                    <img src={artist.images[0].url} className='image' />{artist.name}
                </td>
                <td>
                    {displayList(artist.genres)}
                </td>
                <td>
                  {artist.popularity}.
                </td>
                <td></td>
              </tr>
          ))}
        </Table>
      </>
    );
}