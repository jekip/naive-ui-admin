<script setup lang="ts">
  import NewNotifyForm from '@/views/notify/NotifyFormPage/NewNotifyForm.vue';
  import { $ref } from 'vue/macros';
  import { ArriveMedia, ArriveMediaTypes } from '@/api/notify/statusList';
  import BoxForm from '@/views/notify/NotifyFormPage/BoxForm.vue';
  import TrayForm from '@/views/notify/NotifyFormPage/TrayForm.vue';
  import NotifyContainerForm from '@/views/notify/NotifyFormPage/NotifyContainerForm.vue';

  let currentStep = $ref(0);
  let arriveMedia: ArriveMedia = $ref('货柜');

  function firstFormResult(result) {
    console.log(result);
    arriveMedia = result.arriveMedia;
    console.log(arriveMedia);
    currentStep++;
  }

  function secondFormResult(result) {
    console.log(result);
    currentStep++;
  }
</script>

<template>
  <div>
    <new-notify-form v-if="currentStep == 0" @submit="firstFormResult" />
    <template v-if="currentStep === 1">
      <box-form @submit="secondFormResult" v-if="arriveMedia == ArriveMediaTypes.Box" />
      <tray-form v-else-if="arriveMedia == ArriveMediaTypes.Tray" @submit="secondFormResult" />
      <notify-container-form v-else @submit="secondFormResult" />
    </template>
    <template v-else-if="currentStep === 2"> </template>
  </div>
</template>

<style scoped lang="less"></style>
