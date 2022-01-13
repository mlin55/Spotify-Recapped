import { Button } from 'react-bootstrap';

export default () => {
    return(
        <div className="background" style={{    
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <div id='wrapper'>
            <h1>Statify</h1>
            <h4>Welcome to Statify! Here you can view your top most played songs, artists, and genres from various periods of time. Think of it as a Spotify Wrapped that you can access at any time during the year. Your listening data remains 100% private: we don't save any of it. Just log in with the button below and you're all set!</h4>
            <Button variant='Secondary' className="btn-secondary">
              Login
            </Button>
          </div>
          <div id='footer'>
            <p>Made by Matthew Lin, © 2022. DISCLAIMER: This project is not affiliated with Spotify in any way.</p>
          </div>
        </div>
    );
}