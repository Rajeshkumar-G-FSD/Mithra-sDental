/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { Appointment, DentalCategory, ContactRequest } from "../types";
import { dentalService } from "../services/dentalService";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<DentalCategory>(
    DentalCategory.TEETH_CLEANING
  );

  // Load appointments from storage on mount
  useEffect(() => {
    // 1. Instantly load cache from localStorage
    const data = dentalService.getAppointments();
    setAppointments(data);
    setLoading(false);

    // 2. Perform background sync from Firebase Firestore
    dentalService.syncWithFirestore().then((syncedData) => {
      setAppointments(syncedData);
    }).catch((err) => {
      console.warn("Firestore sync background failed, using local storage cache:", err);
    });
  }, []);

  // Save an appointment
  const bookAppointment = useCallback(
    (patientName: string, email: string, phone: string, date: string, time: string, service: DentalCategory, notes?: string) => {
      const newAppt: Appointment = {
        id: `appt-${Date.now()}`,
        patientName: patientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        time,
        service,
        notes: notes?.trim() || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      const updated = [newAppt, ...appointments];
      setAppointments(updated);
      dentalService.saveAppointments(updated);

      // Async write to Firestore
      dentalService.addAppointmentToFirestore(newAppt).catch((err) => {
        console.error("Failed to persist appointment on Firestore:", err);
      });
    },
    [appointments]
  );

  // Toggle/Confirm appointment status
  const confirmAppointment = useCallback(
    (id: string) => {
      let targetStatus: "pending" | "confirmed" = "confirmed";
      const updated = appointments.map((appt) => {
        if (appt.id === id) {
          targetStatus = appt.status === "confirmed" ? "pending" : "confirmed";
          return { ...appt, status: targetStatus };
        }
        return appt;
      });
      setAppointments(updated);
      dentalService.saveAppointments(updated);

      // Async update in Firestore
      dentalService.updateAppointmentInFirestore(id, { status: targetStatus }).catch((err) => {
        console.error("Failed to update status on Firestore:", err);
      });
    },
    [appointments]
  );

  // Cancel/Delete appointment
  const cancelAppointment = useCallback(
    (id: string) => {
      const updated = appointments.filter((appt) => appt.id !== id);
      setAppointments(updated);
      dentalService.saveAppointments(updated);

      // Async delete from Firestore
      dentalService.deleteAppointmentFromFirestore(id).catch((err) => {
        console.error("Failed to delete appointment on Firestore:", err);
      });
    },
    [appointments]
  );

  // Submit dynamic contact message
  const submitContactForm = useCallback((name: string, email: string, subject: string, message: string) => {
    return dentalService.saveContactRequest({
      name,
      email,
      subject,
      message,
    });
  }, []);

  return {
    appointments,
    loading,
    isModalOpen,
    setIsModalOpen,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    bookAppointment,
    confirmAppointment,
    cancelAppointment,
    submitContactForm,
  };
}
