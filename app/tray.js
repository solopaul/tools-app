const { BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const path = require('path')
const packageInfo = require('../package')
function createTray(app, win) {
  const icon = nativeImage.createFromPath(path.resolve(__dirname, '../public/logo.png'))
  let tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '设置',
      click: () => {
        console.log("settings ")
        createSettingWindow(win)
      }
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    },
    {
      label: 'Item4', submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip(packageInfo.name + ' v' + packageInfo.version)
  tray.setTitle('This is my title')
  tray.on('click', (e) => {
    if(e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
      tray.displayBalloon({
        title: "通知",
        content: "通知内容"
      })
    }
  })
  tray.on('dbclick', () => {
    console.log('tray double click')
    tray.displayBalloon({
      title: "通知",
      content: "通知内容"
    })
  })
}

function createSettingWindow(win) {
  const settingWin = new BrowserWindow({
    width: 600,
    height: 400,
    parent: win,
    modal: false
  })
  settingWin.loadURL('https://www.baidu.com')
}
module.exports = createTray