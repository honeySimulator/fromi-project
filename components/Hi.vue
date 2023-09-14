<template>
  <div class="flex">

    <!-- Левая часть страницы: Список каналов связи -->
    <div class="w-1/4 p-4">
      <h2 class="text-lg font-semibold mb-2">Выберите каналы связи</h2>
      <ul>
        <li v-for="(channel, index) in channels" :key="channel">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                v-model="selectedChannels"
                :value="channel"
                class="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span>{{ channel }}</span>
          </label>
        </li>
      </ul>
      <div class="mt-4">
        Выбранные каналы связи по очередности: {{ selectedChannels.join(', ') }}
      </div>
    </div>
    <!-- Правая часть страницы: Форма для выбранного канала -->
    <div class="w-3/4 p-4 flex flex-wrap ">
      <channel-form
          v-for="(channel, index) in selectedChannels"
          :key="index"
          :channel="channel"
          class="pr-4 "
      ></channel-form>
      </div>

    </div>
  <button @click.prevent="submitAllMessages" class="px-10 py-5 bg-green-600 text-white rounded-md">
    Сохранить
  </button>
  <ErrorModal :errorMessage="errorMessage" @close="clearError" v-if="errorMessage" />

  <Result/>
</template>

<script>
import ChannelForm from '../components/chanelForm.vue';
import Result from '../components/result.vue';
import {useCampaignStore} from "../stores/campaign";
import ErrorModal from '../components/ErrorModal.vue'; // Подставьте правильный путь к компоненту


export default {
  name: "Hi.vue",
  components: {
    ChannelForm,
    Result,
    ErrorModal
  },
  data() {
    return {
      channels: ['Telegram', 'Whatsapp', 'VK', 'СМС'],
      selectedChannels: [],
      // formData: {}, // Объект для хранения данных каждой формы

    };
  },
  computed: {
    errorMessage() {
      const campaignStore = useCampaignStore();
      return campaignStore.errorMessage;
    },
  },
  methods: {
    clearError() {
      const campaignStore = useCampaignStore();
      campaignStore.clearError();
    },
      submitAllMessages() {
        console.log(`Нажата кнопка "Сохранить" `);
        const campaignStore = useCampaignStore();
        console.log(`Выбраны ${this.selectedChannels} `);
        // Перебираем данные для каждой формы и вызываем addChannelData
        let hasError = false; // Флаг для отслеживания ошибок

        this.$nextTick(() => {
          this.selectedChannels.forEach((channel) => {
            const form = document.getElementById(channel);
            if (form) {
              const formData = new FormData(form);
              const message = formData.get('message');
              const buttonType = formData.getAll('buttonType'); // Предполагается, что у вас есть поле с типом кнопки, где индекс соответствует кнопке
              const keyboardType = formData.get('keyboardType')
              const buttonText = formData.getAll('button-label');
              const buttons = buttonType.map((type, index) => [type, buttonText[index]]);

              // Выводим данные в консоль
              console.log(`Канал: ${channel}`);
              console.log(`Сообщение: ${message}`);
              console.log(`Тип клавиатуры:`, keyboardType);
              console.log(`Кнопки:`, buttons);
              console.log(`Количество кнопок:`, buttons.length);

              // Добавляем данные в хранилище
              campaignStore.checkData({
                channel,
                message,
                keyboardType,
                buttons,
              });
              if (campaignStore.errorMessage !== null) {
                hasError = true; // Устанавливаем флаг ошибки
              }
            }
          });
          if (hasError) {
            return;
          }
          this.selectedChannels.forEach((channel) => {
            const form = document.getElementById(channel);
            if (form) {
              const formData = new FormData(form);
              const message = formData.get('message');
              const buttonType = formData.getAll('buttonType'); // Предполагается, что у вас есть поле с типом кнопки, где индекс соответствует кнопке
              const keyboardType = formData.get('keyboardType')
              const buttonText = formData.getAll('button-label');
              const buttons = buttonType.map((type, index) => [type, buttonText[index]]);

              // Добавляем данные в хранилище
              campaignStore.addChannelData({
                channel,
                message,
                keyboardType,
                buttons,
              });
            }
          });
        });
      },

  }
}
</script>

<style scoped>

</style>