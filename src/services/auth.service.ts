import api from './api';
import TokenService from './token.service';

const AuthService = {
  login: async (username: string, password: string) => {
    const response = await api
      .post('/auth/signin', {
        username,
        password
      });
    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }
    return response.data;
  },

  logout: () => {
    TokenService.removeUser();
  },

  register: (username: string, email: string, password: string) => {
    return api.post('/auth/signup', {
      username,
      email,
      password
    });
  },

  getCurrentUser: () => {
    return TokenService.getUser();
  }
};

export default AuthService;