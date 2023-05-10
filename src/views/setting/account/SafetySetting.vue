<template>
  <n-grid cols="1" responsive="screen" class="-mt-4">
    <n-grid-item>
      <n-list>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="账户密码">
            <template #description
              ><span class="text-gray-400">绑定手机和邮箱，并设置密码，帐号更安全</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="绑定手机">
            <template #description
              ><span class="text-gray-400">已绑定手机号：+86189****4877</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>设置</n-button>
          </template>
          <n-thing title="密保问题">
            <template #description
              ><span class="text-gray-400"
                >未设置密保问题，密保问题可有效保护账户安全</span
              ></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="个性域名">
            <template #description
              ><span class="text-gray-400">已绑定域名：https://www.naiveui.com</span></template
            >
          </n-thing>
        </n-list-item>
      </n-list>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup></script>
