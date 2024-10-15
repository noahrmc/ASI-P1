<template>
  <div>
    <h2>Editar Categoría: {{ category.name }}</h2> 
    <form @submit.prevent="updateCategory">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre:</label>
        <input type="text" id="name" v-model="category.name" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
      <router-link to="/categories" class="btn btn-secondary">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import CategoryRepository from "@/repositories/CategoryRepository";

export default {
  data() {
    return {
      category: {
        name: '',
      },
    };
  },
  async mounted() {
    const categoryId = this.$route.params.id;
    this.category = await CategoryRepository.findOne(categoryId);
  },
  methods: {
    async updateCategory() {
      try {
        await CategoryRepository.save(this.category);
        window.alert("Categoría actualizada correctamente.");
        this.$router.push("/categories");
      } catch (err) {
        console.error("Error al actualizar la categoría:", err);
      }
    }
  }
};
</script>
