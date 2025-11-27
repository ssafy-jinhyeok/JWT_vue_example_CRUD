import api from '.'

export default {
  // 모든 사용자 조회
  getAllUsers() {
    return api.get('/users')
  },

  // ID로 사용자 조회
  getUserById(id) {
    return api.get(`/users/${id}`)
  },

  // 사용자명으로 조회
  getUserByUsername(username) {
    return api.get(`/users/username/${username}`)
  },

  // 사용자 생성
  createUser(userData) {
    return api.post('/users', userData)
  },

  // 사용자 수정
  updateUser(id, userData) {
    return api.put(`/users/${id}`, userData)
  },

  // 사용자 삭제
  deleteUser(id) {
    return api.delete(`/users/${id}`)
  },

  // 계정 활성화/비활성화
  toggleUserActive(id, active) {
    return api.patch(`/users/${id}/active`, { active })
  },

  // 활성 사용자 수
  getActiveUserCount() {
    return api.get('/users/stats/active-count')
  }
}
