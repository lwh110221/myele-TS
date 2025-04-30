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
    }
  };
};

export default config;