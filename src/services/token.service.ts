const TokenService = {
  getLocalRefreshToken() {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    return user?.refreshToken;
  },

  getLocalAccessToken() {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    return user?.accessToken;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLocalAccessToken(token: any) {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    user.accessToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    return user;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser(user: any) {
    console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem('user');
  }
};

export default TokenService;