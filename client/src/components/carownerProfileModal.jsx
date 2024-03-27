import React, { useState, useEffect } from "react";
import "../css/modal.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import axios from 'axios';
import { toast } from 'react-hot-toast'
import defaultImage from "./images/default/defaultprofile.png";

export default function CarOwnerProfileModal() {
  const [modal, setModal] = useState(true);
  const [step, setStep] = useState(1);
  const [isDefaultImage, setIsDaefaultImage] = useState(true);

  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  const defaultImageFile = new File([defaultImage], "defaultprofile.png", { type: "image/png" });

  const [data, setData] = useState({
    user_id: user.id,
    image : defaultImageFile,
    address : '',
    city : '',
    car_make: '',
    car_model: '',
    car_submodel: '',
    car_year: ''
  })

  const profileData = async (e) => {
    e.preventDefault()
    const {
      user_id = user.id,
      image, 
      address, 
      city, 
      car_make, 
      car_model, 
      car_submodel, 
      car_year
    } = data

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("image", image);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("car_make", car_make);
      formData.append("car_model", car_model);
      formData.append("car_submodel", car_submodel);
      formData.append("car_year", car_year);

      // Send image and other data to the server
      const response = await axios.post("/carownerProfileModal", formData);

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
    if (!data.address || !data.city) {
      // Display an error message or take any other appropriate action
      toast.error("Address and City are required fields");
      setStep((prevStep) => prevStep + 0);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

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
            <h2>Car Owner Profile</h2>
            
            {step === 1 && (
              // Personal details section
              <>
                <h3>Personal Info</h3>
                <label>Upload your image</label>
                <input type="file" accept="image/*" onChange={handleFileChange}/>

                {isDefaultImage && (
                    <img style={{ width: '100px' }} src={defaultImage} alt="Profile Image" />
                )}
                {!isDefaultImage && (
                    <img style={{ width: '100px' }} src={URL.createObjectURL(data.image)} alt="Profile Image" />
                )}


                <label>Address</label>
                <input type="text" placeholder="Delivery Address" value={data.address} onChange={(e) => setData({...data, address: e.target.value})}/>

                <label>City</label>
                <input type="text" placeholder="City of your residence" value={data.city} onChange={(e) => setData({...data, city: e.target.value})}/>

                <button onClick={handleNext}>Next</button>
              </>
            )}

            {step === 2 && (
              // Car details section
              <>
                <h3>Car Details</h3>
                <label>Make</label>
                <input type="text" placeholder="Make of your car e.g. Toyota" value={data.car_make} onChange={(e) => setData({...data, car_make: e.target.value})}/>

                <label>Model</label>
                <input type="text" placeholder="Model of your car e.g. Corolla" value={data.car_model} onChange={(e) => setData({...data, car_model: e.target.value})}/>

                <label>Submodel</label>
                <input type="text" placeholder="Submodel of your car e.g. GLI" value={data.car_submodel} onChange={(e) => setData({...data, car_submodel: e.target.value})}/>

                <label>Year</label>
                <input type="text" placeholder="Year of your car e.g. 2019" value={data.car_year} onChange={(e) => setData({...data, car_year: e.target.value})}/>

                <Link to='/profile'>
                  <button onClick={profileData} type="submit">Confirm</button>
                </Link>
              </> 
            )}

            
            <Link to='/'>
                  <button className="close-modal">
                    Skip for Now
                  </button>
                </Link>
          </div>
        </div>
      )}
    </>
  );
}
