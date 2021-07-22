<template>
  <div class="console">
    <!--数据卡片-->
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8" :cols="4">
      <n-grid-item>
        <NCard
          title="访问量"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <CountTo :startVal="1" :endVal="visits.dayVisits" class="text-3xl" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              日同比
              <CountTo :startVal="1" suffix="%" :endVal="visits.rise" />
              <n-icon size="12" style="color: #00ff6f">
                <component is="CaretUpOutlined" />
              </n-icon>
            </div>
            <div class="text-sn">
              周同比
              <CountTo :startVal="1" suffix="%" :endVal="visits.decline" />
              <n-icon size="12" style="color: #ffde66">
                <component is="CaretDownOutlined" />
              </n-icon>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <div class="text-sn"> 总访问量： </div>
              <div class="text-sn">
                <CountTo :startVal="1" :endVal="visits.amount" />
              </div>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="销售额"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">周</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <CountTo prefix="￥" :startVal="1" :endVal="saleroom.weekSaleroom" class="text-3xl" />
          </div>
          <div class="py-2 px-2 flex justify-between">
            <div class="text-sn flex-1">
              <n-progress
                type="line"
                :percentage="saleroom.degree"
                :indicator-placement="'inside'"
                processing
              />
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <div class="text-sn"> 总销售额： </div>
              <div class="text-sn">
                <CountTo prefix="￥" :startVal="1" :endVal="saleroom.amount" />
              </div>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="订单量"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="warning">周</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <CountTo :startVal="1" :endVal="orderLarge.weekLarge" class="text-3xl" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              日同比
              <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
              <n-icon size="12" style="color: #00ff6f">
                <component is="CaretUpOutlined" />
              </n-icon>
            </div>
            <div class="text-sn">
              周同比
              <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
              <n-icon size="12" style="color: #ffde66">
                <component is="CaretDownOutlined" />
              </n-icon>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <div class="text-sn"> 转化率： </div>
              <div class="text-sn">
                <CountTo :startVal="1" suffix="%" :endVal="orderLarge.amount" />
              </div>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="成交额"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="error">月</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <CountTo prefix="￥" :startVal="1" :endVal="volume.weekLarge" class="text-3xl" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              月同比
              <CountTo :startVal="1" suffix="%" :endVal="volume.rise" />
              <n-icon size="12" style="color: #00ff6f">
                <component is="CaretUpOutlined" />
              </n-icon>
            </div>
            <div class="text-sn">
              月同比
              <CountTo :startVal="1" suffix="%" :endVal="volume.decline" />
              <n-icon size="12" style="color: #ffde66">
                <component is="CaretDownOutlined" />
              </n-icon>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <div class="text-sn"> 总成交额： </div>
              <div class="text-sn">
                <CountTo prefix="￥" :startVal="1" :endVal="volume.amount" />
              </div>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>

    <!--导航卡片-->
    <div class="mt-4">
      <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8" :cols="8">
        <n-grid-item v-for="(item, index) in iconList" :key="index">
          <NCard content-style="padding-top: 0;" size="small" :bordered="false">
            <template #footer>
              <div class="cursor-pointer">
                <p class="flex justify-center">
                  <span>
                    <n-icon :size="item.size" class="flex-1" :style="{ color: `${item.color}` }">
                      <component :is="item.icon" v-on="item.eventObject || {}" />
                    </n-icon>
                  </span>
                </p>
                <p class="flex justify-center"
                  ><span>{{ item.title }}</span></p
                >
              </div>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>

    <!--访问量 | 流量趋势-->
    <VisiTab />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import Icons from './components/Icons';
  import VisiTab from './components/VisiTab.vue';
  import { CountTo } from '@/components/CountTo/index';
  import { getConsoleInfo } from '@/api/dashboard/console';

  export default defineComponent({
    components: { ...Icons, VisiTab, CountTo },
    setup() {
      const state = reactive({
        cardHeaderStyle: {
          'border-bottom': '1px solid #eee',
          'font-size': '16px',
        },
        visits: {},
        saleroom: {},
        orderLarge: {},
        volume: {},
      });
      // 图标列表
      const iconList = [
        {
          icon: 'UsergroupAddOutlined',
          size: '32',
          title: '用户',
          color: '#69c0ff',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'BarChartOutlined',
          size: '32',
          title: '分析',
          color: '#69c0ff',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'ShoppingCartOutlined',
          size: '32',
          title: '商品',
          color: '#ff9c6e',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'AccountBookOutlined',
          size: '32',
          title: '订单',
          color: '#b37feb',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'CreditCardOutlined',
          size: '32',
          title: '票据',
          color: '#ffd666',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'MailOutlined',
          size: '32',
          title: '消息',
          color: '#5cdbd3',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'TagsOutlined',
          size: '32',
          title: '标签',
          color: '#ff85c0',
          eventObject: {
            click: () => {},
          },
        },
        {
          icon: 'SettingOutlined',
          size: '32',
          title: '配置',
          color: '#ffc069',
          eventObject: {
            click: () => {},
          },
        },
      ];
      onMounted(async () => {
        const { visits, saleroom, orderLarge, volume } = await getConsoleInfo();
        state.visits = visits;
        state.saleroom = saleroom;
        state.orderLarge = orderLarge;
        state.volume = volume;
      });
      return {
        ...toRefs(state),
        iconList,
      };
    },
  });
</script>

<style lang="less" scoped></style>
