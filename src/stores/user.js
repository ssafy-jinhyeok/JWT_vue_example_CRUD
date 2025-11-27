import { ref } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const currentUser = ref(null)
  const activeUserCount = ref(0)
  const error = ref(null)
  const loading = ref(false)

  // 모든 사용자 조회
  async function fetchAllUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await userApi.getAllUsers()
      users.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || '사용자 목록 조회 중 오류가 발생했습니다.'
    } finally {
      loading.value = false
    }
  }

  // ID로 사용자 조회
  async function fetchUserById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await userApi.getUserById(id)
      currentUser.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '사용자 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 사용자 수정
  async function updateUser(id, userData) {
    loading.value = true
    error.value = null
    try {
      const response = await userApi.updateUser(id, userData)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '사용자 수정 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 사용자 삭제
  async function deleteUser(id) {
    loading.value = true
    error.value = null
    try {
      await userApi.deleteUser(id)
      users.value = users.value.filter(u => u.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || '사용자 삭제 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 계정 활성화/비활성화
  async function toggleUserActive(id, active) {
    loading.value = true
    error.value = null
    try {
      const response = await userApi.toggleUserActive(id, active)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '계정 상태 변경 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 활성 사용자 수 조회
  async function fetchActiveUserCount() {
    try {
      const response = await userApi.getActiveUserCount()
      activeUserCount.value = response.data
    } catch (err) {
      console.error('활성 사용자 수 조회 오류:', err)
    }
  }

  return {
    users,
    currentUser,
    activeUserCount,
    error,
    loading,
    fetchAllUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    toggleUserActive,
    fetchActiveUserCount
  }
})
