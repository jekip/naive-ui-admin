<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
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
          <div ref="navRef" class="tabs-card-nav" :style="getNavStyle">
            <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
              <template #item="{ element }">
                <div
                  class="tabs-card-scroll-item"
                  :class="{ 'active-item': activeKey === element.path }"
                  @click.stop="goPage(element)"
                  @contextmenu="handleContextMenu($event, element)"
                >
                  <span>{{ element.meta.title }}</span>
                  <n-icon
                    size="14"
                    @click.stop="closeTabItem(element)"
                    v-if="element.path != baseHome"
                  >
                    <CloseOutlined />
                  </n-icon>
                </div>
              </template>
            </Draggable>
          </div>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          @select="closeHandleSelect"
          placement="bottom-end"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn" @click.prevent>
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
    toRaw,
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
  // @ts-ignore
  import Draggable from 'vuedraggable/src/vuedraggable';
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
  import { renderIcon } from '@/utils/index';
  import elementResizeDetectorMaker from 'element-resize-detector';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

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
      const { getDarkTheme } = useDesignSetting();
      const { getNavMode, getHeaderSetting, getMenuSetting, getMultiTabsSetting } =
        useProjectSetting();

      const message = useMessage();
      const route = useRoute();
      const router = useRouter();
      const tabsViewStore = useTabsViewStore();
      const asyncRouteStore = useAsyncRouteStore();
      const navRef: any = ref(null);
      const navScroll: any = ref(null);
      const navWrap: any = ref(null);
      const isCurrent = ref(false);

      const state = reactive({
        activeKey: route.fullPath,
        scrollable: false,
        navStyle: {
          transform: '',
        },
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

      //动态组装样式 菜单缩进
      const getChangeStyle = computed(() => {
        const { collapsed } = props;
        const navMode = unref(getNavMode);
        const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
        const { fixed }: any = unref(getMultiTabsSetting);
        let lenNum =
          navMode === 'horizontal' ? '0px' : collapsed ? `${minMenuWidth}px` : `${menuWidth}px`;
        return {
          left: lenNum,
          width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
        };
      });

      //tags 右侧下拉菜单
      const TabsMenuOptions = computed(() => {
        const isDisabled = unref(tabsList).length <= 1 ? true : false;
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

      let routes: RouteItem[] = [];

      try {
        const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
        routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
      } catch (e) {
        routes = [getSimpleRoute(route)];
      }

      // 初始化标签页
      tabsViewStore.initTabs(routes);

      //监听滚动条
      function onScroll(e) {
        let scrollTop =
          e.target.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop; // 滚动条偏移量
        if (!getHeaderSetting.fixed && getMultiTabsSetting.fixed && scrollTop >= 64) {
          state.isMultiHeaderFixed = true;
        } else {
          state.isMultiHeaderFixed = false;
        }
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
          updateNavScroll();
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
        localStorage.removeItem('routes');
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
      };

      function getCurrentScrollOffset() {
        const { navStyle } = state;
        const transform: any = toRaw(navStyle.transform);
        return transform ? Number(transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
      }

      function setOffset(value) {
        state.navStyle.transform = `translateX(-${value}px)`;
      }

      function scrollPrev() {
        const containerWidth = navScroll.value.offsetWidth;
        const currentOffset = getCurrentScrollOffset();
        if (!currentOffset) return;
        let newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;
        setOffset(newOffset);
      }

      function scrollNext() {
        const navWidth = navRef.value.scrollWidth;
        const containerWidth = navScroll.value.offsetWidth;
        const currentOffset = getCurrentScrollOffset();
        if (navWidth - currentOffset <= containerWidth) return;

        let newOffset =
          navWidth - currentOffset > containerWidth * 2
            ? currentOffset + containerWidth
            : navWidth - containerWidth;

        setOffset(newOffset);
      }

      function updateNavScroll() {
        if (!navRef.value) return;
        let navWidth = navRef.value.scrollWidth;
        let containerWidth = navScroll.value.offsetWidth;
        const currentOffset = getCurrentScrollOffset();
        if (containerWidth < navWidth) {
          state.scrollable = true;
          if (navWidth - currentOffset < containerWidth) {
            setOffset(navWidth - containerWidth);
          }
        } else {
          state.scrollable = false;
          if (currentOffset > 0) {
            setOffset(0);
          }
        }
      }

      function handleResize() {
        updateNavScroll();
      }

      const getNavStyle = computed(() => {
        return state.navStyle;
      });

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
        router.push({ path: fullPath });
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
        navRef,
        navScroll,
        route,
        tabsList,
        baseHome: PageEnum.BASE_HOME_REDIRECT,
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
        getNavStyle,
        handleContextMenu,
        onClickOutside,
        getDarkTheme,
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
          overflow: hidden;
          white-space: nowrap;

          .tabs-card-nav {
            padding-left: 0;
            margin: 0;
            float: left;
            list-style: none;
            box-sizing: border-box;
            position: relative;
            transition: transform 0.5s ease-in-out;
          }

          &-item {
            background: var(--color);
            color: var(--text-color);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;

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
            color: #2d8cf0;
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
      //margin-right: 10px;

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

  .tabs-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 19px 6px 10px;
    left: 200px;
  }

  .tabs-view-fixed-header {
    top: 0;
  }
</style>
