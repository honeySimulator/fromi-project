<template>
  <div class="flex">

<!--    Список каналов связи-->
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
<!--     Форма для выбранного канала -->
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
import ErrorModal from '../components/ErrorModal.vue';


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
        // Флаг для отслеживания ошибок

        let hasError = false;

        // Перебираем данные из каждой формы
        this.$nextTick(() => {
          this.selectedChannels.forEach((channel) => {
            const form = document.getElementById(channel);
            if (form) {
              const formData = new FormData(form);
              const message = formData.get('message');
              const buttonType = formData.getAll('buttonType')|| null; // Предполагается, что у вас есть поле с типом кнопки, где индекс соответствует кнопке
              const keyboardType = formData.get('keyboardType') || null;
              const buttonText = formData.getAll('button-label') || null;
              const buttons = buttonType.map((type, index) => [type, buttonText[index]]) || null;

              campaignStore.checkData({
                channel,
                message,
                keyboardType,
                buttons,
              });
              if (campaignStore.errorMessage !== null) {
                hasError = true; // флаг ошибки
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

              // Добавляем данные в хранилище pinia
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