<template>
  <div class="page-footer">
    <div class="page-footer-link">
      <a href="https://github.com/jekip/naive-ui-admin" target="_blank">
        {{ t('layout.footer.officialWebsite') }}
      </a>
      <a href="https://github.com/jekip/naive-ui-admin" target="_blank">
        {{ t('layout.footer.community') }}
      </a>
      <a href="https://github.com/jekip/naive-ui-admin/issues" target="_blank">
        {{ t('layout.footer.communication') }}
      </a>
    </div>
    <div class="copyright">{{ t('layout.footer.copyright') }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  defineProps<{ collapsed?: boolean }>();

  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .page-footer {
    //margin: 28px 0 24px 0;
    padding: 0 16px;
    text-align: center;

    a {
      font-size: 14px;
      color: #808695;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #515a6e;
      }
    }

    &-link {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;

      a:not(:last-child) {
        margin-right: 40px;
      }
    }

    .copyright {
      color: #808695;
      font-size: 14px;
    }
  }
</style>
