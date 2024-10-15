<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h6 v-if="admin()" class="card-subtitle mb-2 text-muted">
        <router-link class="card-link" :to="'/users/' + note.owner">
          {{ note.owner }}
        </router-link>
      </h6>
      <p class="card-text">{{ note.title }}</p>
      <p class="card-text">{{ note.content }}</p>
      <p class="card-text">
        <router-link :to="'/notes/' + note.id">
          {{ note.timestamp.toLocaleDateString() }} - {{ note.timestamp.toLocaleTimeString() }}
        </router-link>
      </p>

      <h6 class="card-subtitle mb-2 text-muted">
        <span v-for="(category, index) in note.categories" :key="category.id">
          <span @click="filterByCategory(category.id)" style="cursor: pointer; text-decoration: underline;">
            {{ category.name }}
          </span>
          <span v-if="index < note.categories.length - 1">, </span>
        </span>
      </h6>

      <!-- Mostrar el estado de archivado si 'showArchivedStatus' es true -->
      <p v-if="showArchivedStatus" class="card-text">
        <span v-if="note.archived" class="badge bg-warning">Archivada</span>
        <span v-else class="badge bg-success">No archivada</span>
      </p>

      <div v-if="!admin()">
        <span>Archivada: </span>
        <input type="checkbox" v-model="note.archived" @change="alternarArchivado" />
      </div>

      <!-- Contenedor para los botones -->
      <div class="d-flex align-items-center mt-2">
        <router-link v-if="showDetailsButton" class="btn btn-primary me-1" :to="'/notes/' + note.id">
          Detalles
        </router-link>
        <router-link v-if="showDetailsButton && !admin()" class="btn btn-primary me-1" :to="'/notes/' + note.id + '/edit'">
          Editar
        </router-link>

        <!-- Botón para eliminar la nota -->
        <button v-if="!admin()" class="btn btn-danger" @click="eliminarNota">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
import NoteRepository from "../repositories/NoteRepository.js";
import auth from "@/common/auth.js";

export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    showDetailsButton: {
      type: Boolean,
      default: true
    },
    showArchivedStatus: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    async alternarArchivado() {
      try {
        await NoteRepository.save(this.note);
      } catch (err) {
        console.error(err);
      }
    },
    admin() {
      return auth.isAdmin();
    },
    async eliminarNota() {
      if (confirm(`¿Estás seguro de que deseas eliminar la nota "${this.note.title}"?`)) {
        try {
          await NoteRepository.delete(this.note.id);
          this.$emit('nota-eliminada', this.note.id);
        } catch (err) {
          console.error(err);
        }
      }
    },
    filterByCategory(categoryId) {
      this.$emit('filter-by-category', categoryId); // Emitir evento para filtrar por categoría
    }
  }
};
</script>

<style scoped>
h6::after {
  content: "\00a0 ";
}
</style>
