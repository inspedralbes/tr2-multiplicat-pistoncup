<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style>
  /* Estilos CSS para la barra de navegación */
  .navbar {
    background-color: #333;
    padding: 1em;
  }
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  li {
    margin-right: 1em;
  }
  
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  </style>