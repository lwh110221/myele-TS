import { type AppConfig } from 'ee-core/config';

const config: () => AppConfig = () => {
  return {
    openDevTools: {
      mode: 'bottom'
    },
    jobs: {
      messageLog: false
    },
    windowsOption: {
      show: true,
      skipTaskbar: false,
      webPreferences: {
        webSecurity: false,
        allowRunningInsecureContent: true,
      }
    },
    httpServer: {
      enable: true,
      https: {
        enable: false,
        key: '/public/ssl/localhost+1.key',
        cert: '/public/ssl/localhost+1.pem',
      },
      host: '127.0.0.1',
      port: 7071,
    },
    mainServer: {
      usePort: true,
      protocol: 'http://',
      indexPath: '/public/dist/index.html',
    }
  };
};

export default config;