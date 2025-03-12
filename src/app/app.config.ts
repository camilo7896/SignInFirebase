import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "elcaballo-fdfdc", appId: "1:669069964148:web:f47cc0a0ab20cc8b6f3221", storageBucket: "elcaballo-fdfdc.firebasestorage.app", apiKey: "AIzaSyCbgLD853zhgNC8c1eBGb4jqDWoEmiZ_E8", authDomain: "elcaballo-fdfdc.firebaseapp.com", messagingSenderId: "669069964148" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
