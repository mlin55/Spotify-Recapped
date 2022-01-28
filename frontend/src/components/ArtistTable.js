import { Table } from 'react-bootstrap';

export default ({artists}) => {

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
        <Table variant='dark' className='table' striped bordered>
          <tr>
            <th id='padding-column'></th>
            <th id='rank-column'>
              Rank
            </th>
            <th id='padding-column'></th>
            <th id='artist-column'>
              Artist
            </th>
            <th id='genres-column'>
              Genres
            </th>
            <th id='padding-column'></th>
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
                <td></td>
              </tr>
          ))}
        </Table>
    );
}