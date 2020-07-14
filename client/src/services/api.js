import axios from 'axios';

const base_url = 'http://localhost:3000'; // will be moved to env

export const sinup = (name, email, password) => {
  axios.post(`${base_url}/user`, {
    name: 'TestUer',
    username: email,
    password: password
  });
};
