/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (safely check compatibility)
export const analyticsPromise = isSupported().then((supported) => {
  if (supported && typeof window !== "undefined") {
    return getAnalytics(app);
  }
  return null;
}).catch((err) => {
  console.warn("Firebase Analytics is not supported in this environment:", err);
  return null;
});

export { app };
