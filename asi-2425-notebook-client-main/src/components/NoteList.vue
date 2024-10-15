<template>
  <div class="container">
    <div class="float-end">
      <router-link v-if="!isAdmin" class="btn btn-primary mt-2" :to="{ name: 'NoteCreate' }">
        Crear nueva nota
      </router-link>
    </div>
    <h1>Lista de notas</h1>

    <!-- Selector para filtrar por archivadas, sin archivar, o todas -->
    <div class="mb-3 d-flex align-items-center">
      <label for="filter" class="form-label me-2">Filtrar notas:</label>
      <select id="filter" class="form-select me-2" v-model="filterOption">
        <option value="unarchived">Sin archivar</option>
        <option value="all">Todas</option>
        <option value="archived">Archivadas</option>
      </select>

      <label for="categoryFilter" class="form-label me-2">Filtrar por categoría:</label>
      <select id="categoryFilter" class="form-select" v-model="selectedCategory">
        <option value="all">Todas</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <h5>Notas visibles: {{ filteredNotes.length }}</h5>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
      <div class="col mb-3" v-for="note in filteredNotes" :key="note.id">
        <NoteCard :note="note" :showArchivedStatus="filterOption === 'all'" @nota-eliminada="handleNotaEliminada"
          @filter-by-category="updateCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import NoteRepository from "../repositories/NoteRepository";
import CategoryRepository from "../repositories/CategoryRepository";
import UserRepository from "../repositories/UserRepository";
import NoteCard from "@/components/NoteCard.vue";
import auth from "@/common/auth.js";

export default {
  components: {
    NoteCard
  },
  data() {
    return {
      notes: [],
      categories: [],
      filterOption: auth.isAdmin() ? 'all' : 'unarchived',
      selectedCategory: 'all',
      isAdmin: auth.isAdmin(),
      filter: true,
      activeUsers: [],
      users: [],
    };
  },
  async mounted() {


    const userId = this.$route.params.id;
    this.notes = await NoteRepository.findAll(userId);
    if (this.isAdmin) this.users = await UserRepository.findAll()

    this.filter = true

    this.categories = await CategoryRepository.findAll();
  },
  computed: {
    filteredNotes() {
      let filtered = this.notes;

      if (this.isAdmin) {
        this.users = this.users.filter(user => user.active)
        this.activeUsers = this.users.map(user => user.login)
        filtered = filtered.filter(user => this.activeUsers.includes(user.owner))
      }

      // Filtrar notas según la opción seleccionada
      if (this.filterOption === 'archived') {
        filtered = filtered.filter(note => note.archived);
      } else if (this.filterOption === 'unarchived') {
        filtered = filtered.filter(note => !note.archived);
      }

      // Filtrar por categoría si hay una seleccionada

      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(note =>
          note.categories.some(category => category.id === this.selectedCategory)
        );
      }


      return filtered;
    }
  },
  methods: {
    handleNotaEliminada(noteId) {
      this.notes = this.notes.filter(note => note.id !== noteId);
    },
    updateCategory(categoryId) {
      this.selectedCategory = categoryId; 
    }
  }
};
</script>
