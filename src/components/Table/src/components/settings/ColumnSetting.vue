<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div class="cursor-pointer table-toolbar-right-icon">
        <n-popover trigger="click" :width="230" class="toolbar-popover" placement="bottom-end">
          <template #trigger>
            <n-icon size="18">
              <SettingOutlined />
            </n-icon>
          </template>
          <template #header>
            <div class="table-toolbar-inner-popover-title">
              <n-space>
                <n-checkbox v-model:checked="checkAll" @update:checked="onCheckAll"
                  >列展示</n-checkbox
                >
                <n-checkbox v-model:checked="selection" @update:checked="onSelection"
                  >勾选列</n-checkbox
                >
                <n-button text type="info" size="small" class="mt-1" @click="resetColumns"
                  >重置</n-button
                >
              </n-space>
            </div>
          </template>
          <div class="table-toolbar-inner">
            <n-checkbox-group v-model:value="checkList" @update:value="onChange">
              <Draggable
                v-model="columnsList"
                animation="300"
                item-key="key"
                filter=".no-draggable"
                :move="onMove"
                @end="draggableEnd"
              >
                <template #item="{ element }">
                  <div
                    class="table-toolbar-inner-checkbox"
                    :class="{
                      'table-toolbar-inner-checkbox-dark': getDarkTheme === true,
                      'no-draggable': element.draggable === false,
                    }"
                  >
                    <span
                      class="drag-icon"
                      :class="{ 'drag-icon-hidden': element.draggable === false }"
                    >
                      <n-icon size="18">
                        <DragOutlined />
                      </n-icon>
                    </span>
                    <n-checkbox :value="element.key" :label="element.title" />
                    <div class="fixed-item">
                      <n-tooltip trigger="hover" placement="bottom">
                        <template #trigger>
                          <n-icon
                            size="18"
                            :color="element.fixed === 'left' ? '#2080f0' : undefined"
                            class="cursor-pointer"
                            @click="fixedColumn(element, 'left')"
                          >
                            <VerticalRightOutlined />
                          </n-icon>
                        </template>
                        <span>固定到左侧</span>
                      </n-tooltip>
                      <n-divider vertical />
                      <n-tooltip trigger="hover" placement="bottom">
                        <template #trigger>
                          <n-icon
                            size="18"
                            :color="element.fixed === 'right' ? '#2080f0' : undefined"
                            class="cursor-pointer"
                            @click="fixedColumn(element, 'right')"
                          >
                            <VerticalLeftOutlined />
                          </n-icon>
                        </template>
                        <span>固定到右侧</span>
                      </n-tooltip>
                    </div>
                  </div>
                </template>
              </Draggable>
            </n-checkbox-group>
          </div>
        </n-popover>
      </div>
    </template>
    <span>列设置</span>
  </n-tooltip>
</template>

<script lang="ts">
  import { ref, defineComponent, reactive, unref, toRaw, computed, toRefs, watchEffect } from 'vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import { cloneDeep } from 'lodash-es';
  import {
    SettingOutlined,
    DragOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
  } from '@vicons/antd';
  import Draggable from 'vuedraggable/src/vuedraggable';
  import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

  interface Options {
    title: string;
    key: string;
    fixed?: boolean | 'left' | 'right';
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      SettingOutlined,
      DragOutlined,
      Draggable,
      VerticalRightOutlined,
      VerticalLeftOutlined,
    },
    setup() {
      const { getDarkTheme } = useDesignSetting();
      const table: any = useTableContext();
      const columnsList = ref<Options[]>([]);
      const cacheColumnsList = ref<Options[]>([]);

      const state = reactive({
        selection: false,
        checkAll: true,
        checkList: [],
        defaultCheckList: [],
      });

      const getSelection = computed(() => {
        return state.selection;
      });

      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });

      //初始化
      function init() {
        const columns: any[] = getColumns();
        const checkList: any = columns.map((item) => item.key);
        state.checkList = checkList;
        state.defaultCheckList = checkList;
        const newColumns = columns.filter((item) => item.key != 'action' && item.title != '操作');
        if (!columnsList.value.length) {
          columnsList.value = cloneDeep(newColumns);
          cacheColumnsList.value = cloneDeep(newColumns);
        }
      }

      //切换
      function onChange(checkList) {
        if (state.selection) {
          checkList.unshift('selection');
        }
        setColumns(checkList);
      }

      //设置
      function setColumns(columns) {
        table.setColumns(columns);
      }

      //获取
      function getColumns() {
        let newRet: any[] = [];
        table.getColumns().forEach((item) => {
          newRet.push({ ...item });
        });
        return newRet;
      }

      //重置
      function resetColumns() {
        state.checkList = [...state.defaultCheckList];
        state.checkAll = true;
        let cacheColumnsKeys: any[] = table.getCacheColumns();
        let newColumns = cacheColumnsKeys.map((item) => {
          return {
            ...item,
            fixed: undefined,
          };
        });
        setColumns(newColumns);
        columnsList.value = newColumns;
      }

      //全选
      function onCheckAll(e) {
        let checkList = table.getCacheColumns(true);
        if (e) {
          setColumns(checkList);
          state.checkList = checkList;
        } else {
          setColumns([]);
          state.checkList = [];
        }
      }

      //拖拽排序
      function draggableEnd() {
        const newColumns = toRaw(unref(columnsList));
        columnsList.value = newColumns;
        setColumns(newColumns);
      }

      //勾选列
      function onSelection(e) {
        let checkList = table.getCacheColumns();
        if (e) {
          checkList.unshift({ type: 'selection', key: 'selection' });
          setColumns(checkList);
        } else {
          checkList.splice(0, 1);
          setColumns(checkList);
        }
      }

      function onMove(e) {
        if (e.draggedContext.element.draggable === false) return false;
        return true;
      }

      //固定
      function fixedColumn(item, fixed) {
        if (!state.checkList.includes(item.key)) return;
        let columns = getColumns();
        const isFixed = item.fixed === fixed ? undefined : fixed;
        let index = columns.findIndex((res) => res.key === item.key);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        table.setCacheColumnsField(item.key, { fixed: isFixed });
        columnsList.value[index].fixed = isFixed;
        setColumns(columns);
      }

      return {
        ...toRefs(state),
        columnsList,
        getDarkTheme,
        onChange,
        onCheckAll,
        onSelection,
        onMove,
        resetColumns,
        fixedColumn,
        draggableEnd,
        getSelection,
      };
    },
  });
</script>

<style lang="less">
  .table-toolbar {
    &-inner-popover-title {
      padding: 3px 0;
    }

    &-right {
      &-icon {
        margin-left: 12px;
        font-size: 16px;
        color: var(--text-color);
        cursor: pointer;

        :hover {
          color: #1890ff;
        }
      }
    }
  }

  .table-toolbar-inner {
    &-checkbox {
      display: flex;
      align-items: center;
      padding: 10px 14px;

      &:hover {
        background: #e6f7ff;
      }

      .drag-icon {
        display: inline-flex;
        margin-right: 8px;
        cursor: move;
        &-hidden {
          visibility: hidden;
          cursor: default;
        }
      }

      .fixed-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
      }

      .ant-checkbox-wrapper {
        flex: 1;

        &:hover {
          color: #1890ff !important;
        }
      }
    }

    &-checkbox-dark {
      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }
  }

  .toolbar-popover {
    .n-popover__content {
      padding: 0;
    }
  }
</style>
