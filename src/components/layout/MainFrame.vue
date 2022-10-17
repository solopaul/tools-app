
<script setup lang="ts">
  import { ref, reactive, onMounted, onUpdated } from 'vue'
  import LeftSide from '@/components/layout/LeftSide.vue'
  import LayoutHeader from '@/components/layout/LayoutHeader.vue'
  import LayoutFooter from '@/components/layout/LayoutFooter.vue'
  const count = ref(0)
  const ports = reactive({name: 'lee'})
  onMounted(async () => {
    let ports = await window.serialApi.test();
  })
  onUpdated(() => {
  })
</script>

<template>
  <a-layout class="cus-layout" style="height: 100vh">
    <a-layout-sider class="bg-color-dark1 drag" width="80">
      <LeftSide />
    </a-layout-sider>
    <a-layout>
      <a-layout-sider theme="light" width="0">Sider2</a-layout-sider>
      <a-layout>
        <a-layout-header class="bg-color-dark3">
          <LayoutHeader />
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>
          <LayoutFooter />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.bg-color-dark1 {
  background-color: #2c313b;
}
.bg-color-dark2 {
  background-color: #22272e;
}
.bg-color-dark3 {
  background-color: #262b33;
}
.cus-layout {
  // .ant-layout-header,.ant-layout-footer,.ant-layout-sider {
  //   -webkit-app-region: drag;
  // }
  .ant-layout-header,.ant-layout-footer {
    background-color: $_base_bg_1;
  }
  .ant-layout-header {
    padding: 0;
    height: 50px !important;
    line-height: 50px !important;
  }
  .ant-layout-footer {
    padding: 0;
    height: 32px !important;
    line-height: 32px !important;
  }
}
</style>
