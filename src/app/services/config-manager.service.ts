import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  SERVER_ORIGIN: string;
  X_API_KEY: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigManagerService {
  config!: Config;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get<Config>('./assets/config/config.json')
      .toPromise()
      .then((config) => {
        if (config) {
          this.config = config;
        }
      });
  }
}
