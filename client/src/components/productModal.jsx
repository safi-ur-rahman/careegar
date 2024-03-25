import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useContext } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserContext } from "../../context/userContext"
import '../css/productModal.css'

Modal.setAppElement('#root'); // Set the root element to be accessible for screen readers

//const defaultImageFile = new File([defaultImage], "defaultprofile.png", { type: "image/png" });

const ProductModal = ({ isOpen, onClose, productToEdit }) => {

    const { user } = useContext(UserContext);

    const [product_name, setName] = useState('');
    const [product_description, setDescription] = useState('');
    const [product_quantity, setQuantity] = useState('');
    const [product_price, setPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.product_name || '');
            setDescription(productToEdit.product_description || '');
            setQuantity(productToEdit.product_quantity || '');
            setPrice(productToEdit.product_price || '');
        }
    }, [productToEdit]);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (product_name && product_description && product_quantity && product_price) {
            const newItem = {
                supplier_id: user.id,
                product_name,
                product_description,
                product_price,
                product_quantity
            };

            // Assuming onAddItem is a function that sends the API request
            if (productToEdit) {
                const updatedObject = { objID: productToEdit._id, ...newItem };
                EditItem(updatedObject);
            } else {
                AddItem(newItem);
            }

            onClose();
        }
    };


    const AddItem = async (newItem) => {
        // console.log(newItem)
        try {
            const response = await axios.post("/addProduct", newItem);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                //setData({});
                // navigate("/profile");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                toast.success("Product Added.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const EditItem = async (newItem) => {
        //  console.log(newItem)
        try {
            const response = await axios.put("/editProduct", newItem);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                //setData({});
                // navigate("/profile");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                toast.success("Product Updated.");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Item Modal"
        >
            <h2>{productToEdit ? "Edit Product " : "Add Product"}</h2>
            <form onSubmit={handleFormSubmit} className='modal-form'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={product_name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="description">Description:</label>
                <textarea id="description" value={product_description} onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="quantity">Quantity:</label>
                <input type="number" min={0} id="quantity" value={product_quantity} onChange={(e) => setQuantity(e.target.value)} />

                <label htmlFor="price">Price:</label>
                <input type="number" min={0} id="price" value={product_price} onChange={(e) => setPrice(e.target.value)} />

                <div>
                    <button type="submit">{productToEdit ? "Save Changes" : "Add"}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default ProductModal;