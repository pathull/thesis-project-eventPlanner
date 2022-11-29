import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

import { Login } from './components/Login/Login';
import { NavBar } from './components/NavBar/NavBar';
import { CreateEvent } from './components/CreateEvent/CreateEvent';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="containerRoutes">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/create-event" element={<CreateEvent />} />
            </Routes>
          </div>
          <NavBar />
        </div>
      </BrowserRouter>
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
