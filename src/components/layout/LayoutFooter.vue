<template>
  <div class="cus-foot">
    <span class="cus-button" @click="setFnPanelVisible(false)">
      <menu-fold-outlined />
    </span>
    <div class="foot-right">
      <span class="cus-button">
        <github-outlined />
      </span>
      <span class="cus-button" @click="openDebugWind">
        <bug-outlined />
      </span>
      <span class="cus-button">
        <github-outlined />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  SettingOutlined,
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BugOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    SettingOutlined,
    GithubOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BugOutlined
  }
});
</script>

<script setup lang="ts">
function setFnPanelVisible(visble: boolean) {
  
}
function openDebugWind() {
  winApi.debug()
}
</script>
<style scoped lang="scss">
.cus-foot {
  padding: 0 8px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  .anticon {
    color: $_base_color;
  }
  .foot-right {
    display: flex;
    span {
      margin-left: .5rem;
    }
  }
}
</style>
