import { ref } from 'vue'
import { defineStore } from 'pinia'
import productApi from '@/api/product'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const currentProduct = ref(null)
  const lowStockProducts = ref([])
  const error = ref(null)
  const loading = ref(false)

  // 모든 상품 조회
  async function fetchAllProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getAllProducts()
      products.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || '상품 목록 조회 중 오류가 발생했습니다.'
    } finally {
      loading.value = false
    }
  }

  // ID로 상품 조회
  async function fetchProductById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getProductById(id)
      currentProduct.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '상품 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 상품 생성
  async function createProduct(productData) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.createProduct(productData)
      products.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '상품 생성 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 상품 수정
  async function updateProduct(id, productData) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.updateProduct(id, productData)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '상품 수정 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 상품 삭제
  async function deleteProduct(id) {
    loading.value = true
    error.value = null
    try {
      await productApi.deleteProduct(id)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || '상품 삭제 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 상품 검색
  async function searchProducts(searchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.searchProducts(searchParams)
      products.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '상품 검색 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 카테고리별 조회
  async function fetchProductsByCategory(category) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getProductsByCategory(category)
      products.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '카테고리별 상품 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 재고 업데이트
  async function updateStock(id, quantity) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.updateStock(id, quantity)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '재고 업데이트 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 재고 부족 상품 조회
  async function fetchLowStockProducts(threshold = 10) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getLowStockProducts(threshold)
      lowStockProducts.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '재고 부족 상품 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 카테고리별 가격 조정
  async function adjustCategoryPrice(category, percentage) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.adjustCategoryPrice(category, percentage)
      await fetchAllProducts() // 전체 상품 목록 다시 조회
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '가격 조정 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    currentProduct,
    lowStockProducts,
    error,
    loading,
    fetchAllProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    fetchProductsByCategory,
    updateStock,
    fetchLowStockProducts,
    adjustCategoryPrice
  }
})
