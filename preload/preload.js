const { contextBridge, ipcRenderer } = require('electron')

//环境信息API
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // 能暴露的不仅仅是函数，我们还可以暴露变量
})

//环境信息API
contextBridge.exposeInMainWorld('winApi', {
  move: (pos) => ipcRenderer.invoke('window:move', pos),
  close: () => ipcRenderer.invoke('window:close'),
  min: () => ipcRenderer.invoke('window:min'),
  max: () => ipcRenderer.invoke('window:max'),
  debug: () => ipcRenderer.invoke('window:debug')
})

//主题API
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

//串口API
contextBridge.exposeInMainWorld('serialApi', {
  test: async () => {
    let ports = await ipcRenderer.invoke('serial:list')
    return ports
  },
  list: async () => {
    let ports = await ipcRenderer.invoke('serial:list')
    return ports
  },
  open: (conf) => ipcRenderer.sendSync('serial:open', conf),
  onData: (cb) => ipcRenderer.on('serial:onData', cb && cb()),
  sendData: (data) => ipcRenderer.invoke('serial:send', data)
})

//接口API
contextBridge.exposeInMainWorld('serviceApi', {
  getPosition: async () => {
    let position = await ipcRenderer.invoke('service:getPosition')
    return position
  }
})