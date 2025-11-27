<template>
  <div class="order-form">
    <h1>주문 생성</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="shippingAddress">배송 주소</label>
        <input id="shippingAddress" v-model="form.shippingAddress" type="text" required />
      </div>

      <div class="order-items-section">
        <h3>주문 상품</h3>
        <div v-for="(item, index) in form.orderItems" :key="index" class="order-item">
          <div class="form-group">
            <label>상품</label>
            <select v-model="item.productId" required>
              <option value="">상품 선택</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }} (재고: {{ product.stock }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>수량</label>
            <input v-model.number="item.quantity" type="number" min="1" required />
          </div>
          <button type="button" @click="removeItem(index)" class="remove-btn">제거</button>
        </div>
        <button type="button" @click="addItem" class="add-item-btn">상품 추가</button>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="loading || form.orderItems.length === 0">
          {{ loading ? '주문 중...' : '주문하기' }}
        </button>
        <router-link to="/orders" class="cancel-btn">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { useProductStore } from '@/stores/product'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const orderStore = useOrderStore()
const productStore = useProductStore()
const authStore = useAuthStore()
const { error, loading } = storeToRefs(orderStore)
const { products } = storeToRefs(productStore)
const { user } = storeToRefs(authStore)

const form = ref({
  userId: null,
  shippingAddress: '',
  orderItems: [{ productId: '', quantity: 1 }]
})

onMounted(async () => {
  await productStore.fetchAllProducts()
  if (user.value) {
    form.value.userId = user.value.id
  }
})

const addItem = () => {
  form.value.orderItems.push({ productId: '', quantity: 1 })
}

const removeItem = (index) => {
  if (form.value.orderItems.length > 1) {
    form.value.orderItems.splice(index, 1)
  }
}

const handleSubmit = async () => {
  try {
    await orderStore.createOrder(form.value)
    alert('주문이 생성되었습니다.')
    router.push('/orders')
  } catch (err) {
    alert('주문 생성 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.order-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-form h1 {
  margin-bottom: 1.5rem;
}

.order-items-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.order-items-section h3 {
  margin-bottom: 1rem;
}

.order-item {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
}

.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  height: fit-content;
  margin-top: 1.5rem;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.add-item-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.add-item-btn:hover {
  background-color: #2980b9;
}
</style>
