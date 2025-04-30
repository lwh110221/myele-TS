import { app as electronApp, screen, session } from 'electron';
import { logger } from 'ee-core/log';
import { getMainWindow } from 'ee-core/electron';

class Lifecycle {
  /**
   * Core app has been loaded
   */
  async ready(): Promise<void> {
    logger.info('[lifecycle] ready');
  }

  /**
   * Electron app is ready
   */
  async electronAppReady(): Promise<void> {
    logger.info('[lifecycle] electron-app-ready');

    try {
      // 配置Service Worker权限
      session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        // 允许所有权限请求
        return callback(true);
      });

      // 配置Service Worker策略
      session.defaultSession.setSpellCheckerLanguages(['en-US']);
    } catch (err) {
      logger.error('[lifecycle] electronAppReady error:', err);
    }

    // When double clicking the icon, display the opened window
    electronApp.on('second-instance', () => {
      try {
        const win = getMainWindow();
        if (win && !win.isDestroyed()) {
          if (win.isMinimized()) {
            win.restore();
          }
          win.show();
          win.focus();
        }
      } catch (err) {
        logger.error('[lifecycle] second-instance error:', err);
      }
    });    
  }

  /**
   * Main window has been loaded
   */
  async windowReady(): Promise<void> {
    logger.info('[lifecycle] window-ready');

    try {
      const win = getMainWindow();
      
      if (!win || win.isDestroyed()) {
        logger.error('[lifecycle] Main window not available');
        return;
      }

      // 配置Content-Security-Policy
      try {
        win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
          callback({
            responseHeaders: {
              ...details.responseHeaders,
              'Content-Security-Policy': ["default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"]
            }
          });
        });
      } catch (err) {
        logger.error('[lifecycle] CSP configuration error:', err);
      }

      // The window is centered and scaled proportionally
      try {
        const mainScreen = screen.getPrimaryDisplay();
        const { width, height } = mainScreen.workAreaSize;
        const windowWidth = Math.floor(width * 0.8);
        const windowHeight = Math.floor(height * 0.8);
        const x = Math.floor((width - windowWidth) / 2);
        const y = Math.floor((height - windowHeight) / 2);
        win.setBounds({ x, y, width: windowWidth, height: windowHeight });
      } catch (err) {
        logger.error('[lifecycle] Window size setting error:', err);
      }

      try {
        win.show();
        win.focus();
        
        if (!win.isVisible()) {
          win.setOpacity(1);
          win.moveTop();
          win.center();
          win.show();
          win.focus();
        }
      } catch (err) {
        logger.error('[lifecycle] Window show error:', err);
      }
    } catch (err) {
      logger.error('[lifecycle] windowReady error:', err);
    }
  }

  /**
   * Before app close
   */
  async beforeClose(): Promise<void> {
    logger.info('[lifecycle] before-close');
  }
}
Lifecycle.toString = () => '[class Lifecycle]';

export { Lifecycle };