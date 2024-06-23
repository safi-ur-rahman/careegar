import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import "../css/productModal.css";

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, onClose, productToEdit, onProductAdded }) => {
  const { user } = useContext(UserContext);

  const [product_name, setName] = useState("");
  const [product_description, setDescription] = useState("");
  const [product_quantity, setQuantity] = useState("");
  const [product_price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.product_name || "");
      setDescription(productToEdit.product_description || "");
      setQuantity(productToEdit.product_quantity || "");
      setPrice(productToEdit.product_price || "");
      setImages(productToEdit.images || []);
    }
  }, [productToEdit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      product_name &&
      product_description &&
      product_quantity &&
      product_price
    ) {
      const newItem = {
        supplier_id: user.id,
        product_name,
        product_description,
        product_price,
        product_quantity,
        images,
      };

      if (productToEdit) {
        const updatedObject = { objID: productToEdit._id, ...newItem };
        EditItem(updatedObject);
      } else {
        AddItem(newItem);
      }

      onClose();
    }
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages(fileList);
  };

  const navigateNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const navigatePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const AddItem = async (newItem) => {
    try {
      const formData = new FormData();
      Object.entries(newItem).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image, index) => {
            formData.append(`images`, image);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post("/addProduct", formData);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Product Added.");
        onProductAdded();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditItem = async (newItem) => {
    try {
      const response = await axios.put("/editProduct", newItem);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Product Updated.");
        onProductAdded();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Item Modal"
    >
        <div className="modal-border">
      <h2 className="modal-heading">{productToEdit ? "Edit Product " : "Add Product"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="modal-form">
          <div className="flex-forward">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              value={product_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-forward">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={product_description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-forward">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              min={0}
              id="quantity"
              value={product_quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex-forward">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min={0}
              id="price"
              value={product_price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {!productToEdit && (
            <>
              <label htmlFor="images">Images</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleFileChange}
              />

              {images.length > 0 && (
                <div className="imageView">
                  <h4>Selected Images</h4>
                  {images.map((image, index) => (
                    <React.Fragment key={index}>
                      <img
                        className="image-display"
                        src={URL.createObjectURL(image)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
           {productToEdit && (
            <>
              {images.length > 0 && (
                <div className="imageView">
                  <h4>Selected Images:</h4>
                  {images.map((image, index) => (
                    <React.Fragment key={index}>
                      <img
                        className="image-display"
                        src={`http://localhost:8000/${image}`}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <button className="modal-button" type="submit">{productToEdit ? "Save Changes" : "Add"}</button>
        <button className="modal-button" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      </div>
    </Modal>
  );
};

export default ProductModal;
