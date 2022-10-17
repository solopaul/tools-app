<template>
  <a-layout style="height:100%;overflow-y:auto;">
    <a-layout-sider width="250" style="background: #fff;border-right: 1px solid #f0f0f0;">
      <a-divider>串口设置</a-divider>
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="串口">
          <a-select v-model:value="modelRef.region" placeholder="please select">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="波特率">
          <a-select v-model:value="modelRef.region" placeholder="please select">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="数据位">
          <a-select v-model:value="modelRef.region" placeholder="please select">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="停止位">
          <a-select v-model:value="modelRef.region" placeholder="please select">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="校验位">
          <a-select v-model:value="modelRef.region" placeholder="please select">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="false" label="Activity type" v-bind="validateInfos.type">
          <a-checkbox-group v-model:value="modelRef.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 2 }">
          <a-button type="default" @click.prevent="onSubmit" block>
            <template #icon style="color:green;"><SearchOutlined /></template>
            打开串口
          </a-button>
        </a-form-item>
      </a-form>
      <a-divider>串口信息</a-divider>
      <a-row type="flex">
        <a-col :span="24">
          
        </a-col>
      </a-row>
    </a-layout-sider>
    <a-layout-content>
      <a-layout style="height:100%;padding:0 12px;">

        <a-layout-content style="height:250px;">
          <a-divider orientation="left">
            接收区
          </a-divider>
          <a-row type="flex" style="height:calc(100% - 50px);">
            <a-col :span="18">
              <a-textarea v-model:value="value" placeholder="Basic usage" readonly style="height:100%;" />
            </a-col>
            <a-col :span="6" class="setting-container">
              <div class="setting-box">
                <a-card title="接收设置" size="small" style="height:100%;">
                  <template #extra><a href="#">设置</a></template>
                  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-item label="类型">
                      <a-radio-group v-model:value="value">
                        <a-radio :value="1">文本</a-radio>
                        <a-radio :value="2">Hex</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label="显示">
                      <a-checkbox-group v-model:value="modelRef.type">
                        <a-checkbox value="1" name="type">自动换行</a-checkbox>
                        <a-checkbox value="2" name="type">显示发送</a-checkbox>
                        <a-checkbox value="3" name="type">显示时间</a-checkbox>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-form>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </a-layout-content>

        <a-layout-footer style="height:250px;padding:0;">
          <a-divider orientation="left">
            发送区
          </a-divider>
          <a-row type="flex" style="height:calc(100% - 62px);">
            <a-col :span="18">
              <a-textarea v-model:value="value" placeholder="Basic usage" style="height:100%;" />
            </a-col>
            <a-col :span="6" class="setting-container">
              <div class="setting-box">
                <a-card title="发送设置" size="small" style="height:100%;">
                  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-item label="类型">
                      <a-radio-group v-model:value="value">
                        <a-radio :value="1">文本</a-radio>
                        <a-radio :value="2">Hex</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label="自动发送">
                      <a-checkbox-group v-model:value="modelRef.type">
                        <a-checkbox value="1" name="type"></a-checkbox>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-form>
                  <a-button type="primary" size="small" @click="sendData" style="width: 45%;margin-right:10%;">发送</a-button>
                  <a-button type="default" size="small" @click="getData" style="width: 45%;">清空</a-button>
                </a-card>

              </div>
            </a-col>
          </a-row>

        </a-layout-footer>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { ref, onMounted, reactive, toRaw, defineComponent } from 'vue';
import { Form } from 'ant-design-vue';
import {
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    SettingOutlined,
    SearchOutlined
  },
  setup() {
    const modelRef = reactive({
      name: '',
      region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select region',
        },
      ],
      type: [
        {
          required: true,
          message: 'Please select type',
          type: 'array',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = Form.useForm(modelRef, rulesRef, {
      onValidate: (...args) => console.log(...args),
    });
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    onMounted(async () => {
    })
    const sendData = async () => {
      let ports = await window.serialApi.list()
      let portConf = {path: "COM14", baudRate: 9600, autoOpen: false}
      let res = await window.serialApi.open(portConf)
      console.log(9998,res)
      // window.serialApi.onData((data) => {
      //   console.log(data)
      // })
      // console.log(333, localStorage)
    }
    const getData = async () => {
      let res = await window.serviceApi.getPosition()
      console.log(9998,res)
    }
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      sendData,
      getData
    };
  }
});
</script>

<style scoped lang="scss">
.ant-form-item {
  line-height: 1.5715;
  margin-bottom: 8px;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0;
}
.ant-divider-horizontal.ant-divider-with-text {
  margin: 12px 0;
}
.setting-container {
  padding: 0 0 0 8px;
  .setting-box {
    width: 100%;
    height: 100%;
    background: rgba(200, 200, 200, .2);
  }
}
</style>
