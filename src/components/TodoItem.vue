<template>
  <div>
    <li :class="{ completed: todo.complete, editing: editing }">
      <div class="view">
        <input type="checkbox" class="toggle" v-model="isTodoCompleted" />
        <label @dblclick="startEditing">{{ todo.title }}</label>
        <button class="destroy" @click="emit('delete-todo', todo)"></button>
      </div>

      <div class="input-container">
        <input
          type="text"
          @keyup.enter="finishEdit"
          @blur="cancelEdit"
          id="edit-to-input"
          class="edit"
          v-model="editInput"
        />
        <label class="hidden" for="edit-to-input">Editer</label>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { computed, ref } from 'vue'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()

const isTodoCompleted = computed({
  get: () => props.todo.complete,
  set: (val: boolean) => emit('update-todo', props.todo, val)
})

const editing = ref<boolean>(false)
const editText = ref<string>('')
const editInput = computed({
  get: () => props.todo.title,
  set: (val) => {
    editText.value = val
  }
})

function startEditing() {
  editing.value = true
}

function finishEdit() {
  editing.value = false

  editTodo()
}

function editTodo() {
  emit('edit-todo', props.todo, editText.value)

  editText.value = ''
}

function cancelEdit() {
  console.log('cancel edit')
}
</script>

<style scoped></style>
