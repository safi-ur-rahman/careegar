import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from "../../context/userContext"; // Adjust the path according to your project structure
import '../css/userboooking.css';

export default function UserBooking() {
    const { user } = useContext(UserContext); // Assumes UserContext provides user details
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/userBookings/${user._id}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    useEffect(() => {
        if (bookings.length > 0) {
            fetchServiceForBookings();
        }
    }, [bookings]);

    const fetchServiceForBookings = async () => {
        try {
            const serviceAndUserRequests = await Promise.all(bookings.map(async (booking) => {
                const [serviceResponse] = await Promise.all([
                    axios.get(`/getService/${booking.serviceId}`)
                ]);
                return {
                    ...booking,
                    service: serviceResponse.data
                };
            }));
            setBookings(serviceAndUserRequests);
        } catch (error) {
            console.error('Error fetching service and user for bookings:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="book-head">
                <h1>Your Bookings</h1>
            </div>

            {bookings.length > 0 ? (
                <ul className="book-list">
                    {bookings.map(booking => (
                        !booking.atMechanic ? (
                            <li key={booking._id} className="book-card">
                                <div className="book-container">
                                    <div className="book-status">
                                        <p className="book-status-text">
                                            <strong>{booking.mechanicPrice != 0 ? "Accepted" : "Rejected"}</strong> by workshop.
                                        </p>
                                    </div>
                                    <div className="book-service">
                                        <p><strong>{booking.service && booking.service.service_name}</strong> Service</p>
                                    </div>
                                    <div className="book-date-time">
                                        <p>on date <strong>{new Date(booking.date).toLocaleDateString()}</strong> at time <strong>{booking.time}</strong>.</p>
                                    </div>
                                    <div className="book-description">
                                        <p>Your note: {booking.description}</p>
                                    </div>
                                    {booking.mechanicDescr && (
                                        <div className="book-mechanic-note">
                                            <p>Mechanic's Note: {booking.mechanicDescr}</p>
                                        </div>
                                    )}
                                    {booking.mechanicPrice ? (
                                        <div className="book-price">
                                            <p>Price: <strong>${booking.mechanicPrice}</strong></p>
                                        </div>
                                    ) : null}
                                </div>
                            </li>
                        ) : (
                            <li key={booking._id} className="book-card">
                                <div className="book-container">
                                    <div className="book-status">
                                        <p className="book-status-text"><strong>Pending</strong></p>
                                    </div>
                                    <div className="book-service">
                                        <p><strong>{booking.service && booking.service.service_name}</strong> Service</p>
                                    </div>
                                    <div className="book-date-time">
                                        <p>on date <strong>{new Date(booking.date).toLocaleDateString()}</strong> at time <strong>{booking.time}</strong>.</p>
                                    </div>
                                    <div className="book-description">
                                        <p>Your note: {booking.description}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
}
