import { ref, onMounted } from 'vue'
import { createPinia } from '@pinia/core'
import { io } from 'socket.io-client'

const pinia = createPinia()

export function useSocket() {
  const socket = ref(null)

  onMounted(() => {
    socket.value = io('http://localhost:3000')

    socket.value.on('connect', () => {
      console.log('Connected to the server')
    })

    socket.value.on('disconnect', () => {
      console.log('Disconnected from the server')
    })
  })

  return socket
}
