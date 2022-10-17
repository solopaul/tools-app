<template>
  <div class="logo nodrag">
    <a-image
      :width="60"
      :height="60"
      :preview="false"
      :src="'logo.png'"
    />
  </div>
  
  <div class="left-menu nodrag">
    <div
      class="item"
      :class="{active: $route.path == item.path}"
      v-for="(item, idx) in appMenus"
      :key="idx"
      @click="goTo(item)">
      <div class="icon">
        <span :class="'iconfont icon-workflow'"></span>
      </div>
      <p class="title">{{ item.meta?.title || 'unknow'}}</p>
    </div>
    <div
      class="item" @click="goTo({path: '/test'})">
      <div class="icon">
        <span :class="'iconfont icon-workflow'"></span>
      </div>
      <p class="title">404</p>
    </div>
  </div>

  <div class="left-btm-tool nodrag">
    <a-button type="text" @click="showSettingDlg">
      <template #icon><setting-outlined /></template>
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  SettingOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    SettingOutlined
  }
});
</script>


<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { appRouteStore } from '@/store' 

  const router = useRouter()
  const appMenus: any[] = reactive([])
  const currentAppRouteStore = appRouteStore()

  onMounted(() => {
    console.log(JSON.stringify(currentAppRouteStore,null,2))
  })

  watch(
      () => currentAppRouteStore.appPath,
      (path, prePath) => {
        appMenus.splice(0, appMenus.length)
        // appMenus = appMenus.concat(currentAppRouteStore.appRoutes);
        currentAppRouteStore.appRoutes.forEach(item => {
          let temp = JSON.parse(JSON.stringify(item))
          if(temp.path) {
            temp.path = currentAppRouteStore.appPath + '/' + temp.path
          } else {
            temp.path = currentAppRouteStore.appPath
          }
          appMenus.push(temp)
        });
        console.log(JSON.stringify(currentAppRouteStore.appRoutes))
      }
  )

  function goTo(pathInfo:any) {
    if(pathInfo.path) {
      router.push(pathInfo.path);
    }
  }

  // visibleSettings: boolean = false;
  function showSettingDlg() {
    
  }
</script>
<style scoped lang="scss">
.logo {
  padding: 20px 0;
  text-align: center;
}
.left-menu {
  text-align: center;
  padding: 10px;
  .item {
    border-radius: 4px;
    padding: 8px 4px;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, .1);
      color: $color-primary;
    }
    &.active {
      background-color: $bg-transparent;
      color: $color-primary;
    }
    .icon {
      margin-bottom: 4px;
      span {
        font-size: 1.5rem;
      }
    }
    .title {
      font-size: 1rem;
      margin-bottom: 4px;
    }
  }
}
.left-btm-tool {
  button {
    .anticon.anticon-setting {
      font-size: 1.4rem;
      color: $color-primary;
    }
  }
  position: absolute;
  bottom: 20px;
  left: 24px;
}
</style>
