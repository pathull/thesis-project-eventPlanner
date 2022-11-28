import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

import { Login } from './components/Login/Login';
import { NavBar } from './components/NavBar/NavBar';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <BrowserRouter>
          {isAuthenticated ? <NavBar /> : null}
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
