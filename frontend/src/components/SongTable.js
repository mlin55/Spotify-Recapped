import { Table } from 'react-bootstrap';

export default ({songs}) => {

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
            <th id='song-column'>
              Song
            </th>
            <th id='artists-column'>
              Artists
            </th>
            <th id='album-column'>
              Album
            </th>
            <th id='padding-column'></th>
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
              </tr>
          ))}
        </Table>
    );
}