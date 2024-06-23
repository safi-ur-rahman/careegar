import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { UserContext } from "../../context/userContext";
import '../css/servicecomponent.css';

export default function ServiceComponent() {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [userId, setUserId] = useState(null);
    const [workshop, setWorkshop] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);   

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/getService/${id}`);
                setService(response.data);
                setUserId(response.data.mechanic_id);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchService();
    }, [id]);

    useEffect(() => {
        if (userId) {
            const fetchWorkshop = async () => {
                try {
                    const response = await axios.get(`/getWorkshopDetails/${userId}`);
                    setWorkshop(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching workshop details:', error);
                }
            };

            fetchWorkshop();
        }
    }, [userId]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? service.images.length - 1 : prevIndex - 1
        );
    };

    // const handleBooking = async () => {
    //     if (!selectedDate || !selectedTime || !description) {
    //         toast.error('Please select a date, time, and provide a description.');
    //         return;
    //     }

    //     const bookingDetails = {
    //         serviceId: id,
    //         user_id: user._id,
    //         mechanic_id: userId,
    //         date: selectedDate,
    //         time: selectedTime,
    //         description
    //     };

    //     try {
    //         const response = await axios.post('/bookService', bookingDetails);
    //         if (response.data.success) {
    //             toast.success('Service booked successfully!');
    //         } else {
    //             toast.error('Failed to book service. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error booking service:', error);
    //         toast.error('Error booking service. Please try again.');
    //     }
    // };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !description) {
            toast.error('Please select a date, time, and provide a description.');
            return;
        }
    
        const formData = new FormData();
        formData.append('serviceId', id);
        formData.append('user_id', user._id);
        formData.append('mechanic_id', userId);
        formData.append('date', selectedDate.toISOString()); // Convert date to ISO string
        formData.append('time', selectedTime);
        formData.append('description', description);
    
        // Append images if they exist
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
    
        try {
            const response = await axios.post('/bookService', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success('Service booked successfully!');
            } else {
                toast.error('Failed to book service. Please try again.');
            }
        } catch (error) {
            console.error('Error booking service:', error);
            toast.error('Error booking service. Please try again.');
        }
    };

    const isValidDate = (date) => {
        if (!workshop || !workshop.schedule) return false;

        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        return workshop.schedule.some((s) => s.day === dayOfWeek);
    };

    const isValidTime = (time) => {
        if (!selectedDate || !workshop || !workshop.schedule) return false;

        const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const scheduleForDay = workshop.schedule.find((s) => s.day === dayOfWeek);

        if (!scheduleForDay) return false;

        const [startHour, startMinute] = scheduleForDay.startTime.split(':').map(Number);
        const [endHour, endMinute] = scheduleForDay.endTime.split(':').map(Number);
        const [selectedHour, selectedMinute] = time.split(':').map(Number);

        const startTime = new Date();
        startTime.setHours(startHour, startMinute);
        const endTime = new Date();
        endTime.setHours(endHour, endMinute);
        const selectedTime = new Date();
        selectedTime.setHours(selectedHour, selectedMinute);

        return selectedTime >= startTime && selectedTime <= endTime;
    };

    const handleFileChange = (e) => {
        // Handle multiple files by converting the FileList to an array
        const fileList = Array.from(e.target.files);
        setImages(fileList);
    };

    return (
        <>
        <div className="service-head">
            <h1>Service Detail</h1>
        </div>
        <div className="servicepage-container">
            {loading ? (
                <div className="servicepage-preloader-container">
                    <div className="servicepage-preloader"></div>
                </div>
            ) : (
                <div className="servicepage-content">
                    {service && (
                        <>
                            {service.images && service.images.length > 0 && (
                                <div className="servicepage-carousel">
                                    
                                    <img className="servicepage-carousel-image" src={`http://localhost:8000/${service.images[currentImageIndex]}`} alt="Service" />
                                    <div className="service-buttons"><button className="servicepage-carousel-button" onClick={handlePrevImage}>Previous</button>
                                    <button className="servicepage-carousel-button" onClick={handleNextImage}>Next</button></div>
                                    
                                </div>
                            )}
                            <div className="servicepage-info">
                                <div className="servicepage-schedule">
                                    <h2>Workshop Schedule:</h2>
                                    {workshop && workshop.schedule && workshop.schedule.length > 0 ? (
                                        <div>
                                            {workshop.schedule.map((s) => (
                                                <li key={s._id}>
                                                    {s.day}: {s.startTime} - {s.endTime}
                                                </li>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No schedule available.</p>
                                    )}
                                </div>
                                <div className="servicepage-details">
                                    <h1>{service.service_name}</h1>
                                    <p>Offered by: {workshop ? workshop.name : ''}</p>
                                    <p>Address: {workshop ? `${workshop.address}, ${workshop.city}` : ''}</p>
                                    <p>Description: {service.service_description || 'No description added'}</p>
                                    <p>Starting Price: {service.service_price}</p>
                                </div>
                                <div className="servicepage-mechanic-experience">
                                    <h2>Mechanic Experience:</h2>
                                    {workshop && workshop.experiences && workshop.experiences.length > 0 ? (
                                        <ul>
                                            {workshop.experiences.map((experience, index) => (
                                                <li key={index}>
                                                    {experience.years} years of experience in {experience.skill}.
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No experience added.</p>
                                    )}
                                </div>
                                <div className="servicepage-book-service">
                                    <h2>Book Service</h2>
                                    <div>
                                        <label>Select Date:</label>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            dateFormat="yyyy/MM/dd"
                                            filterDate={isValidDate}
                                            minDate={new Date()}
                                        />
                                    </div>
                                    <div>
                                        <label>Select Time:</label>
                                        <input
                                            type="time"
                                            value={selectedTime}
                                            onChange={(e) => {
                                                const time = e.target.value;
                                                if (isValidTime(time)) {
                                                    setSelectedTime(time);
                                                } else {
                                                    toast.error('Selected time is not within the workshop schedule.');
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Description of Problem:</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="4"
                                            cols="50"
                                        />
                                    </div>
                                    <div>
                                    <label htmlFor="images">Add Images:</label>
                                    <input type="file" id="images" multiple onChange={handleFileChange} />


                                    {images.length > 0 && (
                                        <div>
                                            <h4>Selected Images:</h4>
                                            {images.map((image, index) => (
                                                <React.Fragment key={index}>
                                                    <img style={{ width: '30px' }} src={URL.createObjectURL(image)} />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                    <button onClick={handleBooking}>Book Service</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
        </>

    );
}
