<template>
  <div class="auth-form">
    <h1>로그인</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">사용자명</label>
        <input id="username" v-model="form.username" type="text" required />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
        <router-link to="/register" class="link">회원가입</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { error, loading } = storeToRefs(authStore)

const form = ref({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    await authStore.login(form.value)
  } catch (err) {
    // Error is handled in the store
  }
}
</script>
