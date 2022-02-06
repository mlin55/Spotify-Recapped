import GithubIcon from '../images/github-icon.png';
import SpotifyIcon from '../images/spotify-icon.png';

export default () => {

    return(
        <div id='icon-container'>
          <p>Built using the Spotify Web API</p>
          <a href='https://developer.spotify.com/documentation/web-api/' target='_blank' ><img src={SpotifyIcon} className='icons' /></a>
          <a href='https://github.com/mlin55/Spotify-Recapped' target='_blank' ><img src={GithubIcon} className='icons' /></a>
        </div>
    );
}