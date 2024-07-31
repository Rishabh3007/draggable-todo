<script setup>
import AddComponent from '@/components/AddComponent.vue'
import { onMounted, ref } from 'vue'
import ColumnComponent from '@/components/ColumnComponent.vue'
import router from '@/router'

let todosArray = ref([])
const filteredTodos = ref({})

const fetchTodos = async () => {
  try {
    const response = await fetch('/api/todos')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    } else if (response.status == 200) {
      const todosData = await response.json()
      return todosData.data
    }
  } catch (error) {
    console.error('Error fetching todos:', error)
    router.push('/login')
  }
}

const handleAddTodo = (newTodo) => {
  if (!filteredTodos.value[newTodo.status]) {
    filteredTodos.value[newTodo.status] = []
  }

  filteredTodos.value[newTodo.status].push(newTodo)
  filteredTodos.value[newTodo.status] = [...filteredTodos.value[newTodo.status]]

  console.log('Updated filteredTodos:', filteredTodos.value)
}

onMounted(async () => {
  try {
    const data = await fetchTodos()
    todosArray.value = data
    todosArray.value.forEach((todo) => {
      if (!filteredTodos.value[todo.status]) {
        filteredTodos.value[todo.status] = []
      }
      filteredTodos.value[todo.status].push(todo)
    })
  } catch (error) {
    console.error('Error initializing todos:', error)
    router.push('/login')
  }
})
</script>

<template>
  <div>
    <div class="flex flex-row justify-between border-b-2 border-b-slate-200 p-2 shadow-sm">
      <div>
        <h1 class="text-3xl text-slate-600">My Todo's</h1>
      </div>

      <AddComponent @addTodo="handleAddTodo" />
    </div>

    <div class="grid grid-cols-4 gap-5 p-3">
      <ColumnComponent
        v-for="(name, index) in Object.keys(filteredTodos)"
        :key="index"
        :columnName="name"
        :todos="filteredTodos[name]"
      />
    </div>
  </div>
</template>

<style scoped></style>
