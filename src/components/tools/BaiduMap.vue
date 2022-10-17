<template>
  <a-layout style="height:100%;overflow-y:auto;position:relative;">
    <div id="map" style="width:100%;height:100%;">
    </div>
    <div class="toolbar" style="position:absolute;top:0;width:100%;padding: 10px 20px;z-index:100;">
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 120px"
        >
        <a-select-option value="GPS01">GPS01</a-select-option>
        <a-select-option value="GPS02">GPS02</a-select-option>
        <a-select-option value="GPS03">GPS03</a-select-option>
        <a-select-option value="GPS04">GPS04</a-select-option>
      </a-select>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, toRaw, defineComponent } from 'vue';
import {
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';
import { WGS84toGCJ02, BD09toGCJ02, GCJ02toBD09, WGS84toBD09, GPStoBD09 } from '@/utils/gps'
const ready = ({Bmap,map})=>{
  //  对地图进行自定义操作
};
const value1 = ref('GPS01')
onMounted(() => {
  
  let posBD = GPStoBD09(3413.24551,10849.99758)
  console.log(4444,posBD)
  var map = new BMap.Map('map')
  var point = new BMap.Point(posBD.lng, posBD.lat)
  var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地
  

  map.centerAndZoom(point, 19)
  map.enableScrollWheelZoom(true)
  map.addEventListener('click', function (e: any) {
    //   let a = JSON.parse(e)
    console.log('点击的经纬度：' + e.point.lng + ',' + e.point.lat) //
    // emit('update:longitude', e.point.lng)
    // emit('update:latitude', e.point.lat)
  })
  
})
</script>

<style scoped lang="scss">

</style>
