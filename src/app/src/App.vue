<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="red"
      dark
    >
      <v-toolbar-title>To-do list</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <ToDoItemsList />
    </v-content>

    <v-footer
      color="red"
      app
    >
      <span class="white--text">JulienBara&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import ToDoItemsList from '@/components/ToDoItemsList.vue';

export default {
  components: {
    ToDoItemsList,
  },
  props: {
    source: { type: String, default: '' },
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
