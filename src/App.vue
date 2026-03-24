<template>
  <v-app>
    <v-main>
      <v-container class="text-center">
        <h1>Vuetify App 🚀</h1>

        <v-btn color="primary" @click="count++"> Click me </v-btn>

        <p>Count: {{ count }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
