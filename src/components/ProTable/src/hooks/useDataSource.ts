import { ref, ComputedRef, unref, computed, onMounted, onBeforeMount, watchEffect, watch } from 'vue';
import type { BasicTableProps } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import { isFunction, isBoolean } from '@/utils/is';
import { DEFAULTPAGESIZE, APISETTING, PAGESIZES } from '../const';

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    tableData,
    getSelection
  },
  emit: EmitType
) {
  const dataSourceRef = ref<Recordable[]>([]);

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef);
      dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    }
  );

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return rowKey ? rowKey : () => {
      return 'key'
    };
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    // if (unref(getAutoCreateKey)) {
    //   const firstItem = dataSource[0];
    //   const lastItem = dataSource[dataSource.length - 1];
    //
    //   if (firstItem && lastItem) {
    //     if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
    //       const data = cloneDeep(unref(dataSourceRef));
    //       data.forEach((item) => {
    //         if (!item[ROW_KEY]) {
    //           item[ROW_KEY] = buildUUID();
    //         }
    //         if (item.children && item.children.length) {
    //           setTableKey(item.children);
    //         }
    //       });
    //       dataSourceRef.value = data;
    //     }
    //   }
    // }
    return unref(dataSourceRef);
  });

  async function fetch(opt?) {
    try {
      setLoading(true);
      const { request, pagination }: any = unref(propsRef);

      //组装分页信息
      const pageField = APISETTING.pageField
      const sizeField = APISETTING.sizeField
      const totalField = APISETTING.totalField
      const listField = APISETTING.listField

      let pageParams: Recordable = {};
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt[pageField]) || page;
        pageParams[sizeField] = pageSize;
      }

      let params = {
        ...pageParams,
      }
      const res = await request(params);

      const resultTotal = res[totalField] || 0
      const currentPage = res[pageField]

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        if (page > currentTotalPage) {
          setPagination({
            [pageField]: currentTotalPage,
          });
          fetch(opt);
        }
      }
      let resultInfo = res[listField] ? res[listField] : []
      dataSourceRef.value = resultInfo;
      setPagination({
        [pageField]: currentPage,
        [totalField]: resultTotal,
      });
      if (opt && opt[pageField]) {
        setPagination({
          [pageField]: opt[pageField] || 1,
        });
      }
      emit('fetch-success', {
        items: unref(resultInfo),
        resultTotal
      });
    } catch (error) {
      console.error(error)
      emit('fetch-error', error);
      dataSourceRef.value = [];
      // setPagination({
      //   pageCount: 0,
      // });
    } finally {
      setLoading(false);
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch();
    }, 16)
  });

  // onBeforeMount(()=> {
  //   fetch()
  // })

  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values;
  }

  function getDataSource<T = Recordable>() {
    return getDataSourceRef.value as T[];
  }

  async function reload(opt?: FetchParams) {
    await fetch(opt);
  }

  return {
    fetch,
    getRowKey,
    getDataSourceRef,
    getDataSource,
    setTableData,
    reload
  }
}
