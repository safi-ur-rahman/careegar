import React, { useState, useEffect } from "react";
import "../css/modal.css";
import "../css/mechanicProfileModal.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import axios from 'axios';
import { toast } from 'react-hot-toast'
import defaultImage from "./images/default/defaultprofile.png";

export default function CustomizerProfileModal() {
  const [modal, setModal] = useState(true);
  const [step, setStep] = useState(1);
  const [isDefaultImage, setIsDaefaultImage] = useState(true);

  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  const defaultImageFile = new File([defaultImage], "defaultprofile.png", { type: "image/png" });

  const [data, setData] = useState({
    user_id: user.id,
    image : defaultImageFile,
    workshop_name : '',
    workshop_address : '',
    workshop_city : '',
    workshop_description : '',
    tags : []
  })

  const profileData = async (e) => {
    e.preventDefault()
    const {
      user_id = user.id,
      image, 
      workshop_name, 
      workshop_address, 
      workshop_city, 
      workshop_description,
      tags
    } = data

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("image", image);
      formData.append("workshop_name", workshop_name);
      formData.append("workshop_address", workshop_address);
      formData.append("workshop_city", workshop_city);
      formData.append("workshop_description", workshop_description);
      formData.append("tags", tags);
      // Send image and other data to the server
      const response = await axios.post("/customizerProfileModal", formData);

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

  const handleTagsChange = (e) => {
    // Check if the Enter key is pressed and the input is not empty
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const newTag = e.target.value.trim();
      
      // Check if the tag is not already in the array
      if (!data.tags.includes(newTag)) {
        setData((prevData) => ({
          ...prevData,
          tags: [...prevData.tags, newTag],
          tagInput: '' // Clear the tagInput after adding the tag
        }));
      } else {
        // Notify the user that the tag already exists
        toast.error(`Tag "${newTag}" already exists.`);
      }
  
      e.target.value = ''; // Clear the input after adding the tag
    }
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
    } else if (!data.workshop_name) {
        // Display an error message or take any other appropriate action
        toast.error("Workshop Name is required!");
        setStep((prevStep) => prevStep + 0);
    } else if (!data.workshop_address) {
        // Display an error message or take any other appropriate action
        toast.error("Workshop Address is required!");
        setStep((prevStep) => prevStep + 0);
    } else if (!data.workshop_city) {
        // Display an error message or take any other appropriate action
        toast.error("Workshop City is required!");
        setStep((prevStep) => prevStep + 0);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  }

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
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
            <h2>Customizer Profile</h2>
            
            {step === 1 && (
              // Personal details section
              <div className="modal-form">
                <h3>Workshop Info</h3>
                <label>Upload image</label>
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                
                {isDefaultImage && (
                    <img style={{ width: '100px' }} src={defaultImage} alt="Profile Image" />
                )}
                {!isDefaultImage && (
                    <img style={{ width: '100px' }} src={URL.createObjectURL(data.image)} alt="Profile Image" />
                )}

                <label>Workshop Name</label>
                <input type="text" placeholder="Name of your workshop" value={data.workshop_name} onChange={(e) => setData({...data, workshop_name: e.target.value})}/>

                <label>Workshop Address</label>
                <input type="text" placeholder="Location of your workshop" value={data.workshop_address} onChange={(e) => setData({...data, workshop_address: e.target.value})}/>

                <label>Workshop City</label>
                <input type="text" placeholder="City of your workshop" value={data.workshop_city} onChange={(e) => setData({...data, workshop_city: e.target.value})}/>

                <label>Workshop Description</label>
                <input type="text" placeholder="Tell your customers about your workshop" value={data.workshop_description} onChange={(e) => setData({...data, workshop_description: e.target.value})}/>

                <button className="modal-button" onClick={handleNext}>Next</button>
              </div>
            )}

            {step === 2 && (
                // Mechanic Expertise section
                <>
                <div className="modal-form">
                    <h3>Customizer Expertise</h3>
                    <label>Add Tags:</label>
                    <em>Enter services or jobs (e.g., decaling, interior customizer) in which you are an expert and press enter for each tag to be added.</em>
                    <input
                        type="text"
                        placeholder="Tags"
                        value={data.tagInput}
                        onChange={(e) => setData({ ...data, tagInput: e.target.value })}
                        onKeyDown={handleTagsChange}
                    />
                    <label>Entered Tags:</label>
                    <div>
                    {data.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}, </span>
                    ))}
                    </div>
                    </div>
                    <button className="modal-button" onClick={previousStep}>Back</button>
                    <button className="modal-button" onClick={nextStep}>Next</button>
                
                </>
            )}

            {step === 3 && (
              // Car details section
              <>
              <div className="modal-form">
                <h3>Confirmation</h3>
                <p>Are you sure you want to set up Careegar as a customizer and open a workshop with name {data.workshop_name}.</p>
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
