import MainFrame from '@/components/layout/MainFrame.vue'
// 2. 定义一些路由：每个路由都需要映射到一个组件。
const modulesHome = { render(){ return 'Modules-Home'} }
export const ModulesRouter = [
  {
    path: '/modules',
    name: 'modulesParent',
    component: MainFrame,
    meta: {
      title: "模块"
    },
    children: [
      {
        path: '',
        name: 'modulesHome',
        component: modulesHome,
        meta: {
          title: "首页"
        }
      }
    ]
  }
]