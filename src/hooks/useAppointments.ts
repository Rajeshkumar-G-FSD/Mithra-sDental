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
    const data = dentalService.getAppointments();
    setAppointments(data);
    setLoading(false);
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
    },
    [appointments]
  );

  // Toggle/Confirm appointment status
  const confirmAppointment = useCallback(
    (id: string) => {
      const updated = appointments.map((appt) =>
        appt.id === id ? { ...appt, status: (appt.status === "confirmed" ? "pending" : "confirmed") as "pending" | "confirmed" } : appt
      );
      setAppointments(updated);
      dentalService.saveAppointments(updated);
    },
    [appointments]
  );

  // Cancel/Delete appointment
  const cancelAppointment = useCallback(
    (id: string) => {
      const updated = appointments.filter((appt) => appt.id !== id);
      setAppointments(updated);
      dentalService.saveAppointments(updated);
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
