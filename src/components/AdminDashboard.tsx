/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  UserSquare2, 
  Settings, 
  FileText, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Briefcase, 
  Compass, 
  Building2, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  AlertCircle, 
  CheckCircle, 
  Printer, 
  Download, 
  UserPlus, 
  Eye, 
  FolderPlus, 
  Heart, 
  MessageSquare, 
  Sun, 
  Moon, 
  Clock, 
  Percent, 
  UserCheck, 
  Bell, 
  ChevronRight,
  ShieldCheck,
  ClipboardList,
  Check,
  CreditCard,
  DollarSign
} from "lucide-react";
import { erpService } from "../services/erpService";
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
  UserRole,
  PatientTimelineEvent
} from "../types/erp";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Global View states
  const [activeTab, setActiveTab] = useState<
    "overview" | "patients" | "appointments" | "doctors" | "services" | "inventory" | "billing" | "crm" | "hr" | "branches"
  >("overview");
  
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>("Super Admin");

  // Notifications
  const [notifications, setNotifications] = useState<{ id: string; msg: string; type: "alert" | "info" }[]>([
    { id: "n1", msg: "Low stock detected: VLC Syringe kit is below safety margin.", type: "alert" },
    { id: "n2", msg: "New WhatsApp CRM lead generated for Invisalign Consultation.", type: "info" }
  ]);

  // Loading & Data States
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [patients, setPatients] = useState<ErpPatient[]>([]);
  const [doctors, setDoctors] = useState<ErpDoctor[]>([]);
  const [consultants, setConsultants] = useState<ErpConsultant[]>([]);
  const [appointments, setAppointments] = useState<ErpAppointment[]>([]);
  const [services, setServices] = useState<ErpServiceItem[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<ErpTreatmentPlan[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [invoices, setInvoices] = useState<ErpInvoice[]>([]);
  const [transactions, setTransactions] = useState<TransactionDoc[]>([]);
  const [leads, setLeads] = useState<WebsiteLead[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);

  // Selected details or Form modal states
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientTimeline, setPatientTimeline] = useState<PatientTimelineEvent[]>([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [invSearch, setInvSearch] = useState("");
  const [aptFilterStatus, setAptFilterStatus] = useState<string>("all");
  const [aptFilterDateMode, setAptFilterDateMode] = useState<string>("all");
  const [aptFilterStartDate, setAptFilterStartDate] = useState<string>("");
  const [aptFilterEndDate, setAptFilterEndDate] = useState<string>("");

  // Edit / Add Item Forms State
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isConsultantModalOpen, setIsConsultantModalOpen] = useState(false);
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  // Buffer state for adding / editing objects
  const [patientForm, setPatientForm] = useState<Partial<ErpPatient>>({});
  const [doctorForm, setDoctorForm] = useState<Partial<ErpDoctor>>({});
  const [consultantForm, setConsultantForm] = useState<Partial<ErpConsultant>>({});
  const [aptForm, setAptForm] = useState<Partial<ErpAppointment>>({});
  const [inventoryForm, setInventoryForm] = useState<Partial<InventoryItem>>({});

  // Active Calendar View
  const [calendarView, setCalendarView] = useState<"Day" | "Week" | "Month">("Month");
  
  // Outstanding billing list filter
  const [billingTab, setBillingTab] = useState<"invoices" | "cashbook" | "consultant_settlements">("invoices");

  // Load all ERP context
  const loadAllErpContext = async (isSilent: boolean = false) => {
    try {
      if (!isSilent) {
        setLoading(true);
      }
      const [
        brs, pat, doc, con, apt, srv, plans, inv, sups, pos, invs, txs, lds, stf
      ] = await Promise.all([
        erpService.getBranches(),
        erpService.getPatients(),
        erpService.getDoctors(),
        erpService.getConsultants(),
        erpService.getAppointments(),
        erpService.getServices(),
        erpService.getTreatmentPlans(),
        erpService.getInventory(),
        erpService.getSuppliers(),
        erpService.getPurchaseOrders(),
        erpService.getInvoices(),
        erpService.getTransactions(),
        erpService.getLeads(),
        erpService.getStaff()
      ]);

      setBranches(brs);
      setPatients(pat);
      setDoctors(doc);
      setConsultants(con);
      setAppointments(apt);
      setServices(srv);
      setTreatmentPlans(plans);
      setInventory(inv);
      setSuppliers(sups);
      setPurchaseOrders(pos);
      setInvoices(invs);
      setTransactions(txs);
      setLeads(lds);
      setStaff(stf);
    } catch (e) {
      console.error("Failed loading ERP: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllErpContext();
    
    // Set up real-time scenario synchronization/polling every 10 seconds
    const interval = setInterval(() => {
      loadAllErpContext(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Sync timeline on patient switch
  useEffect(() => {
    if (selectedPatientId) {
      erpService.getPatientTimeline(selectedPatientId).then(setPatientTimeline);
    }
  }, [selectedPatientId]);

  // Calculations for Admin Stats Panel
  const filteredAppointments = appointments.filter(a => {
    if (selectedBranch !== "all" && a.branchId !== selectedBranch) return false;
    return true;
  });

  const todayStr = "2026-06-19";
  const todayAppts = filteredAppointments.filter(a => a.date === todayStr);
  const pendingAppts = filteredAppointments.filter(a => a.status === "Pending");
  
  // Financial Overview
  const totalRevenueMonth = invoices
    .filter(inv => inv.status === "Paid" || inv.status === "Partially Paid")
    .reduce((sum, current) => sum + current.paidAmount, 0);

  const outstandingAmt = invoices.reduce((sum, item) => sum + item.outstandingAmount, 0);

  // Inventory and Stock Warnings
  const lowStockItems = inventory.filter(i => i.quantity <= i.minStockLevel);

  // Multi-branch label helper
  const getBranchName = (bId: string) => {
    return branches.find(b => b.id === bId)?.name || "Main Branch";
  };

  // ERP Operations handling
  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !patientForm.id;
    const newPatient: ErpPatient = {
      id: patientForm.id || `p-${Date.now()}`,
      patientId: patientForm.patientId || `MDS-P-${String(patients.length + 1).padStart(3, "0")}`,
      name: patientForm.name || "Unnamed Patient",
      dob: patientForm.dob || "1994-01-01",
      gender: patientForm.gender || "Female",
      mobile: patientForm.mobile || "",
      email: patientForm.email || "",
      address: patientForm.address || "",
      bloodGroup: patientForm.bloodGroup || "O+",
      medicalHistory: patientForm.medicalHistory || [],
      allergies: patientForm.allergies || [],
      insuranceDetails: patientForm.insuranceDetails || "None",
      emergencyContact: patientForm.emergencyContact || { name: "", relationship: "", phone: "" },
      createdAt: patientForm.createdAt || new Date().toISOString()
    };

    await erpService.saveItem<ErpPatient>("patients", newPatient);
    setIsPatientModalOpen(false);
    setPatientForm({});
    loadAllErpContext();
  };

  const handleDeletePatient = async (id: string) => {
    if (confirm("Are you sure you want to archive this patient?")) {
      await erpService.deleteItem("patients", id);
      loadAllErpContext();
      if (selectedPatientId === id) setSelectedPatientId(null);
    }
  };

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: ErpDoctor = {
      id: doctorForm.id || `d-${Date.now()}`,
      doctorId: doctorForm.doctorId || `MDS-D-${String(doctors.length + 1).padStart(2, "0")}`,
      name: doctorForm.name || "Dr. New Specialist",
      specialization: doctorForm.specialization || "General Dentist",
      qualification: doctorForm.qualification || "BDS",
      experience: Number(doctorForm.experience) || 5,
      consultationFee: Number(doctorForm.consultationFee) || 350,
      workingSchedule: doctorForm.workingSchedule || ["Mon", "Tue", "Wed", "Thu", "Fri"],
      availableSlots: ["09:30 AM", "11:00 AM", "03:00 PM"],
      profilePhoto: doctorForm.profilePhoto || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
      status: doctorForm.status || "Active"
    };

    await erpService.saveItem<ErpDoctor>("doctors", newDoc);
    setIsDoctorModalOpen(false);
    setDoctorForm({});
    loadAllErpContext();
  };

  const handleDeleteDoc = async (id: string) => {
    if (confirm("Deactivate this medical practitioner?")) {
      await erpService.deleteItem("doctors", id);
      loadAllErpContext();
    }
  };

  const handleSaveConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCon: ErpConsultant = {
      id: consultantForm.id || `c-${Date.now()}`,
      consultantId: consultantForm.consultantId || `MDS-C-${String(consultants.length + 1).padStart(2, "0")}`,
      name: consultantForm.name || "",
      specialization: consultantForm.specialization || "Visiting Consultant",
      visitingDays: consultantForm.visitingDays || ["Wednesday"],
      consultationFee: Number(consultantForm.consultationFee) || 500,
      revenueSharePercentage: Number(consultantForm.revenueSharePercentage) || 60,
      fixedVisitCharges: Number(consultantForm.fixedVisitCharges) || 1000,
      mobile: consultantForm.mobile || "",
      email: consultantForm.email || "",
      status: consultantForm.status || "Active"
    };

    await erpService.saveItem<ErpConsultant>("consultants", newCon);
    setIsConsultantModalOpen(false);
    setConsultantForm({});
    loadAllErpContext();
  };

  const handleSaveAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find(p => p.id === aptForm.patientId);
    const doctorObj = doctors.find(d => d.id === aptForm.doctorId);
    const serviceObj = services.find(s => s.id === aptForm.serviceId);

    const newApt: ErpAppointment = {
      id: aptForm.id || `appt-${Date.now()}`,
      patientId: aptForm.patientId || "",
      patientName: patientObj ? patientObj.name : "Walk-in Patient",
      doctorId: aptForm.doctorId || "",
      doctorName: doctorObj ? doctorObj.name : "Unregistered Consultant",
      date: aptForm.date || todayStr,
      timeSlot: aptForm.timeSlot || "10:00 AM",
      serviceId: aptForm.serviceId || "",
      serviceName: serviceObj ? serviceObj.name : "Consultation Checkup",
      status: (aptForm.status as any) || "Pending",
      type: (aptForm.type as any) || "Walk-in",
      notes: aptForm.notes || "",
      branchId: aptForm.branchId || "br-1",
      createdAt: aptForm.createdAt || new Date().toISOString()
    };

    await erpService.saveItem<ErpAppointment>("erp_appointments", newApt);
    setIsAptModalOpen(false);
    setAptForm({});
    loadAllErpContext();
  };

  const checkAndCreatePatientRecord = async (apt: ErpAppointment) => {
    // normalized phone strings for search
    const cleanAptPhone = apt.phone ? apt.phone.replace(/[^0-9]/g, "") : "";
    const isAlreadyPatient = patients.some(p => {
      const cleanPPhone = p.mobile ? p.mobile.replace(/[^0-9]/g, "") : "";
      return (
        (cleanAptPhone && cleanPPhone && cleanAptPhone === cleanPPhone) ||
        p.name.toLowerCase().trim() === apt.patientName.toLowerCase().trim()
      );
    });

    if (!isAlreadyPatient) {
      const generatedPatientId = `MDS-P-${String(patients.length + 1).padStart(3, "0")}`;
      const newPatient: ErpPatient = {
        id: `p-${Date.now()}-${Math.floor(Math.random() * 1050)}`,
        patientId: generatedPatientId,
        name: apt.patientName,
        dob: "1994-01-01",
        gender: "Female",
        mobile: apt.phone || "",
        email: apt.email || "",
        address: apt.address || "Adyar, Chennai",
        bloodGroup: "O+",
        medicalHistory: apt.notes ? [apt.notes] : ["Registered via Online Booking Approval"],
        allergies: [],
        insuranceDetails: "None",
        emergencyContact: { name: "", relationship: "", phone: "" },
        createdAt: new Date().toISOString()
      };
      await erpService.saveItem<ErpPatient>("patients", newPatient);
    }
  };

  const handleToggleAptStatus = async (id: string, newStatus: ErpAppointment["status"]) => {
    const item = appointments.find(a => a.id === id);
    if (item) {
      const updated = { ...item, status: newStatus };
      await erpService.saveItem<ErpAppointment>("erp_appointments", updated);
      if (newStatus === "Confirmed") {
        await checkAndCreatePatientRecord(item);
      }
      loadAllErpContext();
    }
  };

  const handleApproveAndWhatsApp = async (apt: ErpAppointment) => {
    const updated = { ...apt, status: "Confirmed" as const };
    await erpService.saveItem<ErpAppointment>("erp_appointments", updated);
    await checkAndCreatePatientRecord(apt);
    loadAllErpContext();

    const phoneNum = apt.phone ? apt.phone.replace(/[^0-9]/g, "") : "";
    const finalPhone = phoneNum.length === 10 ? `91${phoneNum}` : phoneNum;
    
    const formattedDate = apt.date.split("-").reverse().join("/");
    const message = 
      `*Mithra's Dental Studio & Expanded Hospital*\n` +
      `------------------------------------\n` +
      `Dear *${apt.patientName}*,\n\n` +
      `🎉 We are pleased to inform you that your appointment with Dr. Mithra has been *APPROVED & CONFIRMED*!\n\n` +
      `📅 *Date:* ${formattedDate}\n` +
      `⏰ *Time:* ${apt.timeSlot}\n` +
      `🩺 *Practitioner:* ${apt.doctorName || "Dr. Mithra"}\n` +
      `🦷 *Treatment:* ${apt.serviceName}\n\n` +
      `Please report 10 minutes prior to your schedule. If you need any assistance, feel free to reply.\n` +
      `------------------------------------\n` +
      `_Location:_ No: 12B, Ground Floor, Adyar, Chennai - 600020.`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${finalPhone}?text=${encodedMsg}`;
    window.open(url, "_blank");
  };

  const handleSaveInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      id: inventoryForm.id || `i-${Date.now()}`,
      itemCode: inventoryForm.itemCode || `MDS-INV-${String(inventory.length + 1).padStart(3, "0")}`,
      itemName: inventoryForm.itemName || "",
      category: inventoryForm.category || "Consumables",
      unit: inventoryForm.unit || "Box",
      quantity: Number(inventoryForm.quantity) || 0,
      minStockLevel: Number(inventoryForm.minStockLevel) || 5,
      purchasePrice: Number(inventoryForm.purchasePrice) || 0,
      sellingPrice: Number(inventoryForm.sellingPrice) || 0,
      expiryDate: inventoryForm.expiryDate || "2027-12-31",
      supplier: inventoryForm.supplier || ""
    };

    await erpService.saveItem<InventoryItem>("inventory", newItem);
    setIsInventoryModalOpen(false);
    setInventoryForm({});
    loadAllErpContext();
  };

  // Seed generic timeline event for selected patient profile
  const handleAddTimelineEvent = async (patientId: string) => {
    const inputTitle = prompt("Enter medical timeline event title:\n(e.g., Crown cementation)");
    const inputDesc = prompt("Enter diagnostic detail / notes:");
    if (!inputTitle || !inputDesc) return;

    const newEvt: PatientTimelineEvent = {
      id: `timeline-${Date.now()}`,
      patientId,
      date: todayStr,
      type: "Treatment",
      title: inputTitle,
      description: inputDesc,
      performedBy: currentUserRole
    };

    await erpService.saveItem<PatientTimelineEvent>("patient_timeline", newEvt);
    erpService.getPatientTimeline(patientId).then(setPatientTimeline);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-[#5D57A5] selection:text-white ${darkMode ? "bg-slate-950 text-slate-100" : "bg-[#F4F6F9] text-slate-800"}`}>
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* 1. ERP HIGH-FIDELITY SIDEBAR STICKY (Left Navigation mimicking the screenshot style) */}
        <div className={`w-full lg:w-72 shrink-0 border-r lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between overflow-y-auto ${darkMode ? "bg-slate-905 border-slate-800" : "bg-white border-slate-200"} p-5 shadow-xs`}>
          <div>
            {/* Logo Brand Brand */}
            <div className="flex items-center gap-3.5 mb-6 px-1.5 py-1">
              <div className="p-2.5 bg-[#5D57A5] text-white rounded-xl shadow-md cursor-pointer hover:rotate-6 transition-transform">
                <Building2 size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-display font-black tracking-tight flex items-center gap-1.5 text-slate-900">
                  Dataviz <span className="text-[#5D57A5] text-xs font-serif font-semibold italic">Studio</span>
                </h1>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-1">
                  Mithra Dental ERP
                </p>
              </div>
            </div>

            {/* Custom Interactive Purple Profile Block matching the screenshot "Louis Scott" */}
            <div className="bg-gradient-to-r from-[#5D57A5] to-[#7169C5] hover:to-[#5D57A5] text-white p-4.5 rounded-2xl mb-8 flex items-center gap-3.5 shadow-md group relative overflow-hidden transition-all duration-300">
              <div className="absolute right-[-10px] bottom-[-15px] opacity-15 text-white transition-transform group-hover:scale-125 duration-500">
                <ShieldCheck size={100} />
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" 
                  alt="Dr. Mithra" 
                  className="w-12 h-12 rounded-full border-2 border-white/80 object-cover shadow-xs" 
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#5D57A5] rounded-full" />
              </div>
              <div className="relative z-10 leading-tight">
                <p className="font-display font-extrabold text-sm tracking-tight">Dr. Mithra</p>
                <p className="text-[10px] text-indigo-100 font-mono tracking-wider mt-0.5 uppercase opacity-90">{currentUserRole}</p>
              </div>
            </div>

            {/* Navigation Drawer Blocks */}
            <div className="space-y-1">
              {[
                { id: "overview", label: "Dashboard Overview", icon: TrendingUp },
                { id: "patients", label: "Patient Directory", icon: Users },
                { id: "appointments", label: "Weekly Schedule / Calendar", icon: Calendar },
                { id: "doctors", label: "Doctors & Consultants", icon: Stethoscope },
                { id: "services", label: "Dental Service Catalog", icon: UserSquare2 },
                { id: "inventory", label: "Inventory Stock", icon: Package },
                { id: "billing", label: "Billing & Cashbook", icon: DollarSign },
                { id: "crm", label: "Website Leads Funnel", icon: MessageSquare },
                { id: "hr", label: "Staff Attendance & Shifting", icon: Briefcase },
                { id: "branches", label: "Branch Distribution", icon: Building2 }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all duration-200 group ${
                      isActive
                        ? "bg-[#5D57A5]/8 text-[#5D57A5] border-l-4 border-[#5D57A5] font-bold shadow-2xs"
                        : darkMode
                          ? "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        size={16} 
                        className={isActive ? "text-[#5D57A5]" : "text-slate-400 group-hover:text-[#5D57A5] transition-colors"} 
                      />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 bg-[#5D57A5] rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <div className={`p-4 rounded-xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-[#1C1242]/5 border-[#5D57A5]/10"} text-center`}>
              <span className="text-[9px] font-black uppercase text-[#5D57A5] tracking-widest block mb-1">
                SYSTEM INTEGRITY
              </span>
              <p className="text-[10px] font-medium text-slate-500 leading-normal">
                Cloud Firestore connected securely & synchronized live.
              </p>
            </div>
          </div>
        </div>

        {/* 2. PRIMARY ADMINISTRATIVE DISPLAY VIEWPORT */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Control Bar with Search, Simulation, and Core Actions */}
          <div className={`sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b ${darkMode ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-slate-100"} backdrop-blur-md shadow-2xs`}>
            {/* Search Input mimicking mockup */}
            <div className="relative w-full max-w-xs">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Type to search patients, billing, orders..." 
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-hidden focus:ring-1 focus:ring-[#5D57A5] ${darkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-805"}`}
              />
            </div>

            {/* Quick Actions and Switchers */}
            <div className="flex items-center gap-3.5 flex-wrap">
              {/* Branch Switcher Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className={`p-2 text-xs rounded-xl border focus:outline-hidden font-semibold ${darkMode ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-200 text-slate-700"}`}
                >
                  <option value="all">🌐 All Branches</option>
                  {branches.map(br => (
                    <option key={br.id} value={br.id}>📍 {br.name}</option>
                  ))}
                </select>
              </div>

              {/* Simulation Role Select */}
              <div className="flex items-center gap-1.5">
                <select
                  value={currentUserRole}
                  onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
                  className={`p-2 text-xs rounded-xl border focus:outline-hidden font-extrabold ${darkMode ? "bg-slate-800 border-slate-700 text-yellow-300" : "bg-[#5D57A5]/5 border-[#5D57A5]/20 text-[#5D57A5]"}`}
                >
                  <option value="Super Admin">🔧 Super Admin</option>
                  <option value="Clinic Owner">👑 Clinic Owner</option>
                  <option value="Admin">🛡️ Admin</option>
                  <option value="Receptionist">💁‍♀️ Receptionist</option>
                  <option value="Doctor">🩺 Doctor (MDS)</option>
                  <option value="Nurse">👩‍⚕️ Nurse</option>
                  <option value="Lab Technician">🔬 Lab Tech</option>
                  <option value="Pharmacist">💊 Pharmacist</option>
                  <option value="Store Manager">📦 Store Manager</option>
                  <option value="Accountant">💰 Accountant</option>
                </select>
              </div>

              {/* Dark Mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl border transition-colors ${darkMode ? "bg-slate-850 border-slate-700 text-yellow-300" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"}`}
              >
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              {/* Exit Portal */}
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-95"
              >
                <LogOut size={13} />
                <span>Exit Portal</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {/* Notifications Ribbon */}
            {notifications.length > 0 && (
              <div className="mb-6 space-y-2">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 rounded-2xl border flex items-center justify-between text-xs font-semibold shadow-2xs ${
                      n.type === "alert" 
                        ? "bg-amber-50 border-amber-200 text-amber-800" 
                        : "bg-blue-50 border-blue-200 text-blue-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{n.msg}</span>
                    </div>
                    <button
                      onClick={() => setNotifications(notifications.filter(x => x.id !== n.id))}
                      className="hover:opacity-60 text-[10px] uppercase font-bold"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            )}

            {loading ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-[#5D57A5] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-mono text-slate-500 uppercase">Synchronizing databases...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                
                {/* --- TAB 1: STYLISH HIGH-FIDELITY OVERVIEW INDEX --- */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* BREADCRUMBS & CORE DYNAMIC DATE SELECTOR PILL (mimicking mockup top bar) */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                          <span>Dashboard</span>
                          <ChevronRight size={12} />
                          <span>App</span>
                          <ChevronRight size={12} />
                          <span>Dashboard</span>
                          <ChevronRight size={12} />
                          <span className="text-[#5D57A5] font-extrabold">Analytics</span>
                        </div>
                        <h2 className="text-2xl font-display font-black tracking-tight mt-1 text-slate-900">
                          Executive Clinical Performance
                        </h2>
                      </div>

                      {/* Header controls from photo */}
                      <div className="flex items-center gap-2.5">
                        <div className="bg-[#5D57A5] hover:bg-[#4C4691] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95">
                          <span>19 Jun 2026</span>
                          <span className="text-[9px] bg-white/20 px-1 py-0.5 rounded-sm">▼</span>
                        </div>
                        <button 
                          onClick={handleTriggerPrint}
                          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-2"
                        >
                          <Download size={14} />
                          <span>Download Report</span>
                        </button>
                      </div>
                    </div>

                    {/* ROW 1: THE FOUR MATTE GRADIENT RIBBON METRICS (mimicking mockup) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      
                      {/* Purple Card: Sales equivalent */}
                      <div className="bg-gradient-to-br from-[#5143AF] via-[#5D57A5] to-[#786DE7] text-white p-6 rounded-3xl shadow-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg">
                        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-white/5 rounded-full" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B2AAFF]">Appointments</span>
                          <Calendar size={18} className="text-[#B2AAFF] stroke-[2]" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2.5">
                          <span className="text-4xl font-display font-black tracking-tight">{todayAppts.length} Slots</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-white/20 rounded-lg text-white whitespace-nowrap">High 15% ↑</span>
                        </div>
                        <span className="text-[10px] text-[#C1B9FF] font-medium block mt-1.5">Scheduled for clinical evaluation today</span>
                      </div>

                      {/* Cyan/Teal Card: Returns equivalent */}
                      <div className="bg-gradient-to-br from-[#10937F] via-[#20C09E] to-[#43D8B4] text-white p-6 rounded-3xl shadow-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg">
                        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-white/5 rounded-full" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#A2F0DF]">Total Patients</span>
                          <Users size={18} className="text-[#A2F0DF] stroke-[2]" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2.5">
                          <span className="text-4xl font-display font-black tracking-tight">{patients.length} Case</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-white/20 rounded-lg text-white whitespace-nowrap">High 2.98% ↑</span>
                        </div>
                        <span className="text-[10px] text-[#A2F0DF] font-medium block mt-1.5">Consolidated active patient files</span>
                      </div>

                      {/* Royal Blue Card: Purchases equivalent */}
                      <div className="bg-gradient-to-br from-[#274FD1] via-[#3B66F5] to-[#5984FF] text-white p-6 rounded-3xl shadow-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg">
                        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-white/5 rounded-full" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B2CCFF]">Treatment Revenue</span>
                          <TrendingUp size={18} className="text-[#B2CCFF] stroke-[2]" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2.5">
                          <span className="text-4xl font-display font-black tracking-tight">₹{totalRevenueMonth.toLocaleString()}</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#FFD700] text-blue-900 rounded-lg font-mono whitespace-nowrap">Low 0.21↓</span>
                        </div>
                        <span className="text-[10px] text-[#C0D4FF] font-medium block mt-1.5">Consolidated collections this month</span>
                      </div>

                      {/* Carbon/Navy Card: Downloads equivalent */}
                      <div className="bg-gradient-to-br from-[#1A1F2B] via-[#2F394C] to-[#3B4861] text-white p-6 rounded-3xl shadow-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg">
                        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-white/5 rounded-full" />
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[#CBD5E1]">Outstanding Debt</span>
                          <FileText size={18} className="text-[#CBD5E1] stroke-[2]" />
                        </div>
                        <div className="mt-4 flex items-baseline gap-2.5">
                          <span className="text-4xl font-display font-black tracking-tight">₹{outstandingAmt.toLocaleString()}</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-[#FF7575] text-white rounded-lg font-mono whitespace-nowrap">Low 1.12↓</span>
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-medium block mt-1.5">Uncollected invoices ledger balance</span>
                      </div>

                    </div>

                    {/* ROW 2: BEN-TO GRID FEATURING 3 GIANT TYPOGRAPHY DIGITS WITH SPARK waveforms (exact mockup representation) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Box 1: Customers */}
                      <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} relative overflow-hidden shadow-xs hover:shadow-md transition-shadow`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Patient Flow</span>
                          <span className="text-[10px] text-slate-400 font-mono">MD-01</span>
                        </div>
                        
                        {/* Giant Number font */}
                        <div className="text-5xl font-display font-black tracking-tight text-slate-900 my-1">
                          92,556
                        </div>
                        <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                          <span>1.35% ↑</span>
                          <span className="text-slate-400 font-normal">More than last month</span>
                        </div>

                        {/* Customized Alternating Purple Bar Histogram */}
                        <div className="mt-5">
                          <svg className="w-full h-12 text-[#5D57A5]" viewBox="0 0 100 24" preserveAspectRatio="none">
                            <rect x="1" y="9" width="3" height="15" rx="1" fill="currentColor" opacity="0.6" />
                            <rect x="7" y="14" width="3" height="10" rx="1" fill="currentColor" opacity="0.8" />
                            <rect x="13" y="4" width="3" height="20" rx="1" fill="currentColor" />
                            <rect x="19" y="16" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
                            <rect x="25" y="10" width="3" height="14" rx="1" fill="currentColor" opacity="0.7" />
                            <rect x="31" y="2" width="3" height="22" rx="1" fill="currentColor" />
                            <rect x="37" y="11" width="3" height="13" rx="1" fill="currentColor" />
                            <rect x="43" y="17" width="3" height="7" rx="1" fill="currentColor" opacity="0.4" />
                            <rect x="49" y="8" width="3" height="16" rx="1" fill="currentColor" opacity="0.8" />
                            <rect x="55" y="12" width="3" height="12" rx="1" fill="currentColor" opacity="0.6" />
                            <rect x="61" y="3" width="3" height="21" rx="1" fill="currentColor" />
                            <rect x="67" y="15" width="3" height="9" rx="1" fill="currentColor" opacity="0.5" />
                            <rect x="73" y="9" width="3" height="15" rx="1" fill="currentColor" opacity="0.9" />
                            <rect x="79" y="18" width="3" height="6" rx="1" fill="currentColor" opacity="0.3" />
                            <rect x="85" y="11" width="3" height="13" rx="1" fill="currentColor" opacity="0.8" />
                            <rect x="91" y="14" width="3" height="10" rx="1" fill="currentColor" />
                            <rect x="97" y="6" width="3" height="18" rx="1" fill="currentColor" />
                          </svg>
                        </div>
                      </div>

                      {/* Box 2: Conversion area */}
                      <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} relative overflow-hidden shadow-xs hover:shadow-md transition-shadow`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Treatment success</span>
                          <span className="text-[10px] text-slate-400 font-mono">CONV-88</span>
                        </div>
                        
                        <div className="text-5xl font-display font-black tracking-tight text-slate-900 my-1">
                          53,812
                        </div>
                        <div className="text-xs font-semibold text-rose-550 flex items-center gap-1">
                          <span className="text-amber-600">0.17% ↓</span>
                          <span className="text-slate-400 font-normal">Less than last month</span>
                        </div>

                        {/* Smooth Golden-yellow area Gradient flow vector */}
                        <div className="mt-5">
                          <svg className="w-full h-12" viewBox="0 0 100 24" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="areaYellowGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFAE1F" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#FFAE1F" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path d="M0,18 C10,15 20,4 35,14 C50,22 62,8 75,12 C88,14 100,20 100,20 L100,24 L0,24 Z" fill="url(#areaYellowGrad)" />
                            <path d="M0,18 C10,15 20,4 35,14 C50,22 62,8 75,12 C88,14 100,20 100,20" fill="none" stroke="#FFAE1F" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

                      {/* Box 3: Revenue curve */}
                      <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} relative overflow-hidden shadow-xs hover:shadow-md transition-shadow`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Billing Flow Growth</span>
                          <span className="text-[10px] text-slate-400 font-mono">REV-300</span>
                        </div>
                        
                        <div className="text-5xl font-display font-black tracking-tight text-slate-900 my-1">
                          40,008
                        </div>
                        <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                          <span>0.06% ↑</span>
                          <span className="text-slate-400 font-normal">Less than last month</span>
                        </div>

                        {/* Glowing pink sinusoidal waveform */}
                        <div className="mt-5">
                          <svg className="w-full h-12" viewBox="0 0 100 24" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="areaPinkGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E25C84" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#E25C84" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path d="M0,14 C15,15 25,18 35,13 C45,8 55,10 65,18 C75,20 85,15 95,14 C98,14 100,16 100,16 L100,24 L0,24 Z" fill="url(#areaPinkGrad)" />
                            <path d="M0,14 C15,15 25,18 35,13 C45,8 55,10 65,18 C75,20 85,15 95,14 C98,14 100,16 100,16" fill="none" stroke="#E25C84" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

                    </div>

                    {/* ROW 3: REVENUE FOR LAST 30 DAYS SMOOTH SPLINES & CONCENTRIC DONUT SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      
                      {/* Col-span-3: Dual Wave Spline line graph (from screenshot) */}
                      <div className={`lg:col-span-3 p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} shadow-2xs`}>
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-sm font-display font-extrabold text-slate-900">Revenue For Last 30 Days</h3>
                            <p className="text-xs text-slate-400">Clinical performance for Online vs Walk-in revenue of past 30 days</p>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 bg-[#20C09E] rounded-full inline-block" />
                              <span className="text-slate-500">Online revenue</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 bg-[#5D57A5] rounded-full inline-block" />
                              <span className="text-slate-500">Offline revenue</span>
                            </div>
                          </div>
                        </div>

                        {/* Precise High Resolution SVG Coordinates representing Splines (Jan - Aug) */}
                        <div className="relative h-60 mt-4">
                          {/* Y-axis grid lines and labels */}
                          <div className="absolute inset-y-0 left-0 w-10 flex flex-col justify-between text-[10px] font-mono text-slate-400 pb-6 pr-2">
                            <span>1200</span>
                            <span>1000</span>
                            <span>800</span>
                            <span>600</span>
                            <span>400</span>
                            <span>200</span>
                          </div>

                          <div className="ml-10 h-full flex flex-col justify-between relative pb-6 border-l border-slate-100">
                            {/* Horizontal Dotted Lines */}
                            <div className="absolute top-[0%] left-0 right-0 border-t border-dashed border-slate-100" />
                            <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-slate-100" />
                            <div className="absolute top-[40%] left-0 right-0 border-t border-dashed border-slate-100" />
                            <div className="absolute top-[60%] left-0 right-0 border-t border-dashed border-slate-100" />
                            <div className="absolute top-[80%] left-0 right-0 border-t border-dashed border-slate-100" />
                            <div className="absolute top-[100%] left-0 right-0 border-t border-dashed border-slate-100" />

                            {/* Core Wave Path Render */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="splineCyan" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#20C09E" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#20C09E" stopOpacity="0.0" />
                                </linearGradient>
                                <linearGradient id="splinePurple" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#5D57A5" stopOpacity="0.2" />
                                  <stop offset="100%" stopColor="#5D57A5" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              
                              {/* Background Gradients under splines */}
                              <path d="M 0,100 C 75,70 120,110 180,90 C 240,70 300,120 370,40 C 440,20 500,80 600,60 L 600,150 L 0,150 Z" fill="url(#splineCyan)" />
                              <path d="M 0,70 C 75,90 120,40 180,60 C 240,80 300,20 370,70 C 440,110 500,40 600,120 L 600,150 L 0,150 Z" fill="url(#splinePurple)" />

                              {/* Highlight spline paths */}
                              <path d="M 0,100 C 75,70 120,110 180,90 C 240,70 300,120 370,40 C 440,20 500,80 600,60" fill="none" stroke="#20C09E" strokeWidth="2.5" strokeLinecap="round" />
                              <path d="M 0,70 C 75,90 120,40 180,60 C 240,80 300,20 370,70 C 440,110 500,40 600,120" fill="none" stroke="#5D57A5" strokeWidth="2.5" strokeLinecap="round" />
                              
                              {/* Dot vertices */}
                              <circle cx="180" cy="90" r="4.5" fill="#20C09E" stroke="#fff" strokeWidth="1.5" />
                              <circle cx="370" cy="40" r="4.5" fill="#20C09E" stroke="#fff" strokeWidth="1.5" />
                              <circle cx="300" cy="20" r="4.5" fill="#5D57A5" stroke="#fff" strokeWidth="1.5" />
                              <circle cx="500" cy="40" r="4.5" fill="#5D57A5" stroke="#fff" strokeWidth="1.5" />
                            </svg>
                          </div>

                          {/* X-axis labels */}
                          <div className="absolute bottom-[-10px] left-10 right-0 flex justify-between text-[11px] font-bold text-slate-400">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                          </div>
                        </div>
                      </div>

                      {/* Col-span-1: Donut Concentric circle graph (from screenshot) */}
                      <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} shadow-2xs flex flex-col justify-between`}>
                        <div>
                          <h3 className="text-sm font-display font-extrabold text-slate-900">All Online Sales</h3>
                          <p className="text-xs text-slate-400">Total sessions allocated within date range</p>
                        </div>

                        {/* Concentric Circle Donut implementation using SVG */}
                        <div className="flex items-center justify-center py-4 relative">
                          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                            {/* Outer tracks */}
                            <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                            <circle cx="50" cy="50" r="30" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                            <circle cx="50" cy="50" r="20" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />

                            {/* Outer Circle progress - Cyan - 67% */}
                            <circle cx="50" cy="50" r="40" stroke="#20C09E" strokeWidth="6.5" fill="transparent" 
                              strokeDasharray="251.2" strokeDashoffset="82.9" strokeLinecap="round" />

                            {/* Middle Circle progress - Royal Blue - 20% */}
                            <circle cx="50" cy="50" r="30" stroke="#3B66F5" strokeWidth="6.5" fill="transparent" 
                              strokeDasharray="188.4" strokeDashoffset="150.7" strokeLinecap="round" />

                            {/* Inner Circle progress - Purple - 12% */}
                            <circle cx="50" cy="50" r="20" stroke="#5D57A5" strokeWidth="6.5" fill="transparent" 
                              strokeDasharray="125.6" strokeDashoffset="110.5" strokeLinecap="round" />
                          </svg>

                          <div className="absolute text-center leading-none">
                            <span className="text-lg font-display font-black text-slate-800">88.3%</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest block transform scale-90">Peak</span>
                          </div>
                        </div>

                        {/* Radial metrics below chart */}
                        <div className="grid grid-cols-3 gap-1 border-t border-slate-100 pt-3.5 text-center">
                          <div>
                            <span className="text-sm font-display font-black text-slate-900">12%</span>
                            <span className="text-[9px] font-bold text-slate-400 block truncate leading-none mt-0.5">Ortho</span>
                          </div>
                          <div>
                            <span className="text-sm font-display font-black text-slate-900">20%</span>
                            <span className="text-[9px] font-bold text-slate-400 block truncate leading-none mt-0.5">Surgery</span>
                          </div>
                          <div>
                            <span className="text-sm font-display font-black text-slate-900">67%</span>
                            <span className="text-[9px] font-bold text-slate-400 block truncate leading-none mt-0.5">General</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* ROW 4: DATA LISTS (Clinical Overview and Outstanding Invoices) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Interactive "Market Overview" table tracking today's schedule */}
                      <div className={`lg:col-span-2 p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} shadow-2xs`}>
                        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-2">
                          <div>
                            <h3 className="text-sm font-display font-extrabold text-[#5D57A5]">Market Overview</h3>
                            <p className="text-xs text-slate-400">Total clinic outpatient schedules registered today</p>
                          </div>
                          <button 
                            onClick={() => setActiveTab("appointments")}
                            className="text-[11px] font-extrabold uppercase text-[#5D57A5] tracking-wider hover:opacity-80"
                          >
                            All Calendar →
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                                <th className="pb-3 pr-2">Patient</th>
                                <th className="pb-3 pr-2">Code / Service</th>
                                <th className="pb-3 pr-2">Category</th>
                                <th className="pb-3 pr-2 text-right">Fee</th>
                                <th className="pb-3 text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-55">
                              {/* Dynamic rendering from patients & appointments */}
                              {todayAppts.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="py-6 text-center text-xs italic text-slate-400">
                                    No appointment slots registered for today.
                                  </td>
                                </tr>
                              ) : (
                                todayAppts.map((apt, idx) => {
                                  // Mock values matching mockup styles for additional columns
                                  const mockSku = idx % 2 === 0 ? "#HGA99169" : "#XCA68589";
                                  const mockQty = idx % 2 === 0 ? "36" : "67";
                                  const feeAmount = idx === 0 ? "₹15,000" : "₹5,000";
                                  return (
                                    <tr key={apt.id} className="text-xs hover:bg-slate-50/50 group transition-colors">
                                      <td className="py-3 pr-2">
                                        <div className="flex items-center gap-2.5">
                                          {/* Circle green indicator checkmark */}
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${apt.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                            <span className="text-[10px] font-mono font-bold">✓</span>
                                          </div>
                                          <div>
                                            <div className="font-extrabold text-slate-800">{apt.patientName}</div>
                                            <div className="text-[9px] text-slate-400 mt-0.5">Checked In today • {apt.timeSlot}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-3 pr-2 font-mono text-[10px] text-slate-500 font-bold">
                                        {mockSku}
                                      </td>
                                      <td className="py-3 pr-2 text-slate-600 font-semibold">
                                        {apt.serviceName}
                                      </td>
                                      <td className="py-3 pr-2 text-right font-bold text-slate-800">
                                        {feeAmount}
                                      </td>
                                      <td className="py-3 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                                          apt.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-[#5D57A5]"
                                        }`}>
                                          {apt.status}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right: "Sales Total" block tracker */}
                      <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60"} shadow-2xs flex flex-col justify-between`}>
                        <div>
                          <h3 className="text-sm font-display font-extrabold text-slate-950 mb-1">Clinic Billing Summary</h3>
                          <p className="text-xs text-slate-400">Real-time ledger overview</p>

                          <div className="mt-5 space-y-4">
                            <div className="flex border-b border-slate-100 pb-3 justify-between items-center">
                              <span className="text-xs text-slate-500 font-medium">Monthly Target</span>
                              <span className="text-sm font-display font-black text-slate-800">₹1,00,000</span>
                            </div>
                            <div className="flex border-b border-slate-100 pb-3 justify-between items-center">
                              <span className="text-xs text-slate-500 font-medium">Achieved Revenue</span>
                              <span className="text-sm font-display font-black text-emerald-600">₹{totalRevenueMonth.toLocaleString()}</span>
                            </div>
                            <div className="flex border-b border-slate-100 pb-3 justify-between items-center">
                              <span className="text-xs text-slate-500 font-medium">Ledger Outstanding</span>
                              <span className="text-sm font-display font-black text-amber-600">₹{outstandingAmt.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive mini button */}
                        <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
                          <button 
                            onClick={() => { setActiveTab("billing"); setBillingTab("invoices"); }}
                            className="w-full text-center py-2 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                          >
                            Access Billing Invoices →
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

              {/* --- TAB 2: PATIENT MANAGEMENT (CRUD + Timeline + Profile) --- */}
              {activeTab === "patients" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">Patient Management</h2>
                      <p className="text-xs text-slate-500">Add, view and archive electronic healthcare profiles with comprehensive treatment timelines.</p>
                    </div>
                    <button
                      onClick={() => {
                        setPatientForm({});
                        setIsPatientModalOpen(true);
                      }}
                      className="px-4 py-2.5 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <UserPlus size={14} className="stroke-[2.5]" />
                      <span>Configure New Patient</span>
                    </button>
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-150">
                    <Search size={15} className="text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search patient name, email, or Custom Patient ID..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="w-full text-xs font-medium bg-transparent focus:outline-hidden text-slate-800"
                    />
                  </div>

                  {/* Side-by-Side: Master list and Detail timeline pane */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Master directory list */}
                    <div className={`col-span-1 lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden`}>
                      <div className="p-4 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-500">Patients Found ({patients.length})</span>
                      </div>
                      <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
                        {patients
                          .filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.patientId.toLowerCase().includes(patientSearch.toLowerCase()))
                          .map(p => {
                            const isSelected = selectedPatientId === p.id;
                            return (
                              <div
                                key={p.id}
                                className={`p-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                                  isSelected ? "bg-[#1C1242]/5 border-l-4 border-[#5D57A5]" : "hover:bg-slate-50"
                                }`}
                                onClick={() => setSelectedPatientId(p.id)}
                              >
                                <div>
                                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                                    <span>{p.name}</span>
                                    <span className="font-mono text-[9px] bg-[#5D57A5]/10 text-[#5D57A5] px-1.5 py-0.2 rounded-sm uppercase">{p.patientId}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">
                                    Gyn: {p.gender} | Dob: {p.dob} | Mob: {p.mobile}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => {
                                      setPatientForm(p);
                                      setIsPatientModalOpen(true);
                                    }}
                                    className="p-1.5 hover:bg-slate-100 text-[#5D57A5] rounded-md transition-colors"
                                  >
                                    <Edit size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePatient(p.id)}
                                    className="p-1.5 hover:bg-slate-100 text-rose-600 rounded-md transition-colors"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {/* Detail panel: Timeline of medical records, visits, treatments */}
                    <div className="col-span-1 lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 space-y-4">
                      {selectedPatientId ? (
                        (() => {
                          const currentPatient = patients.find(p => p.id === selectedPatientId);
                          if (!currentPatient) return <p className="text-xs text-slate-500">Patient profile details unavailable.</p>;
                          return (
                            <>
                              <div className="pb-3 border-b border-slate-150">
                                <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center justify-between">
                                  <span>{currentPatient.name}</span>
                                  <span className="text-xs text-slate-400 font-mono">{currentPatient.bloodGroup} Blood</span>
                                </h3>
                                <p className="text-[11px] text-slate-500 mt-0.5">{currentPatient.email} • {currentPatient.address}</p>
                              </div>

                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-[10px] font-black uppercase text-slate-400 block">Critical Medical Allergies</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {currentPatient.allergies.map((a, i) => (
                                      <span key={i} className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wide text-[9px] font-extrabold">{a}</span>
                                    ))}
                                    {currentPatient.allergies.length === 0 && <span className="text-[10px] italic text-slate-400">No known allergies.</span>}
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[10px] font-black uppercase text-slate-400 block">Clinical Disease History</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {currentPatient.medicalHistory.map((m, i) => (
                                      <span key={i} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-sm tracking-wide text-[9px] font-semibold">{m}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-1.5">
                                  <span className="text-[10px] font-black uppercase text-slate-400 block">Starred Insurance Policies</span>
                                  <p className="text-[11px] text-slate-800 font-medium italic bg-slate-50 p-2 border border-slate-150 rounded-xl mt-1">{currentPatient.insuranceDetails}</p>
                                </div>
                              </div>

                              <div className="border-t border-slate-150 pt-3">
                                <div className="flex items-center justify-between mb-4">
                                  <span className="text-[10px] font-black uppercase text-slate-400">Patient Visit Timeline</span>
                                  <button
                                    onClick={() => handleAddTimelineEvent(currentPatient.id)}
                                    className="px-2 py-1 border border-[#5D57A5] text-[#5D57A5] rounded-md text-[10px] font-bold uppercase transition-all hover:bg-slate-50"
                                  >
                                    Add Diagnostic Note +
                                  </button>
                                </div>

                                <div className="space-y-3 max-h-[220px] overflow-y-auto">
                                  {patientTimeline.map(evt => (
                                    <div key={evt.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] relative">
                                      <div className="flex items-center justify-between">
                                        <span className="font-extrabold text-slate-800">{evt.title}</span>
                                        <span className="text-[9px] text-[#5D57A5] bg-[#5D57A5]/10 px-1.5 rounded-sm uppercase">{evt.type}</span>
                                      </div>
                                      <p className="text-slate-600 mt-1">{evt.description}</p>
                                      <div className="text-[9px] text-slate-400 mt-1 flex justify-between">
                                        <span>On: {evt.date}</span>
                                        <span>By: {evt.performedBy}</span>
                                      </div>
                                    </div>
                                  ))}
                                  {patientTimeline.length === 0 && (
                                    <p className="text-xs italic text-slate-400 text-center py-4">No logged visits or Treatments recorded.</p>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })()
                      ) : (
                        <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-4">
                          <ClipboardList size={30} className="text-slate-300 mb-2" />
                          <p className="text-xs font-serif font-bold text-slate-800">No Patient Profile Inspected</p>
                          <p className="text-[11px] text-slate-400 max-w-[200px] mt-1">Select an active patient registration on the left to review documentation history timelines.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- TAB 3: SCHEDULES, WALK-INS & CALENDAR SCHEDULER --- */}
              {activeTab === "appointments" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">Appointment Ledger Calendar</h2>
                      <p className="text-xs text-slate-500">Coordinate physical slot reservations, walk-in check-ins, doctors allocation schedules.</p>
                    </div>
                    <button
                      onClick={() => {
                        setAptForm({});
                        setIsAptModalOpen(true);
                      }}
                      className="px-4 py-2.5 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Plus size={14} className="stroke-[2.5]" />
                      <span>Book New Appt Slot</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-150">
                    <div className="flex gap-2">
                      {["Month", "Week", "Day"].map(v => (
                        <button
                          key={v}
                          onClick={() => setCalendarView(v as any)}
                          className={`px-3 py-1 text-xs font-bold uppercase rounded-lg ${
                            calendarView === v ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Sort/Filter Status */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Status:</span>
                        <select
                          value={aptFilterStatus}
                          onChange={(e) => setAptFilterStatus(e.target.value)}
                          className="p-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-[#5D57A5]"
                        >
                          <option value="all">All Modes</option>
                          <option value="Pending">Pending Approval</option>
                          <option value="Confirmed">Confirmed Bookings</option>
                          <option value="Checked-In">Active Checked-In</option>
                          <option value="Completed">Completed Treatments</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Date Filter Selection */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Search Dates:</span>
                        <select
                          value={aptFilterDateMode}
                          onChange={(e) => setAptFilterDateMode(e.target.value)}
                          className="p-1.5 text-xs bg-[#5D57A5]/10 text-[#5D57A5] font-bold rounded-lg border border-transparent focus:outline-[#5D57A5]"
                        >
                          <option value="all">All Dates</option>
                          <option value="today">Today (19/06)</option>
                          <option value="tomorrow">Tomorrow (20/06)</option>
                          <option value="week">This Week</option>
                          <option value="range">Custom Range</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Modern Filter Custom Date Inputs */}
                  {aptFilterDateMode === "range" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 p-4 border border-slate-150 rounded-2xl flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Start Date:</span>
                        <input
                          type="date"
                          value={aptFilterStartDate}
                          onChange={(e) => setAptFilterStartDate(e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-[#5D57A5] focus:outline-hidden cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">End Date:</span>
                        <input
                          type="date"
                          value={aptFilterEndDate}
                          onChange={(e) => setAptFilterEndDate(e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-[#5D57A5] focus:outline-hidden cursor-pointer"
                        />
                      </div>
                      {(aptFilterStartDate || aptFilterEndDate) && (
                        <button
                          onClick={() => {
                            setAptFilterStartDate("");
                            setAptFilterEndDate("");
                          }}
                          className="px-2.5 py-1 text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg cursor-pointer uppercase font-extrabold tracking-wider"
                        >
                          Clear
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Grid layout containing structural Day List & Calendar */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visual Month schedule schematic calendar box */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5">
                      <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                        <span className="text-xs font-bold text-slate-400 tracking-wider">JUNE 2026</span>
                        <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest leading-none">Week view Grid</span>
                      </div>

                      <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-slate-400 uppercase">
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const dayNum = i + 1;
                          const formattedDate = `2026-06-${String(dayNum).padStart(2, "0")}`;
                          const dayAppts = appointments.filter(a => a.date === formattedDate);
                          const isToday = dayNum === 19;
                          return (
                            <div
                              key={i}
                              className={`min-h-16 p-1.5 border rounded-xl flex flex-col justify-between text-[11px] ${
                                isToday ? "bg-[#5D57A5]/10 border-[#5D57A5]/40" : "bg-slate-50/50 border-slate-150"
                              }`}
                            >
                              <span className={`block w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono ${
                                isToday ? "bg-[#5D57A5] text-white" : "text-slate-700"
                              }`}>
                                {dayNum}
                              </span>
                              <div className="space-y-1">
                                {dayAppts.slice(0, 2).map(apt => (
                                  <span
                                    key={apt.id}
                                    className="block p-0.5 bg-yellow-300 text-slate-900 text-[8px] rounded-sm font-semibold truncate hover:opacity-80"
                                    title={apt.patientName}
                                  >
                                    {apt.patientName}
                                  </span>
                                ))}
                                {dayAppts.length > 2 && (
                                  <span className="block text-[8px] text-slate-400 font-semibold">+{dayAppts.length - 2} more</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Left List block with advanced date computations */}
                    {(() => {
                      const displayedList = filteredAppointments.filter(a => {
                        // 1. Filter by Status select
                        if (aptFilterStatus !== "all" && a.status !== aptFilterStatus) return false;

                        // 2. Filter by Date range setting
                        if (aptFilterDateMode === "today") {
                          return a.date === "2026-06-19";
                        } else if (aptFilterDateMode === "tomorrow") {
                          return a.date === "2026-06-20";
                        } else if (aptFilterDateMode === "week") {
                          // 2026-06-19 to 2026-06-25 (7 days)
                          return a.date >= "2026-06-19" && a.date <= "2026-06-25";
                        } else if (aptFilterDateMode === "range") {
                          if (aptFilterStartDate && a.date < aptFilterStartDate) return false;
                          if (aptFilterEndDate && a.date > aptFilterEndDate) return false;
                        }
                        return true;
                      });

                      return (
                        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase text-slate-400">
                              Appointments List ({displayedList.length})
                            </h3>
                            {aptFilterDateMode !== "all" && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Filter Active
                              </span>
                            )}
                          </div>

                          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                            {displayedList.length === 0 ? (
                              <div className="text-center py-10 space-y-2">
                                <AlertCircle className="mx-auto text-slate-300" size={24} />
                                <p className="text-xs font-bold text-slate-400">No appointments matching filters.</p>
                              </div>
                            ) : (
                              displayedList.map(apt => (
                                <div key={apt.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between text-xs transition-colors hover:border-slate-300">
                                  <div className="flex justify-between items-start">
                                    <span className="font-extrabold text-slate-800 leading-tight">{apt.patientName}</span>
                                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${
                                      apt.status === "Pending" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                                      apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                                      "bg-indigo-100 text-indigo-850"
                                    }`}>
                                      {apt.status}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                                    <p>🗓️ Date: {apt.date.split("-").reverse().join("/")} • {apt.timeSlot}</p>
                                    <p>🩺 Practitioner: {apt.doctorName}</p>
                                    <p>💼 Treatment: {apt.serviceName} ({apt.type})</p>
                                    {apt.appointmentType && <p>📋 Category: {apt.appointmentType}</p>}
                                    {apt.phone && <p>📞 Phone/WA: {apt.phone}</p>}
                                    {apt.address && <p>📍 Address: {apt.address}</p>}
                                  </div>
                                  {apt.notes && <p className="text-[10px] italic text-slate-400 mt-1.5 p-1.5 bg-slate-100 rounded-lg">"{apt.notes}"</p>}

                                  {/* Pending approvals trigger button with Whatsapp integration */}
                                  {apt.status === "Pending" && (
                                    <button
                                      onClick={() => handleApproveAndWhatsApp(apt)}
                                      className="mt-3.5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                      <CheckCircle size={12} className="stroke-[3]" />
                                      <span>Approve & Confirmed WA</span>
                                    </button>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              {/* --- TAB 4: DOCTORS & EXTERNAL CONSULTANTS --- */}
              {activeTab === "doctors" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Part 1: Clinic Internal Roster */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-serif font-bold text-slate-900">Clinical Active Doctors Roster</h2>
                        <p className="text-xs text-slate-500">Direct internally hired dental surgeon consultants.</p>
                      </div>
                      <button
                        onClick={() => {
                          setDoctorForm({});
                          setIsDoctorModalOpen(true);
                        }}
                        className="px-4 py-2.5 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Plus size={14} />
                        <span>Add Active Surgeon</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctors.map(doc => (
                        <div key={doc.id} className="bg-white p-4 rounded-3xl border border-slate-200 flex gap-4 items-center">
                          <img
                            src={doc.profilePhoto}
                            alt={doc.name}
                            className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-3xs"
                          />
                          <div className="text-xs space-y-0.5 flex-1">
                            <h4 className="font-serif font-bold text-slate-900">{doc.name}</h4>
                            <p className="text-[#5D57A5] font-semibold">{doc.specialization}</p>
                            <p className="text-slate-400 text-[10px] font-mono">{doc.qualification} • {doc.experience} Years experience</p>
                            <p className="font-extrabold text-[#5D57A5]/80 mt-1">Consultation Fee: ₹{doc.consultationFee}</p>
                          </div>
                          <div>
                            <button
                              onClick={() => handleDeleteDoc(doc.id)}
                              className="p-1 px-2.5 text-[11px] border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Archive
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Visiting External Consultants & Settlement Projection */}
                  <div className="space-y-4 pt-6 border-t border-slate-200/50">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-serif font-bold text-slate-900">Visiting External Consultant Doctors</h2>
                        <p className="text-xs text-slate-500">Calculate custom revenue shares percentage and check monthly commission settlements.</p>
                      </div>
                      <button
                        onClick={() => {
                          setConsultantForm({});
                          setIsConsultantModalOpen(true);
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Plus size={14} />
                        <span>Add Visiting Consultant</span>
                      </button>
                    </div>

                    {/* Consultant Dashboard Stats and Settlement History */}
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-secondary">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Settlements Ledger Projection</span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 font-mono uppercase text-[9px] border-b border-slate-100">
                            <th className="p-4">Consultant Details</th>
                            <th className="p-4">Visiting Days</th>
                            <th className="p-4">Fee Share %</th>
                            <th className="p-4 text-center">Calculated Visits</th>
                            <th className="p-4 text-right">Commission Due</th>
                            <th className="p-4 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {consultants.map(con => {
                            // Mock live share calculations
                            const simulatedVisits = con.id === "c-1" ? 14 : 9;
                            const estimatedRevenue = simulatedVisits * con.consultationFee;
                            const companyShare = estimatedRevenue * ((100 - con.revenueSharePercentage) / 100);
                            const finalPayable = estimatedRevenue * (con.revenueSharePercentage / 100) + con.fixedVisitCharges;

                            return (
                              <tr key={con.id} className="hover:bg-slate-50">
                                <td className="p-4">
                                  <div className="font-bold text-slate-900">{con.name}</div>
                                  <div className="text-[10px] text-slate-400">{con.specialization}</div>
                                </td>
                                <td className="p-4 font-semibold text-[#5D57A5]">{con.visitingDays.join(", ")}</td>
                                <td className="p-4 font-mono font-bold text-green-700">{con.revenueSharePercentage}% Share</td>
                                <td className="p-4 text-center font-mono font-bold">{simulatedVisits} visits</td>
                                <td className="p-4 text-right font-mono font-black text-[#5D57A5]">
                                  ₹{finalPayable.toLocaleString()}
                                </td>
                                <td className="p-4 text-center">
                                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-[9px] font-mono font-bold">
                                    Paid (June)
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- TAB 5: DENTAL SERVICE CATALOG & TREATMENTS --- */}
              {activeTab === "services" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-slate-900">Internal Dental Service Catalog</h2>
                      <p className="text-xs text-slate-500">Configure catalog prices, operational durations, and applicable taxes per procedure.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map(srv => {
                      return (
                        <div key={srv.id} className="bg-white p-5 rounded-3xl border border-slate-200 relative overflow-hidden flex flex-col justify-between h-44">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[8px] tracking-wider uppercase font-extrabold bg-[#5D57A5]/10 text-[#5D57A5] px-2 py-0.5 rounded-full">
                                {srv.category}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 font-bold">⏱️ {srv.duration} Mins</span>
                            </div>
                            <h3 className="font-serif font-bold text-sm text-slate-900 mt-2 truncate" title={srv.name}>{srv.name}</h3>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{srv.description}</p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="font-mono text-xs text-slate-400 font-bold">Tax: {srv.tax}% • Disc: ₹{srv.discount}</span>
                            <span className="font-serif font-black text-[#5D57A5] text-sm">₹{srv.price.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* --- TAB 6: INVENTORY & STOCK STOCK-OUT FLOWS --- */}
              {activeTab === "inventory" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">Inventory Stock & Supplies</h2>
                      <p className="text-xs text-slate-500">Batch-wise medicine details, surgical implants tracker, expiry alarms, PO orders.</p>
                    </div>
                    <button
                      onClick={() => {
                        setInventoryForm({});
                        setIsInventoryModalOpen(true);
                      }}
                      className="px-4 py-2.5 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Package size={14} />
                      <span>Adjust Stock / Item +</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-150 mb-4">
                    <Search size={15} className="text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search items, drug formulations, surgical instruments..."
                      value={invSearch}
                      onChange={(e) => setInvSearch(e.target.value)}
                      className="w-full text-xs font-medium bg-transparent focus:outline-hidden text-slate-800"
                    />
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-mono uppercase text-[9px] border-b border-slate-150">
                          <th className="p-4">Item (Code)</th>
                          <th className="p-4">Category</th>
                          <th className="p-4 text-center">Qty / Unit</th>
                          <th className="p-4 text-right">Purchase Price</th>
                          <th className="p-4 text-right">Selling Price</th>
                          <th className="p-4">Supplier</th>
                          <th className="p-4 text-center">Expiry Warning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {inventory
                          .filter(i => i.itemName.toLowerCase().includes(invSearch.toLowerCase()) || i.itemCode.toLowerCase().includes(invSearch.toLowerCase()))
                          .map(item => {
                            const isLow = item.quantity <= item.minStockLevel;
                            return (
                              <tr key={item.id} className="hover:bg-slate-50">
                                <td className="p-4 font-bold text-slate-950 flex items-center gap-2">
                                  <span>{item.itemName}</span>
                                  <span className="font-mono text-[9px] text-slate-400">({item.itemCode})</span>
                                </td>
                                <td className="p-4 font-medium text-slate-500">{item.category}</td>
                                <td className="p-4 text-center font-mono font-black">
                                  <span className={`px-2 py-0.5 rounded-lg text-[11px] ${
                                    isLow ? "bg-red-100 text-red-950 font-bold" : "text-slate-800"
                                  }`}>
                                    {item.quantity} / {item.unit}
                                  </span>
                                </td>
                                <td className="p-4 text-right font-mono text-slate-600">₹{item.purchasePrice}</td>
                                <td className="p-4 text-right font-mono font-bold text-[#5D57A5]">₹{item.sellingPrice}</td>
                                <td className="p-4 tracking-tight font-medium text-slate-500">{item.supplier}</td>
                                <td className="p-4 text-center font-mono font-bold text-slate-400">
                                  {item.expiryDate}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* --- TAB 7: INVOICES, ACCOUNTING & PAYMENTS --- */}
              {activeTab === "billing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">Billing, Invoices & Ledger</h2>
                      <p className="text-xs text-slate-500">Record payments transactions, generate receipt copies, monitor Cashbook index.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 border-b border-slate-200">
                    <button
                      onClick={() => setBillingTab("invoices")}
                      className={`pb-2.5 px-4 text-xs font-bold uppercase transition-all ${
                        billingTab === "invoices" ? "border-b-2 border-[#5D57A5] text-[#5D57A5]" : "text-slate-400"
                      }`}
                    >
                      Invoices & Patient Bills
                    </button>
                    <button
                      onClick={() => setBillingTab("cashbook")}
                      className={`pb-2.5 px-4 text-xs font-bold uppercase transition-all ${
                        billingTab === "cashbook" ? "border-b-2 border-[#5D57A5] text-[#5D57A5]" : "text-slate-400"
                      }`}
                    >
                      General Double Entry Cashbook Ledger
                    </button>
                  </div>

                  {billingTab === "invoices" && (
                    <div className="space-y-4">
                      {invoices.map(inv => {
                        return (
                          <div key={inv.id} className="bg-white p-5 rounded-3xl border border-slate-250 flex flex-wrap items-center justify-between gap-4 shadow-3xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-black text-slate-400">{inv.invoiceNumber}</span>
                                <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase ${
                                  inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                }`}>
                                  {inv.status}
                                </span>
                              </div>
                              <h4 className="font-serif font-bold text-sm text-[#1C1242]">{inv.patientName}</h4>
                              <p className="text-[11px] text-slate-500 font-medium">Recorded: {inv.date} • Mode: {inv.paymentMethod}</p>
                            </div>

                            <div className="flex gap-4 font-mono text-xs text-slate-600 text-right">
                              <div>
                                <span className="text-[9px] font-bold uppercase text-slate-400 block">Bill Amt</span>
                                <span className="font-bold">₹{inv.totalAmount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold uppercase text-slate-400 block">Paid Amount</span>
                                <span className="font-bold text-green-700">₹{inv.paidAmount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold uppercase text-red-500 block">Due Bal</span>
                                <span className="font-bold text-red-700">₹{inv.outstandingAmount.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Print / Replica receipt buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={handleTriggerPrint}
                                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
                                title="Print Prescription Receipt"
                              >
                                <Printer size={13} className="text-[#5D57A5]" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {billingTab === "cashbook" && (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 font-mono uppercase text-[9px] border-b border-slate-150">
                            <th className="p-4">Tx ID</th>
                            <th className="p-4">Classification</th>
                            <th className="p-4">Description</th>
                            <th className="p-4 text-right">Debit (Expense)</th>
                            <th className="p-4 text-right">Credit (Income)</th>
                            <th className="p-4">Booking Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {transactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-slate-50">
                              <td className="p-4 font-mono font-bold text-slate-400">{tx.id}</td>
                              <td className="p-4 text-xs font-semibold text-slate-500">{tx.category}</td>
                              <td className="p-4 font-medium text-slate-700">{tx.description}</td>
                              <td className="p-4 text-right font-mono font-semibold text-rose-600">
                                {tx.type === "Expense" ? `-₹${tx.amount}` : "—"}
                              </td>
                              <td className="p-4 text-right font-mono font-bold text-green-700 font-serif">
                                {tx.type === "Income" ? `+₹${tx.amount}` : "—"}
                              </td>
                              <td className="p-4 text-slate-400 font-medium font-mono">{tx.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {/* --- TAB 8: CRM & LEADS --- */}
              {activeTab === "crm" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">CRM Leads Pipeline Tunnel</h2>
                      <p className="text-xs text-slate-500">Track patients feedback, website contact form inquiries, WhatsApp referrals, and appointments schedules.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {leads.map(ld => {
                      return (
                        <div key={ld.id} className="bg-white p-5 rounded-3xl border border-slate-200 relative overflow-hidden flex flex-col justify-between h-40 shadow-3xs">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Source: {ld.source}</span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] bg-[#5D57A5]/10 text-[#5D57A5] font-bold">
                                {ld.pipeline}
                              </span>
                            </div>
                            <h4 className="font-serif font-bold text-md text-slate-900 mt-2">{ld.name}</h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">Mob: {ld.phone} • {ld.email}</p>
                            {ld.notes && (
                              <p className="text-[10px] text-slate-600 mt-1 lines-clamp-1 italic">"{ld.notes}"</p>
                            )}
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[9px] text-slate-400">Created: {ld.createdAt.slice(0,10)}</span>
                            <button
                              onClick={async () => {
                                const matchedPatient = {
                                  id: `p-${Date.now()}`,
                                  patientId: `MDS-P-${String(patients.length + 1).padStart(3, "0")}`,
                                  name: ld.name,
                                  dob: "1994-01-01",
                                  gender: "Female",
                                  mobile: ld.phone,
                                  email: ld.email,
                                  address: "Acquired via lead conversion",
                                  bloodGroup: "O+",
                                  medicalHistory: [],
                                  allergies: [],
                                  insuranceDetails: "None",
                                  emergencyContact: { name: "", relationship: "", phone: "" },
                                  createdAt: new Date().toISOString()
                                };
                                await erpService.saveItem<ErpPatient>("patients", matchedPatient);
                                await erpService.deleteItem("leads", ld.id);
                                loadAllErpContext();
                                alert(`Lead ${ld.name} successfully migrated into Patient Directory!`);
                              }}
                              className="px-2.5 py-1 bg-[#5D57A5] hover:bg-[#4C4691] text-white rounded-lg text-[9px] uppercase tracking-widest font-black"
                            >
                              Convert Lead
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* --- TAB 9: HR STAFF ATTENDANCE --- */}
              {activeTab === "hr" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-slate-900">HR Personnel Management & Shifting</h2>
                      <p className="text-xs text-slate-500">Monitor support personnel, nurses, lab technicians, receptionist daily shifts and monthly wage schedules.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-mono uppercase text-[9px] border-b border-slate-150">
                          <th className="p-4">Staff Member</th>
                          <th className="p-4">Designated Duty Role</th>
                          <th className="p-4">Duty Shift Timing</th>
                          <th className="p-4 text-center">Daily Attendance (June 19)</th>
                          <th className="p-4 text-right">Standard Salary Basis</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {staff.map(member => (
                          <tr key={member.id} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-900">{member.name}</td>
                            <td className="p-4 font-semibold text-[#5D57A5]">{member.role}</td>
                            <td className="p-4 text-slate-500 font-mono text-[11px]">{member.shifts}</td>
                            <td className="p-4 text-center">
                              <span className="px-3 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-bold">
                                {member.attendance["2026-06-19"] || "Present"}
                              </span>
                            </td>
                            <td className="p-4 text-right font-mono font-black text-slate-700">
                              ₹{member.salary.toLocaleString()}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => alert(`Attendance updated for ${member.name}.`)}
                                className="text-[10px] font-bold text-[#5D57A5]"
                              >
                                Modify Duty Tag
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* --- TAB 10: BRANCH DISTRIBUTION --- */}
              {activeTab === "branches" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-serif font-bold text-slate-900">Multi-Branch Distribution</h2>
                    <p className="text-xs text-slate-500">Corporate clinic expansion branches settings, regional inventory buffers, and local emergency helplines.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {branches.map(br => {
                      return (
                        <div key={br.id} className="bg-white p-5 rounded-3xl border border-slate-200">
                          <h3 className="font-serif font-bold text-md text-slate-900">{br.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{br.location}</p>
                          <div className="pt-3 border-t border-slate-100 mt-4 leading-relaxed text-xs text-slate-600">
                            <p>📞 Emergency Line: {br.contact}</p>
                            <p className="mt-1">🌐 Distribution Class: Main Orthodontic Hub</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}

        </div>
      </div>
    </div>

      {/* --- ADD / EDIT POPUP MODAL FOR PATIENTS --- */}
      {isPatientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-150 relative">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b pb-2.5 mb-4">
              Configure Electronic Healthcare Profile
            </h3>
            <form onSubmit={handleSavePatient} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Full Patient Name</label>
                  <input
                    type="text"
                    required
                    value={patientForm.name || ""}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={patientForm.dob || ""}
                    onChange={(e) => setPatientForm({ ...patientForm, dob: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Gender</label>
                  <select
                    value={patientForm.gender || "Female"}
                    onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Blood Group</label>
                  <input
                    type="text"
                    placeholder="O+"
                    value={patientForm.bloodGroup || ""}
                    onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    required
                    value={patientForm.mobile || ""}
                    onChange={(e) => setPatientForm({ ...patientForm, mobile: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="Street name, City"
                  value={patientForm.address || ""}
                  onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPatientModalOpen(false)}
                  className="w-1/2 py-2 border rounded-xl"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-[#5D57A5] text-white font-bold rounded-xl"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DOCTOR ENTRY POPUP MODAL --- */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl relative">
            <h3 className="text-base font-serif font-bold text-[#1C1242] border-b pb-2 mb-4">Add Surgeon Roster Entry</h3>
            <form onSubmit={handleSaveDoctor} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold block mb-1 uppercase text-slate-400">Doctor Name (prefix with Dr.)</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Shivan"
                  value={doctorForm.name || ""}
                  onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold block mb-1 uppercase text-slate-400">Clinicial Specialization</label>
                <input
                  type="text"
                  required
                  value={doctorForm.specialization || ""}
                  onChange={e => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold block mb-1 uppercase text-slate-400">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={doctorForm.consultationFee || ""}
                    onChange={e => setDoctorForm({ ...doctorForm, consultationFee: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1 uppercase text-slate-400">Experience (Years)</label>
                  <input
                    type="number"
                    value={doctorForm.experience || ""}
                    onChange={e => setDoctorForm({ ...doctorForm, experience: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>
              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setIsDoctorModalOpen(false)} className="w-1/2 py-2 border rounded-xl">Discard</button>
                <button type="submit" className="w-1/2 py-2.5 bg-[#5D57A5] text-white rounded-xl font-bold">Register Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT APPOINTMENT MODAL --- */}
      {isAptModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-2xl relative">
            <h3 className="text-base font-serif font-bold text-slate-950 border-b pb-2 mb-4">Schedule Client Appointment</h3>
            <form onSubmit={handleSaveAppointment} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Select Patient Profile</label>
                <select
                  required
                  value={aptForm.patientId || ""}
                  onChange={e => setAptForm({ ...aptForm, patientId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                >
                  <option value="">Choose Patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Assign Dental Surgeon</label>
                <select
                  required
                  value={aptForm.doctorId || ""}
                  onChange={e => setAptForm({ ...aptForm, doctorId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                >
                  <option value="">Select Practitioner...</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Dental Procedure</label>
                <select
                  required
                  value={aptForm.serviceId || ""}
                  onChange={e => setAptForm({ ...aptForm, serviceId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                >
                  <option value="">Select Treatment...</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block">Date</label>
                  <input
                    type="date"
                    required
                    value={aptForm.date || todayStr}
                    onChange={e => setAptForm({ ...aptForm, date: e.target.value })}
                    className="w-full p-1.5 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block">Time Slot</label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
                    required
                    value={aptForm.timeSlot || ""}
                    onChange={e => setAptForm({ ...aptForm, timeSlot: e.target.value })}
                    className="w-full p-1.5 bg-slate-50 border rounded-lg animate-fade-in"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setIsAptModalOpen(false)} className="w-1/2 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-[#5D57A5] text-white font-bold rounded-xl">Confirm Block</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADJUST INVENTORY ITEM MODAL --- */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-2xl relative">
            <h3 className="text-base font-serif font-bold text-slate-950 border-b pb-2 mb-4">Replenish / Edit Inventory</h3>
            <form onSubmit={handleSaveInventory} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Item / Consumable Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surgical Latexs"
                  value={inventoryForm.itemName || ""}
                  onChange={e => setInventoryForm({ ...inventoryForm, itemName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Current Stock qty</label>
                  <input
                    type="number"
                    required
                    value={inventoryForm.quantity || ""}
                    onChange={e => setInventoryForm({ ...inventoryForm, quantity: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Min Threshold Alert</label>
                  <input
                    type="number"
                    required
                    value={inventoryForm.minStockLevel || ""}
                    onChange={e => setInventoryForm({ ...inventoryForm, minStockLevel: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button type="button" onClick={() => setIsInventoryModalOpen(false)} className="w-1/2 py-2 border rounded-xl">Discard</button>
                <button type="submit" className="w-1/2 py-2.5 bg-[#5D57A5] text-white font-bold rounded-xl">Commit Stock Adjust</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
