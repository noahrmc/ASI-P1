<template>
  <div class="container">
    <h1>Lista de notas de una categoría</h1>
    <h2 class="mt-2">Número de notas de la categoría: {{ notesTotal }}</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
      <div class="mt-4 col mb-3" v-for="note in filteredNotes" :key="note.id">
        <NoteCard :note="note" v-on:filter="filteredNotes" />
      </div>
    </div>
  </div>
</template>

<script>
import NoteRepository from "@/repositories/NoteRepository";
import NoteCard from "@/components/NoteCard.vue";

export default {
  name: "CategoryView.vue",
  data() {
    return {
      notes: [], 
      counter: null,
      selectedCategory: '',
      notesTotal: null,
    };
  },
  components: { NoteCard },
  async mounted() {
    this.selectedCategory = this.$route.params.categoryName;
    this.notes = await NoteRepository.findAll();
    console.log(this.notes);



  },
  computed: {
    filteredNotes() {
      let filtered = this.notes;

      filtered = filtered.filter(note =>
        note.categories.some(category => category.name === this.selectedCategory)
      );

      this.notesTotal = filtered.length
      return filtered;
    }
  },
};
</script>
