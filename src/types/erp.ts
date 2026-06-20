/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole =
  | "Super Admin"
  | "Clinic Owner"
  | "Admin"
  | "Receptionist"
  | "Doctor"
  | "Consultant Doctor"
  | "Nurse"
  | "Lab Technician"
  | "Pharmacist"
  | "Accountant"
  | "Store Manager";

export interface ErpPatient {
  id: string;
  patientId: string; // custom human friendly Code (e.g. MDS-P-021)
  name: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  bloodGroup: string;
  medicalHistory: string[];
  allergies: string[];
  insuranceDetails: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  createdAt: string;
}

export interface PatientTimelineEvent {
  id: string;
  patientId: string;
  date: string;
  type: "Visit" | "Treatment" | "Prescription" | "Payment" | "X-ray" | "Report";
  title: string;
  description: string;
  performedBy: string;
  metadata?: Record<string, string>;
}

export interface ErpDoctor {
  id: string;
  doctorId: string; // e.g. DOC-01
  name: string;
  specialization: string;
  qualification: string;
  experience: number; // in years
  consultationFee: number;
  workingSchedule: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
  availableSlots: string[]; // e.g. ["09:00 AM", "10:30 AM", "11:00 AM"]
  profilePhoto: string;
  status: "Active" | "Inactive";
}

export interface ErpConsultant {
  id: string;
  consultantId: string; // e.g. CON-01
  name: string;
  specialization: string;
  visitingDays: string[];
  consultationFee: number;
  revenueSharePercentage: number;
  fixedVisitCharges: number;
  mobile: string;
  email: string;
  status: "Active" | "Inactive";
}

export interface ErpAppointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  serviceId: string;
  serviceName: string;
  status: "Pending" | "Confirmed" | "Checked-In" | "Completed" | "Cancelled" | "No Show";
  type: "Online" | "Walk-in" | "Follow-up";
  notes?: string;
  branchId: string;
  createdAt: string;
  phone?: string;
  email?: string;
  address?: string;
  appointmentType?: string;
}

export interface ErpServiceItem {
  id: string;
  name: string;
  category: "General Dentistry" | "Cosmetic Dentistry" | "Orthodontics" | "Root Canal" | "Teeth Whitening" | "Dental Implant" | "Oral Surgery" | "Pediatric Dentistry" | "Emergency Care";
  duration: number; // in minutes
  price: number;
  tax: number; // percentage
  discount: number; // flat discount
  description: string;
  status: "Active" | "Inactive";
}

export interface ErpTreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  status: "Draft" | "In Progress" | "Completed" | "Aborted";
  cost: number;
  notes: string;
  sessions: {
    id: string;
    date: string;
    notes: string;
    materialsUsed: string[];
    chargeAmount: number;
  }[];
  xrays: string[];
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: "Medicines" | "Dental Materials" | "Surgical Instruments" | "Consumables" | "Equipment" | "Office Supplies";
  unit: string;
  quantity: number;
  minStockLevel: number;
  purchasePrice: number;
  sellingPrice: number;
  expiryDate: string;
  supplier: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstNumber: string;
  address: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    unitCost: number;
  }[];
  tax: number;
  totalAmount: number;
  status: "Draft" | "Ordered" | "Received" | "Partially Received" | "Cancelled";
  createdAt: string;
}

export interface ErpInvoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentMethod: "Cash" | "Card" | "UPI" | "Bank Transfer";
  status: "Unpaid" | "Partially Paid" | "Paid" | "Refunded";
  items: {
    description: string;
    unitPrice: number;
    quantity: number;
    amount: number;
  }[];
}

export interface TransactionDoc {
  id: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
  date: string;
  description: string;
  referenceId?: string; // invoiceId or POId
}

export interface WebsiteLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: "Contact Form" | "WhatsApp" | "Phone Calls" | "Referrals";
  pipeline: "New" | "Contacted" | "Interested" | "Consultation Scheduled" | "Converted" | "Lost";
  notes?: string;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: UserRole;
  salary: number;
  attendance: Record<string, "Present" | "Absent" | "Half Day" | "Leave">;
  shifts: string; // e.g. "Morning (09:00 AM - 01:00 PM)"
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  contact: string;
  isActive: boolean;
}
