<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain
      :taches="todos"
      @delete-todo="deleteTodo"
      @update-todo="updateTodo"
      @edit-todo="editTodo"
    />

    <TodoFooter :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { ref } from 'vue'
import { nanoid } from 'nanoid'

const todos = ref<Todo[]>([])

// fonction d'ajout d'une tâche
function addTodo(value: string): void {
  if (!value.trim().length) return

  todos.value.push({
    id: nanoid(),
    title: value,
    complete: false
  })
}

// fonction de suppression d'une tâche
function deleteTodo(value: Todo): void {
  todos.value = todos.value.filter((todo) => todo !== value)
}

function updateTodo(todo: Todo, completedValue: boolean) {
  todo.complete = completedValue
}

function editTodo(todo: Todo, value: string) {
  todo.title = value
}
</script>

<style scoped></style>
