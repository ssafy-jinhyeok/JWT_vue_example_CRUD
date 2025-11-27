import api from '.'

export default {
  // 모든 주문 조회
  getAllOrders() {
    return api.get('/orders')
  },

  // ID로 주문 조회 (사용자 + 주문 상세 + 상품 정보 포함)
  getOrderById(id) {
    return api.get(`/orders/${id}`)
  },

  // 사용자별 주문 조회
  getOrdersByUserId(userId) {
    return api.get(`/orders/user/${userId}`)
  },

  // 주문 생성
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },

  // 주문 상태 변경
  updateOrderStatus(id, status) {
    return api.patch(`/orders/${id}/status`, { status })
  },

  // 주문 취소
  cancelOrder(id) {
    return api.post(`/orders/${id}/cancel`)
  },

  // 주문 삭제
  deleteOrder(id) {
    return api.delete(`/orders/${id}`)
  },

  // 주문 검색 (동적 SQL)
  searchOrders(searchParams) {
    return api.post('/orders/search', searchParams)
  },

  // 사용자별 총 주문 금액
  getUserTotalAmount(userId) {
    return api.get(`/orders/user/${userId}/total-amount`)
  }
}
