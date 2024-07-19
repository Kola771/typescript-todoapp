<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="filteredTodos" @delete-todo="deleteTodo" @update-todo="updateTodo" @edit-todo="editTodo" />

    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { useRoute } from 'vue-router'

const route = useRoute()

// const todos = ref<Todo[]>([]);
const todos = useStorage<Todo[]>('todoapp-todos', [])

const filters = computed(() => {
  return {
    all: todos,
    waiting: todos.value.filter((todo) => !todo.complete),
    completed: todos.value.filter((todo) => todo.complete)
  }
})

const waitingTodos = computed<Todo[]>(() => filters.value.waiting)
const completedTodos = computed<Todo[]>(() => filters.value.completed)

const filteredTodos = computed(() => {
  switch (route.name) {
    case 'waiting':
      return waitingTodos.value

    case 'completed':
      return completedTodos.value

    default:
      return todos.value
  }
})

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

// Fonction pour dire qu'une tâche est finie
function updateTodo(todo: Todo, completedValue: boolean) {
  todo.complete = completedValue
}

// Fonction pour modifier le titre d'une tâche
function editTodo(todo: Todo, value: string) {
  todo.title = value
}

// Fonction pour retirer toutes les tâches finies
function deleteCompleted() {
  todos.value = todos.value.filter((todo) => !todo.complete)
}
</script>

<style scoped></style>
