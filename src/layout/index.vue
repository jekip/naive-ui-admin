<template>
  <NLayout class="layout" :position="fixedMenu" has-sider>
    <NLayoutSider
      v-if="navMode === 'vertical'"
      show-trigger
      @collapse="collapsed = true"
      :position="fixedMenu"
      @expand="collapsed = false"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" />
    </NLayoutSider>

    <NLayout :inverted="inverted">
      <NLayoutHeader :inverted="inverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" />
      </NLayoutHeader>

      <NLayoutContent
        class="layout-content"
        :class="{ 'layout-default-background': getDarkTheme === false }"
      >
        <div
          class="layout-content-main"
          :class="{
            'layout-content-main-fix': fixedMulti,
            'fluid-header': fixedHeader === 'static',
          }"
        >
          <TabsView v-if="isMultiTabs" v-model:collapsed="collapsed" />
          <div
            class="main-view"
            :class="{
              'main-view-fix': fixedMulti,
              noMultiTabs: !isMultiTabs,
              'mt-3': !isMultiTabs,
            }"
          >
            <MainView />
          </div>
        </div>

        <NLayoutFooter v-if="getShowFooter">
          <PageFooter />
        </NLayoutFooter>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed, onMounted } from 'vue';
  import { Logo } from './components/Logo';
  import { TabsView } from './components/TagsView';
  import { MainView } from './components/Main';
  import { AsideMenu } from './components/Menu';
  import { PageHeader } from './components/Header';
  import { PageFooter } from './components/Footer';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

  export default defineComponent({
    name: 'Layout',
    components: {
      TabsView,
      MainView,
      PageHeader,
      AsideMenu,
      Logo,
      PageFooter,
    },
    setup() {
      const { getDarkTheme } = useDesignSetting();

      const {
        getShowFooter,
        getNavMode,
        getNavTheme,
        getHeaderSetting,
        getMenuSetting,
        getMultiTabsSetting,
      } = useProjectSetting();

      const navMode = getNavMode;

      const collapsed = ref<boolean>(false);

      const fixedHeader = computed(() => {
        const { fixed } = unref(getHeaderSetting);
        return fixed ? 'absolute' : 'static';
      });

      const fixedMenu = computed(() => {
        const { fixed } = unref(getHeaderSetting);
        return fixed ? 'absolute' : 'static';
      });

      const isMultiTabs = computed(() => {
        return unref(getMultiTabsSetting).show;
      });

      const fixedMulti = computed(() => {
        return unref(getMultiTabsSetting).fixed;
      });

      const inverted = computed(() => {
        return ['dark', 'header-dark'].includes(unref(getNavTheme));
      });

      const leftMenuWidth = computed(() => {
        const { minMenuWidth, menuWidth } = unref(getMenuSetting);
        return collapsed.value ? minMenuWidth : menuWidth;
      });

      const getChangeStyle = computed(() => {
        const { minMenuWidth, menuWidth } = unref(getMenuSetting);
        return {
          'padding-left': collapsed.value ? `${minMenuWidth}px` : `${menuWidth}px`,
        };
      });

      function watchWidth() {
        const Width = document.body.clientWidth;
        if (Width <= 950) {
          collapsed.value = true;
        } else collapsed.value = false;
      }

      onMounted(() => {
        window.addEventListener('resize', watchWidth);
      });

      return {
        fixedMenu,
        fixedMulti,
        fixedHeader,
        collapsed,
        inverted,
        isMultiTabs,
        leftMenuWidth,
        getChangeStyle,
        navMode,
        getShowFooter,
        getDarkTheme,
      };
    },
  });
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    flex-direction: row;
    flex: auto;

    &-default-background {
      background: #f5f7f9;
    }

    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }

    .layout-sider-fix {
      position: fixed;
      top: 0;
      left: 0;
    }

    .ant-layout {
      overflow: hidden;
    }

    .layout-right-fix {
      overflow-x: hidden;
      padding-left: 200px;
      min-height: 100vh;
      transition: all 0.2s ease-in-out;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;
    }

    .n-layout-header.n-layout-header--absolute-positioned {
      z-index: 11;
    }

    .n-layout-footer {
      background: none;
    }
  }

  .layout-content-main {
    margin: 0 10px 10px;
    position: relative;
    padding-top: 64px;
  }

  .layout-content-main-fix {
    padding-top: 64px;
  }

  .fluid-header {
    padding-top: 0px;
  }

  .main-view-fix {
    padding-top: 44px;
  }

  .noMultiTabs {
    padding-top: 0;
  }
</style>
