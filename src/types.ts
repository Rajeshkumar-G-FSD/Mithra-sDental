/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DentalCategory {
  ORTHODONTICS = "Orthodontics",
  SENSITIVE_TEETH = "Sensitive Teeth",
  TEETH_CLEANING = "Teeth Cleaning",
  TEETH_WHITENING = "Teeth Whitening",
  DENTAL_IMPLANTS = "Dental Implants",
  CHILDREN_CLEANING = "Children Cleaning",
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: DentalCategory;
  notes?: string;
  address?: string;
  appointmentType?: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface DentalService {
  id: string;
  title: string;
  category: DentalCategory;
  description: string;
  tagline: string;
}
