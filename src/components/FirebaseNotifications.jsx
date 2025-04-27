"use client";

import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const FirebaseNotifications = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    const setupFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, { 
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          });
          
          if (token) {
            await api.post('/notificaciones/registrar-token', { token });
          }
        }

        onMessage(messaging, (payload) => {
          // Mostrar notificación
          const { title, body } = payload.notification;
          new Notification(title, { body });
        });

      } catch (error) {
        console.error('Error configurando FCM:', error);
      }
    };

    setupFirebase();
  }, [status]);

  return null;
};

export default FirebaseNotifications;