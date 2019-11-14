<template>
  <v-container>
    <ToDoItem v-for="item in toDoItemsList" :key="item._id" :item="item"/>
  </v-container>
</template>

<script>
import ToDoItem from '@/components/ToDoItem.vue';

export default {
  components: {
    ToDoItem,
  },
  data: () => ({
    toDoItemsList: [
      {
        isDone: false,
        _id: '5dc5a30f581baa67d8dd6a12',
        label: 'Test',
        createdDate: '2019-11-08T17:17:03.545Z',
        __v: 0,
      },
      {
        isDone: false,
        _id: '5dc99bca8a01386b20f4da2c',
        label: 'test3',
        createdDate: '2019-11-11T17:35:06.633Z',
        __v: 0,
      },
      {
        isDone: false,
        _id: '5dc99c083799f8293c3f2372',
        label: 'faire des pates',
        createdDate: '2019-11-11T17:36:08.186Z',
        __v: 0,
      },
    ],
  }),
  // created() {
  //   this.a = 5;
  // },
};
</script>
