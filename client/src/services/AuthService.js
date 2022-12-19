import $http from '@/http/http-axios';


class AuthService {
  async registration(email, password) {
    return $http.post('/auth/registration', {email, password});
  }

  async login(email, password) {
    return $http.post('/auth/login', {email, password});
  }

  async logout() {
    return $http.delete('/auth/logout');
  }

  async refresh(email, password) {
    return $http.post('/auth/refresh');
  }
}

export default new AuthService();