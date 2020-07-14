import React, { useContext } from 'react';
import { UserContext } from '../../context/user';

const Home = () => {
  const userContext = useContext(UserContext);
  const { authToken, setCredentials } = userContext;

  const handleLogut = () => {
    setCredentials(null, null);
  };

  return (
    <div>
      Home
      <button onClick={handleLogut}>Logut</button>
    </div>
  );
};

export default Home;
