import React from 'react';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import { SearchContext } from "../../context/searchContext";
import '../css/search.css';

export default function Search() {
    const { user } = useContext(UserContext);
    const { searchValue } = useContext(SearchContext);
    const [productResults, setProductResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [serviceResults, setServiceResults] = useState([]);

    const searchProducts = () => {
        axios.get(`/searchProducts?search=${searchValue}`)
            .then((response) => {
                setProductResults(response.data);
                setUserResults([]);
                setServiceResults([]);
            })
            .catch((error) => {
                console.error("Error searching products:", error);
            });
    };

    const searchUser = () => {
        axios.get(`/searchUsers?search=${searchValue}`)
            .then((response) => {
                setUserResults(response.data);
                setProductResults([]);
                setServiceResults([]);
            })
            .catch((error) => {
                console.error("Error searching users:", error);
            });
    };

    const searchServices = () => {
        axios.get(`/searchServices?search=${searchValue}`)
            .then((response) => {
                setServiceResults(response.data);
                console.log(response.data);
                setUserResults([]);
                setProductResults([]);
            })
            .catch((error) => {
                console.error("Error searching services:", error);
            });
    };

    return (
        <div className="search-container">
            <div className="search-buttons">
                <button onClick={searchProducts}>Products</button>
                <button onClick={searchUser}>Workshop</button>
                <button onClick={searchServices}>Services</button>
            </div>

            {productResults.length > 0 && (
                <div>
                    <h3>Product Results:</h3>
                    <ul className="search-list">
                        {productResults.map((product) => (
                            <li key={product._id} className="search-card-product">
                                <Link to={`/productinformation/${product._id}`} className="search-card-link">
                                    <div className="search-card-content">
                                        {product.images.length > 0 && (
                                            <img className="search-card-image" src={`http://localhost:8000/${product.images[0]}`} alt="First Image" />
                                        )}
                                        <div className="search-card-info"> <p>{product.product_name}</p></div>
                                        
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {userResults.length > 0 && (
                <div>
                    <h3>User Results:</h3>
                    <ul className="search-list">
                        {userResults.map((user) => (
                            <li key={user.user_id} className="search-card-user">
                                <div className="search-card-content">
                                    <Link to={`/supplier/${user.user_id}`} className="search-card-link">
                                        {user.store_name && (
                                            <>
                                                <img className="search-card-image" src={`http://localhost:8000/${user.image}`} alt="Store Image" />
                                                <div className="search-card-info"> <p>{user.store_name}, {user.store_address}</p></div>
                                               
                                            </>
                                        )}
                                    </Link>
                                    <Link to={`/workshop/${user._id}`} className="search-card-link">
                                        {user.workshop_name && (
                                            <>
                                                <img className="search-card-image" src={`http://localhost:8000/${user.image}`} alt="Workshop Image" />
                                                <div className="search-card-info"><p>{user.workshop_name}, {user.workshop_address}</p></div>
                                                
                                            </>
                                        )}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {serviceResults.length > 0 && (
                <div>
                    <h3>Service Results:</h3>
                    <ul className="search-list">
                        {serviceResults.map((service) => (
                            <li key={service._id} className="search-card-service">
                                <Link to={`/service/${service._id}`} className="search-card-link">
                                    <div className="search-card-content">
                                        {service.images.length > 0 && (
                                            <img className="search-card-image" src={`http://localhost:8000/${service.images[0]}`} alt="Service Image" />
                                        )}
                                        <div className="search-card-info">
                                            <strong>{service.service_name}</strong>
                                            {service.mechanic && (
                                                <span>Workshop: {service.mechanic.workshop_name}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(productResults.length === 0 && userResults.length === 0 && serviceResults.length === 0) && (
                <p className="search-no-results">No results for your search</p>
            )}
        </div>


    );
}
