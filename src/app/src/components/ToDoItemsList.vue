<template>
  <v-container>
    <ToDoItem
      v-for="item in toDoItemsList"
      :key="item._id"
      :item="item"
    />
  </v-container>
</template>

<script>
import axios from 'axios';

import ToDoItem from '@/components/ToDoItem.vue';

export default {
  components: {
    ToDoItem,
  },
  data: () => ({
    toDoItemsList: [],
  }),
  mounted() {
    axios
      .get('http://localhost:3000/to-do-items')
      .then((response) => { this.toDoItemsList = response.data; });
  },
};
</script>
