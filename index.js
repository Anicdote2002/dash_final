const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: false,
      enableRemoteModule: true,
      //preload: __dirname + '/preload.js', // Path to the preload script
    },
  });

  // Load the index.html file
  win.loadFile("sample_index.html");
  //win.loadFile("index.html");

  

  // Uncomment the following line if you want the window to open in fullscreen
  // win.setFullScreen(true);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Example of receiving data from the renderer process
ipcMain.on('dataFromRenderer', (event, data) => {
  // Handle the received data
  console.log(data);
  // You can perform any necessary actions or call functions here
  // For example:
  // const { runLO, runHI, postLO, postHI } = data;
  // updateFault(runLO, runHI, postLO, postHI);
});

// Example of sending data to the renderer process
function sendDatatoRenderer(data) {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('updateFault', data);
  });
}

// Usage example:
const data = {
  runLO: 0x0001,
  runHI: 0x0002,
  postLO: 0x0004,
  postHI: 0x0008
};
sendDatatoRenderer(data);



