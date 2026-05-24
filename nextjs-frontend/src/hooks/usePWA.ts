'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerRegistration {
  ready: boolean;
  registered: boolean;
  error: Error | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerRegistration>({
    ready: false,
    registered: false,
    error: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available
                console.log('[PWA] New content available, refresh to update.');
              }
              if (newWorker.state === 'activated') {
                setState({ ready: true, registered: true, error: null });
              }
            });
          }
        });

        if (registration.active) {
          setState({ ready: true, registered: true, error: null });
        }
      } catch (error) {
        setState({
          ready: false,
          registered: false,
          error: error instanceof Error ? error : new Error('Service worker registration failed'),
        });
      }
    };

    registerSW();
  }, []);

  return state;
}

export function useIsPWA() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsPWA(isStandalone);
  }, []);

  return isPWA;
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}