import { isDevMode } from '@angular/core';

export const HOST = isDevMode()
  ? 'http://localhost:8080'
  : 'http://server';
