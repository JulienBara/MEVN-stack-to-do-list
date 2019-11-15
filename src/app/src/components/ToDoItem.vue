<template>
  <v-row>
    <v-checkbox
      v-model="item.isDone"
      dense
      :label="item.label"
    />
  </v-row>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
};
</script>

<style scoped>
  .v-input {
    margin-top: 0px;
    padding-top: 0px;
  }
</style>
