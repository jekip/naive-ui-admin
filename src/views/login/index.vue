<template>
  <div class="login-page" :style="cssVars">
    <!-- 左侧品牌区：静态渐变 + 网格纹理，无动画 -->
    <aside class="login-page__brand">
      <div class="brand">
        <div class="flex items-center">
          <img class="brand__logo" :src="websiteConfig.logo" :alt="websiteConfig.title" />
          <h1 class="brand__title">{{ websiteConfig.title }}</h1>
        </div>
        <p class="brand__desc">{{ t('login.brandDesc') }}</p>
        <ul class="brand__features">
          <li v-for="feature in features" :key="feature" class="brand__feature">
            <span class="brand__dot" />
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
      <p class="brand__copyright">© {{ currentYear }} Naive Ui Admin · Vue 3 + Vite + TypeScript</p>
    </aside>

    <!-- 右侧表单区 -->
    <main class="login-page__main">
      <div class="login-card">
        <h2 class="login-card__title">{{ t('login.title') }}</h2>
        <p class="login-card__subtitle">{{ t('login.subtitle') }}</p>

        <n-form ref="formRef" :model="formInline" :rules="rules" size="large" @keydown.enter="handleSubmit">
          <n-form-item path="username">
            <n-input
              ref="usernameRef"
              v-model:value="formInline.username"
              :placeholder="t('login.usernamePlaceholder')"
              clearable
            >
              <template #prefix>
                <n-icon size="18">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              :placeholder="t('login.passwordPlaceholder')"
            >
              <template #prefix>
                <n-icon size="18">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <div class="login-card__row">
            <n-checkbox v-model:checked="rememberMe">{{ t('login.rememberMe') }}</n-checkbox>
            <a class="login-card__link" href="javascript:">{{ t('login.forgotPassword') }}</a>
          </div>

          <n-button type="primary" size="large" block :loading="loading" @click="handleSubmit">
            {{ t('login.submit') }}
          </n-button>

          <div class="login-card__divider">
            <span>{{ t('login.otherMethods') }}</span>
          </div>

          <div class="login-card__social">
            <a
              v-for="item in socialLogins"
              :key="item.key"
              class="login-card__social-btn"
              href="javascript:"
              :title="item.title"
            >
              <n-icon size="20">
                <component :is="item.icon" />
              </n-icon>
            </a>
          </div>
        </n-form>

        <p class="login-card__footer">
          {{ t('login.noAccount') }}<a class="login-card__link" href="javascript:">{{
            t('login.register')
          }}</a>
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useMessage, useThemeVars } from 'naive-ui';
  import type { FormInst, FormRules, InputInst } from 'naive-ui';
  import {
    LockClosedOutline,
    LogoFacebook,
    LogoGithub,
    LogoWechat,
    PersonOutline,
  } from '@vicons/ionicons5';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PageEnum } from '@/enums/pageEnum';
  import { websiteConfig } from '@/config/website.config';
  import { useUserStore } from '@/store/modules/user';

  interface FormState {
    username: string;
    password: string;
  }

  const { t } = useI18n();

  const features = computed(() => [
    t('login.featureVue'),
    t('login.featureVite'),
    t('login.featureNaive'),
    t('login.featurePractice'),
  ]);

  const socialLogins = computed(() => [
    { key: 'github', title: 'GitHub', icon: LogoGithub },
    { key: 'wechat', title: t('login.wechat'), icon: LogoWechat },
    { key: 'facebook', title: 'Facebook', icon: LogoFacebook },
  ]);

  const themeVars = useThemeVars();
  const message = useMessage();
  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();

  const formRef = ref<FormInst | null>(null);
  const usernameRef = ref<InputInst | null>(null);
  const loading = ref(false);
  const rememberMe = ref(true);
  const currentYear = new Date().getFullYear();

  const formInline = reactive<FormState>({
    username: 'admin',
    password: '123456',
  });

  const rules = computed<FormRules>(() => ({
    username: { required: true, message: t('login.usernameRequired'), trigger: 'blur' },
    password: { required: true, message: t('login.passwordRequired'), trigger: 'blur' },
  }));

  // 主题变量透传给 CSS，登录页跟随系统主题色与深色模式
  const cssVars = computed<Record<string, string>>(() => ({
    '--login-bg': themeVars.value.bodyColor,
    '--login-surface': themeVars.value.cardColor,
    '--login-border': themeVars.value.dividerColor,
    '--login-text': themeVars.value.textColor1,
    '--login-text-secondary': themeVars.value.textColor3,
    '--login-primary': themeVars.value.primaryColor,
    '--login-primary-deep': themeVars.value.primaryColorPressed,
  }));

  async function handleSubmit() {
    if (loading.value) return;
    try {
      await formRef.value?.validate();
    } catch {
      return;
    }

    loading.value = true;
    message.loading(t('login.loggingIn'));
    try {
      const { code, message: msg } = await userStore.login({
        username: formInline.username,
        password: formInline.password,
      });
      if (code === ResultEnum.SUCCESS) {
        const toPath = decodeURIComponent((route.query?.redirect as string) || '/');
        message.success(t('login.loginSuccess'));
        router.replace(route.name === PageEnum.BASE_LOGIN_NAME ? '/' : toPath);
      } else {
        message.info(msg || t('login.loginFailed'));
      }
    } catch {
      message.error(t('login.loginFailedRetry'));
    } finally {
      message.destroyAll();
      loading.value = false;
    }
  }

  onMounted(() => {
    usernameRef.value?.focus();
  });
</script>

<style lang="less" scoped>
  .login-page {
    display: flex;
    min-height: 100vh;
    background: var(--login-bg);
    color: var(--login-text);

    &__brand {
      display: none;
      flex: 1 1 45%;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 56px 40px;
      overflow: hidden;
      color: #fff;
      background:
        linear-gradient(rgb(255 255 255 / 6%) 1px, transparent 1px) 0 0 / 40px 40px,
        linear-gradient(90deg, rgb(255 255 255 / 6%) 1px, transparent 1px) 0 0 / 40px 40px,
        linear-gradient(150deg, #14213d 0%, var(--login-primary-deep) 55%, var(--login-primary) 100%);
    }

    &__main {
      display: flex;
      flex: 1 1 55%;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }
  }

  .brand {
    max-width: 420px;

    &__logo {
      display: block;
      width: 32px;
      margin-right: 10px;
    }

    &__title {
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    &__desc {
      margin: 0 0 40px;
      font-size: 15px;
      line-height: 1.7;
      color: rgb(255 255 255 / 72%);
    }

    &__features {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__feature {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      font-size: 14px;
      color: rgb(255 255 255 / 82%);
    }

    &__dot {
      width: 6px;
      height: 6px;
      margin-right: 10px;
      background: rgb(255 255 255 / 85%);
      border-radius: 50%;
    }

    &__copyright {
      margin: 0;
      font-size: 13px;
      color: rgb(255 255 255 / 55%);
    }
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 40px 36px 32px;
    background: var(--login-surface);
    border: 1px solid var(--login-border);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgb(15 23 42 / 6%);

    &__title {
      margin: 0 0 8px;
      font-size: 24px;
      font-weight: 600;
      color: var(--login-text);
    }

    &__subtitle {
      margin: 0 0 32px;
      font-size: 14px;
      color: var(--login-text-secondary);
    }

    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 4px 0 20px;
    }

    &__link {
      font-size: 14px;
      color: var(--login-primary);
      text-decoration: none;

      &:hover {
        opacity: 0.8;
      }
    }

    &__divider {
      display: flex;
      align-items: center;
      margin: 28px 0 16px;
      font-size: 13px;
      color: var(--login-text-secondary);

      &::before,
      &::after {
        flex: 1;
        height: 1px;
        content: '';
        background: var(--login-border);
      }

      span {
        padding: 0 12px;
      }
    }

    &__social {
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    &__social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: var(--login-text-secondary);
      border: 1px solid var(--login-border);
      border-radius: 50%;

      &:hover {
        color: var(--login-primary);
        border-color: var(--login-primary);
      }
    }

    &__footer {
      margin: 24px 0 0;
      font-size: 14px;
      text-align: center;
      color: var(--login-text-secondary);
    }

    :deep(.n-input) {
      border-radius: 8px;
    }

    :deep(.n-form-item-feedback-wrapper) {
      min-height: 18px;
    }
  }

  @media (min-width: 960px) {
    .login-page__brand {
      display: flex;
    }
  }

  @media (max-height: 720px) {
    .login-page__main {
      padding: 24px;
    }

    .login-card {
      padding: 32px 32px 24px;
    }
  }
</style>
