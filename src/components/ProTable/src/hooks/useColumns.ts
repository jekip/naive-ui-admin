import { ref, Ref, ComputedRef, unref, computed, watch, toRaw } from 'vue';
import type { BasicColumn, BasicTableProps } from '../types/table';
import { isEqual, cloneDeep } from 'lodash-es';
import { isArray, isString } from '@/utils/is';

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    return columns;
  })

  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);
    return columns
  })

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns;
    }
  );


  //设置
  function setColumns(columnList: string[]) {
    const columns: any[] = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (!columns.length) {
      columnsRef.value = [];
      return;
    }
    const cacheKeys = cacheColumns.map((item) => item.key);
    //针对拖拽排序
    if (!isString(columns[0])) {
      columnsRef.value = columns;
    } else {
      const newColumns: any[] = []
      cacheColumns.forEach(item => {
        if (columnList.includes(item.key)) {
          newColumns.push({ ...item })
        }
      })
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            cacheKeys.indexOf(prev.key) - cacheKeys.indexOf(next.key)
          );
        });
      }
      columnsRef.value = newColumns
    }
  }

  //获取
  function getColumns() {
    let columns = toRaw(unref(getColumnsRef));
    return columns.map(item => {
      return { ...item, title: item.title, key: item.key, fixed: item.fixed || undefined }
    })
  }

  //获取原始
  function getCacheColumns(isKey?: boolean): any[] {
    return isKey ? cacheColumns.map(item => item.key) : cacheColumns;
  }

  //更新原始数据单个字段
  function setCacheColumnsField(dataIndex: string | undefined, value: Partial<BasicColumn>) {
    if (!dataIndex || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.key === dataIndex) {
        Object.assign(item, value);
        return;
      }
    });
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns
  };
}
