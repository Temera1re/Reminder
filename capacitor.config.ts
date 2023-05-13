import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'de.hd.reminder',
  appName: 'Temeraire',
  webDir: 'public',
  server: {
    androidScheme: 'https',
  },
}

export default config
