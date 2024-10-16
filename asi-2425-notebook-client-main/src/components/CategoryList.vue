<template>
  <div class="mb-3">
    <label for="select" class="form-label">Categorías :</label>
    <p></p>
    <p></p>
    <div class="mb-3">
      <router-link class="btn btn-primary" to="/category/new" v-if="admin()">
        Crear categoria
      </router-link>
      <p></p>
      <ul v-for="categorie in categories" :key="categorie.id" :value="categorie">
        <router-link v-if="admin()" :to="'/notes/category/'+ categorie.name ">
          {{ categorie.name }}
          <router-link v-if="admin()" type="submit" class="btn btn-secondary me-2"
            :to="'/category/edit/' + categorie.id">
            Editar
          </router-link>
          <button v-if="admin()" type="submit" class="btn btn-danger me-2" @click.prevent="borrar(categorie)">
            Borrar
          </button>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

import auth from "@/common/auth";
import CategoryRepository from "@/repositories/CategoryRepository";

export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  
  methods: {
    admin() {
      return auth.isAdmin();
    },
    async fetchData() {
      this.categories = await CategoryRepository.findAll();
    },

    async borrar(categorie) {
      if (confirm(`¿Estás seguro de que deseas eliminar la categoría?`)) {
        try {
          await CategoryRepository.delete(categorie.id);
          window.alert("Categoría Eliminada");
          location.reload();
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
  computed: {
    tagsAsString() {
      return this.post?.categories.map((c) => c.name).join(", ");
    },
  },
};
</script>

<style scoped>
h6::after {
  content: "\00a0 ";
}
</style>