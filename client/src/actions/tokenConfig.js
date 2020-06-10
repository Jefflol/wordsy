export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().user.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  // If token, add to headers
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}