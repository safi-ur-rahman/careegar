import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import '../css/preloader.css';
import '../css/productinformation.css';

const ProductInformation = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`/getProductById/${id}`);
                setProduct(response.data);
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };

        fetchProductById();
    }, [id]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (product.images.length));
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + product.images.length) % (product.images.length));
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity < product.product_quantity) {
                return prevQuantity + 1;
            } else {
                alert('You have reached the limit.');
                return prevQuantity; // Prevent increasing beyond available stock
            }
        });
    };

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('/addToCart', {
                productId: product._id,
                quantity: quantity
            });
            // Handle success (optional)
            toast.success("Product added to cart.");
            console.log(response.data);
        } catch (error) {
            toast.error("Error adding product to cart.");
            console.error('Error adding product to cart:', error);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-container">
            <div className="product-images">
                <img src={`http://localhost:8000/${product.images[currentIndex]}`} alt={`Image ${currentIndex}`} />
                <div className="product-images-buttons">
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
            <div className="product-details-container">
                <div className="product-details">
                    <h1>{product.product_name}</h1>
                    <p>{product.product_description}</p>

                    <div className="cart-details">
                        <div><h2>RS. {product.product_price}</h2></div>

                        <div className="buttons-quantity">
                            <button
                                onClick={handleDecreaseQuantity}
                                disabled={quantity <= 1}
                            >-</button>
                            <span>{quantity}</span>
                            <button
                                onClick={handleIncreaseQuantity}
                                disabled={quantity >= product.product_quantity}
                            >
                                +
                            </button>
                        </div>
                        <div className="buttons-cart">
                            {/* <Link to="/cart"> */}
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            {/* </Link> */}

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductInformation;
