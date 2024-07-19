<template>
  <footer v-if="todos.length > 0" class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong>
      tache{{ remaining > 1 ? 's' : '' }} restante{{ remaining > 1 ? 's' : '' }}
    </span>
    <ul class="filters">
      <li>
        <router-link :class="{ selected: route.path === '/' }" to="/">Tous</router-link>
      </li>
      <li>
        <router-link :class="{ selected: route.path === '/waiting' }" to="/waiting"
          >En cours</router-link
        >
      </li>
      <li>
        <router-link :class="{ selected: route.path === '/completed' }" to="/completed"
          >Terminés</router-link
        >
      </li>
    </ul>

    <button
      class="clear-completed"
      @click="emit('delete-completed')"
      v-show="todos.some((todo) => todo.complete)"
    >
      Eff. taches restantes
    </button>
  </footer>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'delete-completed'): void
}>()

const route = useRoute()

const remaining = computed(() => props.todos.filter((el) => !el.complete).length)
</script>

<style scoped></style>
