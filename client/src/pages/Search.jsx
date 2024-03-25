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

  const searchProducts = () => {
    axios.get(`/api/products?search=${searchValue}`)
      .then((response) => {
        setProductResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching products:", error);
      });
  };

  const searchUser = () => {
    axios.get(`/searchUsers?search=${searchValue}`)
      .then((response) => {
        setUserResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
      });
  };

  console.log(userResults);

  return (
    <div>
      <button onClick={searchProducts}>Products</button>
      <button onClick={searchUser}>Mechanic and Customizer</button>

    

        <div>
            <h3>User Results:</h3>
            <ul>
                {userResults.map((user) => (
                <React.Fragment style={{textAlign:'center'}} key={user.user_id}>
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
    </div>
  );
}
