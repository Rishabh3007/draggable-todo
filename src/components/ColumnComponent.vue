<script setup>
import TodoComponent from './TodoComponent.vue'
import { ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps(['todos', 'columnName'])

const localTodos = ref([])

// Watch for changes in props.todos and update localTodos
watch(
  () => props.todos,
  (newTodos) => {
    localTodos.value = [...newTodos]
  },
  { immediate: true }
)
const findHeading = (ele) => {
  return ele.parentNode.firstChild.innerText
}
const onDragEnd = (e) => {
  const fromStatus = findHeading(e.from)
  const toStatus = findHeading(e.to)
  if (fromStatus != toStatus) {
    const id = e.clonedData.id
    const data = {
      ...e.clonedData,
      status: toStatus
    }
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 bg-slate-100 p-2">
    <div class="text-xl text-slate-600">{{ columnName }}</div>
    <pre>{{ localTodos }}</pre>
    <VueDraggable
      ref="el"
      v-model="localTodos"
      group="statuses"
      class="flex flex-col gap-2"
      ghost-class="ghost"
      @end="(e) => onDragEnd(e)"
    >
      <TodoComponent v-for="todo in localTodos" :key="todo.id" :todo="todo" />
    </VueDraggable>
  </div>
</template>

<style scoped>
/* .ghost {
  opacity: 0;
} */
</style>
