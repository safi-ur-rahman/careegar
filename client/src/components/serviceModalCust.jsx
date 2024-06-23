import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from "../../context/userContext";
import "../css/productModal.css";

Modal.setAppElement('#root');

const ServiceModal = ({ isOpen, onClose, serviceToEdit, onServiceAdded }) => {
    const { user } = useContext(UserContext);

    const [userDetails, setCustomizerDetails] = useState(null);
    const [service_name, setName] = useState('');
    const [service_description, setDescription] = useState('');
    const [service_price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState(''); // State for input value

    useEffect(() => {
        getCustomizerDetails();
        if (serviceToEdit) {
            setName(serviceToEdit.service_name || '');
            setDescription(serviceToEdit.service_description || '');
            setPrice(serviceToEdit.service_price || '');
            setImages(serviceToEdit.images || []);
            setTags(serviceToEdit.tags || []);
        }
    }, [serviceToEdit]);

    const getCustomizerDetails = () => {
        axios.get('/customizerProfile').then(({ data }) => {
            setCustomizerDetails(data);
        });
    }

    const handleTagsChange = (e) => {
        // Check if the Enter key is pressed and the input is not empty
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault(); // Prevent form submission
            const newTag = tagInput.trim();
    
            // Check if the tag is not already in the array
            if (!tags.includes(newTag)) {
                setTags((prevTags) => [...prevTags, newTag]);
                setTagInput(''); // Clear the tagInput after adding the tag
            } else {
                // Notify the user that the tag already exists
                toast.error(`Tag "${newTag}" already exists.`);
            }
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (service_name && service_description && service_price) {
            const newService = {
                mechanic_id: userDetails._id,
                service_name,
                service_description,
                service_price,
                tags,
                images, // Include images in the request
            };

            if (serviceToEdit) {
                const updatedObject = { objID: serviceToEdit._id, ...newService };
                EditService(updatedObject);
            } else {
                AddService(newService);
            }

            onClose();
        }
    };

    const handleFileChange = (e) => {
        // Handle multiple files by converting the FileList to an array
        const fileList = Array.from(e.target.files);
        setImages(fileList);
    };

    const AddService = async (newService) => {
        try {
            const formData = new FormData();
            Object.entries(newService).forEach(([key, value]) => {
                if (key === 'images') {
                    // Append each image file to the FormData
                    value.forEach((image, index) => {
                        formData.append(`images`, image);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            const response = await axios.post("/addService", formData);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
                toast.success("Service Added.");
                onServiceAdded();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const EditService = async (newService) => {
        try {
            const response = await axios.put("/editService", newService);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
                toast.success("Service Updated.");
                onServiceAdded();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Service Modal"
    >
        <div className='modal-border'>
      <h2 className='modal-heading'>{serviceToEdit ? "Edit Service" : "Add Service"}</h2>
      <form onSubmit={handleFormSubmit} className="modal-form">
        <div className="flex-forward">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            value={service_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-forward">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={service_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex-forward">
          <label htmlFor="price">Set a Starting Price</label>
          <input
            type="number"
            min={0}
            id="price"
            value={service_price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex-forward">
          <label>Add Tags</label>
          <input
            style={{ width: '250px' }}
            type="text"
            placeholder="Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagsChange}
          />
        </div>
        <div className="flex-forward">
          <label>Entered Tags</label>
          <div>
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}, </span>
            ))}
          </div>
        </div>
        {!serviceToEdit && (
          <>
            <div className="flex-forward">
              <label htmlFor="images">Upload Images</label>
              <input type="file" id="images" multiple onChange={handleFileChange} />
            </div>
            {images.length > 0 && (
              <div className="imageView">
                <h4>Selected Images:</h4>
                {images.map((image, index) => (
                  <React.Fragment key={index}>
                    <img
                      className="image-display"
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
        {serviceToEdit && (
          <>
            {images.length > 0 && (
              <div className="imageView">
                <h4>Selected Images:</h4>
                {images.map((image, index) => (
                  <React.Fragment key={index}>
                    <img
                      className="image-display"
                      src={`http://localhost:8000/${image}`}
                      alt={`Image ${index + 1}`}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
        <button className="modal-button" type="submit">{serviceToEdit ? "Save Changes" : "Add Service"}</button>
        <button className="modal-button" type="button" onClick={onClose}>Cancel</button>
      </form>
      </div>
    </Modal>
    );
};

export default ServiceModal;