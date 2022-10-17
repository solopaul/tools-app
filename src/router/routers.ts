import { IotRouter } from './iot'
import { DeviceRouter } from './device'
import { ModulesRouter } from './modules'
import { ToolsRouter } from './tools'

// 合并路由
const routers = [
  ...IotRouter,
  ...DeviceRouter,
  ...ModulesRouter,
  ...ToolsRouter
]

export default routers