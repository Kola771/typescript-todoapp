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
    />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
