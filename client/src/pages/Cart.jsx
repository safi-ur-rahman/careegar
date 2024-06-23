import '../css/cart.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await axios.get('/getCartProducts');
                setCartProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart products:', error);
                setLoading(false);
            }
        };

        fetchCartProducts();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`/removeFromCart/${productId}`);
            setCartProducts((prevCartProducts) =>
                prevCartProducts.filter((product) => product._id !== productId)
            );
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleIncreaseQuantity = (productId) => {
        setCartProducts((prevCartProducts) =>
            prevCartProducts.map((product) =>
                product._id === productId
                    ? { ...product, cartQuantity: product.cartQuantity + 1 }
                    : product
            )
        );
    };

    const handleDecreaseQuantity = (productId) => {
        setCartProducts((prevCartProducts) =>
            prevCartProducts.map((product) =>
                product._id === productId && product.cartQuantity > 1
                    ? { ...product, cartQuantity: product.cartQuantity - 1 }
                    : product
            )
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="head-cart">
                <h1>Cart</h1>
            </div>
            <div className="cart-page">

                <div className="cart-products">

                    {cartProducts.length === 0 ? (
                        <p>No products found in the cart</p>
                    ) : (
                        <div>
                            {cartProducts.map((product) => (
                                <div className="cart-product-card" key={product._id}>
                                    {product.deleted ? (
                                        <div className="del-products">
                                            <div className="deleted-product-message">
                                                <img src="path/to/default-image.jpg" alt="Deleted Product" />
                                                <div className="product-details">
                                                    <h3>This product has been deleted</h3>
                                                    <p>Quantity: {product.cartQuantity}</p>

                                                </div>
                                            </div>
                                            <div className="remove-button">
                                                <button onClick={() => handleRemoveFromCart(product._id)}>Remove from Cart</button>
                                            </div>


                                        </div>
                                    ) : (
                                        <>
                                            <div className="cart-container">

                                                <div className="product-detail">
                                                    <img src={`http://localhost:8000/${product.images[0]}`} alt={product.product_name} />
                                                    <div className="product-details">
                                                        <h3>{product.product_name}</h3>
                                                        <p>Description: {product.product_description}</p>
                                                    </div>
                                                    <div className="product-price">
                                                        <h3>Price: {product.product_price}</h3>
                                                        <div className="quantity-buttons">
                                                            <button onClick={() => handleDecreaseQuantity(product._id)}>-</button>
                                                            <span>{product.cartQuantity}</span>
                                                            <button onClick={() => handleIncreaseQuantity(product._id)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="remove-button">
                                                    <button onClick={() => handleRemoveFromCart(product._id)}>Remove from Cart</button>
                                                </div>
                                            </div>


                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="cart-summary">
                    <div className="cart-summary-head"><h2>Cart Summary</h2></div>
                    <p>By Placing your order, you agree to Delivery terms</p>
                    <h2>Order Summary</h2>
                    
                    <div className="cart-summary-details">
                        <div className="cart-summary-details-internal">
                        <p>Total Products: </p>
                        {cartProducts.length}
                        </div>
                        <div className="cart-line"></div>
                        <div className="cart-summary-details-internal">
                        <p>Delivery</p>
                        <p>Free</p>

                        </div>
                        <div className="cart-line"></div>
                        <div className="cart-summary-details-internal">
                        <p>Total Price:</p>
                        <p>{cartProducts.reduce((total, product) => total + (product.deleted ? 0 : product.product_price * product.cartQuantity), 0)}</p>
                        </div>
                    
                    
                    </div>
                    <div className="cart-summary-button">
                    <button>Checkout</button>
                    </div>
                   
                </div>
            </div>
        </>
    );

};

export default Cart;
