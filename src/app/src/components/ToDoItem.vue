<template>
  <v-row
    align="center"
    justify="center">
    <v-checkbox
      v-model="item.isDone"
    ></v-checkbox>
    <div>{{item.label}}</div>
  </v-row>
</template>

<script>
export default {
  props: ['item'],
};
</script>
