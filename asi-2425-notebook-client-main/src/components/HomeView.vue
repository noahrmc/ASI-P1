<template>
    <div>
      <div>
        <div><h2>Bienvenido a la aplicación de notas de</h2></div>
        <h2>Noah R. Martín Cambeiro</h2>
        <h3>Esta es la página principal</h3>
  
        <router-link to="/login" custom v-slot="{ href }">
          <a type="button" class="btn btn-secondary" :href="href"> Ir al menú para Iniciar Sesión </a>
        </router-link>
      </div>
    </div>
  </template>
  
 
  <style scoped>
  h1 {
    font-size: 30vh;
  }
  h2,
  h3 {
    opacity: 0.6;
  }
  </style>
  