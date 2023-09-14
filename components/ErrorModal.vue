<template>
  <div v-if="errorMessage" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-2">Ошибка</h2>
      <p>{{ errorMessage }}</p>
      <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  name: 'ErrorModal'
};
</script>

<style scoped>
/* Стили для модального окна можно добавить здесь, используя классы Tailwind CSS */
</style>
