<template>
  <form class="formulario">
    <div class="mb-3">
      <label for="categorie" class="form-label">Nombre de la categoria</label>
      <input type="text" class="form-control" id="tag" v-model="CategoryForm.name" />
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="create()">
      Crear
    </button>
  </form>
  <div class="mt-3">
      <router-link class="btn btn-secondary text-center" :to="{ name: 'CategoryList' }">
        Volver a la lista de notas
      </router-link>
    </div>
</template>

<script>
import CategoryRepository from "@/repositories/CategoryRepository";

export default {
  data() {
    return {
      CategoryForm: {
        name: null,
      },
      errorMessage: '',
    };
  },
  methods: {
    async create() {
      if (!this.CategoryForm.name){

        this.errorMessage = "El nombre de la categoría no puede estar vacío.";
        window.alert("El nombre de la categoría no puede estar vacío.");
        console.log(this.errorMessage);
        return;
      }
      try {
        const response = await CategoryRepository.save(this.CategoryForm);
        console.log(response);
        this.$router.push("/categories");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style scoped>
.formulario {
  margin: 10px auto;
  max-width: 40%;
}
</style>
