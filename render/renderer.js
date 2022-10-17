async function testIt() {
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
  ];
  try {
    const port = await navigator.serial.requestPort({filters});
    const portInfo = port.getInfo();
    document.getElementById('device-name').innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `
  } catch (ex) {
    if (ex.name === 'NotFoundError') {
      document.getElementById('device-name').innerHTML = 'Device NOT found'
    } else {
      document.getElementById('device-name').innerHTML = ex
    }
  }
}

document.getElementById('clickme').addEventListener('click',testIt)

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  console.log(1)
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  console.log(2)
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})

document.getElementById('btnTest').addEventListener('click', async () => {
  let ports = await window.serialApi.test()
  document.getElementById('device-name').innerHTML = `<pre>${JSON.stringify(ports,null,2)}</pre>`
})