export const setAuthInfo = (token, email) => {
  debugger;
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('email', JSON.stringify(email));
};
