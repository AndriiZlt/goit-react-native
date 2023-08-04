const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getUserName = (state) => state.auth.user.name;
const getUserEmail = (state) => state.auth.user.email;
const getToken = (state) => state.auth.token;
const getState = (state) => state.auth;

const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getUserName,
  getToken,
  getState,
};

export default authSelectors;
