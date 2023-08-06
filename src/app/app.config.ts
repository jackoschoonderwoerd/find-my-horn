// https://github.com/angular/angularfire/issues/3365
// # My firebase environment is saved in the Angular environment file
// # @environment is just a typescript path alias

import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';


const firebaseProviders: EnvironmentProviders = importProvidersFrom([
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
]);


import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environments';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { reducers } from './app.reducer';
import { MatDialogModule } from '@angular/material/dialog';



export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        firebaseProviders,
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        provideStore(reducers),
        importProvidersFrom(
            [
                MatDialogModule
            ]),
    ],
};
