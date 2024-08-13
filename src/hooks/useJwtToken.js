import { useState } from 'react';

const init = null;  // Initialize token value

const useJwtToken = (storageVar) => {

  const [token, setToken] = useState(() => {
    // Initialize state with the token from localStorage, if it exists
    return localStorage.getItem(storageVar) ? localStorage.getItem(storageVar) : init;
  });

  const saveToken = (jwtToken) => {
    // Save the token in localStorage
    localStorage.setItem(storageVar, jwtToken);
    // Update the state with the new token
    setToken(jwtToken);
  };

  const removeToken = () => {
    // Remove the token from localStorage
    localStorage.removeItem(storageVar);
    // Update the state to null
    setToken(null);
  };

  return {
    token,
    saveToken,
    removeToken
  };
};

export default useJwtToken;