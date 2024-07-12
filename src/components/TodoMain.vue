<template>
  <main class="main">
    <ul class="todo-list">
      <TodoItem :todo="todo" v-for="todo in taches" :key="todo.id" />
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import TodoItem from '@/components/TodoItem.vue'

const props = defineProps<{
  taches: Todo[]
}>()
</script>

<style scoped></style>
