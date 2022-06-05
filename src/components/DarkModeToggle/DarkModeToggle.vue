<template>
  <div class="dark-switch">
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-switch
          v-model:value="designStore.darkTheme"
          @update:value="handleChange"
          class="dark-theme-switch"
        >
          <template #checked>
            <n-icon size="14" color="#ffd93b">
              <SunnySharp />
            </n-icon>
          </template>
          <template #unchecked>
            <n-icon size="14" color="#ffd93b">
              <Moon />
            </n-icon>
          </template>
        </n-switch>
      </template>
      <span>{{ designStore.darkTheme ? '深' : '浅' }}色主题</span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { Moon, SunnySharp } from '@vicons/ionicons5';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { updateDarkTheme } from '@/theme';

  const designStore = useDesignSettingStore();

  const handleChange = (value: boolean) => {
    updateDarkTheme(value);
  };
</script>

<style lang="less" scoped>
  .dark-switch .n-switch {
    ::v-deep(.n-switch__rail) {
      background-color: #000e1c;
    }
  }
</style>
