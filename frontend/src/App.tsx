import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Login } from './components/Login/Login';
import { MainPage } from './components/MainPage/MainPage';
import { LogoutButton } from './components/Logout/Logout';

function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/logout" element={<LogoutButton />} />
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
