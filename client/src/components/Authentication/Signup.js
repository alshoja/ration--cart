import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { Form, Button } from 'react-bootstrap';

const Signup = props => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const userContext = useContext(UserContext);
  const { authToken, setCredentials } = userContext;

  const handleSignup = async () => {
    fakeSignup();
  };

  const fakeSignup = () => {
    setCredentials('ntihin@gmail.com', 'fehfegeffbe-token');
  };

  useEffect(() => {
    if (authToken) {
      props.history.push('/');
    }
  }, [authToken]);

  return (
    <div className="sign-up ">
      <h1>Signup</h1>
      <Form className="col-md-6 mx-auto p-5">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Full Name"
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e => {
              setPasswordConfirmation(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSignup}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
