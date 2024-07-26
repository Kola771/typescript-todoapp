<template>
  <div>
    <button @click="handleLogout">Se déconnecter</button>
    <TodosComponent />
  </div>
</template>

<script setup lang="ts">
import TodosComponent from '@/components/TodosComponent.vue';
import { useAuth } from '@/composables/auth';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();

async function handleLogout() {
  await logout()
  router.push({ name: "login" })
}
</script>

<style scoped></style>
