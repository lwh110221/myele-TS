import { ElectronEgg } from 'ee-core';
import { Lifecycle } from './preload/lifecycle';
import { preload } from './preload';
import { Menu, session, app, BrowserWindow } from 'electron';
import { logger } from 'ee-core/log';

try {
  const myApp = new ElectronEgg();

  // Remove menu bar
  Menu.setApplicationMenu(null);

  myApp.register("ready", () => {
    try {
      session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        callback({
          requestHeaders: {
            ...details.requestHeaders,
            'User-Agent': details.requestHeaders['User-Agent'],
            'Origin': '*',
            'Access-Control-Allow-Origin': '*'
          }
        });
      });

      // 允许所有响应头
      session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Access-Control-Allow-Origin': ['*'],
            'Access-Control-Allow-Methods': ['*'],
            'Access-Control-Allow-Headers': ['*']
          }
        });
      });
    } catch (err) {
      logger.error('[main] webRequest configuration error:', err);
    }
  });

  myApp.register("window-ready", () => {
    try {
      const allWindows = BrowserWindow.getAllWindows();
      if (allWindows.length > 0) {
        const win = allWindows[0];
        
        if (!win.isVisible()) {
          win.show();
          win.focus();
        }
        
        win.webContents.on('did-finish-load', () => {
          win.show();
          win.focus();
        });
      }
    } catch (err) {
      logger.error('[main] window-ready handler error:', err);
    }
  });

  // Register lifecycle
  const life = new Lifecycle();
  myApp.register("ready", life.ready);
  myApp.register("electron-app-ready", life.electronAppReady);
  myApp.register("window-ready", life.windowReady);
  myApp.register("before-close", life.beforeClose);

  // Register preload
  myApp.register("preload", preload);

  app.on('window-all-closed', () => {
    app.quit();
  });

  myApp.run();
} catch (err) {
  logger.error('[main] Critical error:', err);
  app.quit();
}