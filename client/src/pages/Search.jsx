import React from 'react';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { SearchContext } from "../../context/searchContext";

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
    <div>
      <button onClick={searchProducts}>Products</button>
      <button onClick={searchUser}>Mechanic and Customizer</button>
      <button onClick={searchServices}>Services</button>

      {productResults != '' && (
            <div>
                <h3>Product Results:</h3>
                <ul>
                    {productResults.map((product) => (
                    <React.Fragment key={product.id}>
                        <div style={{border: '1px black solid', width:'300px', marginLeft:'38%', height: '50px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                {product.images.length > 0 && (
                                    <img style={{ width: '30px' }} src={`http://localhost:8000/${product.images[0]}`} alt="First Image" />
                                    )}
                            </div>
                            <li>{product.product_name}</li>
                        </div>
                    </React.Fragment>
                    ))}
                </ul>
            </div>
        )}
        {userResults != '' && (
            <div>
                <h3>User Results:</h3>
                <ul>
                    {userResults.map((user) => (
                    <React.Fragment key={user.user_id}>
                        <div style={{border: '1px black solid', width:'300px', marginLeft:'38%', height: '50px', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        {user.store_name && (
                            <>
                                <img style={{width:'30px'}} src={`http://localhost:8000/${user.image}`}/>
                                <li>{user.store_name}, {user.store_address}</li>
                            </>
                        )}
                        {user.workshop_name && (
                            <>
                                <img style={{width:'30px'}}src={`http://localhost:8000/${user.image}`}/>
                                <li>{user.workshop_name}, {user.workshop_address}</li>
                            </>
                        )}
                        </div>
                    </React.Fragment>
                    ))}
                </ul>
            </div>
        )}
        {serviceResults.length > 0 && (
            <div>
                <h3>Service Results:</h3>
                <ul>
                    {serviceResults.map((service) => (
                        <React.Fragment key={service._id}>
                            <div style={{ border: '1px black solid', width: '300px', marginLeft: '38%', height: '100px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <div>
                                    {service.images.length > 0 && (
                                        <img style={{ width: '50px', height: '50px' }} src={`http://localhost:8000/${service.images[0]}`} alt="Service Image" />
                                    )}
                                </div>
                                <div>
                                    <strong>{service.service_name}</strong>
                                </div>
                                <div>
                                    {service.mechanic && (
                                        <span>Workshop: {service.mechanic.workshop_name}</span>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        )}


        
        {(productResults.length === 0 && userResults.length === 0 && serviceResults.length === 0) && (
          <p>Nothing Found</p>
        )}
    </div>
  );
}
