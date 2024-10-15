<template>
    <div>
      <div>
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
  