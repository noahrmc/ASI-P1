<template>
  <div class="container">
    <div class="mt-2">
      <router-link v-if="isAdmin" class="btn btn-primary text-center" :to="{ name: 'NoteList' }">
        Volver a la lista de notas
      </router-link>
    </div>
    <h1 class="mt-2">Notas del usuario</h1>
    <h2 class="mt-2">Número de notas del usuario: {{ notesTotal }}</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 mt-5">
      <div class="col mb-3" v-for="note in filteredNotes" :key="note.id">
        <NoteCard :note="note" v-on:filter="filteredNotes"></NoteCard>
      </div>
    </div>
  </div>
</template>

<script>
import NoteRepository from "@/repositories/NoteRepository";
import NoteCard from "@/components/NoteCard.vue";
import auth from "@/common/auth";
import UserRepository from "@/repositories/UserRepository";


export default {
  name: "UserView.vue",
  data() {
    return {
      notes: [],
      categories: [],
      users: [],
      activeUsers: [],
      showArchived: true,
      isAdmin: auth.isAdmin(),
      notesTotal: null
    };
  },
  components: { NoteCard },
  async mounted() {
    if (this.isAdmin) this.users = await UserRepository.findAll();
    this.notes = await NoteRepository.findAll();;
  },
  computed: {
    filteredNotes() {
      let filtered = this.notes;
      if (this.isAdmin) {
        this.users = this.users.filter(user => user.active)
        this.activeUsers = this.users.map(user => user.login)
        filtered = filtered.filter(user => this.activeUsers.includes(user.owner))
      }
      filtered = filtered.filter(note =>
        note.owner === this.$route.params.id)
      console.log(filtered)

      this.notesTotal = filtered.length

      return filtered;

    },
  },
};
</script>