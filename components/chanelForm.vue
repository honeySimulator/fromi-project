<template>
  <div>
    <!-- Форма для выбранного канала -->
    <h2 class="text-lg font-semibold mb-2">{{ channel }}</h2>
    <form :id="channel">
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Текст сообщения:</label>
        <textarea
            id="message"
            name="message"
            v-model="message"
            rows="4"
            required
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div v-if="channel !== 'СМС'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Тип клавиатуры:</label>
        <label class="block">
          <select v-model="keyboardType" name="keyboardType" @change="resetButtons" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="standard">Стандартная</option>
            <option value="inline">Inline</option>
          </select>
        </label>
      </div>

      <div v-if="channel !== 'СМС' && keyboardType === 'standard'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Кнопки:</label>
        <div v-for="(button, index) in buttons" :key="index" class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Кнопка №{{ index + 1 }}:</label>

          <div v-if="channel === 'Вконтакте'" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mt-2">Тип кнопки:</label>
          <label class="block">
            <select v-model="buttons[index].type" name="buttonType" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
              <option value="quick_response">Кнопка-ответ</option>
              <option value="link">Кнопка-ссылка</option>
            </select>
          </label>
          <div v-if="buttons[index].type === 'link'" class="mb-2">
            <label class="block text-sm font-medium text-gray-700">URL для кнопки-ссылки:</label>
            <input
                type="text"
                name="button-label"
                required
                v-model="buttons[index].url"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="URL"
            />
          </div>
          <div v-if="buttons[index].type === 'quick_response'" class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Текст для кнопки-ответа:</label>
            <input
                type="text"
                name="button-label"
                required
                v-model="buttons[index].url"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Текст кнопки"
            />
          </div>
          </div>
          <div v-else class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mt-2">Тип кнопки:</label>
            <label class="block">
              <select v-model="buttons[index].type" name="buttonType" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                <option value="quick_response">Кнопка-ответ</option>
              </select>
            </label>
            <div v-if="buttons[index].type === 'quick_response'" class="mb-2">
              <label class="block text-sm font-medium text-gray-700">Текст для кнопки-ответа:</label>
              <input
                  type="text"
                  name="button-label"
                  required
                  v-model="buttons[index].url"
                  class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Текст кнопки"
              />
            </div>
          </div>

          <button @click.prevent="removeButton(index)" class="px-2 py-1 text-white bg-red-500 rounded-md">
            Удалить
          </button>
        </div>

        <div class="mb-2">
          <button @click.prevent="addButton" class="px-9 py-2 text-white bg-indigo-600 rounded-md">
            Добавить кнопку
          </button>
        </div>
      </div>

      <div v-if="channel !== 'СМС' && keyboardType === 'inline'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Кнопки:</label>
        <div v-for="(button, index) in buttons" :key="index" class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Кнопка №{{ index + 1 }}:</label>

          <label class="block text-sm font-medium text-gray-700 mt-2">Тип кнопки:</label>
          <label class="block">
            <select v-model="buttons[index].type" name="buttonType" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
              <option value="quick_response">Кнопка-ответ</option>
              <option value="link">Кнопка-ссылка</option>
            </select>
          </label>
          <div v-if="buttons[index].type === 'link'" class="mb-2">
            <label class="block text-sm font-medium text-gray-700">URL для кнопки-ссылки:</label>
            <input
                type="text"
                name="button-label"
                required
                v-model="buttons[index].url"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="URL"
            />
          </div>
          <div v-if="buttons[index].type === 'quick_response'" class="mb-2">
            <label class="block text-sm font-medium text-gray-700">Текст для кнопки-ответа:</label>
            <input
                type="text"
                name="button-label"
                required
                v-model="buttons[index].url"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Текст кнопки"
            />
          </div>
          <button @click.prevent="removeButton(index)" class="px-2 py-1 text-white bg-red-500 rounded-md">
            Удалить
          </button>
        </div>

        <div class="mb-2">
          <button @click.prevent="addButton" class="px-9 py-2 text-white bg-indigo-600 rounded-md">
            Добавить кнопку
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChannelForm",
  props: {
    channel: String,
  },
  data() {
    return {
      message: "",
      keyboardType: "standard",
      buttons: [{ label: "", type: "quick_response", url: "" }],
    };
  },
  computed: {
    formId() {
      // Генерируем уникальный id на основе канала
      return `form_${this.channel}`;
    },
  },
  methods: {
    addButton() {
      this.buttons.push({ label: "", type: "quick_response", url: "" });
    },
    removeButton(index) {
      this.buttons.splice(index, 1);
    },
    resetButtons() {
      // Сбрасываем кнопки при изменении типа клавиатуры
      this.buttons = [{ label: "", type: "quick_response", url: "" }];
    },
    submitForm() {
      console.log(`Канал: ${this.channel}`);
      console.log(`Сообщение: ${this.message}`);
      console.log(`Кнопки:`, this.buttons);

      // Вызываем функцию submit из родительского компонента
      this.$emit("submit", {
        channel: this.channel,
        message: this.message,
        buttons: this.buttons,
      });
    },
  },
};
</script>

<style scoped>

</style>
