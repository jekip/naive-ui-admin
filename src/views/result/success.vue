<template>
  <n-card :bordered="false" class="proCard">
    <div class="result-box">
      <n-result
        status="success"
        title="操作成功"
        description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，灰色区域可以显示一些补充的信息。"
      >
        <div class="result-box-extra">
          <p>已提交申请，等待财务部门审核。</p>
        </div>
        <template #footer>
          <div class="flex justify-center mb-4">
            <n-space align="center">
              <n-button type="info" @click="goHome">回到首页</n-button>
              <n-button>查看详情</n-button>
              <n-button>打印</n-button>
            </n-space>
          </div>
        </template>
      </n-result>
    </div>
  </n-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    setup() {
      const router = useRouter();
      return {
        goHome() {
          router.push('/');
        },
      };
    },
  });
</script>
<style lang="less" scoped>
  .result-box {
    width: 72%;
    margin: 0 auto;
    text-align: center;
    padding-top: 5px;

    &-extra {
      padding: 24px 40px;
      text-align: left;
      background: #f8f8f9;
      border-radius: 4px;
    }
  }
</style>
