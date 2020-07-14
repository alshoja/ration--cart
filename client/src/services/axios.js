import axios from 'axios';

axios.defaults.headers = {
  Accept: 'applicaion/json',
  'Content-Type': 'application/json',
  'X-Auth-Email': JSON.parse(localStorage.getItem('email')),
  'X-Auth-Token': JSON.parse(localStorage.getItem('token'))
};

export const setAxiosIntercepts = () => {
  axios.interceptors.request.use(
    function(config) {
      const token = JSON.parse(localStorage.getItem('token'));
      const email = JSON.parse(localStorage.getItem('email'));
      if (token && email) {
        config.headers = {
          ...axios.defaults.headers,
          'X-Auth-Email': email,
          'X-Auth-Token': token
        };
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      debugger;
      if (response.status === 200) {
        response.success = true;
      }
      if (response.data.notice) {
        // Toastr.show(response.data.notice);
        console.log(response.data);
      }
      return response;
    },
    function(error) {
      debugger;
      // if (401 === error.) {
      //   // Redirect to login route
      //   return Promise.reject(error);
      // } else {
      //   return Promise.reject(error);
      // }
      console.log(error);
    }
  );
};
