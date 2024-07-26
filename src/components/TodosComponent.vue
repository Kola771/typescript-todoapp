<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="filteredTodos" @toggle-all-input="toggleAllInput" @delete-todo="deleteTodo"
      @update-todo="updateTodo" @edit-todo="editTodo" />

    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { computed, onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { useRoute } from 'vue-router'
import { useTodos } from '@/composables/todos'

const { createTodo, changeTodo, removeTodo, getTodos, getTodo, firebaseTodos } = useTodos();

const route = useRoute()

// const todos = ref<Todo[]>([]);
const todos = computed(() => firebaseTodos.value);

onMounted(async () => {
  await getTodos();
})

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
});

// fonction d'ajout d'une tâche
async function addTodo(value: string): void {
  if (!value.trim().length) return

  todos.value.push({
    id: nanoid(),
    title: value,
    complete: false
  });

  await createTodo(value);
}

// fonction de suppression d'une tâche
async function deleteTodo(todo: Todo): void {
  await removeTodo(todo);
}

// Fonction pour dire qu'une tâche est finie
async function updateTodo(todo: Todo, completedValue: boolean) {
  changeTodo(todo, {
    ...todo,
    complete: completedValue
  });
}

// Fonction pour modifier le titre d'une tâche
function editTodo(todo: Todo, title: string) {
  changeTodo(todo, {
    ...todo,
    title: title
  });
}

// Fonction pour retirer toutes les tâches finies
function deleteCompleted() {
  const todosToDelete = todos.value = todos.value.filter((todo) => todo.complete === true)

  todosToDelete.forEach(async (todo) => {
    await removeTodo(todo)
  })
}

function toggleAllInput(value: boolean) {
  todos.value.forEach((todo) => {
    todo.complete = value
  })
}
</script>

<style scoped></style>
