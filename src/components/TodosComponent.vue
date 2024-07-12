<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="todos" />

    <TodoFooter />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { ref } from 'vue'

const todos = ref<Todo[]>([
  { id: 1, title: 'Tâche 1', complete: true },
  { id: 2, title: 'Tâche 2', complete: false },
  { id: 3, title: 'Tâche 3', complete: false }
])

function addTodo(value: string) {
  todos.value.push({
    id: todos.value.length > 0 ? todos.value.length - 1 : todos.value.length + 1,
    title: value,
    complete: false
  })
}
</script>

<style scoped></style>
