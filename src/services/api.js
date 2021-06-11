import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 29000,
})

api.interceptors.request.use(async (config) => {
  const token = await Cookies.get('token')
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

export async function signin({ email, password }) {
  try {
    return await api.post('/login', { email, password })
  } catch (error) {
    return error.response
  }
}


export async function register({ name, email, password }) {
  try {
    const response = await api.post('/user', { name, email, password })
    return response
  } catch (error) {
    return error.response
  }
}

// ORÇAMENTO ============================================================================
export async function orderCreate({ deliveryDate, orderItems, customization, formOfPayment, clientId }) {
  try {
    const response = await api.post('/order', { deliveryDate, orderItems, customization, formOfPayment, clientId })
    console.log(response.status)
    return response
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export async function order() {
  try {
    const response = await api.get('/order')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderById({ orderId }) {
  try {
    const response = await api.get(`/order/${orderId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderEdit({ orderId, deliveryDate, orderItems, customization, status, formOfPayment, clientId }) {
  try {
    const response = await api.put(`/order/${orderId}`, { deliveryDate, orderItems, customization, status, formOfPayment, clientId })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function orderDelete({ orderId }) {
  try {
    const response = await api.delete(`/order/${orderId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

//CLIENTES ===============================================================================
export async function client() {
  try {
    const response = await api.get('/client')
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientById({ clientId }) {
  try {
    const response = await api.get(`/client/${clientId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientCreate({ name, email, cnpj, phone }) {
  try {
    const response = await api.post('/client', { name, email, cnpj, phone })
    return response
  } catch (error) {
    return error.response
  }
}

export async function clientEdit({ name, email, cnpj, phone, clientId }) {
  try {
    const response = await api.put(`/client/${clientId}`, { name, email, cnpj, phone })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function clientDelete({ clientId }) {
  try {
    const response = await api.delete(`/client/${clientId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}