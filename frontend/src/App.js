import './App.css';

import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          {/* Callback from backend redirects here, sends data fetched from Spotify API */}
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </Router>
      
    );
}

export default App;
