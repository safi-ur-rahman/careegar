import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, booking, onUpdateBooking }) => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAccept = async () => {
    if (!price || !description) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.put(`/updateBooking/${booking._id}`, {
        atMechanic: false,
        mechanicPrice: price,
        mechanicDescr: description
      });

      if (response.data.success) {
        toast.success('Booking accepted successfully');
        onUpdateBooking(response.data.updatedBooking);
        onClose();
      } else {
        toast.error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Failed to accept booking');
    }
  };

  const handleReject = async () => {
    if (!description) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      const response = await axios.put(`/updateBooking/${booking._id}`, {
        atMechanic: false,
        mechanicPrice: 0,
        mechanicDescr: description
      });

      if (response.data.success) {
        toast.success('Booking rejected successfully');
        onUpdateBooking(response.data.updatedBooking);
        onClose();
      } else {
        toast.error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Failed to reject booking');
    }
  };

  if (!isOpen || !booking) {
    return null;
  }

  return (
    <div className="modal">
  <div className="modal-content">
    <div className='modal-border'>
    <h2 className="modal-heading">Booking Request Details</h2>
    <div className="modal-form">
      <p><strong>Service Required:</strong> {booking.service && booking.service.service_name}</p>
      <p><strong>Requested by:</strong> {booking.user && booking.user.name}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <div className="flex-forward">
        <label htmlFor="price">Price Quotation:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="flex-forward">
        <label htmlFor="description">More Information:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button className="modal-button" onClick={handleAccept}>Accept</button>
        <button className="modal-button" onClick={handleReject}>Reject</button>
        <button className="modal-button close" onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  </div>
</div>

  );
};

export default BookingModal;