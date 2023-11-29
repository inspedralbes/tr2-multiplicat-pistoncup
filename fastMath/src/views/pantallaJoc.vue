<script setup>

// Variable para almacenar los datos obtenidos en el fetch
let fetchedData = null;

// Realiza el fetch en el montaje del componente
onMounted(async () => {
  const response = await fetch('../../datos.json');
  fetchedData = await response.json();
});
</script>

<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
    <h1>hola</h1>
    
    
    <div v-if="fetchedData">
      <h2>Datos obtenidos:</h2>
      <ul>
        <li v-for="item in fetchedData" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>
  