<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="currentProduct" class="product-content">
      <div class="product-header">
        <h1>{{ currentProduct.name }}</h1>
        <span class="category-badge">{{ currentProduct.category }}</span>
      </div>

      <div class="product-info">
        <div class="info-item">
          <strong>가격:</strong>
          <span class="price">₩{{ currentProduct.price?.toLocaleString() }}</span>
        </div>
        <div class="info-item">
          <strong>재고:</strong>
          <span :class="{ 'low-stock': currentProduct.stock < 10 }">
            {{ currentProduct.stock }}개
          </span>
        </div>
        <div class="info-item">
          <strong>설명:</strong>
          <p>{{ currentProduct.description || '설명이 없습니다.' }}</p>
        </div>
      </div>

      <div class="product-actions">
        <router-link :to="`/products/${currentProduct.id}/edit`" class="edit-btn">
          수정
        </router-link>
        <button @click="handleDelete" class="delete-btn">삭제</button>
        <router-link to="/products" class="cancel-btn">목록으로</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { currentProduct, error, loading } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProductById(route.params.id)
})

const handleDelete = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await productStore.deleteProduct(route.params.id)
      alert('상품이 삭제되었습니다.')
      router.push('/products')
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 2rem auto;
}

.product-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ecf0f1;
}

.category-badge {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.product-info {
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 1.5rem;
}

.info-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
}

.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.product-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
