<template>
  <div class="cus-head" @mousemove="moveWindow($event)" @mousedown="startMoveWindow($event)" @mouseup="stopMoveWindow" @mouseout="stopMoveWindow">
    <div class="head-left">
      <div v-if="false" class="cus-menu">
        <div
          class="item"
          v-for="(item, idx) in []"
          :key="idx"
          :class="{active: item.GUID == currentProfile.GUID}"
          @click="profileChange(item)">
          <span :class="[item.icon]"></span>
          <span class="title">{{item.ModeIndex}}</span>
        </div>
      </div>
    </div>
    
    <div class="head-right">
      <a-select
        v-model:value="currentAppPath"
        style="width: 120px"
        :options="appRouters.map(item => ({ value: item.path, label: item.meta.title }))"
        size="small"
        @change="handleChangeApp"
      >
      </a-select>
      <a-divider type="vertical" />
      <span class="cus-button" @click="minWind">
        <minus-outlined />
      </span>
      <span class="cus-button" @click="maxWind">
        <border-outlined />
      </span>
      <span class="cus-button danger" @click="closeWind">
        <close-outlined />
      </span>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import {
  BorderOutlined,
  CloseOutlined,
  MinusOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    BorderOutlined,
    CloseOutlined,
    MinusOutlined
  }
});
</script>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { appRouteStore } from '@/store' 
import * as _ from 'lodash'
import routers from '@/router/routers'

const startPosition = reactive({x: 0, y: 0, isMouseDown: false})
let currentAppPath = ref("")
const appRouters = reactive(routers)
const router = useRouter()
const currentAppRouteStore = appRouteStore()

onMounted(() => {
  if(localStorage.appPath) {
    currentAppPath.value = localStorage.appPath
    handleChangeApp(currentAppPath.value)
  } else {
    currentAppPath.value = '/'
    handleChangeApp(currentAppPath.value)
  }
  console.log(3456)
})

function handleChangeApp(appId: string) {
  const currentApp = appRouters.find(item => {
    return item.path == appId
  })
  if(currentApp) {
    currentAppRouteStore.setCurrentApp(currentApp)
    router.push({path: appId})
  } else {
    router.push({path: '/'})
  }
}

function startMoveWindow(e: MouseEvent) {
  startPosition.isMouseDown = true;
  startPosition.x = e.screenX;
  startPosition.y = e.screenY;
}

function moveWindow(e: MouseEvent) {
  if(startPosition.isMouseDown) {
    let movePos = {
      x: 0,
      y: 0
    }
    movePos.x = e.screenX - startPosition.x
    movePos.y = e.screenY - startPosition.y
    startPosition.x = e.screenX;
    startPosition.y = e.screenY;
    winApi.move(movePos);
  }
}

function stopMoveWindow() {
  startPosition.isMouseDown = false;
}

function minWind() {
  winApi.min();
}

function maxWind() {
  winApi.max();
}

function closeWind() {
  winApi.close();
}
</script>
<style scoped lang="scss">
.cus-head {
  padding: 0 12px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  .head-left {
    display: flex;
    .cus-menu {
      display: flex;
      .item {
        display: flex;
        margin-right: .8rem;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: $border-radius-size;
        transition: all ease-in-out .6s;
        border:1px solid transparent;
        span.iconfont {
          font-size: 1.4rem;
          margin-right: .2rem;
        }
        span.title {
          display: flex;
          align-items: center;
          font-size: 1rem;
        }
        &:hover, &.active {
          color: $color-primary;
        }
        &.active {
          // background: $bg-transparent;
          // box-shadow: 0 0 1px 1px $color-primary;
          border:1px solid $color-primary;
          // text-shadow: 0 0 5px $color-primary;
        }
      }
    }
  }
  .head-right {
    display: flex;
    align-items: center;
    span {
      margin-left: .1rem;
      &.danger .anticon-close {
        transition: all linear .4s;
        &:hover {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
