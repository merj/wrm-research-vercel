import { BeaconConfig, BeaconData } from './types';

class WRM {
  private config: BeaconConfig;
  private supportsFetch: boolean;

  constructor(config: BeaconConfig) {
    this.config = config;
    this.supportsFetch = 'fetch' in window;
    this.initialize();
  }

  private initialize(): void {
    if (this.checkReadyState()) {
      this.sendBeacon();
    } else {    
      window.addEventListener('load', () => {
        this.sendBeacon();
      });
    }
  }

  private checkReadyState(): boolean {
    return document.readyState === "complete";
  }

  private checkVercelIdCookie(): string {
    return document.cookie.split('; ').find(row => row.startsWith('x-vercel-id='))?.split('=')[1] || '-';
  }

  private encodeData(data: BeaconData): string {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key as keyof BeaconData]))
      .join('&');
  }

  private getBeaconData(): BeaconData{
    const currentPage = document.location.href;

    const vercelId = this.checkVercelIdCookie();
    const data: BeaconData = {
        url: currentPage,
        event: "load",
        xVercelID: vercelId,
    };
    return data;
  }

  private sendBeacon(): void {
    const data = this.getBeaconData();
    const encodedData = this.encodeData(data);

    if (this.supportsFetch) {
      fetch(this.config.serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodedData,
      });
    } else {
      const request = new XMLHttpRequest();
      request.open('POST', this.config.serverUrl, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(encodedData);
    }
  }
}

export default WRM;

// Attach WRM to the window object
(window as any).MERJ_WRM = WRM;
