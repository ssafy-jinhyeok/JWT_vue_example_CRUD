<template>
  <div class="user-form">
    <h1>사용자 수정</h1>
    <div v-if="loading && !form.username" class="loading">로딩 중...</div>
    <form v-else @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">사용자명</label>
        <input id="username" v-model="form.username" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label for="fullName">이름</label>
        <input id="fullName" v-model="form.fullName" type="text" required />
      </div>

      <div class="form-group">
        <label for="role">역할</label>
        <select id="role" v-model="form.role" required>
          <option value="ROLE_USER">사용자</option>
          <option value="ROLE_ADMIN">관리자</option>
        </select>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.active" />
          활성 계정
        </label>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '수정 중...' : '수정' }}
        </button>
        <router-link to="/users" class="cancel-btn">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { error, loading } = storeToRefs(userStore)

const form = ref({
  username: '',
  email: '',
  fullName: '',
  role: 'ROLE_USER',
  active: true
})

onMounted(async () => {
  try {
    const user = await userStore.fetchUserById(route.params.id)
    form.value = { ...user }
  } catch (err) {
    alert('사용자를 불러올 수 없습니다.')
    router.push('/users')
  }
})

const handleSubmit = async () => {
  try {
    await userStore.updateUser(route.params.id, form.value)
    alert('사용자가 수정되었습니다.')
    router.push('/users')
  } catch (err) {
    alert('사용자 수정 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-form h1 {
  margin-bottom: 1.5rem;
}

.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group label input[type='checkbox'] {
  width: auto;
  margin-right: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
