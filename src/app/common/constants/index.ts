import { isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const HOST = isDevMode()
  ? 'http://localhost:8080'
  : environment.host;
