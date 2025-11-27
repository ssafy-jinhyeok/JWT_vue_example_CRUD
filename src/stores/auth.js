import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authApi from '@/api/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  // 회원가입
  async function signup(userData) {
    loading.value = true
    error.value = null
    try {
      const response = await authApi.signup(userData)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      router.push('/')
    } catch (err) {
      error.value = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 로그인
  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await authApi.login(credentials)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      router.push('/')
    } catch (err) {
      error.value = err.response?.data?.message || '로그인 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 로그아웃
  async function logout() {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  // 회원탈퇴
  async function deleteAccount() {
    loading.value = true
    error.value = null
    try {
      await authApi.deleteAccount()
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      router.push('/login')
    } catch (err) {
      error.value = err.response?.data?.message || '회원탈퇴 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 현재 사용자 정보 조회
  async function fetchCurrentUser() {
    if (!token.value) return

    loading.value = true
    error.value = null
    try {
      const response = await authApi.getCurrentUser()
      user.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || '사용자 정보 조회 중 오류가 발생했습니다.'
      if (err.response?.status === 401) {
        token.value = null
        localStorage.removeItem('token')
      }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    error,
    loading,
    isAuthenticated,
    signup,
    login,
    logout,
    deleteAccount,
    fetchCurrentUser
  }
})
