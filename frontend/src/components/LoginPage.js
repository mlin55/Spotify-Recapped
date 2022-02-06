import Icons from './Icons';

export default () => {
    console.log(process.env.REACT_APP_BACKEND_URL);

    return(
        <div className="background" style={{    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <div id='wrapper'>
            <Icons />
            <h1 style={{marginBottom: '3%'}}>Spotify Recapped</h1>
            <h4>Welcome to Spotify Recapped! Here you can view your top most played songs, artists, and genres from various periods of time. Additionally, you can compare how your listening preferences match up with the rest of Spotify's userbase. Think of it as a Spotify Wrapped that you can access at any time during the year (hence the name). Don't worry: your listening data remains 100% private and none of it is saved. Just login to get started!</h4>
            <a class="btn btn-secondary" href={process.env.REACT_APP_BACKEND_URL} role="button" id='login-btn'>
              Login
            </a>
            <p style={{marginTop: '5%'}}>NOTE: Currently the Spotify developer dashboard only allows up to 25 unique users per app, so if this doesn't work it's most likely because that quota has been filled. An extension request has been sent, but until Spotify responds there's nothing that can be done. Sorry for the inconvenience :(</p>
          </div>
          <div id='footer'>
            <p>Made by Matthew Lin, © 2022. Special thanks to Spotify for providing the API necessary to build this project.</p>
          </div>
        </div>
    );
}