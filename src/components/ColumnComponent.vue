<script setup>
import TodoComponent from './TodoComponent.vue'
import { ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps(['todos', 'columnName'])
// const emit = defineEmits(['updateStatus'])

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

const onAdd = async (e) => {
  const fromStatus = findHeading(e.from)
  const toStatus = findHeading(e.to)
  if (fromStatus != toStatus) {
    const id = e.clonedData.id
    const data = {
      ...e.clonedData,
      status: toStatus
    }

    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      localTodos.value.forEach((todo) => {
        if (todo.id == id) {
          todo.status = toStatus
        }
      })
    }
  }
}

const handleDeleteTodo = async (todo) => {
  try {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      localTodos.value = localTodos.value.filter((t) => t.id !== todo.id)
    } else {
      throw new Error('Failed to delete todo')
    }
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
}

const handleUpdateTodo = async (todo, newTask) => {
  // console.log(todo, newTask)
  try {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...todo,
        task: newTask
      })
    })

    if (response.ok) {
      localTodos.value.forEach((t) => {
        if (t.id === todo.id) {
          t.task = newTask
        }
      })
    } else {
      throw new Error('Failed to update todo')
    }
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 bg-slate-100 p-2">
    <div class="text-xl text-slate-600">{{ columnName }}</div>
    <!-- <pre>{{ localTodos }}</pre> -->
    <VueDraggable
      ref="el"
      v-model="localTodos"
      group="statuses"
      class="flex flex-col gap-2"
      ghost-class="ghost"
      @add="(e) => onAdd(e)"
    >
      <TodoComponent
        v-for="todo in localTodos"
        :key="todo.id"
        :todo="todo"
        @deleteTodo="handleDeleteTodo"
        @updateTodo="handleUpdateTodo"
      />
    </VueDraggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.2;
  background-color: rgb(126, 126, 126);
  color: rgb(126, 126, 126);
}
</style>
