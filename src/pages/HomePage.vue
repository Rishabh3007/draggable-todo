<script setup>
import AddComponent from '@/components/AddComponent.vue'
import { onMounted, ref } from 'vue'
// import { VueDraggable } from 'vue-draggable-plus'
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
      return todosData
    }
  } catch (error) {
    console.error('Error fetching todos:', error)
    router.push('/login')
  }
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

      <AddComponent />
    </div>

    <div class="grid grid-cols-4 gap-5 p-3">
      <ColumnComponent
        v-for="(name, index) in Object.keys(filteredTodos)"
        :key="index"
        :columnName="name"
        :todos="filteredTodos[name]"
      />
      <!-- <div v-for="(name, index) in Object.keys(filteredTodos)" :key="index">
        <div class="flex flex-col gap-2 bg-slate-100 p-2">
          <div class="text-xl text-slate-600">{{ name }}</div>
          <pre>{{ filteredTodos[name] }}</pre>
          <VueDraggable
            ref="el"
            v-model="filteredTodos[name]"
            group="statuses"
            class="flex flex-col gap-2"
          >
            <div v-for="todo in filteredTodos[name]" :key="todo.id" class="rounded-md bg-white p-2">
              <div>
                <p class="text-md text-slate-600">{{ todo.task }}</p>
              </div>
              <div class="flex flex-row gap-3 py-3 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
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
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </div>
            </div>
          </VueDraggable>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
