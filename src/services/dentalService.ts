/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Appointment, ContactRequest, DentalCategory, DentalService } from "../types";

const APPOINTMENTS_KEY = "city_smile_appointments_db";
const CONTACTS_KEY = "city_smile_contacts_db";

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
   * Save appointments list
   */
  saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  },

  /**
   * Saves contact requests
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

  saveContactRequest(req: Omit<ContactRequest, "id" | "createdAt">): ContactRequest {
    const contacts = this.getContactRequests();
    const newContact: ContactRequest = {
      ...req,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return newContact;
  }
};
