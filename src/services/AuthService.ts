class AuthService {
  login(user: any) {
    if (user.username === 'joe@example.com' && user.password === 'password1') {
      localStorage.setItem(
        'user',
        JSON.stringify({
          authenticated: true,
          token: Math.random()
            .toString(36)
            .substring(7),
        })
      );
      return Promise.resolve(user);
    }
    return Promise.reject(new Error('permission denied'));
  }

  logout() {
    localStorage.removeItem('user');
  }
}
export default new AuthService();
