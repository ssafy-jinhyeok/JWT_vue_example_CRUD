<template>
  <div class="product-form">
    <h1>상품 등록</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">상품명</label>
        <input id="name" v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="category">카테고리</label>
        <select id="category" v-model="form.category" required>
          <option value="">카테고리 선택</option>
          <option value="Electronics">전자제품</option>
          <option value="Clothing">의류</option>
          <option value="Books">도서</option>
          <option value="Food">식품</option>
          <option value="Sports">스포츠</option>
        </select>
      </div>

      <div class="form-group">
        <label for="price">가격</label>
        <input id="price" v-model.number="form.price" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label for="stock">재고</label>
        <input id="stock" v-model.number="form.stock" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label for="description">설명</label>
        <textarea id="description" v-model="form.description" rows="4"></textarea>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '등록 중...' : '등록' }}
        </button>
        <router-link to="/products" class="cancel-btn">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const productStore = useProductStore()
const { error, loading } = storeToRefs(productStore)

const form = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  description: ''
})

const handleSubmit = async () => {
  try {
    await productStore.createProduct(form.value)
    alert('상품이 등록되었습니다.')
    router.push('/products')
  } catch (err) {
    alert('상품 등록 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-form h1 {
  margin-bottom: 1.5rem;
}

.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
