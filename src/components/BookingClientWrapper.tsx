"use client";

import { useState, Suspense, useEffect } from "react";
import FloatingBookButton from "./FloatingBookButton";
import BookingModal from "./modals/BookingModal";

const BookingClientWrapper = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBookingModal = () => setIsBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    const handleOpenBookingModalEvent = () => {
      handleOpenBookingModal();
    };

    document.addEventListener('openBookingModal', handleOpenBookingModalEvent);

    return () => {
      document.removeEventListener('openBookingModal', handleOpenBookingModalEvent);
    };
  }, []);

  return (
    <>
      <FloatingBookButton onClick={handleOpenBookingModal} />
      <Suspense fallback={null}>
        <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBookingModal} />
      </Suspense>
    </>
  );
};

export default BookingClientWrapper; 