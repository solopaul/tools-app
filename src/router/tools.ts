import MainFrame from '@/components/layout/MainFrame.vue'
import SerialPortTool from '@/components/tools/SerialPort.vue'
import BaiduMap from '@/components/tools/BaiduMap.vue'
// 2. 定义一些路由：每个路由都需要映射到一个组件。
const toolsHome = { render(){ return 'Tools-Home'} }
export const ToolsRouter = [
  {
    path: '/tools',
    name: 'toolsParent',
    component: MainFrame,
    meta: {
      title: "工具"
    },
    children: [
      {
        path: '',
        name: 'toolsHome',
        component: SerialPortTool,
        meta: {
          title: "首页"
        }
      },
      {
        path: 'serialport',
        name: 'serailportTool',
        component: SerialPortTool,
        meta: {
          title: "串口"
        }
      },
      {
        path: 'map',
        name: 'mapApp',
        component: BaiduMap,
        meta: {
          title: "地图"
        }
      }
    ]
  }
]