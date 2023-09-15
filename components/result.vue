<template>
  <div>
    <h1>Campaign Data</h1>
<!--    Если данные корректны, то они отобразятся в хранилище pinia-->
    <ul>
      <li v-for="(item, index) in campaignData" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { useCampaignStore } from '~/stores/campaign';

export default {
  data() {
    return {
      campaignData: null,
    };
  },
  created() {
    this.campaignData = useCampaignStore().channelsData;
  },
  name: "result"
}

</script>

<style scoped>

</style>