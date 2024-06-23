import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import '../css/preloader.css';
import '../css/productCard.css';
import '../css/dashboard.css';
import { toast } from 'react-hot-toast';
import editSVG from '../assets/edit.svg';
import deleteSVG from '../assets/trash.svg';
import ServiceModal from "../components/serviceModal";
import ScheduleModal from "../components/scheduleModal";
import AddExperienceModal from "../components/experienceModal";
import BookingModal from "../components/bookingModal";
import Tabs from '../components/Tabs';

export default function MechanicWorkshop() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [serModal, setserModal] = useState(false);
    const [schedModal, setSchedModal] = useState(false);
    const [userDetails, setMechanicDetails] = useState(null);
    const [services, setServices] = useState([]);
    const [serviceToEdit, setServiceToEdit] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [isAddExperienceModalOpen, setAddExperienceModalOpen] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [activeBookingsTab, setActiveBookingsTab] = useState('Requests');
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);

    useEffect(() => {
        getMechanicDetails();
    }, []);

    useEffect(() => {
        if (userDetails) {
            fetchServices();
            getWorkshopDetails();
            fetchBookings();
        }
    }, [userDetails]);

    useEffect(() => {
        if (bookings.length > 0) {
            fetchServiceAndUserForBookings();
        }
    }, [bookings]);

    const getMechanicDetails = async () => {
        try {
            const { data } = await axios.get('/mechanicProfile');
            setMechanicDetails(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching mechanic details:', error);
        }
    };

    const getWorkshopDetails = async () => {
        try {
            const { data } = await axios.get(`/getWorkshopDetails/${userDetails._id}`);
            setSchedule(data.schedule || []);
            setExperiences(data.experiences || []);
        } catch (error) {
            console.error('Error fetching workshop details:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const { data } = await axios.get(`/workshopServices/${userDetails._id}`);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get(`/getBookings/${userDetails._id}`);
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchServiceAndUserForBookings = async () => {
        try {
            const serviceAndUserRequests = await Promise.all(bookings.map(async (booking) => {
                const [serviceResponse, userResponse] = await Promise.all([
                    axios.get(`/getService/${booking.serviceId}`),
                    axios.get(`/getUser/${booking.user_id}`)
                ]);
                return {
                    ...booking,
                    service: serviceResponse.data,
                    user: userResponse.data
                };
            }));
            setBookings(serviceAndUserRequests);
        } catch (error) {
            console.error('Error fetching service and user for bookings:', error);
        }
    };

    const DeleteService = async (serviceId) => {
        try {
            const response = await axios.delete(`/deleteService/${serviceId}`);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Service Deleted.");
                fetchServices();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleServiceAdded = () => {
        fetchServices(); // Refresh services after adding or editing
        setserModal(false);
    };

    const handleScheduleSave = async (newSchedules) => {
        try {
            const response = await axios.post('/workshopDetails', { userDetails, schedule: newSchedules });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setSchedule(newSchedules); // Update the local schedule state
                toast.success("Schedule updated successfully.");
                setSchedModal(false);
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
            toast.error('Internal Server Error');
        }
    };

    const isAvailable = () => {
        const now = new Date();
        const currentDay = now.toLocaleString('en-us', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        return schedule.some(s => s.day === currentDay &&
            currentTime >= s.startTime && currentTime <= s.endTime);
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const openAddExperienceModal = () => {
        setAddExperienceModalOpen(true);
    };

    const handleAddExperience = async (newExperience) => {
        try {
            console.log(newExperience);
            const response = await axios.post('/setWorkshopExperience', { userDetails, newExperience });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                getWorkshopDetails();
                toast.success('Experience added successfully');
            }
        } catch (error) {
            console.error('Error adding experience:', error);
            toast.error('Failed to add experience');
        }
    };

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        setBookingModalOpen(true);
      };

    const updateBooking = (updatedBooking) => {
        window.location.reload();
        setBookings(bookings.map(booking => booking._id === updatedBooking._id ? updatedBooking : booking));
      };

    const renderDashboard = () => (
        <>
            
            <div className="products-grid">
                <h1>Dashboard</h1>

                <h1 style={{ color: 'white', fontSize: '32px', margin:"1em 0em" }}>Your Schedule</h1>
                <div>
                    <p className="text-white" style={{ fontWeight: "bold" }}>Your current schedule: </p>
                    {schedule.map((s, index) => (
                        <p className="text-white" key={index}>{s.day}: {s.startTime} - {s.endTime}</p>
                    ))}
                </div>
                <button style={{margin:"1em 0em"}} onClick={() => setSchedModal(true)}>Set Your Schedule</button>

                <p className="text-white">Your workshop is {isAvailable() ? "Available" : "Not Available"} for Careegar users.</p>
            </div>

            <div className="products-grid">
                <div>
                    <h1 style={{ color: 'white', fontSize: '32px' }}>Experience</h1>
                    <button style={{margin:"1em 0em"}} onClick={openAddExperienceModal}>Add Experience</button>
                    {experiences && experiences.length > 0 ? (
                        experiences.map((experience, index) => (
                            <div key={index}>
                                <p className="text-white">{experience.years} years experience in {experience.skill}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No experiences added yet.</p>
                    )}
                </div>
                <AddExperienceModal
                    isOpen={isAddExperienceModalOpen}
                    onClose={() => setAddExperienceModalOpen(false)}
                    onSave={handleAddExperience}
                />
            </div>

            <div className="products-grid">
                <h1 style={{ color: 'white', fontSize: '32px' }}>Your Services</h1>
                <button onClick={() => { setserModal(true); setServiceToEdit(null) }}>Add a New Service</button>
                <ul className="grid">
                    {services.map((service) => (
                        <li key={service._id} className="grid-item">
                            <div className="product-card">
                                <Link to={`/service/${service._id}`} className="service-link">
                                    <div>
                                    {service.images && service.images.length > 0 && (
                                        <React.Fragment key={0}>
                                            <img 
                                            className="image-display"
                                            src={`http://localhost:8000/${service.images[0]}`} 
                                            alt={`Image 1`} 
                                            />
                                        </React.Fragment>
                                        )}

                                    </div>
                                    <p>Service Name: {service.service_name}</p>
                                    <p>Description: {service.service_description || 'No description added'}</p>
                                    <p>Starting Price: {service.service_price}</p>
                                </Link>
                                <div className="prod-icons">
                                    <img src={editSVG} onClick={() => { setServiceToEdit(service); setserModal(true) }} alt="Edit Logo" />
                                    <img src={deleteSVG} onClick={() => { DeleteService(service._id) }} alt="Delete Logo" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    const renderBookings = () => (
        <div className="products-grid">
            <Tabs
                activeTab={activeBookingsTab}
                onChangeTab={setActiveBookingsTab}
                tabs={['Requests', 'Booked']}
            />
            {activeBookingsTab === 'Requests' && renderBookingRequests()}
            {activeBookingsTab === 'Booked' && renderBookedRequests()}
        </div>
    );

    const renderBookingRequests = () => (
        <div className="bookings-content">
            <h2 style={{color:"white", marginTop:"1em"}}>Booking Requests</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map(booking => (
                        booking.atMechanic && (
                            <li key={booking._id}>
                                <div style={{border: "1px white solid", margin:"2em 20em", padding:"1em"}}>
                                    <div>
                                        {booking.images.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <img style={{ width: '30px' }} src={`http://localhost:8000/${image}`} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p className="text-white">Service Required <strong>{booking.service && booking.service.service_name}
                                        </strong> on date <strong>{new Date(booking.date).toLocaleDateString()}
                                            </strong> at time <strong>{booking.time}</strong>.</p>
                                    <p className="text-white"><strong>Additional Information: </strong>{booking.description}</p>
                                    <p className="text-white">Requested by <strong>{booking.user && booking.user.name}</strong>.</p>
                                    <p className="text-white">{booking.user && booking.user.name}'s contact number is {booking.user && booking.user.phoneNumber}</p>
                                    
                                    <button onClick={() => handleBookingClick(booking)}>Take Action</button>
                                </div>
                            </li>
                        )
                    ))}
                </ul>
            ) : (
                <p className="text-white">No booking requests available.</p>
            )}
        </div>
    );

    const renderBookedRequests = () => (
        <div className="bookings-content">
            <h2 style={{color:"white", marginTop:"1em"}}>Booked Services</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map(booking => (
                        !booking.atMechanic && booking.mechanicPrice != 0 && (
                            <li key={booking._id}>
                                <div style={{border: "1px white solid", margin:"2em 20em", padding:"1em"}}>
                                    <div>
                                        {booking.images.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <img style={{ width: '30px' }} src={`http://localhost:8000/${image}`} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p className="text-white">Service Required <strong>{booking.service && booking.service.service_name}
                                        </strong> on date <strong>{new Date(booking.date).toLocaleDateString()}
                                            </strong> at time <strong>{booking.time}</strong>.</p>
                                    <p className="text-white"><strong>Additional Information: </strong>{booking.description}</p>
                                    <p className="text-white">Requested by <strong>{booking.user && booking.user.name}</strong>.</p>
                                    <p className="text-white">{booking.user && booking.user.name}'s contact number is {booking.user && booking.user.phoneNumber}</p>
                                    
                                    <p className="text-white"><strong>Accepted at price {booking.mechanicPrice}</strong></p>
                                </div>
                            </li>
                        )
                    ))}
                </ul>
            ) : (
                <p>No booking requests available.</p>
            )}
        </div>
    );

    return (
        <div>
            {loading ? (
                // Display preloader while loading
                <div className="preloader-container">
                    {/* Add your preloader animation here */}
                    <div className="preloader"></div>
                </div>
            ) : (
                <>
                <h1 style={{ color: 'black', fontSize: '52px' }}>{userDetails.workshop_name}</h1>
                    <Tabs
                        activeTab={activeTab}
                        onChangeTab={setActiveTab}
                        tabs={['Dashboard', 'Bookings']}
                    />
                    {activeTab === 'Dashboard' && renderDashboard()}
                    {activeTab === 'Bookings' && renderBookings()}
                </>
            )}
            {serModal && (
                <ServiceModal
                    isOpen={serModal}
                    onClose={() => setserModal(false)}
                    serviceToEdit={serviceToEdit}
                    onServiceAdded={handleServiceAdded}
                />
            )}
            {schedModal && (
                <ScheduleModal
                    isOpen={schedModal}
                    onClose={() => setSchedModal(false)}
                    onSave={handleScheduleSave}
                />
            )}
            <BookingModal
                isOpen={bookingModalOpen}
                onClose={() => setBookingModalOpen(false)}
                booking={selectedBooking}
                onUpdateBooking={updateBooking}
            />
        </div>
    );
}
