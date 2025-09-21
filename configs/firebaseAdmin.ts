// lib/firebaseAdmin.ts
import 'server-only';
import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { FieldPath } from 'firebase-admin/firestore';

declare global { var __FIREBASE_ADMIN__: App | undefined; }

const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? '';
let privateKey = rawKey
  .replace(/\\n/g, '\n')       // chuyển '\n' thành newline thật
  .replace(/\r\n/g, '\n')      // chuẩn hóa CRLF -> LF
  .replace(/^"([\s\S]*)"$/, '$1') // bỏ cặp quote bao ngoài nếu có
  .trim();

if (!privateKey.startsWith('-----BEGIN')) {
  throw new Error('FIREBASE_PRIVATE_KEY format looks wrong (missing BEGIN header)');
}

function init(): App {
  if (global.__FIREBASE_ADMIN__) return global.__FIREBASE_ADMIN__;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing FIREBASE_* envs');
  }

  const app =
    admin.apps.length
      ? admin.app()
      : admin.initializeApp({
          credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
          projectId,
          storageBucket: `${projectId}.appspot.com`,
        });

  global.__FIREBASE_ADMIN__ = app;
  return app;
}

export const getFirebaseAdmin = init;
export const firestore = () => admin.firestore(init());
export const auth = () => admin.auth(init());
export const storage = () => admin.storage(init());
export const messaging = () => admin.messaging(init());
export { FieldPath }; 
