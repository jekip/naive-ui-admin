<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-background">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="square square-1"></div>
      <div class="square square-2"></div>
      <div class="triangle"></div>
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
    <div class="view-account-container animate__animated animate__fadeInDown">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.loginImage" alt="" />
        </div>
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <div class="view-account-form">
        <h2 class="view-account-title">账号登录</h2>
        <div class="login-welcome">欢迎回来，请登录您的账号</div>
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
          class="login-form"
        >
          <n-form-item path="username" class="username-item">
            <n-input 
              v-model:value="formInline.username" 
              placeholder="请输入用户名"
              class="login-input"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password" class="password-item">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
              class="login-input"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color remember-forgot">
            <div class="flex-between-wrapper">
              <div class="left">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <div class="right">
                <a href="javascript:" class="forgot-link">忘记密码</a>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button 
              type="primary" 
              @click="handleSubmit" 
              size="large" 
              :loading="loading" 
              block
              class="login-button"
            >
              登录
            </n-button>
          </n-form-item>
          <n-form-item class="default-color other-item">
            <div class="flex view-account-other">
              <div class="flex-initial other-text">
                <span>其它登录方式</span>
              </div>
              <div class="social-login">
                <a href="javascript:" class="social-icon">
                  <n-icon size="24" color="#909399">
                    <LogoGithub />
                  </n-icon>
                </a>
                <a href="javascript:" class="social-icon">
                  <n-icon size="24" color="#909399">
                    <LogoFacebook />
                  </n-icon>
                </a>
                <a href="javascript:" class="social-icon">
                  <n-icon size="24" color="#909399">
                    <LogoWechat />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <a href="javascript:" class="register-link">注册账号</a>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook, LogoWechat } from '@vicons/ionicons5';
  import { PageEnum } from '@/enums/pageEnum';
  import { websiteConfig } from '@/config/website.config';
  
  // 添加页面加载动画效果
  onMounted(() => {
    // 聚焦用户名输入框
    setTimeout(() => {
      const usernameInput = document.querySelector('input[placeholder="请输入用户名"]');
      if (usernameInput) {
        (usernameInput as HTMLElement).focus();
      }
    }, 500);
  });
  interface FormState {
    username: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    username: 'admin',
    password: '123456',
    isCaptcha: true,
  });

  const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { username, password } = formInline;
        message.loading('登录中...');
        loading.value = true;

        const params: FormState = {
          username,
          password,
        };

        try {
          const { code, message: msg } = await userStore.login(params);
          message.destroyAll();
          if (code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success('登录成功，即将进入系统');
            if (route.name === LOGIN_NAME) {
              router.replace('/');
            } else router.replace(toPath);
          } else {
            message.info(msg || '登录失败');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-color: #f0f2f5;
    background: linear-gradient(140deg, #e8f1fa, #c2d9ec, #a1c3e0, #80aed3);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSg0NSwgMTQwLCAyNDAsIDAuMSkiIC8+Cjwvc3ZnPg==');
      opacity: 0.6;
      z-index: 0;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNTUgNTUpIiBmaWxsPSJyZ2JhKDQ1LCAxNDAsIDI0MCwgMC4wNSkiIC8+Cjwvc3ZnPg==');
      opacity: 0.8;
      z-index: 0;
    }

    &-container {
      padding: 32px 40px 20px;
      max-width: 580px;
      min-width: 460px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      margin-top: 10vh;
      position: relative;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        transform: translateY(-5px);
      }
      
      // 移除圆形装饰元素
      
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    }

    &-title {
      text-align: center;
      font-size: 22px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: linear-gradient(to right, #2d8cf0, #0081ff);
        border-radius: 2px;
      }
    }
    
    .login-welcome {
      text-align: center;
      font-size: 14px;
      color: #606266;
      margin-bottom: 30px;
      margin-top: 20px;
    }

    &-top {
      padding: 10px 0;
      text-align: center;

      &-logo {
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        
        img {
          height: 60px;
        }
      }

      &-desc {
        font-size: 14px;
        color: #606266;
      }
    }

    &-other {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }

    .login-button {
      margin-top: 10px;
      height: 42px;
      font-size: 16px;
      border-radius: 4px;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
      }
      
      &:focus:not(:active)::after {
        animation: ripple 1s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 0.5;
        }
        20% {
          transform: scale(25, 25);
          opacity: 0.3;
        }
        100% {
          opacity: 0;
          transform: scale(40, 40);
        }
      }
    }
    
    .remember-forgot {
      margin-bottom: 5px;
      
      .flex-between-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      
      .right {
        text-align: right;
      }
    }
    
    .forgot-link {
      color: #606266;
      transition: all 0.2s;
      
      &:hover {
        color: #2d8cf0;
      }
    }

    .social-login {
      display: flex;
      margin-left: 16px;
    }

    .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 12px;
      transition: all 0.3s;
      background-color: rgba(144, 147, 153, 0.1);
      
      &:hover {
        background-color: rgba(45, 140, 240, 0.2);
        transform: scale(1.1);
        
        :deep(svg) {
          color: #2d8cf0 !important;
        }
      }
    }

    .register-link {
      color: #2d8cf0;
      transition: all 0.3s;
      
      &:hover {
        color: #57a3f3;
        text-decoration: underline;
      }
    }
    
    .login-form {
      :deep(.n-form-item-feedback-wrapper) {
        min-height: 18px;
      }
      
      :deep(.n-input) {
        border-radius: 4px;
      }
      
      padding: 0;
    }
    
    .login-input {
      :deep(.n-input__input-el) {
        padding-left: 5px;
      }
      
      :deep(.n-input-wrapper) {
        transition: all 0.3s ease;
      }
      
      &:hover {
        :deep(.n-input-wrapper) {
          box-shadow: 0 0 0 1px rgba(45, 140, 240, 0.2);
        }
      }
    }
    
    .username-item, .password-item {
      margin-bottom: 24px;
    }
    
    .other-text {
      padding-left: 5px;
    }
    
    .other-item {
      margin-bottom: 0;
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg'), 
                        radial-gradient(circle at 10% 20%, rgba(100, 149, 237, 0.25) 0%, rgba(65, 105, 225, 0.2) 40%, rgba(30, 144, 255, 0.1) 90%);
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(45, 140, 240, 0.1), rgba(45, 140, 240, 0.05));
        backdrop-filter: blur(10px);
        z-index: 0;
      }
      
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0icGF0dGVybiIgeD0iMCIgeT0iMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj4KICAgIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSg0NSwgMTQwLCAyNDAsIDAuMikiIC8+CiAgPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+Cjwvc3ZnPg==');
        opacity: 0.3;
        z-index: 0;
        pointer-events: none;
      }
      
      &-container {
        margin-top: 15vh;
        z-index: 1;
        position: relative;
      }
    }
  }

  @media (max-height: 650px) {
    .view-account-container {
      margin-top: 5vh;
    }
  }
  
  .view-account-background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    
    .line {
      position: absolute;
      background: linear-gradient(90deg, rgba(45, 140, 240, 0.2), rgba(0, 129, 255, 0.1));
      
      &-1 {
        width: 300px;
        height: 2px;
        top: 15%;
        right: 5%;
        transform: rotate(-30deg);
        animation: pulse 8s ease-in-out infinite;
      }
      
      &-2 {
        width: 200px;
        height: 2px;
        bottom: 20%;
        left: 10%;
        transform: rotate(45deg);
        animation: pulse 6s ease-in-out infinite 1s;
      }
      
      &-3 {
        width: 150px;
        height: 2px;
        top: 40%;
        left: 5%;
        transform: rotate(-15deg);
        animation: pulse 7s ease-in-out infinite 2s;
      }
    }
    
    .square {
      position: absolute;
      
      &-1 {
        width: 80px;
        height: 80px;
        top: 10%;
        left: 15%;
        background: linear-gradient(45deg, rgba(45, 140, 240, 0.15), rgba(0, 129, 255, 0.05));
        transform: rotate(30deg);
        animation: rotate 15s linear infinite;
      }
      
      &-2 {
        width: 60px;
        height: 60px;
        bottom: 15%;
        right: 10%;
        border: 2px solid rgba(45, 140, 240, 0.1);
        background: transparent;
        animation: rotate 12s linear infinite reverse;
      }
    }
    
    .triangle {
      position: absolute;
      bottom: 30%;
      right: 20%;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 80px solid rgba(45, 140, 240, 0.08);
      animation: float 10s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.6;
      }
      100% {
        opacity: 0.3;
      }
    }
    
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    .wave {
      position: absolute;
      opacity: 0.3;
      transform-origin: bottom left;
      
      &-1 {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0icmdiYSg0NSwgMTQwLCAyNDAsIDAuMikiIGQ9Ik0wLDMyMEMwLDI0MCA0MCwxNjAgODAsMTYwQzEyMCwxNjAgMTYwLDI0MCAyMDAsMjQwQzI0MCwyNDAgMjgwLDE2MCAzMjAsMTYwQzM2MCwxNjAgNDAwLDI0MCA0NDAsMjQwQzQ4MCwyNDAgNTIwLDE2MCA1NjAsMTYwQzYwMCwxNjAgNjQwLDI0MCA2ODAsMjQwQzcyMCwyNDAgNzYwLDE2MCA4MDAsMTYwQzg0MCwxNjAgODgwLDI0MCA5MjAsMjQwQzk2MCwyNDAgMTAwMCwxNjAgMTA0MCwxNjBDMTA4MCwxNjAgMTEyMCwyNDAgMTE2MCwyNDBDMTIwMCwyNDAgMTI0MCwxNjAgMTI4MCwxNjBDMTMyMCwxNjAgMTM2MCwyNDAgMTQwMCwyNDBDMTQ0MCwyNDAgMTQ0MCwxNjAgMTQ0MCwxNjBMMTQ0MCwzMjBMMCwzMjBaIj48L3BhdGg+PC9zdmc+');
        background-size: 100% 120px;
        animation: wave-left-to-right 15s ease-in-out infinite;
        transform: rotate(-2deg);
      }
      
      &-2 {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0icmdiYSg0NSwgMTQwLCAyNDAsIDAuMTUpIiBkPSJNMCwzMjBDMCwyNDAgNjAsMTgwIDEyMCwxODBDMTgwLDE4MCAyNDAsMjQwIDMwMCwyNDBDMzYwLDI0MCA0MjAsMTgwIDQ4MCwxODBDNTQwLDE4MCA2MDAsMjQwIDY2MCwyNDBDNzIwLDI0MCA3ODAsMTgwIDg0MCwxODBDOTAwLDE4MCA5NjAsMjQwIDEwMjAsMjQwQzEwODAsMjQwIDExNDAsMTgwIDEyMDAsMTgwQzEyNjAsMTgwIDEzMjAsMjQwIDEzODAsMjQwQzE0NDAsMjQwIDE0NDAsMTgwIDE0NDAsMTgwTDE0NDAsMzIwTDAsMzIwWiI+PC9wYXRoPjwvc3ZnPg==');
        background-size: 100% 100px;
        animation: wave-left-to-right 18s ease-in-out infinite;
        animation-delay: -5s;
        transform: rotate(-1deg);
      }
      
      &-3 {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0icmdiYSg0NSwgMTQwLCAyNDAsIDAuMSkiIGQ9Ik0wLDMyMEMwLDI2MCAzMCwyMDAgNjAsMjAwQzkwLDIwMCAxMjAsMjYwIDE1MCwyNjBDMTgwLDI2MCAyMTAsMjAwIDI0MCwyMDBDMjcwLDIwMCAzMDAsMjYwIDMzMCwyNjBDMzYwLDI2MCAzOTAsMjAwIDQyMCwyMDBDNDUwLDIwMCA0ODAsMjYwIDUxMCwyNjBDNTQwLDI2MCA1NzAsMjAwIDYwMCwyMDBDNjMwLDIwMCA2NjAsMjYwIDY5MCwyNjBDNzIwLDI2MCA3NTAsMjAwIDc4MCwyMDBDODEwLDIwMCA4NDAsMjYwIDg3MCwyNjBDOTAwLDI2MCA5MzAsMjAwIDk2MCwyMDBDOTkwLDIwMCAxMDIwLDI2MCAxMDUwLDI2MEMxMDgwLDI2MCAxMTEwLDIwMCAxMTQwLDIwMEMxMTcwLDIwMCAxMjAwLDI2MCAxMjMwLDI2MEMxMjYwLDI2MCAxMjkwLDIwMCAxMzIwLDIwMEMxMzUwLDIwMCAxMzgwLDI2MCAxNDEwLDI2MEMxNDQwLDI2MCAxNDQwLDIwMCAxNDQwLDIwMEwxNDQwLDMyMEwwLDMyMFoiPjwvcGF0aD48L3N2Zz4=');
        background-size: 100% 80px;
        animation: wave-left-to-right 20s ease-in-out infinite;
        animation-delay: -2s;
      }
    }
    
    @keyframes wave-left-to-right {
      0% {
        background-position-x: 0;
        background-position-y: 100%;
      }
      50% {
        background-position-x: 720px;
        background-position-y: 50%;
      }
      100% {
        background-position-x: 1440px;
        background-position-y: 0%;
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-15px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
</style>
