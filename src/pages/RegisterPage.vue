<script setup>
import { ref } from 'vue'
import router from '@/router.js'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)

const register = async () => {
  // Perform form validation and registration logic here
  // Example:
  if (name.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
    error.value = 'All fields are required'
    return
  }

  error.value = null // Clear any previous error message

  const data = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    error.value = 'Failed to register. Please try again.'
    return
  }

  const result = await response.json()
  if (result.error) {
    error.value = result.msg
    return
  }

  // Registration successful, redirect to login page or display success message
  // Redirect to login page or display success message
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
      <h2 class="text-center text-2xl font-bold text-gray-700">Register</h2>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-600">Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full rounded border px-4 py-2 text-sm focus:border-blue-300 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-600">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full rounded border px-4 py-2 text-sm focus:border-blue-300 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-600">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full rounded border px-4 py-2 text-sm focus:border-blue-300 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>
      <div v-if="error" class="text-xs text-red-500">{{ error }}</div>
      <button
        @click="register"
        class="w-full rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  </div>
</template>

<style scoped></style>
