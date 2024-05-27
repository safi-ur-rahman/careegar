import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import axios from 'axios'
import '../css/preloader.css';
import '../css/productCard.css';
import { toast } from 'react-hot-toast'
import editSVG from '../assets/edit.svg'
import deleteSVG from '../assets/trash.svg'
import ServiceModal from "../components/serviceModal";


export default function MechanicWorkshop() {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [serModal, setserModal] = useState(false);
    const [services, setServices] = useState([]);
    const [serviceToEdit, setServiceToEdit] = useState({});
    //console.log(user.id)
    useEffect(() => {
        // Fetch products when the component mounts
        fetchServices();
    }, []); 

    const fetchServices = async () => {
        try {
            // Make a request to your server to get the products for a specific supplier
            const response = await axios.get('/workshopServices');
            setServices(response.data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setLoading(false);

        } catch (error) {
            console.error('Error fetching services: ', error);
        }
    };

    const DeleteService = async (service) => {
        try {
            const response = await axios.delete("/deleteService", service._id);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                toast.success("Service Deleted.");
            }
        } catch (error) {
            console.log(error);
        }
    }


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
                    <h1 style={{color: 'black', fontSize:'44px' }}>Wokshop Dashboard</h1>
                    <button onClick={() => {setserModal(true); setServiceToEdit(null)}}>Add a New Service</button>
                </>
            )}
            {serModal && (
                // Render your modal component here
                <ServiceModal isOpen={serModal} onClose={() => setserModal(false)} serviceToEdit = {serviceToEdit} />
            )}

            <div className="products-grid">
                <h1 style={{color: 'white', fontSize:'44px' }}>Services</h1>
                <ul className="grid">
                    {services.map((service) => (
                        <li key={service._id} className="grid-item">
                            <div className="product-card">

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
                                <div className="prod-icons">
                                <img src={editSVG} onClick={()=>{setServiceToEdit(service); setserModal(true)}} alt="Edit Logo" />
                                <img src={deleteSVG} onClick={()=>{DeleteService(service)}} />
                                
                                </div>
                                {/* Additional product details can be added here */}
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}
