// 定义常用代码块路由组件。
const List = { render(){ return 'IOT-列表页面'} }
const Detail = { render(){ return 'IOT-详情页面'} }
const utilsRouter = [
  { path: '/utils', component: List },
  { path: '/utils/detail', component: Detail }
]
export default utilsRouter