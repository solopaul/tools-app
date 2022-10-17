import MainFrame from '@/components/layout/MainFrame.vue'
// 2. 定义一些路由：每个路由都需要映射到一个组件。
const deviceHome = { render(){ return 'device-Home'} }
const deviceKeyboard = { render(){ return 'device-Keyboard'} }
export const DeviceRouter = [
  {
    path: '/device',
    name: 'deviceParent',
    component: MainFrame,
    meta: {
      title: "外设"
    },
    children: [
      {
        path: '',
        name: 'deviceHome',
        component: deviceHome,
        meta: {
          title: "首页"
        }
      },
      {
        path: 'keyboard',
        name: 'deviceKeyBoard',
        component: deviceKeyboard,
        meta: {
          title: "键盘"
        }
      }
    ]
  }
]