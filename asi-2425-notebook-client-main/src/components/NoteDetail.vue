<template>
  <div>
    <h1>Detalle de una nota</h1>
    <div v-if="note">
      <div>
        <span>Título: </span>
        <span>{{ note.title }}</span>
      </div>
      <div>
        <span>Contenido: </span>
        <span>{{ note.content }}</span>
      </div>
      <div v-if="isAdmin">
        <span>Usuario: </span>
        <span>{{ note.owner }}</span>
      </div>
      <div>
        <span>Categorías: </span>
        <span v-if="note.categories.length > 0">
          {{ note.categories.map((c) => c.name).join(", ") }}
        </span>
        <span v-else>No hay categorías asociadas</span>
      </div>
      <div>
        <span>Fecha de creación: </span>
        <span>{{ note.timestamp.toLocaleString() }}</span>
      </div>
      <div>
        <span>Archivada: </span>
        <!-- Mostrar "Sí" o "No" si es admin -->
        <span v-if="isAdmin">{{ note.archived ? 'Sí' : 'No' }}</span>

        <!-- Mostrar el checkbox si no es admin -->
        <input type="checkbox" v-model="note.archived" @change="alternarArchivado" v-else />
      </div>

      <!-- Botón para eliminar la nota -->
      <div class="mt-3">
        <button v-if="!isAdmin" class="btn btn-danger me-2" @click="eliminarNota">Eliminar Nota</button>
        <router-link v-if="!isAdmin" class="btn btn-primary text-center" :to="{ name: 'NoteEdit' }">
          Editar nota
        </router-link>
      </div>
    </div>

    <div v-else>Cargando la nota...</div>
    <div class="mt-3">
      <router-link class="btn btn-primary text-center" :to="{ name: 'NoteList' }">
        Volver a la lista de notas
      </router-link>
    </div>
  </div>
</template>


<script>
import NoteRepository from "../repositories/NoteRepository.js";
import auth from "@/common/auth.js";

export default {
  data() {
    return {
      note: null,
      isAdmin: auth.isAdmin(),
    };
  },
  async mounted() {
    this.note = await NoteRepository.findOne(this.$route.params.noteId);
   
  },
  methods: {
    async alternarArchivado() {
      try {
        await NoteRepository.save(this.note);
      } catch (err) {
        console.error(err);
      }
    },
    async eliminarNota() {
      const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta nota?");
      if (confirmDelete) {
        try {
          await NoteRepository.delete(this.note.id);
          this.$router.push({ name: 'NoteList' });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
