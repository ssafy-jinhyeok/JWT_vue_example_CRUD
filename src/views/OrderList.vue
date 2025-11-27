<template>
  <div class="order-list">
    <div class="header-section">
      <h1>주문 목록</h1>
      <router-link to="/orders/create" class="create-btn">주문 생성</router-link>
    </div>

    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-else class="orders-container">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <h3>주문 #{{ order.id }}</h3>
          <span class="order-status" :class="`status-${order.status?.toLowerCase()}`">
            {{ order.status }}
          </span>
        </div>
        <div class="order-info">
          <p><strong>주문자:</strong> {{ order.user?.fullName || order.user?.username }}</p>
          <p><strong>배송지:</strong> {{ order.shippingAddress }}</p>
          <p><strong>총액:</strong> ₩{{ order.totalAmount?.toLocaleString() }}</p>
          <p><strong>주문일:</strong> {{ formatDate(order.createdAt) }}</p>
        </div>
        <div class="order-actions">
          <router-link :to="`/orders/${order.id}`" class="view-btn">상세보기</router-link>
          <button @click="handleCancel(order.id)" class="cancel-btn" v-if="order.status === 'PENDING'">
            취소
          </button>
          <button @click="handleDelete(order.id)" class="delete-btn">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { orders, error, loading } = storeToRefs(orderStore)

onMounted(() => {
  orderStore.fetchAllOrders()
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ko-KR')
}

const handleCancel = async (id) => {
  if (confirm('주문을 취소하시겠습니까?')) {
    try {
      await orderStore.cancelOrder(id)
      alert('주문이 취소되었습니다.')
    } catch (err) {
      alert('주문 취소 중 오류가 발생했습니다.')
    }
  }
}

const handleDelete = async (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await orderStore.deleteOrder(id)
      alert('주문이 삭제되었습니다.')
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
</script>

<style scoped>
.order-list {
  padding: 2rem 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.orders-container {
  display: grid;
  gap: 1.5rem;
}

.order-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status-pending {
  background-color: #f39c12;
  color: white;
}

.status-completed {
  background-color: #27ae60;
  color: white;
}

.status-cancelled {
  background-color: #e74c3c;
  color: white;
}

.order-info p {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.order-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.view-btn {
  background-color: #95a5a6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
}

.view-btn:hover {
  background-color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
