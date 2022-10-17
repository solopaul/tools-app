import MainFrame from '@/components/layout/MainFrame.vue'
// 2. 定义一些路由：每个路由都需要映射到一个组件。
const IotHome = { render(){ return 'IOT-IotHome'} }
const iotGps = { render(){ return 'IOT-iotGps'} }
export const IotRouter = [
  {
    path: '/iot',
    name: 'iotParent',
    component: MainFrame,
    meta: {
      title: "物联网模块"
    },
    children: [
      {
        path: '',
        name: 'iotHome',
        component: IotHome,
        meta: {
          title: "首页"
        }
      },
      {
        path: 'gps',
        name: 'iotGps',
        component: iotGps,
        meta: {
          title: "GPS"
        }
      }
    ]
  }
]