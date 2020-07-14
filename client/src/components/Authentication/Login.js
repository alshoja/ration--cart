import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { login } from '../../services/api';

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userContext = useContext(UserContext);
  const { authToken, setCredentials } = userContext;

  const handleLogin = async () => {
    const name = 'testuser';
    try {
      let { data } = await login(name, email, password);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finalluy');
    }
  };

  useEffect(() => {
    if (authToken) {
      props.history.push('/');
    }
  }, [authToken]);

  return (
    <div>
      <h1>JWT tokrn</h1>
      <div>
        <input type="text" onChange={event => setEmail(event.target.value)} />
        <br />
        <input
          type="password"
          onChange={event => setPassword(event.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
