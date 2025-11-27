<template>
  <div class="order-detail">
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="currentOrder" class="order-content">
      <div class="order-header">
        <h1>주문 상세 #{{ currentOrder.id }}</h1>
        <span class="order-status" :class="`status-${currentOrder.status?.toLowerCase()}`">
          {{ currentOrder.status }}
        </span>
      </div>

      <div class="order-section">
        <h3>주문 정보</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>주문자:</strong>
            <span>{{ currentOrder.user?.fullName }} ({{ currentOrder.user?.username }})</span>
          </div>
          <div class="info-item">
            <strong>이메일:</strong>
            <span>{{ currentOrder.user?.email }}</span>
          </div>
          <div class="info-item">
            <strong>배송지:</strong>
            <span>{{ currentOrder.shippingAddress }}</span>
          </div>
          <div class="info-item">
            <strong>주문일:</strong>
            <span>{{ formatDate(currentOrder.createdAt) }}</span>
          </div>
        </div>
      </div>

      <div class="order-section">
        <h3>주문 상품</h3>
        <table class="order-items-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>수량</th>
              <th>단가</th>
              <th>소계</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentOrder.orderItems" :key="item.id">
              <td>{{ item.product?.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>₩{{ item.price?.toLocaleString() }}</td>
              <td>₩{{ (item.quantity * item.price)?.toLocaleString() }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"><strong>총액</strong></td>
              <td><strong>₩{{ currentOrder.totalAmount?.toLocaleString() }}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="order-actions">
        <button
          v-if="currentOrder.status === 'PENDING'"
          @click="handleCancel"
          class="cancel-order-btn"
        >
          주문 취소
        </button>
        <button @click="handleDelete" class="delete-btn">삭제</button>
        <router-link to="/orders" class="back-btn">목록으로</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const { currentOrder, error, loading } = storeToRefs(orderStore)

onMounted(() => {
  orderStore.fetchOrderById(route.params.id)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('ko-KR')
}

const handleCancel = async () => {
  if (confirm('주문을 취소하시겠습니까?')) {
    try {
      await orderStore.cancelOrder(route.params.id)
      alert('주문이 취소되었습니다.')
    } catch (err) {
      alert('주문 취소 중 오류가 발생했습니다.')
    }
  }
}

const handleDelete = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await orderStore.deleteOrder(route.params.id)
      alert('주문이 삭제되었습니다.')
      router.push('/orders')
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
</script>

<style scoped>
.order-detail {
  max-width: 1000px;
  margin: 2rem auto;
}

.order-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ecf0f1;
}

.order-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
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

.order-section {
  margin-bottom: 2rem;
}

.order-section h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #7f8c8d;
}

.order-items-table {
  width: 100%;
  border-collapse: collapse;
}

.order-items-table th,
.order-items-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

.order-items-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  color: #2c3e50;
}

.order-items-table tfoot td {
  font-size: 1.1rem;
  padding-top: 1.5rem;
}

.order-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}

.cancel-order-btn {
  background-color: #f39c12;
  color: white;
}

.cancel-order-btn:hover {
  background-color: #e67e22;
}

.back-btn {
  background-color: #95a5a6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
}

.back-btn:hover {
  background-color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
