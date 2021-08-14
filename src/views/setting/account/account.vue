<template>
  <div>
    <n-grid :x-gap="24">
      <n-grid-item span="6">
        <n-card :bordered="false" size="small" class="proCard">
          <n-thing
            class="thing-cell"
            v-for="item in typeTabList"
            :key="item.key"
            :class="{ 'thing-cell-on': type === item.key }"
            @click="switchType(item)"
          >
            <template #header>{{ item.name }}</template>
            <template #description>{{ item.desc }}</template>
          </n-thing>
        </n-card>
      </n-grid-item>
      <n-grid-item span="18">
        <n-card :bordered="false" size="small" :title="typeTitle" class="proCard">
          <BasicSetting v-if="type === 1" />
          <SafetySetting v-if="type === 2" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import BasicSetting from './BasicSetting.vue';
  import SafetySetting from './SafetySetting.vue';

  const typeTabList = [
    {
      name: '基本设置',
      desc: '个人账户信息设置',
      key: 1,
    },
    {
      name: '安全设置',
      desc: '密码，邮箱等设置',
      key: 2,
    },
  ];

  const type = ref(1);
  const typeTitle = ref('基本设置');

  function switchType(e) {
    type.value = e.key;
    typeTitle.value = e.name;
  }
</script>
<style lang="less" scoped>
  .thing-cell {
    margin: 0 -16px 10px;
    padding: 5px 16px;

    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }

  .thing-cell-on {
    background: #f0faff;
    color: #2d8cf0;

    ::v-deep(.n-thing-main .n-thing-header .n-thing-header__title) {
      color: #2d8cf0;
    }

    &:hover {
      background: #f0faff;
    }
  }
</style>
