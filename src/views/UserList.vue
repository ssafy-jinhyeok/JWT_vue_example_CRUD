<template>
  <div class="user-list">
    <h1>사용자 관리</h1>

    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-else>
      <div class="stats">
        <p>활성 사용자: {{ activeUserCount }}명</p>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>사용자명</th>
            <th>이름</th>
            <th>이메일</th>
            <th>역할</th>
            <th>상태</th>
            <th>가입일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <span :class="user.active ? 'status-active' : 'status-inactive'">
                {{ user.active ? '활성' : '비활성' }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>
              <div class="action-buttons">
                <router-link :to="`/users/${user.id}/edit`" class="edit-btn">수정</router-link>
                <button @click="toggleActive(user)" class="toggle-btn">
                  {{ user.active ? '비활성화' : '활성화' }}
                </button>
                <button @click="handleDelete(user.id)" class="delete-btn">삭제</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { users, activeUserCount, error, loading } = storeToRefs(userStore)

onMounted(async () => {
  await userStore.fetchAllUsers()
  await userStore.fetchActiveUserCount()
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const toggleActive = async (user) => {
  try {
    await userStore.toggleUserActive(user.id, !user.active)
    await userStore.fetchActiveUserCount()
  } catch (err) {
    alert('상태 변경 중 오류가 발생했습니다.')
  }
}

const handleDelete = async (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await userStore.deleteUser(id)
      await userStore.fetchActiveUserCount()
      alert('사용자가 삭제되었습니다.')
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
</script>

<style scoped>
.user-list {
  padding: 2rem 0;
}

.user-list h1 {
  margin-bottom: 2rem;
}

.stats {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats p {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
}

.users-table {
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
  overflow: hidden;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.users-table th {
  background-color: #34495e;
  color: white;
  font-weight: bold;
}

.users-table tbody tr:hover {
  background-color: #f8f9fa;
}

.status-active {
  color: #27ae60;
  font-weight: bold;
}

.status-inactive {
  color: #e74c3c;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-buttons button,
.action-buttons a {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.toggle-btn {
  background-color: #f39c12;
  color: white;
}

.toggle-btn:hover {
  background-color: #e67e22;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
