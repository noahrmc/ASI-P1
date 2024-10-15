<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="title" class="form-label">Título</label>
        <input type="text" class="form-control" id="title" v-model="note.title" maxlength=300>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Contenido</label>
        <textarea
          name="content"
          id="content"
          class="form-control"
          rows="3"
          v-model="note.content"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="categories" class="form-label">Categorías</label>
        <select
          id="categories"
          class="form-select"
          v-model="selectedCategories"
          multiple
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div v-if="!newNote">
        <label for="archived" class="form-label">Archivada</label>
        <input type="checkbox" id="archived" v-model="note.archived" />
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button class="btn btn-primary" @click.prevent="guardarNota">Guardar</button>
    </form>
    <router-link class="btn btn-secondary text-center mt-4" :to="{ name: 'NoteList' }">
      Volver a la lista de notas
    </router-link>
  </div>
</template>

<script>
import NoteRepository from "@/repositories/NoteRepository";
import CategoryRepository from "@/repositories/CategoryRepository";

export default {
  data() {
    return {
      note: {
        title: '',
        content: '',
        archived: false,
        categories: []
      },
      categories: [],
      selectedCategories: [],
      newNote: true,
      errorMessage: '',
    };
  },
  async mounted() {
    this.categories = await CategoryRepository.findAll();
    if (this.$route.params.noteId) {
      this.newNote = false;
      this.note = await NoteRepository.findOne(this.$route.params.noteId);
      this.selectedCategories = this.note.categories.map(cat => cat.id);
    }
  },
  methods: {
    async guardarNota() {
      if (!this.note.title && !this.note.content) {
        this.errorMessage = "La nota tiene que tener al menos el título o el contenido.";
        return;
      }
      if (this.note.title.length > 255) {
        this.errorMessage = "El título debe tener menos de 300 caracteres. Son 255 y no 300 porque está limitado en el servidor por el tipo de variable que es. Está limitado correctamente en el formulario, no permite más de 300 carácteres.";
        
        return;
      }
      try {
        this.note.categories = this.selectedCategories.map(id => {
          return this.categories.find(cat => cat.id === id);
        });
        const respuesta = await NoteRepository.save(this.note);
        this.$router.push({ name: "NoteDetail", params: { noteId: respuesta.id } });
      } catch (err) {
        console.error(err);
        this.errorMessage = "Hubo un error al guardar la nota.";
        if (err.response && err.response.data) {
          this.errorMessage = err.response.data.message || this.errorMessage;
        }
      }
    }
  }
};
</script>
