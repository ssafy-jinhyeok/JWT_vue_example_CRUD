import { ref } from 'vue'
import { defineStore } from 'pinia'
import orderApi from '@/api/order'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const userOrders = ref([])
  const userTotalAmount = ref(0)
  const error = ref(null)
  const loading = ref(false)

  // 모든 주문 조회
  async function fetchAllOrders() {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.getAllOrders()
      orders.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 목록 조회 중 오류가 발생했습니다.'
    } finally {
      loading.value = false
    }
  }

  // ID로 주문 조회 (사용자 + 주문 상세 + 상품 정보 포함)
  async function fetchOrderById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.getOrderById(id)
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 사용자별 주문 조회
  async function fetchOrdersByUserId(userId) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.getOrdersByUserId(userId)
      userOrders.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '사용자별 주문 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 주문 생성
  async function createOrder(orderData) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.createOrder(orderData)
      orders.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 생성 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 주문 상태 변경
  async function updateOrderStatus(id, status) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.updateOrderStatus(id, status)
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 상태 변경 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 주문 취소
  async function cancelOrder(id) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.cancelOrder(id)
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 취소 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 주문 삭제
  async function deleteOrder(id) {
    loading.value = true
    error.value = null
    try {
      await orderApi.deleteOrder(id)
      orders.value = orders.value.filter(o => o.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || '주문 삭제 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 주문 검색
  async function searchOrders(searchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.searchOrders(searchParams)
      orders.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '주문 검색 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 사용자별 총 주문 금액
  async function fetchUserTotalAmount(userId) {
    loading.value = true
    error.value = null
    try {
      const response = await orderApi.getUserTotalAmount(userId)
      userTotalAmount.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '총 주문 금액 조회 중 오류가 발생했습니다.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    userOrders,
    userTotalAmount,
    error,
    loading,
    fetchAllOrders,
    fetchOrderById,
    fetchOrdersByUserId,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    searchOrders,
    fetchUserTotalAmount
  }
})
