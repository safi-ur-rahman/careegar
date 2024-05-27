import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import '../css/preloader.css';
import Modal from "../components/Modal";
import axios from 'axios';

export default function Profile() {

    const {user} = useContext(UserContext)
    const [carOwnerDetails, setCarOwnerDetails] = useState(null);
    const [supplierDetails, setSupplierDetails] = useState(null);
    const [mechanicDetails, setMechanicDetails] = useState(null);
    const [customizerDetails, setCustomizerDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const getCarOwnerDetails = () => {
        axios.get('/carOwnerProfile').then(({ data }) => {
            setCarOwnerDetails(data);
        });
    }

    const getSupplierDetails = () => {
        axios.get('/supplierProfile').then(({ data }) => {
            setSupplierDetails(data);
        });
    }

    const getMechanicDetails = () => {
        axios.get('/mechanicProfile').then(({ data }) => {
            setMechanicDetails(data);
        });
    }

    const getCustomizerDetails = () => {
        axios.get('/customizerProfile').then(({ data }) => {
            setCustomizerDetails(data);
        });
    }

    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching user data)
        if (user.userType === 'carOwner')
            getCarOwnerDetails();

        if (user.userType === 'supplier')
            getSupplierDetails();

        if (user.userType === 'mechanic')
            getMechanicDetails();

        if (user.userType === 'customizer')
            getCustomizerDetails();

        const fetchData = async () => {
            try {
                // Perform any asynchronous operation here (e.g., fetching user data)
                // For demonstration purposes, let's use a setTimeout to simulate an API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setLoading(false);

                // Check if the user profile is completed
                if (!user.completedProfile) {
                    // If not completed, show the modal
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render


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
                    {user.userType === 'none' && (
                        <>
                            <h1>Profile</h1>
                            {!!user && ( <h1>Hi, {user.name}</h1> )}
                        </>
                    )}
                    {user.userType === 'carOwner' && (
                        <>

                            <img style={{width:'200px'}} src={carOwnerDetails.imageUrl}/>
                            <br />

                            <button>Edit Profile</button>

                            <h2>Personal Info</h2>

                            <label>Name: </label>
                            <span>{user.name}</span>
                            <br />

                            <label>Email: </label>
                            <span>{user.email}</span>
                            <br />

                            <label>Phone Number: </label>
                            <span>{user.phoneNumber}</span>
                            <br />

                            <label>Address: </label>
                            <span>{carOwnerDetails.address}</span>
                            <br />

                            <label>City: </label>
                            <span>{carOwnerDetails.city}</span>
                            <br />

                            <label>Account Type: </label>
                            <span>Car Owner</span>

                            <h2>Owned Car Info</h2>
        
                            {carOwnerDetails.car_make === '' && (
                                <em>You haven't added any car.</em>
                            )}
                            {carOwnerDetails.car_make != '' && (
                                <>
                                    <label>Car Make: </label>
                                    <span>{carOwnerDetails.car_make}</span>
                                    <br />

                                    <label>Car Model: </label>
                                    <span>{carOwnerDetails.car_model}</span>
                                    <br />

                                    <label>Car Submodel: </label>
                                    <span>{carOwnerDetails.car_submodel}</span>
                                    <br />

                                    <label>Car Manufactuer Year: </label>
                                    <span>{carOwnerDetails.car_year}</span>
                                    <br />
                                </>
                            )}
                            
                        </>
                    )}

                    {user.userType === 'supplier' && (
                        <>

                            <img style={{width:'200px'}} src={supplierDetails.imageUrl}/>
                            <br />

                            <button>Edit Profile</button>

                            <h2>Personal Info</h2>

                            <label>Name: </label>
                            <span>{user.name}</span>
                            <br />

                            <label>Email: </label>
                            <span>{user.email}</span>
                            <br />

                            <label>Phone Number: </label>
                            <span>{user.phoneNumber}</span>
                            <br />

                            <label>Account Type: </label>
                            <span>Supplier</span>

                            <h2>Store Details</h2>
    
                            <label>Store Name: </label>
                            <span>{supplierDetails.store_name}</span>
                            <br />

                            <label>Store Address: </label>
                            <span>{supplierDetails.store_address}</span>
                            <br />

                            <label>Store City: </label>
                            <span>{supplierDetails.store_city}</span>
                            <br />

                            {supplierDetails.store_description != '' && (
                                <>
                                    <label>Store Description: </label>
                                    <span>{supplierDetails.store_description}</span>
                                    <br /> 
                                </>
                            )}
                        </>
                    )} 

                    {user.userType === 'mechanic' && (
                        <>

                            <img style={{width:'200px'}} src={mechanicDetails.imageUrl}/>
                            <br />

                            <button>Edit Profile</button>

                            <h2>Personal Info</h2>

                            <label>Name: </label>
                            <span>{user.name}</span>
                            <br />

                            <label>Email: </label>
                            <span>{user.email}</span>
                            <br />

                            <label>Phone Number: </label>
                            <span>{user.phoneNumber}</span>
                            <br />

                            <label>Account Type: </label>
                            <span>Mechanic</span>

                            <h2>Workshop Details</h2>
    
                            <label>Workshop Name: </label>
                            <span>{mechanicDetails.workshop_name}</span>
                            <br />

                            <label>Workshop Address: </label>
                            <span>{mechanicDetails.workshop_address}</span>
                            <br />

                            <label>Workshop City: </label>
                            <span>{mechanicDetails.workshop_city}</span>
                            <br />

                            {mechanicDetails.workshop_description != '' && (
                                <>
                                    <label>Workshop Description: </label>
                                    <span>{mechanicDetails.workshop_description}</span>
                                    <br /> 
                                </>
                            )}

                            <label>Expertise Tags: </label>
                            {mechanicDetails.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}, </span>
                            ))}
                            <br /> 
                        </>
                    )}

                    {user.userType === 'customizer' && (
                        <>

                            <img style={{width:'200px'}} src={customizerDetails.imageUrl}/>
                            <br />

                            <button>Edit Profile</button>

                            <h2>Personal Info</h2>

                            <label>Name: </label>
                            <span>{user.name}</span>
                            <br />

                            <label>Email: </label>
                            <span>{user.email}</span>
                            <br />

                            <label>Phone Number: </label>
                            <span>{user.phoneNumber}</span>
                            <br />

                            <label>Account Type: </label>
                            <span>Customizer</span>

                            <h2>Workshop Details</h2>
    
                            <label>Workshop Name: </label>
                            <span>{customizerDetails.workshop_name}</span>
                            <br />

                            <label>Workshop Address: </label>
                            <span>{customizerDetails.workshop_address}</span>
                            <br />

                            <label>Workshop City: </label>
                            <span>{customizerDetails.workshop_city}</span>
                            <br />

                            {customizerDetails.workshop_description != '' && (
                                <>
                                    <label>Workshop Description: </label>
                                    <span>{customizerDetails.workshop_description}</span>
                                    <br /> 
                                </>
                            )}

                            <label>Expertise Tags: </label>
                            {customizerDetails.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}, </span>
                            ))}
                            <br /> 
                        </>
                    )}           
                </>
            )}

            {showModal && (
                    // Render your modal component here
                    <Modal/>
                )}
        </div>
    )
}
