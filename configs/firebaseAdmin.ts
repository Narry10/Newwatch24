// lib/firebaseAdmin.ts
import 'server-only';
import admin, { app as adminApp } from 'firebase-admin';
import { FieldPath } from 'firebase-admin/firestore';

// Dùng type rõ ràng cho global singleton (tránh ReturnType mơ hồ)
declare global {
  // eslint-disable-next-line no-var
  var __FIREBASE_ADMIN__: adminApp.App | undefined;
}

/**
 * Firebase Admin SDK Configuration
 * Credentials are loaded from environment variables for security
 */
const SERVICE_ACCOUNT: {
  projectId: string;
  clientEmail: string;
  privateKey: string;
} = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'flickfeed-2025',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'firebase-admin-sdk@flickfeed-2025.iam.gserviceaccount.com',
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

function initFirebaseAdmin(): adminApp.App {
  if (global.__FIREBASE_ADMIN__) return global.__FIREBASE_ADMIN__;

  // Validate required environment variables
  if (!SERVICE_ACCOUNT.projectId || !SERVICE_ACCOUNT.clientEmail || !SERVICE_ACCOUNT.privateKey) {
    throw new Error(
      'Missing Firebase Admin SDK credentials. Please check your environment variables:\n' +
      '- FIREBASE_PROJECT_ID\n' +
      '- FIREBASE_CLIENT_EMAIL\n' +
      '- FIREBASE_PRIVATE_KEY'
    );
  }

  const app =
    admin.apps.length > 0
      ? admin.app()
      : admin.initializeApp({
          credential: admin.credential.cert({
            projectId: SERVICE_ACCOUNT.projectId,
            clientEmail: SERVICE_ACCOUNT.clientEmail,
            privateKey: SERVICE_ACCOUNT.privateKey,
            
          }),
          // có thể để Next tự suy, nhưng set rõ giúp tránh nhầm
          projectId: SERVICE_ACCOUNT.projectId,
          storageBucket: `${SERVICE_ACCOUNT.projectId}.appspot.com`,
        });

  global.__FIREBASE_ADMIN__ = app;
  return app;
}

// Helpers
export const getFirebaseAdmin = initFirebaseAdmin;
export const firestore = () => admin.firestore(initFirebaseAdmin());
export const auth = () => admin.auth(initFirebaseAdmin());
export const storage = () => admin.storage(initFirebaseAdmin());
export const messaging = () => admin.messaging(initFirebaseAdmin());

// Export FieldValue để sử dụng trong API routes
export const FieldValue = admin.firestore.FieldValue;
export {
  FieldPath
} from 'firebase-admin/firestore';
