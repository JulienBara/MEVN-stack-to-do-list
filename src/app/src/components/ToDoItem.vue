<template>
  <v-row>
    <v-col
      sm="4"
      offset-sm="4"
    >
      <v-row>
        <v-checkbox
          v-model="item.isDone"
          :label="item.label"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
};
</script>
