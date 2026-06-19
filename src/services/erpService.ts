/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from "../lib/firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  writeBatch 
} from "firebase/firestore";
import { 
  ErpPatient, 
  ErpDoctor, 
  ErpConsultant, 
  ErpAppointment, 
  ErpServiceItem, 
  ErpTreatmentPlan, 
  InventoryItem, 
  Supplier, 
  PurchaseOrder, 
  ErpInvoice, 
  TransactionDoc, 
  WebsiteLead, 
  StaffMember, 
  Branch,
  PatientTimelineEvent
} from "../types/erp";

// local Storage keys as robust fallback
const MOCK_STORAGE_PRE = "mithra_erp_";

// Standalone fully-typed helper functions to read / write local or firestore
async function listCollection<T>(colName: string, defaultData: T[]): Promise<T[]> {
  try {
    const q = collection(db, colName);
    const snapshot = await getDocs(q);
    const items: any[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    if (items.length === 0) {
      // Seed database or use local cache
      const stored = localStorage.getItem(MOCK_STORAGE_PRE + colName);
      if (stored) {
        try { return JSON.parse(stored); } catch { }
      }
      // Write default initial list to Firestore
      const batch = writeBatch(db);
      defaultData.forEach((item: any) => {
        const docRef = doc(db, colName, item.id);
        batch.set(docRef, item);
      });
      await batch.commit().catch(e => console.warn("Firestore seed throttled:", e));
      
      localStorage.setItem(MOCK_STORAGE_PRE + colName, JSON.stringify(defaultData));
      return defaultData;
    }
    
    localStorage.setItem(MOCK_STORAGE_PRE + colName, JSON.stringify(items));
    return items as T[];
  } catch (e) {
    console.warn(`Firestore read failed for ${colName}, fallback to offline:`, e);
    const stored = localStorage.getItem(MOCK_STORAGE_PRE + colName);
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return defaultData;
  }
}

async function saveItem<T extends { id: string }>(colName: string, item: T): Promise<void> {
  try {
    const docRef = doc(db, colName, item.id);
    await setDoc(docRef, item);
  } catch (e) {
    console.warn(`Firestore write failed for ${colName}:`, e);
  }
  // Update local storage
  const current = await getCurrentLocal<T>(colName);
  const existingIdx = current.findIndex(x => x.id === item.id);
  if (existingIdx >= 0) {
    current[existingIdx] = item;
  } else {
    current.push(item);
  }
  localStorage.setItem(MOCK_STORAGE_PRE + colName, JSON.stringify(current));
}

async function deleteItem(colName: string, id: string): Promise<void> {
  try {
    const docRef = doc(db, colName, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn(`Firestore delete failed for ${colName}:`, e);
  }
  // Update local storage
  const current = await getCurrentLocal<any>(colName);
  const filtered = current.filter(x => x.id !== id);
  localStorage.setItem(MOCK_STORAGE_PRE + colName, JSON.stringify(filtered));
}

async function getCurrentLocal<T>(colName: string): Promise<T[]> {
  const stored = localStorage.getItem(MOCK_STORAGE_PRE + colName);
  return stored ? JSON.parse(stored) : [];
}

export const erpService = {
  // Export methods as standalone helpers
  saveItem,
  deleteItem,

  // 1. BRANCH MODULE
  async getBranches(): Promise<Branch[]> {
    return listCollection<Branch>("branches", [
      { id: "br-1", name: "Erode Main Branch", location: "Perundurai Road, Erode", contact: "+91 98765 43210", isActive: true },
      { id: "br-2", name: "Erode City Square", location: "Sathy Road, Erode", contact: "+91 98765 43211", isActive: true }
    ]);
  },

  // 2. PATIENTS MODULE
  async getPatients(): Promise<ErpPatient[]> {
    return listCollection<ErpPatient>("patients", [
      {
        id: "p-1",
        patientId: "MDS-P-001",
        name: "Arun Kumar",
        dob: "1994-08-12",
        gender: "Male",
        mobile: "9443215678",
        email: "arun.kumar@gmail.com",
        address: "12, Sampath Nagar, Erode",
        bloodGroup: "O+",
        medicalHistory: ["Hypertension", "Mild Gluten Allergy"],
        allergies: ["Penicillin"],
        insuranceDetails: "Star Health Insurance - Plan Premium (ID: SH-9021)",
        emergencyContact: {
          name: "Deepa Kumar",
          relationship: "Spouse",
          phone: "9443215679"
        },
        createdAt: "2026-06-01T10:00:00Z"
      },
      {
        id: "p-2",
        patientId: "MDS-P-002",
        name: "Janani S.",
        dob: "1998-05-24",
        gender: "Female",
        mobile: "9865412356",
        email: "janani.s@physics.com",
        address: "56-A, Gandhiji Road, Erode",
        bloodGroup: "A+",
        medicalHistory: ["None"],
        allergies: ["Latex"],
        insuranceDetails: "LIC Mediclaim (ID: LIC-889)",
        emergencyContact: {
          name: "Selvam M.",
          relationship: "Father",
          phone: "9865412357"
        },
        createdAt: "2026-06-05T14:30:00Z"
      }
    ]);
  },

  async getPatientTimeline(patientId: string): Promise<PatientTimelineEvent[]> {
    return listCollection<PatientTimelineEvent>("patient_timeline", [
      {
        id: "t-1",
        patientId: "p-1",
        date: "2026-06-02",
        type: "Visit",
        title: "Initial Oral Examination",
        description: "Diagnosed mild plaque accumulation and class I malocclusion.",
        performedBy: "Dr. Mithra"
      },
      {
        id: "t-2",
        patientId: "p-1",
        date: "2026-06-02",
        type: "X-ray",
        title: "Panoramic Dental Panoramic (OPG)",
        description: "Full panoramic digital diagnostic image captured. Arch and alignment scanned successfully.",
        performedBy: "Lab Tech Ramesh"
      },
      {
        id: "t-3",
        patientId: "p-2",
        date: "2026-06-06",
        type: "Treatment",
        title: "Laser Teeth Whitening Session",
        description: "Applied zoom bleaching gel and underwent 3 light exposure cycles. Restored brilliance of upper & lower arches.",
        performedBy: "Dr. Mithra"
      }
    ]).then(allItems => allItems.filter(e => e.patientId === patientId));
  },

  // 3. DOCTORS MODULE
  async getDoctors(): Promise<ErpDoctor[]> {
    return listCollection<ErpDoctor>("doctors", [
      {
        id: "d-1",
        doctorId: "MDS-D-01",
        name: "Dr. Mithra",
        specialization: "Orthodontics & Aligner Therapy",
        qualification: "MDS (Orthodontics)",
        experience: 11,
        consultationFee: 500,
        workingSchedule: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        availableSlots: ["09:30 AM", "11:00 AM", "02:30 PM", "04:00 PM"],
        profilePhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
        status: "Active"
      },
      {
        id: "d-2",
        doctorId: "MDS-D-02",
        name: "Dr. Vignesh",
        specialization: "Oral & Maxillofacial Surgery",
        qualification: "MDS (Oral Surgery)",
        experience: 9,
        consultationFee: 700,
        workingSchedule: ["Tue", "Thu", "Sat"],
        availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM"],
        profilePhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
        status: "Active"
      }
    ]);
  },

  // 4. CONSULTANT DOCTOR MODULE
  async getConsultants(): Promise<ErpConsultant[]> {
    return listCollection<ErpConsultant>("consultants", [
      {
        id: "c-1",
        consultantId: "MDS-C-01",
        name: "Dr. Rajesh K.",
        specialization: "Pediatric Dentistry Specialist",
        visitingDays: ["Wednesday", "Saturday"],
        consultationFee: 600,
        revenueSharePercentage: 65,
        fixedVisitCharges: 1000,
        mobile: "9845236170",
        email: "rajesh.peds@gmail.com",
        status: "Active"
      },
      {
        id: "c-2",
        consultantId: "MDS-C-02",
        name: "Dr. Shrikumar",
        specialization: "Endodontist",
        visitingDays: ["Monday", "Thursday"],
        consultationFee: 800,
        revenueSharePercentage: 70,
        fixedVisitCharges: 1200,
        mobile: "9445123980",
        email: "shri.rootcanal@yahoo.com",
        status: "Active"
      }
    ]);
  },

  // 5. APPOINTMENTS MODULE
  async getAppointments(): Promise<ErpAppointment[]> {
    return listCollection<ErpAppointment>("erp_appointments", [
      {
        id: "appt-101",
        patientId: "p-1",
        patientName: "Arun Kumar",
        doctorId: "d-1",
        doctorName: "Dr. Mithra",
        date: "2026-06-19",
        timeSlot: "09:30 AM",
        serviceId: "orthodontics",
        serviceName: "Orthodontics",
        status: "Confirmed",
        type: "Online",
        notes: "Routine checkup and clear aligner placement",
        branchId: "br-1",
        createdAt: "2026-06-15T09:00:00Z"
      },
      {
        id: "appt-102",
        patientId: "p-2",
        patientName: "Janani S.",
        doctorId: "d-1",
        doctorName: "Dr. Mithra",
        date: "2026-06-19",
        timeSlot: "11:00 AM",
        serviceId: "teeth-whitening",
        serviceName: "Teeth Whitening",
        status: "Checked-In",
        type: "Walk-in",
        notes: "Whitening finishing session",
        branchId: "br-1",
        createdAt: "2026-06-18T16:00:00Z"
      }
    ]);
  },

  // 6. SERVICES CATALOG
  async getServices(): Promise<ErpServiceItem[]> {
    return listCollection<ErpServiceItem>("services", [
      {
        id: "s-ortho",
        name: "Clear Aligner Orthodontics",
        category: "Orthodontics",
        duration: 45,
        price: 45000,
        tax: 18,
        discount: 2500,
        description: "Invisalign and modern transparent aligners for premium invisible correction.",
        status: "Active"
      },
      {
        id: "s-whitening",
        name: "Laser Teeth Whitening",
        category: "Teeth Whitening",
        duration: 60,
        price: 5000,
        tax: 18,
        discount: 500,
        description: "Deep power bleaching with cold blue surgical lasers to maximize whiteness.",
        status: "Active"
      },
      {
        id: "s-implant",
        name: "Porcelain Single Implant Protection",
        category: "Dental Implant",
        duration: 90,
        price: 25000,
        tax: 18,
        discount: 1000,
        description: "German medical titanium fixtures with bespoke high contrast porcelain crown restorations.",
        status: "Active"
      }
    ]);
  },

  // 7. TREATMENT MODULE
  async getTreatmentPlans(): Promise<ErpTreatmentPlan[]> {
    return listCollection<ErpTreatmentPlan>("treatment_plans", [
      {
        id: "plan-1",
        patientId: "p-1",
        patientName: "Arun Kumar",
        title: "Malocclusion Aligner Realignment",
        status: "In Progress",
        cost: 45000,
        notes: "Requires 12 alignment progressive trays. Periodic clinical checks requested.",
        sessions: [
          {
            id: "psess-1",
            date: "2026-06-02",
            notes: "Fitted Aligner Tray Set #1. Minimal discomfort reported.",
            materialsUsed: ["Aligner Tray 1", "Arch lock adhesive"],
            chargeAmount: 15000
          }
        ],
        xrays: ["https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=300"]
      }
    ]);
  },

  // 8. INVENTORY MODULE
  async getInventory(): Promise<InventoryItem[]> {
    return listCollection<InventoryItem>("inventory", [
      {
        id: "i-1",
        itemCode: "MED-091",
        itemName: "Amoxicillin Caps 500mg",
        category: "Medicines",
        unit: "Strip of 10",
        quantity: 120,
        minStockLevel: 20,
        purchasePrice: 45,
        sellingPrice: 95,
        expiryDate: "2027-12-31",
        supplier: "Salem Pharma Lab"
      },
      {
        id: "i-2",
        itemCode: "MAT-203",
        itemName: "Visible Light Cure Composite",
        category: "Dental Materials",
        unit: "Syringe kit",
        quantity: 5,
        minStockLevel: 10,
        purchasePrice: 750,
        sellingPrice: 1500,
        expiryDate: "2026-11-30",
        supplier: "Apex Dent India"
      }
    ]);
  },

  // 9. SUPPLIERS
  async getSuppliers(): Promise<Supplier[]> {
    return listCollection<Supplier>("suppliers", [
      {
        id: "sup-1",
        name: "Salem Pharma Lab",
        contactPerson: "Loganathan K.",
        phone: "9843152643",
        email: "salem.pharma@gmail.com",
        gstNumber: "33AAECS5481B1ZO",
        address: "71, Cherry Road, Salem, TN"
      },
      {
        id: "sup-2",
        name: "Apex Dent India",
        contactPerson: "Mukundan S.",
        phone: "9944112233",
        email: "orders@apexdent.co.in",
        gstNumber: "33ABECS1202C2ZU",
        address: "410, Avinashi Road, Coimbatore, TN"
      }
    ]);
  },

  // 10. PURCHASE ORDERS
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    return listCollection<PurchaseOrder>("purchase_orders", [
      {
        id: "po-1",
        poNumber: "MDS-PO-021",
        supplierId: "sup-2",
        supplierName: "Apex Dent India",
        items: [
          { itemId: "i-2", itemName: "Visible Light Cure Composite", quantity: 15, unitCost: 750 }
        ],
        tax: 18,
        totalAmount: 13275,
        status: "Ordered",
        createdAt: "2026-06-10T11:00:00Z"
      }
    ]);
  },

  // 11. INVOICES
  async getInvoices(): Promise<ErpInvoice[]> {
    return listCollection<ErpInvoice>("invoices", [
      {
        id: "inv-2001",
        invoiceNumber: "MD-INV-2026-054",
        patientId: "p-2",
        patientName: "Janani S.",
        date: "2026-06-19",
        totalAmount: 5120,
        taxAmount: 620,
        discountAmount: 500,
        paidAmount: 5120,
        outstandingAmount: 0,
        paymentMethod: "UPI",
        status: "Paid",
        items: [
          { description: "Laser Teeth Whitening Finishing Cycle", unitPrice: 5000, quantity: 1, amount: 5000 }
        ]
      },
      {
        id: "inv-2002",
        invoiceNumber: "MD-INV-2026-055",
        patientId: "p-1",
        patientName: "Arun Kumar",
        date: "2026-06-19",
        totalAmount: 15000,
        taxAmount: 1800,
        discountAmount: 0,
        paidAmount: 5000,
        outstandingAmount: 10000,
        paymentMethod: "Cash",
        status: "Partially Paid",
        items: [
          { description: "Orthodontics Arch adjustment session #1", unitPrice: 15000, quantity: 1, amount: 15000 }
        ]
      }
    ]);
  },

  // 12. GENERAL TRANSACTION EXPENDITURES & INCOME CASHBOOK
  async getTransactions(): Promise<TransactionDoc[]> {
    return listCollection<TransactionDoc>("transactions", [
      { id: "tx-1", type: "Income", category: "Dental Treatments Billing", amount: 5120, date: "2026-06-19", description: "Tooth Bleaching for Janani S. (MD-INV-2026-054)" },
      { id: "tx-2", type: "Income", category: "Dental Treatments Billing", amount: 5000, date: "2026-06-19", description: "Advance received for Arun Kumar Aligner Plan" },
      { id: "tx-3", type: "Expense", category: "Suppliers Payment", amount: 4500, date: "2026-06-17", description: "Purchased initial Amoxicillin and materials" },
      { id: "tx-4", type: "Expense", category: "Staff Stipends", amount: 15000, date: "2026-06-15", description: "Support Staff Salary" }
    ]);
  },

  // 13. WEBSITE LEADS CRM Pipeline
  async getLeads(): Promise<WebsiteLead[]> {
    return listCollection<WebsiteLead>("leads", [
      { id: "ld-1", name: "Murthy Ramasawmy", email: "murthy.r@live.com", phone: "9874561230", source: "Contact Form", pipeline: "New", notes: "Prefers orthogenics or invisalign aligners.", createdAt: "2026-06-18T10:00:00Z" },
      { id: "ld-2", name: "Ananya Nair", email: "ananya.smile@gmail.com", phone: "9445127810", source: "WhatsApp", pipeline: "Interested", notes: "Inquired about laser whitening charges.", createdAt: "2026-06-17T15:20:00Z" }
    ]);
  },

  // 14. HR & STAFF DIRECTORY
  async getStaff(): Promise<StaffMember[]> {
    return listCollection<StaffMember>("staff", [
      { id: "st-1", name: "Subha S.", role: "Receptionist", salary: 15000, attendance: { "2026-06-19": "Present" }, shifts: "Day Shift (09:00 AM - 06:00 PM)" },
      { id: "st-2", name: "Ramesh Kumar", role: "Lab Technician", salary: 22000, attendance: { "2026-06-19": "Present" }, shifts: "Day Shift (09:00 AM - 06:00 PM)" },
      { id: "st-3", name: "Meena M.", role: "Nurse", salary: 18000, attendance: { "2026-06-19": "Present" }, shifts: "Day Shift (09:00 AM - 06:00 PM)" }
    ]);
  }
};
