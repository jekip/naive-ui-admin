<template>
  <div class="w-full">
    <div class="upload">
      <div class="upload-card">
        <!--图片列表-->
        <div
          class="mb-2 mr-2 upload-card-item"
          :style="getCSSProperties"
          v-for="(item, index) in state.imgList"
          :key="`img_${index}`"
        >
          <div class="upload-card-item-info">
            <div class="img-box">
              <img :src="item" />
            </div>
            <div class="img-box-actions">
              <n-icon size="22" class="mx-2 action-icon" @click="preview(item)">
                <EyeOutlined />
              </n-icon>
              <n-icon size="22" class="mx-2 action-icon" @click="remove(index)">
                <DeleteOutlined />
              </n-icon>
            </div>
          </div>
        </div>

        <!--上传图片-->
        <div
          class="mb-2 mr-2 upload-card-item upload-card-item-select-picture"
          :style="getCSSProperties"
          v-if="state.imgList.length < props.maxNumber"
        >
          <n-upload
            v-bind="$props"
            :file-list-style="{ display: 'none' }"
            @before-upload="beforeUpload"
            @finish="finish"
          >
            <div class="flex flex-col justify-center">
              <n-icon size="18" class="m-auto upload-title">
                <PlusOutlined />
              </n-icon>
              <span class="upload-title">点击上传</span>
            </div>
          </n-upload>
        </div>
      </div>
    </div>

    <!--上传图片-->
    <n-space>
      <n-alert title="提示" type="info" v-if="helpText" class="flex w-full mt-4">
        {{ helpText }}
      </n-alert>
    </n-space>
  </div>

  <!--预览图片-->
  <n-modal
    v-model:show="state.showModal"
    preset="card"
    title="预览"
    :bordered="false"
    :style="{ width: '520px' }"
  >
    <img :src="state.previewUrl" />
  </n-modal>
</template>

<script lang="ts" setup>
  import { reactive, computed, watch } from 'vue';
  import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import { basicProps } from './props';
  import { useMessage, useDialog } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import componentSetting from '@/settings/componentSetting';
  import { useGlobSetting } from '@/hooks/setting';
  import { isString } from '@/utils/is';
  import { useThemeVars } from 'naive-ui';

  const globSetting = useGlobSetting();
  const themeVars = useThemeVars();

  const getPlaceholderColor = computed(() => {
    return themeVars.value.placeholderColor;
  });

  const getInputColor = computed(() => {
    return themeVars.value.inputColor;
  });

  const getPrimaryColorHover = computed(() => {
    return themeVars.value.primaryColorHover;
  });
  const getBorderRadius = computed(() => {
    return themeVars.value.borderRadius;
  });

  const getBorderColor = computed(() => {
    return themeVars.value.borderColor;
  });

  const getIconColor = computed(() => {
    return themeVars.value.iconColor;
  });

  const props = defineProps({
    ...basicProps,
  });

  const emit = defineEmits(['uploadChange', 'delete']);

  const getCSSProperties = computed(() => {
    return {
      width: `${props.width}px`,
      height: `${props.height}px`,
    };
  });

  const message = useMessage();
  const dialog = useDialog();

  const state = reactive({
    showModal: false,
    previewUrl: '',
    originalImgList: [] as string[],
    imgList: [] as string[],
  });

  //赋值默认图片显示
  watch(
    () => props.value,
    () => {
      if (props.value.length) {
        state.imgList = props.value.map((item) => {
          return getImgUrl(item);
        });
      } else {
        state.imgList = [];
      }
    },
    {
      immediate: true,
    }
  );

  //预览
  function preview(url: string) {
    state.showModal = true;
    state.previewUrl = url;
  }

  //删除
  function remove(index: number) {
    dialog.info({
      title: '提示',
      content: '你确定要删除吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        state.imgList.splice(index, 1);
        state.originalImgList.splice(index, 1);
        emit('uploadChange', state.originalImgList);
        emit('delete', state.originalImgList);
      },
      onNegativeClick: () => {},
    });
  }

  //组装完整图片地址
  function getImgUrl(url: string): string {
    const { imgUrl } = globSetting;
    return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
  }

  function checkFileType(fileType: string) {
    return componentSetting.upload.fileType.includes(fileType);
  }

  //上传之前
  function beforeUpload({ file }) {
    const fileInfo = file.file;
    const { maxSize, accept } = props;
    const acceptRef = (isString(accept) && accept.split(',')) || [];

    // 设置最大值，则判断
    if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
      message.error(`上传文件最大值不能超过${maxSize}M`);
      return false;
    }

    // 设置类型,则判断
    const fileType = componentSetting.upload.fileType;
    if (acceptRef.length > 0 && !checkFileType(fileInfo.type)) {
      message.error(`只能上传文件类型为${fileType.join(',')}`);
      return false;
    }

    return true;
  }

  //上传结束
  function finish({ event: Event }) {
    const res = eval('(' + Event.target.response + ')');
    const infoField = componentSetting.upload.apiSetting.infoField;
    const imgField = componentSetting.upload.apiSetting.imgField;
    const { code } = res;
    const message = res.msg || res.message || '上传失败';
    const result = res[infoField];
    //成功
    if (code === ResultEnum.SUCCESS) {
      let imgUrl: string = getImgUrl(result[imgField]);
      state.imgList.push(imgUrl);
      state.originalImgList.push(result[imgField]);
      emit('uploadChange', state.originalImgList);
    } else message.error(message);
  }
</script>

<style lang="less" scoped>
  .upload {
    width: 100%;
    overflow: hidden;

    .n-upload {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &-card {
      width: auto;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &-item {
        border: 1px dashed v-bind(getBorderColor);
        position: relative;
        padding: 8px;
        border-radius: v-bind(getBorderRadius);
        background-color: v-bind(getInputColor);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        opacity: 1;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          opacity: 1;
          border: 1px dashed v-bind(getPrimaryColorHover);
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          .upload-card-item-info::before {
            opacity: 1;
          }

          &-info::before {
            opacity: 1;
          }
        }

        &-info {
          position: relative;
          height: 100%;
          padding: 0;
          overflow: hidden;

          &:hover {
            .img-box-actions {
              opacity: 1;
            }
          }

          &::before {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            opacity: 0;
            transition: all 0.3s;
            content: ' ';
          }

          .img-box {
            position: relative;
            border-radius: v-bind(getBorderRadius);
          }

          .img-box-actions {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 10;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .action-icon {
              color: v-bind(getIconColor);

              &:hover {
                cursor: pointer;
                color: v-bind(getPrimaryColorHover);
              }
            }
          }
        }
      }

      &-item-select-picture {
        cursor: pointer;
        background-color: v-bind(getInputColor);

        .upload-title {
          color: v-bind(getPlaceholderColor);
        }
      }
    }
  }
</style>
