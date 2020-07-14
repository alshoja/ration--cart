import axios from 'axios';
const base_url = 'localhost:3000';
export const login = (name, email, password) => {
  axios.post(`${base_url}/user`, {
    name: 'TestUer',
    email: email,
    password: password
  });
};
