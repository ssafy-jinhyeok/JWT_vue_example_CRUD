<template>
  <div class="product-list">
    <div class="header-section">
      <h1>상품 목록</h1>
      <router-link to="/products/create" class="create-btn">상품 등록</router-link>
    </div>

    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">₩{{ product.price?.toLocaleString() }}</p>
        <p class="product-stock" :class="{ 'low-stock': product.stock < 10 }">
          재고: {{ product.stock }}개
        </p>
        <div class="product-actions">
          <router-link :to="`/products/${product.id}`" class="view-btn">상세보기</router-link>
          <router-link :to="`/products/${product.id}/edit`" class="edit-btn">수정</router-link>
          <button @click="handleDelete(product.id)" class="delete-btn">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const { products, error, loading } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchAllProducts()
})

const handleDelete = async (id) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await productStore.deleteProduct(id)
      alert('상품이 삭제되었습니다.')
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
</script>

<style scoped>
.product-list {
  padding: 2rem 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.product-category {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #27ae60;
  margin: 0.5rem 0;
}

.product-stock {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.product-stock.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  background-color: #95a5a6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
}

.view-btn:hover {
  background-color: #7f8c8d;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
