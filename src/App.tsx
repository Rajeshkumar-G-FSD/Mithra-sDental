/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useAppointments } from "./hooks/useAppointments";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import { Treatments } from "./components/Treatments";
import { Services } from "./components/Services";
import { VisitUs } from "./components/VisitUs";
import { Blogs } from "./components/Blogs";
import { Gallery } from "./components/Gallery";
import { ContactForm } from "./components/ContactForm";
import { AppointmentModal } from "./components/AppointmentModal";
import { Footer } from "./components/Footer";
import { DentalCategory } from "./types";

export default function App() {
  const {
    appointments,
    isModalOpen,
    setIsModalOpen,
    selectedServiceForBooking,
    setSelectedServiceForBooking,
    bookAppointment,
    confirmAppointment,
    cancelAppointment,
    submitContactForm,
  } = useAppointments();

  // Helper trigger to open modal with a preselected dental service
  const handleOpenBookingWithService = (service: DentalCategory) => {
    setSelectedServiceForBooking(service);
    setIsModalOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedServiceForBooking(DentalCategory.TEETH_CLEANING);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white font-sans selection:bg-[#5D57A5] selection:text-white">
      {/* 1. Global Navigation Header (Floating Capsule style) */}
      <Header onOpenBooking={handleOpenGeneralBooking} />

      {/* 2. Visual Clinic Hero Display (Exact violet glow photo backdrop) */}
      <Hero onOpenBooking={handleOpenGeneralBooking} />

      {/* 3. About Mithra's Dental Studio Section */}
      <AboutUs />

      {/* Our Dental Treatments List */}
      <Treatments />

      {/* 4. Specialties & Services Service Node */}
      <Services onSelectService={handleOpenBookingWithService} />

      {/* 5. Same Day Urgent Care Layout */}
      <VisitUs onOpenBooking={handleOpenGeneralBooking} />

      {/* 6. Dynamic Blogs Section */}
      <Blogs />

      {/* 7. Dynamic Visual Gallery of Smiles */}
      <Gallery />

      {/* 8. Practice Location & Contact Enquiry form */}
      <ContactForm onSubmitContact={submitContactForm} />

      {/* 9. Global Wavy Footer and Staff Portal drawer links */}
      <Footer
        appointments={appointments}
        onConfirmAppt={confirmAppointment}
        onCancelAppt={cancelAppointment}
      />

      {/* 10. Interactive Booking Modal Popup */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCategory={selectedServiceForBooking}
        onBook={bookAppointment}
      />
    </div>
  );
}
