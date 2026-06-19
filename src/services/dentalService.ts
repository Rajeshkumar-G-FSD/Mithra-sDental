/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Appointment, ContactRequest, DentalCategory, DentalService } from "../types";
import { db } from "../lib/firebase";
import { collection, doc, setDoc, deleteDoc, getDocs, updateDoc, writeBatch } from "firebase/firestore";

const APPOINTMENTS_KEY = "city_smile_appointments_db";
const CONTACTS_KEY = "city_smile_contacts_db";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: "orthodontics",
    title: "Orthodontics",
    category: DentalCategory.ORTHODONTICS,
    description: "Align your smile with modern clear aligners and traditional braces tailored to your lifestyle.",
    tagline: "Perfect Alignment",
  },
  {
    id: "sensitive-teeth",
    title: "Sensitive teeth",
    category: DentalCategory.SENSITIVE_TEETH,
    description: "Specialized desensitizing treatments and protective seals to relieve dynamic nerve pain.",
    tagline: "Pain-Free Living",
  },
  {
    id: "teeth-cleaning",
    title: "Teeth Cleaning",
    category: DentalCategory.TEETH_CLEANING,
    description: "Comprehensive prophylactic cleansing, scaling, and polishing to remove stubborn plaque.",
    tagline: "Sparkling Polish",
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    category: DentalCategory.TEETH_WHITENING,
    description: "Advanced laser whitening that brightens enamel by up to eight shades in a single hour.",
    tagline: "Radiant Brightness",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    category: DentalCategory.DENTAL_IMPLANTS,
    description: "State-of-the-art permanent root restoration and porcelain crowns with natural finishes.",
    tagline: "Lifetime Strength",
  },
  {
    id: "children-cleaning",
    title: "Children Cleaning",
    category: DentalCategory.CHILDREN_CLEANING,
    description: "Gentle pediatric care designed to build healthy life-long dental habits in a fun atmosphere.",
    tagline: "Happy Kids, Healthy Smiles",
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "appt-1",
    patientName: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "555-0199",
    date: "2026-06-25",
    time: "10:30 AM",
    service: DentalCategory.TEETH_WHITENING,
    notes: "First time laser treatment context",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "appt-2",
    patientName: "Michael Chang",
    email: "mchang92@example.com",
    phone: "555-0142",
    date: "2026-06-26",
    time: "02:00 PM",
    service: DentalCategory.ORTHODONTICS,
    notes: "Consultation about Invisalign clear aligners",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export const dentalService = {
  /**
   * Retrieves active appointments from local storage
   */
  getAppointments(): Appointment[] {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return INITIAL_APPOINTMENTS;
      }
    }
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  },

  /**
   * Save appointments list to local storage
   */
  saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  },

  /**
   * Sync localized state with Firestore. Fetches all documents and combines them with local cache.
   */
  async syncWithFirestore(): Promise<Appointment[]> {
    const path = "appointments";
    try {
      const q = collection(db, path);
      const snapshot = await getDocs(q);
      const firestoreAppts: Appointment[] = [];
      snapshot.forEach((doc) => {
        firestoreAppts.push({ id: doc.id, ...doc.data() } as Appointment);
      });

      if (firestoreAppts.length === 0) {
        // If Firestore is empty, seed it with current local appointments
        const local = this.getAppointments();
        const batch = writeBatch(db);
        local.forEach((appt) => {
          const docRef = doc(db, "appointments", appt.id);
          batch.set(docRef, {
            patientName: appt.patientName,
            email: appt.email,
            phone: appt.phone,
            date: appt.date,
            time: appt.time,
            service: appt.service,
            notes: appt.notes || "",
            status: appt.status,
            createdAt: appt.createdAt,
          });
        });
        await batch.commit();
        return local;
      }

      // Sort by creation date descending
      firestoreAppts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Update local storage to keep in sync
      this.saveAppointments(firestoreAppts);
      return firestoreAppts;
    } catch (err) {
      // In case of permission errors, log gracefully and fallback to local
      console.warn("Could not sync appointments with Firestore:", err);
      // Let's use our mandatory handleFirestoreError if the error is a real permission/fatal failure
      if (err instanceof Error && err.message.toLowerCase().includes("permission")) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
      return this.getAppointments();
    }
  },

  /**
   * Push a single booked appointment to Firestore
   */
  async addAppointmentToFirestore(appt: Appointment): Promise<void> {
    const path = `appointments/${appt.id}`;
    try {
      await setDoc(doc(db, "appointments", appt.id), {
        patientName: appt.patientName,
        email: appt.email,
        phone: appt.phone,
        date: appt.date,
        time: appt.time,
        service: appt.service,
        notes: appt.notes || "",
        status: appt.status,
        createdAt: appt.createdAt,
      });
    } catch (err) {
      console.error("Error setting doc in appointments:", err);
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  },

  /**
   * Sync status of a single appointment in Firestore
   */
  async updateAppointmentInFirestore(id: string, updates: Partial<Appointment>): Promise<void> {
    const path = `appointments/${id}`;
    try {
      const docRef = doc(db, "appointments", id);
      await updateDoc(docRef, updates);
    } catch (err) {
      console.error("Error updating doc in appointments:", err);
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  },

  /**
   * Remove a single appointment in Firestore
   */
  async deleteAppointmentFromFirestore(id: string): Promise<void> {
    const path = `appointments/${id}`;
    try {
      const docRef = doc(db, "appointments", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error deleting doc in appointments:", err);
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  },

  /**
   * Saves contact requests locally and in Firestore
   */
  getContactRequests(): ContactRequest[] {
    const stored = localStorage.getItem(CONTACTS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  },

  async saveContactRequest(req: Omit<ContactRequest, "id" | "createdAt">): Promise<ContactRequest> {
    const contacts = this.getContactRequests();
    const newContact: ContactRequest = {
      ...req,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    // 1. Save locally
    contacts.push(newContact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));

    // 2. Save in Firestore asynchronously
    const path = `contacts/${newContact.id}`;
    try {
      await setDoc(doc(db, "contacts", newContact.id), {
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
        createdAt: newContact.createdAt,
      });
    } catch (err) {
      console.error("Error writing to contacts collection in Firestore:", err);
      handleFirestoreError(err, OperationType.CREATE, path);
    }

    return newContact;
  }
};
