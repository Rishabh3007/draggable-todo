<script setup>
import { computed, defineProps, ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps(['todo'])
const emit = defineEmits(['updateTodo', 'deleteTodo'])

const isEditMode = ref(false)
const inputRef = ref(null)

const statusClass = computed(() => {
  const statusToClassMap = {
    review: 'bg-review',
    completed: 'bg-completed',
    todo: 'bg-todo',
    'in-progress': 'bg-in-progress'
  }
  return statusToClassMap[props.todo.status] || ''
})

// Optionally, adjust height on mount
onMounted(() => {
  if (inputRef.value) {
    autoResize()
  }
})

// Watch for changes in isEditMode to focus the input when it becomes editable
watch(isEditMode, async (newValue) => {
  if (newValue && inputRef.value) {
    // Set focus on the input
    await nextTick()
    inputRef.value.focus()
  }
})

// Watch isEditMode and adjust textarea size if it's being enabled
watch(isEditMode, (newVal) => {
  if (newVal && inputRef.value) {
    autoResize()
  }
})

const handleUpdate = () => {
  // Emit the updated task to parent component
  console.log(inputRef.value.value)
  emit('updateTodo', props.todo, inputRef.value.value)
  isEditMode.value = false
}

const autoResize = () => {
  const textarea = inputRef.value
  textarea.style.height = 'auto' // Reset height to auto
  textarea.style.height = `${textarea.scrollHeight}px` // Set height based on scrollHeight
}
</script>

<template>
  <div :class="['rounded-md', 'p-2', statusClass]">
    <div>
      <textarea
        ref="inputRef"
        :value="todo.task"
        class="w-full resize-none overflow-hidden bg-inherit outline-none"
        :disabled="!isEditMode"
        @input="autoResize"
      ></textarea>
    </div>
    <div class="flex flex-row items-center gap-3 py-3 text-slate-400">
      <button
        v-if="isEditMode"
        class="text-md rounded-md bg-sky-300 px-4 text-gray-900 hover:bg-sky-400"
        @click="handleUpdate"
      >
        save
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil hover:cursor-pointer hover:text-slate-600"
        viewBox="0 0 16 16"
        @click="() => (isEditMode = !isEditMode)"
      >
        >
        <path
          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash3 hover:cursor-pointer hover:text-slate-600"
        viewBox="0 0 16 16"
        @click="$emit('deleteTodo', todo)"
      >
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      <!-- <button class="rounded-md bg-emerald-300 px-4 hover:bg-emerald-400">Edit</button>
      <button class="rounded-md bg-red-300 px-4 hover:bg-red-400">Delete</button> -->
    </div>
  </div>
</template>

<style scoped></style>
