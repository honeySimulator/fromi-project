<template>
  <div>
    <h1>Campaign Data</h1>
    <ul>
      <li v-for="(item, index) in campaignData" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { useCampaignStore } from '~/stores/campaign'; // Путь к вашему store

export default {
  data() {
    return {
      campaignData: null,
    };
  },
  created() {
    // Получаем данные из Pinia store и сохраняем их в компоненте
    this.campaignData = useCampaignStore().channelsData;
  },
  name: "result"
}

</script>

<style scoped>

</style>