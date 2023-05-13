import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.hd.reminder',
  appName: 'reminder',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
