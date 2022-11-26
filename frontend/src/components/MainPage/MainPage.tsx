import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      <Link to={'/logout'}>Logout</Link>
    </div>
  );
};
