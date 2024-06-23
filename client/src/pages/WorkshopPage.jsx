import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import '../css/preloader.css';
import '../css/productCard.css';
import { toast } from 'react-hot-toast';

export default function WorkshopPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [services, setServices] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [description, setDescription] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);


    useEffect(() => {
        getUserDetails();
    }, [id]); // Add id as a dependency to useEffect

    useEffect(() => {
        if (userDetails) {
            fetchServices();
            getWorkshopDetails();
        }
    }, [userDetails]);

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(`/getProfile/${id}`);
            setUserDetails(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching mechanic/customizer details:', error);
        }
    };

    const getWorkshopDetails = async () => {
        try {
            const { data } = await axios.get(`/getWorkshopDetails/${userDetails._id}`);
            setSchedule(data.schedule || []);
            setExperiences(data.experiences || []);
            setDescription(data.description || "");
            setAddress(data.address || "");
            setCity(data.city || "")
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

    const isAvailable = () => {
        const now = new Date();
        const currentDay = now.toLocaleString('en-us', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        return schedule.some(s => s.day === currentDay &&
            currentTime >= s.startTime && currentTime <= s.endTime);
    };

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
                    <p>{description ? description : "No description added."}</p>
                    <p>Location: {address}, {city}</p>

                    <div className="products-grid">
                        <h3 className="text-white">Workshop is {isAvailable() ? "open." : "closed."}</h3>

                        <h1 style={{ color: 'white', fontSize: '32px' }}>Schedule</h1>
                        <div>
                            {schedule.map((s, index) => (
                                <p className="text-white" key={index}>{s.day}: {s.startTime} - {s.endTime}</p>
                            ))}
                        </div>

                    </div>

                    <div className="products-grid">
                        <div>
                            <h1 style={{ color: 'white', fontSize: '32px' }}>Experience</h1>
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
                    </div>
                </>
            )}

            <div className="products-grid">
                <h1 style={{ color: 'white', fontSize: '32px' }}>Services</h1>
                <ul className="grid">
                    {services.map((service) => (
                        <li key={service._id} className="grid-item">
                            <div className="product-card">
                                <Link to={`/service/${service._id}`} className="service-link">
                                    <div>
                                        {service.images.map((image, index) => (
                                            <React.Fragment key={index}>
                                                <img style={{ width: '120px' }} src={`http://localhost:8000/${image}`} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p>Service Name: {service.service_name}</p>
                                    <p>Description: {service.service_description}</p>
                                    <p>Starting Price: {service.service_price}</p>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
