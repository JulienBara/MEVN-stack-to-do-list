<template>
  <v-row>
    <v-checkbox
      v-model="item.isDone"
      dense
      :label="item.label"
      @change="onCheckboxChange"
    />
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    item: { type: Object, required: true },
  },
  methods: {
    onCheckboxChange(newValue, oldValue) {
      axios
        .patch(`http://localhost:3000/to-do-items/${this.item._id}`, { isDone: newValue });
    },
  },
};
</script>

<style scoped>
  .v-input {
    margin-top: 0px;
    padding-top: 0px;
  }
</style>
