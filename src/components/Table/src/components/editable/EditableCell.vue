<template>
  <div class="editable-cell">
    <div v-show="!isEdit" class="editable-cell-content" @click="handleEdit">
      {{ getValues }}
      <n-icon class="edit-icon" v-if="!column.editRow">
        <FormOutlined />
      </n-icon>
    </div>
    <div class="flex editable-cell-content" v-show="isEdit" v-click-outside="onClickOutside">
      <div class="editable-cell-content-comp">
        <CellComponent
          v-bind="getComponentProps"
          :component="getComponent"
          :popoverVisible="getRuleVisible"
          :ruleMessage="ruleMessage"
          :rule="getRule"
          :class="getWrapperClass"
          ref="elRef"
          @options-change="handleOptionsChange"
          @pressEnter="handleEnter"
        />
      </div>
      <div class="editable-cell-action" v-if="!getRowEditable">
        <n-icon class="mx-2 cursor-pointer">
          <CheckOutlined @click="handleSubmit" />
        </n-icon>
        <n-icon class="mx-2 cursor-pointer">
          <CloseOutlined @click="handleCancel" />
        </n-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { BasicColumn } from '../../types/table';
  import type { EditRecordRow } from './index';

  import { defineComponent, ref, unref, nextTick, computed, watchEffect, toRaw } from 'vue';
  import { FormOutlined, CloseOutlined, CheckOutlined } from '@vicons/antd';
  import { CellComponent } from './CellComponent';

  import { useTableContext } from '../../hooks/useTableContext';

  import clickOutside from '@/directives/clickOutside';

  import { propTypes } from '@/utils/propTypes';
  import { isString, isBoolean, isFunction, isNumber, isArray } from '@/utils/is';
  import { createPlaceholderMessage } from './helper';
  import { set, omit } from 'lodash-es';
  import { EventEnum } from '@/components/Table/src/componentMap';

  import { parseISO, format } from 'date-fns';
  import { Fn, LabelValueOptions } from '/#/index';

  export default defineComponent({
    name: 'EditableCell',
    components: { FormOutlined, CloseOutlined, CheckOutlined, CellComponent },
    directives: {
      clickOutside,
    },
    props: {
      value: {
        type: [String, Number, Boolean, Object] as PropType<string | number | boolean | Recordable>,
        default: '',
      },
      record: {
        type: Object as PropType<EditRecordRow>,
      },
      column: {
        type: Object as PropType<BasicColumn>,
        default: () => ({}),
      },
      index: propTypes.number,
    },
    setup(props) {
      const table = useTableContext();
      const isEdit = ref(false);
      const elRef = ref();
      const ruleVisible = ref(false);
      const ruleMessage = ref('');
      const optionsRef = ref<LabelValueOptions>([]);
      const currentValueRef = ref<any>(props.value);
      const defaultValueRef = ref<any>(props.value);

      // const { prefixCls } = useDesign('editable-cell');

      const getComponent = computed(() => props.column?.editComponent || 'NInput');
      const getRule = computed(() => props.column?.editRule);

      const getRuleVisible = computed(() => {
        return unref(ruleMessage) && unref(ruleVisible);
      });

      const getIsCheckComp = computed(() => {
        const component = unref(getComponent);
        return ['NCheckbox', 'NRadio'].includes(component);
      });

      const getComponentProps = computed(() => {
        const compProps = props.column?.editComponentProps ?? {};
        const editComponent = props.column?.editComponent ?? null;
        const component = unref(getComponent);
        const apiSelectProps: Recordable = {};

        const isCheckValue = unref(getIsCheckComp);

        let valueField = isCheckValue ? 'checked' : 'value';
        const val = unref(currentValueRef);

        let value = isCheckValue ? (isNumber(val) && isBoolean(val) ? val : !!val) : val;

        //TODO 特殊处理 NDatePicker 可能要根据项目 规范自行调整代码
        if (component === 'NDatePicker') {
          if (isString(value)) {
            if (compProps.valueFormat) {
              valueField = 'formatted-value';
            } else {
              value = parseISO(value as any).getTime();
            }
          } else if (isArray(value)) {
            if (compProps.valueFormat) {
              valueField = 'formatted-value';
            } else {
              value = value.map((item) => parseISO(item).getTime());
            }
          }
        }

        const onEvent: any = editComponent ? EventEnum[editComponent] : undefined;

        return {
          placeholder: createPlaceholderMessage(unref(getComponent)),
          ...apiSelectProps,
          ...omit(compProps, 'onChange'),
          [onEvent]: handleChange,
          [valueField]: value,
        };
      });

      const getValues = computed(() => {
        const { editComponentProps, editValueMap } = props.column;

        const value = unref(currentValueRef);

        if (editValueMap && isFunction(editValueMap)) {
          return editValueMap(value);
        }

        const component = unref(getComponent);
        if (!component.includes('NSelect')) {
          return value;
        }

        const options: LabelValueOptions = editComponentProps?.options ?? (unref(optionsRef) || []);
        const option = options.find((item) => `${item.value}` === `${value}`);

        return option?.label ?? value;
      });

      const getWrapperClass = computed(() => {
        const { align = 'center' } = props.column;
        return `edit-cell-align-${align}`;
      });

      const getRowEditable = computed(() => {
        const { editable } = props.record || {};
        return !!editable;
      });

      watchEffect(() => {
        defaultValueRef.value = props.value;
      });

      watchEffect(() => {
        const { editable } = props.column;
        if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
          isEdit.value = !!editable || unref(getRowEditable);
        }
      });

      function handleEdit() {
        if (unref(getRowEditable) || unref(props.column?.editRow)) return;
        ruleMessage.value = '';
        isEdit.value = true;
        nextTick(() => {
          const el = unref(elRef);
          el?.focus?.();
        });
      }

      async function handleChange(e: any) {
        const component = unref(getComponent);
        const compProps = props.column?.editComponentProps ?? {};
        if (!e) {
          currentValueRef.value = e;
        } else if (e?.target && Reflect.has(e.target, 'value')) {
          currentValueRef.value = (e as ChangeEvent).target.value;
        } else if (component === 'NCheckbox') {
          currentValueRef.value = (e as ChangeEvent).target.checked;
        } else if (isString(e) || isBoolean(e) || isNumber(e)) {
          currentValueRef.value = e;
        }

        //TODO 特殊处理 NDatePicker 可能要根据项目 规范自行调整代码
        if (component === 'NDatePicker') {
          if (isNumber(currentValueRef.value)) {
            if (compProps.valueFormat) {
              currentValueRef.value = format(currentValueRef.value, compProps.valueFormat);
            }
          } else if (isArray(currentValueRef.value)) {
            if (compProps.valueFormat) {
              currentValueRef.value = currentValueRef.value.map((item) => {
                format(item, compProps.valueFormat);
              });
            }
          }
        }

        const onChange = props.column?.editComponentProps?.onChange;
        if (onChange && isFunction(onChange)) onChange(...arguments);

        table.emit?.('edit-change', {
          column: props.column,
          value: unref(currentValueRef),
          record: toRaw(props.record),
        });
        await handleSubmiRule();
      }

      async function handleSubmiRule() {
        const { column, record } = props;
        const { editRule } = column;
        const currentValue = unref(currentValueRef);

        if (editRule) {
          if (isBoolean(editRule) && !currentValue && !isNumber(currentValue)) {
            ruleVisible.value = true;
            const component = unref(getComponent);
            ruleMessage.value = createPlaceholderMessage(component);
            return false;
          }
          if (isFunction(editRule)) {
            const res = await editRule(currentValue, record as Recordable);
            if (!!res) {
              ruleMessage.value = res;
              ruleVisible.value = true;
              return false;
            } else {
              ruleMessage.value = '';
              return true;
            }
          }
        }
        ruleMessage.value = '';
        return true;
      }

      async function handleSubmit(needEmit = true, valid = true) {
        if (valid) {
          const isPass = await handleSubmiRule();
          if (!isPass) return false;
        }

        const { column, index, record } = props;
        if (!record) return false;
        const { key } = column;
        const value = unref(currentValueRef);
        if (!key) return;

        const dataKey = key as string;

        set(record, dataKey, value);
        //const record = await table.updateTableData(index, dataKey, value);
        needEmit && table.emit?.('edit-end', { record, index, key, value });
        isEdit.value = false;
      }

      async function handleEnter() {
        if (props.column?.editRow) {
          return;
        }
        await handleSubmit();
      }

      function handleCancel() {
        isEdit.value = false;
        currentValueRef.value = defaultValueRef.value;
        const { column, index, record } = props;
        const { key } = column;
        ruleVisible.value = true;
        ruleMessage.value = '';
        table.emit?.('edit-cancel', {
          record,
          index,
          key: key,
          value: unref(currentValueRef),
        });
      }

      function onClickOutside() {
        if (props.column?.editable || unref(getRowEditable)) {
          return;
        }
        const component = unref(getComponent);

        if (component.includes('NInput')) {
          handleCancel();
        }
      }

      // only ApiSelect
      function handleOptionsChange(options: LabelValueOptions) {
        optionsRef.value = options;
      }

      function initCbs(cbs: 'submitCbs' | 'validCbs' | 'cancelCbs', handle: Fn) {
        if (props.record) {
          /* eslint-disable  */
          isArray(props.record[cbs])
            ? props.record[cbs]?.push(handle)
            : (props.record[cbs] = [handle]);
        }
      }

      if (props.record) {
        initCbs('submitCbs', handleSubmit);
        initCbs('validCbs', handleSubmiRule);
        initCbs('cancelCbs', handleCancel);

        if (props.column.key) {
          if (!props.record.editValueRefs) props.record.editValueRefs = {};
          props.record.editValueRefs[props.column.key] = currentValueRef;
        }
        /* eslint-disable  */
        props.record.onCancelEdit = () => {
          isArray(props.record?.cancelCbs) && props.record?.cancelCbs.forEach((fn) => fn());
        };
        /* eslint-disable */
        props.record.onSubmitEdit = async () => {
          if (isArray(props.record?.submitCbs)) {
            const validFns = (props.record?.validCbs || []).map((fn) => fn());

            const res = await Promise.all(validFns);

            const pass = res.every((item) => !!item);

            if (!pass) return;
            const submitFns = props.record?.submitCbs || [];
            submitFns.forEach((fn) => fn(false, false));
            table.emit?.('edit-row-end');
            return true;
          }
        };
      }

      return {
        isEdit,
        handleEdit,
        currentValueRef,
        handleSubmit,
        handleChange,
        handleCancel,
        elRef,
        getComponent,
        getRule,
        onClickOutside,
        ruleMessage,
        getRuleVisible,
        getComponentProps,
        handleOptionsChange,
        getWrapperClass,
        getRowEditable,
        getValues,
        handleEnter,
        // getSize,
      };
    },
  });
</script>

<style lang="less">
  .editable-cell {
    &-content {
      position: relative;
      overflow-wrap: break-word;
      word-break: break-word;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &-comp {
        flex: 1;
      }

      .edit-icon {
        font-size: 14px;
        //position: absolute;
        //top: 4px;
        //right: 0;
        display: none;
        width: 20px;
        cursor: pointer;
      }

      &:hover {
        .edit-icon {
          display: inline-block;
        }
      }
    }

    &-action {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
