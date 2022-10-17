<template>
  <a-layout style="height:100%;" class="drag">
    <a-layout-content style="height:100%;display:flex;align-items:center;justify-content:center;">
      <div class="notfound nodrag">
        <p class="title">404</p>
        <p class="sub-title">OHOH!页面丢失</p>
        <div class="links">
          <a-button type="primary" @click="goHome">
            <template #icon><HomeOutlined /></template>
            主页
          </a-button>
          <a-divider type="vertical"></a-divider>
          <a-button type="dashed" @click="goBack">
            <template #icon><RollbackOutlined /></template>
            返回 {{counter}}
          </a-button>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    HomeOutlined,
    RollbackOutlined
  } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      HomeOutlined,
      RollbackOutlined
    }
  });
</script>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const counter = ref(0)

  onMounted(() => {
    console.log(444,router)
  })

  function goHome() {
    router.push('/')
  }

  function goBack() {
    router.go(-1)
  }
</script>

<style lang="scss" scoped>
.notfound {
  height: 250px;
  width: 300px;
  text-align: center;
  .title, .sub-title, .links {
    margin-bottom: 10px;
  }
  .title {
    font-size: 80px;
  }
  .sub-title {
    font-size: 30px;
  }
}
</style>
