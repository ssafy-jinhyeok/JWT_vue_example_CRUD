import api from '.'

export default {
  // 모든 상품 조회
  getAllProducts() {
    return api.get('/products')
  },

  // ID로 상품 조회
  getProductById(id) {
    return api.get(`/products/${id}`)
  },

  // 상품 생성
  createProduct(productData) {
    return api.post('/products', productData)
  },

  // 상품 수정
  updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData)
  },

  // 상품 삭제
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  },

  // 상품 검색 (동적 SQL)
  searchProducts(searchParams) {
    return api.post('/products/search', searchParams)
  },

  // 카테고리별 조회
  getProductsByCategory(category) {
    return api.get(`/products/category/${category}`)
  },

  // 재고 업데이트
  updateStock(id, quantity) {
    return api.patch(`/products/${id}/stock`, { quantity })
  },

  // 재고 부족 상품 조회
  getLowStockProducts(threshold = 10) {
    return api.get(`/products/low-stock?threshold=${threshold}`)
  },

  // 카테고리별 가격 조정
  adjustCategoryPrice(category, percentage) {
    return api.patch(`/products/category/${category}/adjust-price`, { percentage })
  }
}
