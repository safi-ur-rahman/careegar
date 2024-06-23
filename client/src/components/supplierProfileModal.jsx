import React, { useState, useEffect } from "react";
import "../css/modal.css";
import "../css/mechanicProfileModal.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import axios from 'axios';
import { toast } from 'react-hot-toast'
import defaultImage from "./images/default/defaultprofile.png";

export default function SupplierProfileModal() {
  const [modal, setModal] = useState(true);
  const [step, setStep] = useState(1);
  const [isDefaultImage, setIsDaefaultImage] = useState(true);

  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  const defaultImageFile = new File([defaultImage], "defaultprofile.png", { type: "image/png" });

  const [data, setData] = useState({
    user_id: user.id,
    image : defaultImageFile,
    store_name : '',
    store_address : '',
    store_city : '',
    store_description : ''
  })

  const profileData = async (e) => {
    e.preventDefault()
    const {
      user_id = user.id,
      image, 
      store_name, 
      store_address, 
      store_city, 
      store_description
    } = data

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("image", image);
      formData.append("store_name", store_name);
      formData.append("store_address", store_address);
      formData.append("store_city", store_city);
      formData.append("store_description", store_description);

      // Send image and other data to the server
      const response = await axios.post("/supplierProfileModal", formData);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        navigate("/");
        setTimeout(() => {
          window.location.reload();  
      }, 1000);
        toast.success("Profile Created.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
    setIsDaefaultImage(false);
  };

  const toggleModal = () => {
    setModal(!modal);
    setStep(1);
  };

  const handleNext = () => {
    // Check if required fields are filled in
    if (data.image === defaultImageFile) {
      // Display an error message or take any other appropriate action
      toast.error("Image is required!");
      setStep((prevStep) => prevStep + 0);
    } else if (!data.store_name) {
        // Display an error message or take any other appropriate action
        toast.error("Store Name is required!");
        setStep((prevStep) => prevStep + 0);
    } else if (!data.store_address) {
        // Display an error message or take any other appropriate action
        toast.error("Store Address is required!");
        setStep((prevStep) => prevStep + 0);
    } else if (!data.store_city) {
        // Display an error message or take any other appropriate action
        toast.error("Store City is required!");
        setStep((prevStep) => prevStep + 0);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const previousStep = () => {
    setStep(1);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Supplier Profile</h2>
            
            {step === 1 && (
              // Personal details section
              <div className="modal-form">
                <h3>Store Info</h3>
                <label>Upload image</label>
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                
                {isDefaultImage && (
                    <img style={{ width: '100px' }} src={defaultImage} alt="Profile Image" />
                )}
                {!isDefaultImage && (
                    <img style={{ width: '100px' }} src={URL.createObjectURL(data.image)} alt="Profile Image" />
                )}

                <label>Store Name</label>
                <input type="text" placeholder="Name of your store" value={data.store_name} onChange={(e) => setData({...data, store_name: e.target.value})}/>

                <label>Store Address</label>
                <input type="text" placeholder="Location of your store" value={data.store_address} onChange={(e) => setData({...data, store_address: e.target.value})}/>

                <label>Store City</label>
                <input type="text" placeholder="City of your store" value={data.store_city} onChange={(e) => setData({...data, store_city: e.target.value})}/>

                <label>Store Description</label>
                <input type="text" placeholder="Tell your customers about your store" value={data.store_description} onChange={(e) => setData({...data, store_description: e.target.value})}/>

                <button className="modal-button" onClick={handleNext}>Next</button>
              </div>
            )}

            {step === 2 && (
              // Car details section
              <>
              <div className="modal-form">
                <h3>Confirmation</h3>
                <p>Are you sure you want to set up Careegar as a supplier and open a store with name {data.store_name}.</p>
                </div> 
                <button className="modal-button" onClick={previousStep}>Back</button>
                <Link to='/profile'>
                  <button className="modal-button" onClick={profileData} type="submit">Confirm</button>
                </Link>
              
              </>
            )}

            
            <Link to='/'>
                  <button>
                    Skip for Now
                  </button>
                </Link>
          </div>
        </div>
      )}
    </>
  );
}
