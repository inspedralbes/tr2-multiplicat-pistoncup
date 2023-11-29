import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Función para mostrar los datos obtenidos del fetch
function mostrarDatos(data) {
    // Hacer algo con los datos
    console.log(data)
}

// Fetch los datos de datos.json
fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data)
    })
    .catch(error => {
        // Manejar errores
        console.error('Error al leer los datos:', error)
    })

app.mount('#app')


