<template>
  <div class="auth-form">
    <h1>회원가입</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">사용자명</label>
        <input id="username" v-model="form.username" type="text" required />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="form.password" type="password" required />
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="fullName">이름</label>
        <input id="fullName" v-model="form.fullName" type="text" required />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '가입 중...' : '회원가입' }}
        </button>
        <router-link to="/login" class="link">로그인</router-link>
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
  password: '',
  email: '',
  fullName: ''
})

const handleSubmit = async () => {
  try {
    await authStore.signup(form.value)
  } catch (err) {
    // Error is handled in the store
  }
}
</script>
