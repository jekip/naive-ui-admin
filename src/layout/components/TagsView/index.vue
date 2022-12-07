<template>
  <div
    class="tabs-view box-border"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
      'tabs-view-dark-background': getDarkTheme === true,
    }"
    :style="getChangeStyle"
  >
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.path }"
                @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)"
              >
                <span>{{ element.meta.title }}</span>
                <n-icon size="14" @click.stop="closeTabItem(element)" v-if="!element.meta.affix">
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          @select="closeHandleSelect"
          placement="bottom-end"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @clickoutside="onClickOutside"
        placement="bottom-start"
        @select="closeHandleSelect"
        :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    computed,
    ref,
    toRefs,
    unref,
    provide,
    watch,
    onMounted,
    nextTick,
  } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storage } from '@/utils/Storage';
  import { TABS_ROUTES } from '@/store/mutation-types';
  import { useTabsViewStore } from '@/store/modules/tabsView';
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
  import { RouteItem } from '@/store/modules/tabsView';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useMessage } from 'naive-ui';
  import Draggable from 'vuedraggable';
  import { PageEnum } from '@/enums/pageEnum';
  import {
    DownOutlined,
    ReloadOutlined,
    CloseOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
    LeftOutlined,
    RightOutlined,
  } from '@vicons/antd';
  import { renderIcon } from '@/utils';
  import elementResizeDetectorMaker from 'element-resize-detector';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useThemeVars } from 'naive-ui';
  import { useGo } from '@/hooks/web/usePage';

  export default defineComponent({
    name: 'TabsView',
    components: {
      DownOutlined,
      CloseOutlined,
      LeftOutlined,
      RightOutlined,
      Draggable,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
    },
    setup(props) {
      const { getDarkTheme, getAppTheme } = useDesignSetting();
      const { getNavMode, getHeaderSetting, getMenuSetting, getMultiTabsSetting, getIsMobile } =
        useProjectSetting();
      const settingStore = useProjectSettingStore();

      const message = useMessage();
      const route = useRoute();
      const router = useRouter();
      const tabsViewStore = useTabsViewStore();
      const asyncRouteStore = useAsyncRouteStore();
      const navScroll: any = ref(null);
      const navWrap: any = ref(null);
      const isCurrent = ref(false);
      const go = useGo();

      const themeVars = useThemeVars();

      const getCardColor = computed(() => {
        return themeVars.value.cardColor;
      });

      const getBaseColor = computed(() => {
        return themeVars.value.textColor1;
      });

      const state = reactive({
        activeKey: route.fullPath,
        scrollable: false,
        dropdownX: 0,
        dropdownY: 0,
        showDropdown: false,
        isMultiHeaderFixed: false,
        multiTabsSetting: getMultiTabsSetting,
      });

      // 获取简易的路由对象
      const getSimpleRoute = (route): RouteItem => {
        const { fullPath, hash, meta, name, params, path, query } = route;
        return { fullPath, hash, meta, name, params, path, query };
      };

      const isMixMenuNoneSub = computed(() => {
        const mixMenu = settingStore.menuSetting.mixMenu;
        const currentRoute = useRoute();
        const navMode = unref(getNavMode);
        if (unref(navMode) != 'horizontal-mix') return true;
        return !(unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
      });

      //动态组装样式 菜单缩进
      const getChangeStyle = computed(() => {
        const { collapsed } = props;
        const navMode = unref(getNavMode);
        const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
        const { fixed }: any = unref(getMultiTabsSetting);
        let lenNum =
          navMode === 'horizontal' || !isMixMenuNoneSub.value
            ? '0px'
            : collapsed
            ? `${minMenuWidth}px`
            : `${menuWidth}px`;

        if (getIsMobile.value) {
          return {
            left: '0px',
            width: '100%',
          };
        }
        return {
          left: lenNum,
          width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
        };
      });

      //tags 右侧下拉菜单
      const TabsMenuOptions = computed(() => {
        const isDisabled = unref(tabsList).length <= 1;
        return [
          {
            label: '刷新当前',
            key: '1',
            icon: renderIcon(ReloadOutlined),
          },
          {
            label: `关闭当前`,
            key: '2',
            disabled: unref(isCurrent) || isDisabled,
            icon: renderIcon(CloseOutlined),
          },
          {
            label: '关闭其他',
            key: '3',
            disabled: isDisabled,
            icon: renderIcon(ColumnWidthOutlined),
          },
          {
            label: '关闭全部',
            key: '4',
            disabled: isDisabled,
            icon: renderIcon(MinusOutlined),
          },
        ];
      });

      let cacheRoutes: RouteItem[] = [];
      const simpleRoute = getSimpleRoute(route);
      try {
        const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
        cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
      } catch (e) {
        cacheRoutes = [simpleRoute];
      }

      // 将最新的路由信息同步到 localStorage 中
      const routes = router.getRoutes();
      cacheRoutes.forEach((cacheRoute) => {
        const route = routes.find((route) => route.path === cacheRoute.path);
        if (route) {
          cacheRoute.meta = route.meta || cacheRoute.meta;
          cacheRoute.name = (route.name || cacheRoute.name) as string;
        }
      });

      // 初始化标签页
      tabsViewStore.initTabs(cacheRoutes);

      //监听滚动条
      function onScroll(e) {
        let scrollTop =
          e.target.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop; // 滚动条偏移量
        state.isMultiHeaderFixed = !!(
          !getHeaderSetting.value.fixed &&
          getMultiTabsSetting.value.fixed &&
          scrollTop >= 64
        );
      }

      window.addEventListener('scroll', onScroll, true);

      // 移除缓存组件名称
      const delKeepAliveCompName = () => {
        if (route.meta.keepAlive) {
          const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
            ?.components?.default.name;
          if (name) {
            asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
              (item) => item != name
            );
          }
        }
      };

      // 标签页列表
      const tabsList: any = computed(() => tabsViewStore.tabsList);
      const whiteList: string[] = [
        PageEnum.BASE_LOGIN_NAME,
        PageEnum.REDIRECT_NAME,
        PageEnum.ERROR_PAGE_NAME,
      ];

      watch(
        () => route.fullPath,
        (to) => {
          if (whiteList.includes(route.name as string)) return;
          state.activeKey = to;
          tabsViewStore.addTabs(getSimpleRoute(route));
          updateNavScroll(true);
        },
        { immediate: true }
      );

      // 在页面关闭或刷新之前，保存数据
      window.addEventListener('beforeunload', () => {
        storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
      });

      // 关闭当前页面
      const removeTab = (route) => {
        if (tabsList.value.length === 1) {
          return message.warning('这已经是最后一页，不能再关闭了！');
        }
        delKeepAliveCompName();
        tabsViewStore.closeCurrentTab(route);
        // 如果关闭的是当前页
        if (state.activeKey === route.fullPath) {
          const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
          state.activeKey = currentRoute.fullPath;
          router.push(currentRoute);
        }
        updateNavScroll();
      };

      // 刷新页面
      const reloadPage = () => {
        delKeepAliveCompName();
        router.push({
          path: '/redirect' + unref(route).fullPath,
        });
      };

      // 注入刷新页面方法
      provide('reloadPage', reloadPage);

      // 关闭左侧
      const closeLeft = (route) => {
        tabsViewStore.closeLeftTabs(route);
        state.activeKey = route.fullPath;
        router.replace(route.fullPath);
        updateNavScroll();
      };

      // 关闭右侧
      const closeRight = (route) => {
        tabsViewStore.closeRightTabs(route);
        state.activeKey = route.fullPath;
        router.replace(route.fullPath);
        updateNavScroll();
      };

      // 关闭其他
      const closeOther = (route) => {
        tabsViewStore.closeOtherTabs(route);
        state.activeKey = route.fullPath;
        router.replace(route.fullPath);
        updateNavScroll();
      };

      // 关闭全部
      const closeAll = () => {
        tabsViewStore.closeAllTabs();
        router.replace(PageEnum.BASE_HOME);
        updateNavScroll();
      };

      //tab 操作
      const closeHandleSelect = (key) => {
        switch (key) {
          //刷新
          case '1':
            reloadPage();
            break;
          //关闭
          case '2':
            removeTab(route);
            break;
          //关闭其他
          case '3':
            closeOther(route);
            break;
          //关闭所有
          case '4':
            closeAll();
            break;
        }
        updateNavScroll();
        state.showDropdown = false;
      };

      /**
       * @param value 要滚动到的位置
       * @param amplitude 每次滚动的长度
       */
      function scrollTo(value: number, amplitude: number) {
        const currentScroll = navScroll.value.scrollLeft;
        const scrollWidth =
          (amplitude > 0 && currentScroll + amplitude >= value) ||
          (amplitude < 0 && currentScroll + amplitude <= value)
            ? value
            : currentScroll + amplitude;
        navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
        if (scrollWidth === value) return;
        return window.requestAnimationFrame(() => scrollTo(value, amplitude));
      }

      function scrollPrev() {
        const containerWidth = navScroll.value.offsetWidth;
        const currentScroll = navScroll.value.scrollLeft;

        if (!currentScroll) return;
        const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
        scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
      }

      function scrollNext() {
        const containerWidth = navScroll.value.offsetWidth;
        const navWidth = navScroll.value.scrollWidth;
        const currentScroll = navScroll.value.scrollLeft;

        if (navWidth - currentScroll <= containerWidth) return;
        const scrollLeft =
          navWidth - currentScroll > containerWidth * 2
            ? currentScroll + containerWidth
            : navWidth - containerWidth;
        scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
      }

      /**
       * @param autoScroll 是否开启自动滚动功能
       */
      async function updateNavScroll(autoScroll?: boolean) {
        await nextTick();
        if (!navScroll.value) return;
        const containerWidth = navScroll.value.offsetWidth;
        const navWidth = navScroll.value.scrollWidth;

        if (containerWidth < navWidth) {
          state.scrollable = true;
          if (autoScroll) {
            let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
            [...tagList].forEach((tag: HTMLElement) => {
              // fix SyntaxError
              if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                tag.scrollIntoView && tag.scrollIntoView();
              }
            });
          }
        } else {
          state.scrollable = false;
        }
      }

      function handleResize() {
        updateNavScroll(true);
      }

      function handleContextMenu(e, item) {
        e.preventDefault();
        isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path;
        state.showDropdown = false;
        nextTick().then(() => {
          state.showDropdown = true;
          state.dropdownX = e.clientX;
          state.dropdownY = e.clientY;
        });
      }

      function onClickOutside() {
        state.showDropdown = false;
      }

      //tags 跳转页面
      function goPage(e) {
        const { fullPath } = e;
        if (fullPath === route.fullPath) return;
        state.activeKey = fullPath;
        go(e, true);
      }

      //删除tab
      function closeTabItem(e) {
        const { fullPath } = e;
        const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath);
        removeTab(routeInfo);
      }

      onMounted(() => {
        onElementResize();
      });

      function onElementResize() {
        let observer;
        observer = elementResizeDetectorMaker();
        observer.listenTo(navWrap.value, handleResize);
      }

      return {
        ...toRefs(state),
        navWrap,
        navScroll,
        route,
        tabsList,
        goPage,
        closeTabItem,
        closeLeft,
        closeRight,
        closeOther,
        closeAll,
        reloadPage,
        getChangeStyle,
        TabsMenuOptions,
        closeHandleSelect,
        scrollNext,
        scrollPrev,
        handleContextMenu,
        onClickOutside,
        getDarkTheme,
        getAppTheme,
        getCardColor,
        getBaseColor,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tabs-view {
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.2s ease-in-out;

    &-main {
      height: 32px;
      display: flex;
      max-width: 100%;
      min-width: 100%;

      .tabs-card {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;

        .tabs-card-prev,
        .tabs-card-next {
          width: 32px;
          text-align: center;
          position: absolute;
          line-height: 32px;
          cursor: pointer;

          .n-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 32px;
          }
        }

        .tabs-card-prev {
          left: 0;
        }

        .tabs-card-next {
          right: 0;
        }

        .tabs-card-next-hide,
        .tabs-card-prev-hide {
          display: none;
        }

        &-scroll {
          white-space: nowrap;
          overflow: hidden;

          &-item {
            background: v-bind(getCardColor);
            color: v-bind(getBaseColor);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            flex: 0 0 auto;

            span {
              float: left;
              vertical-align: middle;
            }

            &:hover {
              color: #515a6e;
            }

            .n-icon {
              height: 22px;
              width: 21px;
              margin-right: -6px;
              position: relative;
              vertical-align: middle;
              text-align: center;
              color: #808695;

              &:hover {
                color: #515a6e !important;
              }

              svg {
                height: 21px;
                display: inline-block;
              }
            }
          }

          .active-item {
            color: v-bind(getAppTheme);
          }
        }
      }

      .tabs-card-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }
    }

    .tabs-close {
      min-width: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: var(--color);
      border-radius: 2px;
      cursor: pointer;

      &-btn {
        color: var(--color);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .tabs-view-default-background {
    background: #f5f7f9;
  }

  .tabs-view-dark-background {
    background: #101014;
  }

  .tabs-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 10px 6px 10px;
    left: 200px;
  }

  .tabs-view-fixed-header {
    top: 0;
  }
</style>
