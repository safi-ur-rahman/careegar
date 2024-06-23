import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/marketplace.css';
import { UserContext } from "../../context/userContext"

const MarketPlace = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/getProducts');
                setProducts(response.data);
                await new Promise(resolve => setTimeout(resolve, 1500));
                setLoading(false);

            } catch (error) {
                console.error("Error fetching products data:", error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <div className="marketHeader">
                <h1>Welcome to largest autoparts Market</h1>

            </div>
            <div className="marketplace">
                {products.map((product) => (
                    <div className="card-market" key={product._id}>
                        <Link to={`/productinformation/${product._id}`}>
                            <img className="card-market-image" src={`http://localhost:8000/${product.images[0]}`} alt={product.product_name} />
                            <div className="card-market-content">
                                <div className="info">
                                    <h3 className="card-market-title">{product.product_name}</h3>
                                    <p className="card-market-description">{product.product_description}</p>
                                </div>
                                <div className="infoButton">
                                    <button>Show details</button>
                                </div>


                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MarketPlace;
