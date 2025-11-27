import api from '.'

export default {
  // 회원가입
  signup(userData) {
    return api.post('/auth/signup', userData)
  },

  // 로그인
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  // 로그아웃
  logout() {
    return api.post('/auth/logout')
  },

  // 회원탈퇴
  deleteAccount() {
    return api.delete('/auth/account')
  },

  // 현재 사용자 정보 조회
  getCurrentUser() {
    return api.get('/auth/me')
  }
}
