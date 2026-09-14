import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'de' }]
};
