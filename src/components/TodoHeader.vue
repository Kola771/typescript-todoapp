<template>
  <header class="header">
    <RouterLink to="/">
      <h1>Todos</h1>
    </RouterLink>

    <input
      type="text"
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="Entrez une tâche"
      @keyup.enter="emit('add-todo', ($event.target as HTMLImageElement).value)"
    />
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'add-todo', value: string): void
}>()
</script>

<style scoped></style>
