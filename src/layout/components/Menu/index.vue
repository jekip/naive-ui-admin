<template>
  <NMenu :options="menus" :inverted="inverted" :mode="mode" :collapsed="collapsed" :collapsed-width="64"
         :collapsed-icon-size="20"
         @update:value="clickMenuItem" :default-expanded-keys="openKeys" v-model:value="selectedKeys">
  </NMenu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { generatorMenu } from '@/utils/index'
import { useProjectSettingStore } from "@/store/modules/projectSetting";

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: 'vertical'
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    }
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const asyncRouteStore = useAsyncRouteStore()
    const userStore = useUserStore()
    const settingStore = useProjectSettingStore()
    const { mode } = props
    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[0]?.name]

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: currentRoute.name,
    })

    const inverted = computed(() => {
      return ['dark', 'header-dark'].includes(settingStore.navTheme)
    })

    const menus = computed(() => {
      return generatorMenu(asyncRouteStore.getMenus)
    })

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys()
        state.selectedKeys = currentRoute.name
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == 'login' || props.collapsed) return
        state.openKeys = getOpenKeys()
        state.selectedKeys = currentRoute.name
      }
    )

    // 点击菜单
    const clickMenuItem = (key, item) => {
      if (/http(s)?:/.test(key)) {
        window.open(key)
      } else {
        router.push({ name: key })
      }
    }

    return {
      ...toRefs(state),
      inverted,
      menus,
      mode,
      clickMenuItem
    }
  }
})
</script>
