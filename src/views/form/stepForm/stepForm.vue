<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="分步表单">
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4">
      <n-space vertical class="steps">
        <n-steps :current="currentTab" :status="currentStatus">
          <n-step title="填写转账信息" description="确保填写正确" />
          <n-step title="确认转账信息" description="确认转账信息" />
          <n-step title="完成" description="恭喜您，转账成功" />
        </n-steps>
        <step1 v-if="currentTab === 1" @nextStep="nextStep" />
        <step2 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" />
        <step3 v-if="currentTab === 3" @prevStep="prevStep" @finish="finish" />
      </n-space>
    </n-card>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import step1 from './Step1.vue';
  import step2 from './Step2.vue';
  import step3 from './Step3.vue';

  export default defineComponent({
    components: { step1, step2, step3 },
    setup() {
      const currentTab = ref(1);
      const currentStatus = ref('process');

      function nextStep() {
        if (currentTab.value < 3) {
          currentTab.value += 1;
        }
      }

      function prevStep() {
        if (currentTab.value > 1) {
          currentTab.value -= 1;
        }
      }

      function finish() {
        currentTab.value = 1;
      }

      return {
        currentTab,
        currentStatus,
        nextStep,
        prevStep,
        finish,
      };
    },
  });
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
