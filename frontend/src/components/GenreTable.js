import { Table } from 'react-bootstrap';

export default ({genres}) => {
    return(
      <Table variant='dark' className='table' striped bordered>
        <tr>
          <th id='padding-column'></th>
          <th id='rank-column'>
            Rank
          </th>
          <th id='padding-column'></th>
          <th id='artist-column'>
            Genre
          </th>
          <th id='padding-column'></th>
        </tr>
        {genres.map((genre, i) => (
            <tr key={i}>
              <td></td>
              <td>
                  {i + 1}.
              </td>
              <td></td>
              <td>
                {genre}
              </td>
              <td></td>
            </tr>
        ))}
      </Table>
    );
}