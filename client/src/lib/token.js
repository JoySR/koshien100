export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const removeToken = () => {
  localStorage.setItem('token', '');
}

export const getToken = () => {
  return localStorage.getItem('token');
}
