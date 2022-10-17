const { app, BrowserWindow, BrowserView, ipcMain, nativeTheme, Tray, Menu, nativeImage } = require('electron')
const path = require('path')
let WinState = require('electron-win-state').default
const createTray = require('./app/tray')
const { WGS84toGCJ02 } = require('./app/gps')
const { SerialPort } = require('serialport')
const { Sequelize, QueryTypes } = require('sequelize');
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('app_gps', 'root', 'admin123', {
  host: 'localhost',
  dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
sequelize.authenticate();

const createWindow = () => {

  const winState = new WinState({
    defaultWidth: 800,
    defaultHeight: 600
  })

  const mainWin = new BrowserWindow({
    ...winState.winOptions,
    show: false,
    frame: false,
    icon: path.resolve(__dirname, './public/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, './preload/preload.js'),
    }
  })

  mainWin.once('ready-to-show', () => {
    mainWin.show()
  })

  mainWin.loadURL('http://localhost:3000/')
  winState.manage(mainWin)
  // mainWin.webContents.openDevTools()

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
    console.log(app.getLocale())
  })

  let port = null

  ipcMain.handle('serial:list', async () => {
    return SerialPort.list().then(data => {
      return data
    });
  })
  
  ipcMain.handle('service:getPosition', async (event) => {
    let res = await sequelize.query("SELECT * FROM location ORDER BY id DESC LIMIT 1");
    console.log(res)
    return res
  })

  ipcMain.on('serial:open', async (event, portConf) => {
    // try {
    //   await sequelize.authenticate();
    //   console.log('Connection has been established successfully.');
    //   await sequelize.query("INSERT INTO location values(null, 100, 40, '2022-10-12')", { type: QueryTypes.INSERT });
    //   console.log(3444,locations)
    // } catch (error) {
    //   console.error('Unable to connect to the database:', error);
    // }

    console.log(portConf)
    port = new SerialPort(portConf)
    port.open()
    port.on('error', function(err) {
      console.log('Error1: ', err.message)
    })

    
    // 方法 1: 传递一个连接 URI
    // const sequelize = new Sequelize('sqlite::memory:') // Sqlite 示例
    // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例

    // 方法 2: 分别传递参数 (sqlite)
    // const sequelize = new Sequelize({
    //   dialect: 'sqlite',
    //   storage: 'path/to/database.sqlite'
    // });


    let tempData = ""
    let cacheData = []
    port.on('data', function(data) {
      tempData += data.toString();
      if(tempData.includes("\r\n")) {
        let resData = tempData.split("\r\n")
        tempData = resData[resData.length - 1]
        for(let i=0;i<resData.length-1;i++) {
          if(resData[i].startsWith('$GNGLL')) {
            // console.log(resData[i])
          }
          if(resData[i].startsWith('$GNGGA')) {
            let gpsDataArr = resData[i].split(",")
            // console.log(resData[i])
            // console.log('lat', gpsDataArr[2])
            // console.log('lat_mark', gpsDataArr[3])
            // console.log('lon', gpsDataArr[4])
            // console.log('lon_mark', gpsDataArr[5])
            // console.log('time', gpsDataArr[1])
            if(!gpsDataArr[2]) continue
            let gpsDataStr = '(' + gpsDataArr[2] + ',\'' + gpsDataArr[3] + '\',' + gpsDataArr[4] + ',\'' + gpsDataArr[5] + '\',' + gpsDataArr[1] + ')'
            cacheData.push(gpsDataStr)
            if(cacheData.length > 5) {
              console.log(cacheData.join(','))
              sequelize.query("INSERT INTO location (lat, lat_mark, lon, lon_mark, time) values " + cacheData.join(','), { type: QueryTypes.INSERT });
              cacheData.splice(0, cacheData.length)
            }
          }
        }
      }
      // console.log('Data: ', data)
      // // ipcMain.s
      // event.returnValue = data
    })
  })

  ipcMain.handle('window:move', async (event, pos) => {
    let currentPos = mainWin.getPosition();
    mainWin && mainWin.setPosition(currentPos[0] + pos.x, currentPos[1] + pos.y)
  })

  ipcMain.handle('window:close', async () => {
    mainWin && mainWin.close()
  })

  ipcMain.handle('window:max', async () => {
    if(mainWin.isMaximized()) {
      mainWin.restore()
    } else {
      mainWin.maximize()
    }
  })

  ipcMain.handle('window:min', async () => {
    mainWin && mainWin.minimize()
  })

  ipcMain.handle('window:debug', async () => {
    if(mainWin.webContents.isDevToolsOpened()) {
      mainWin.webContents.closeDevTools()
    } else {
      mainWin.webContents.openDevTools()
    }
  })

  createTray(app, mainWin)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
    sequelize.close()
  })
})
