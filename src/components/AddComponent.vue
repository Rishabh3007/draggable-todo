<script setup>
import { reactive } from 'vue'

const todo = reactive({
  status: '',
  task: ''
})

const addTodo = async () => {
  const data = {
    task: todo.task,
    status: todo.status
  }
  await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // console.log(response.status)
  // if (response.status == 201) {
  //   console.log('respoinse is ok')
  //   await fetchTodos()
  // }
}
</script>

<template>
  <div class="flex flex-row gap-3 align-middle">
    <label class="text-xl text-slate-500">
      Todo:
      <input type="text" v-model="todo.task" class="rounded-md border-2 border-slate-300 px-1" />
    </label>
    <label class="text-xl text-slate-500">
      Status:
      <select v-model="todo.status" class="rounded-md border-2 border-slate-300">
        <option disabled value="">Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="completed">Completed</option>
      </select>
    </label>
    <button @click="addTodo" class="rounded-md bg-sky-300 px-4 hover:bg-sky-400">Add</button>
  </div>
</template>
