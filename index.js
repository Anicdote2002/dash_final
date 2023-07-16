
// const {app, BrowserWindow, Menu, dialog} = require("electron");

// const options = {message:'button working!'};

// function createWindow() {
//     // Create the browser window 
//     // (height and width of NHD-5.0-HDMI-N-RTXL-RTU)
//     win = new BrowserWindow({ 
//         width: 800, 
//         height: 480, 
//      });
     
//     // set full screen (matters for the pi)
//     // COMMENT THIS OUT IF RUNNING ON YOUR OWN MACHINE
//     // OR USE ESCAPE TO TOGGLE BACK TO WINDOWED
//    //win.setFullScreen(true);
//     // and load the index.html of the app.
//    //win.loadFile("index.html");
//    win.loadFile("sample_index.html");
// }

// app.on("ready", createWindow);

// const { app, BrowserWindow, dialog } = require("electron");

// function createWindow() {
//   // Create the browser window
//   const win = new BrowserWindow({
//     width: 800,
//     height: 480,
//   });

//   // Load the index.html file
//   win.loadFile("sample_index.html");

//   // Uncomment the following line if you want the window to open in fullscreen
//   // win.setFullScreen(true);
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") app.quit();
// });

// const { app, BrowserWindow, ipcMain } = require('electron')



// function createWindow() {
//   // Create the browser window
//   const win = new BrowserWindow({
//     width: 800,
//     height: 480,
//     webPreferences: {
//       nodeIntegration: true, // Enable Node.js integration
//       contextIsolation: false,
//       enableRemoteModule: true,
//     },
//   });

//   // Load the index.html file
//   //win.loadFile("sample_index.html");
//   win.loadFile("index.html");

//   // Uncomment the following line if you want the window to open in fullscreen
//   // win.setFullScreen(true);
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") app.quit();
// });

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
  //win.loadFile("sample_index.html");
  win.loadFile("index.html");

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



