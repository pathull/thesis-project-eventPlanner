import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Login } from './components/Login/Login';
import { MainPage } from './components/MainPage/MainPage';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
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
