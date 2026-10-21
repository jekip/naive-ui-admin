<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" :title="t('about.title')">
        {{ t('about.intro', { name }) }}
      </n-card>
    </div>
    <n-card
      :bordered="false"
      :title="t('about.projectInfo')"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item :label="t('about.version')">
          <n-tag type="info"> {{ version }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="t('about.lastBuildTime')">
          <n-tag type="info"> {{ lastBuildTime }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item :label="t('about.docs')">
          <div class="flex items-center">
            <a href="https://docs.naiveadmin.com" class="py-2" target="_blank">{{
              t('about.viewDocs')
            }}</a>
          </div>
        </n-descriptions-item>
        <n-descriptions-item :label="t('about.preview')">
          <div class="flex items-center">
            <a href="https://gratis.naiveadmin.com" class="py-2" target="_blank">{{
              t('about.viewPreview')
            }}</a>
          </div>
        </n-descriptions-item>
        <n-descriptions-item :label="t('about.github')">
          <div class="flex items-center">
            <a href="https://github.com/jekip/naive-ui-admin" class="py-2" target="_blank">{{
              t('about.viewGithub')
            }}</a>
          </div>
        </n-descriptions-item>
        <n-descriptions-item :label="t('about.qq')">
          <div class="flex items-center">
            <a href="https://jq.qq.com/?_wv=1027&k=xib9dU4C" class="py-2" target="_blank">{{
              t('about.joinQq')
            }}</a>
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      :title="t('about.devDependencies')"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in devSchema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      :title="t('about.prodDependencies')"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in schema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  export interface schemaItem {
    field: string;
    label: string;
  }

  const { t } = useI18n();
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, name, version } = pkg;

  const schema: schemaItem[] = [];
  const devSchema: schemaItem[] = [];

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: dependencies[key] });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: devDependencies[key] });
  });
</script>

<style lang="less" scoped></style>
