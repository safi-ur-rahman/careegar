import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import '../css/marketplace.css';

const SupplierProducts = () => {
    const { supplierId } = useParams();  // Get the supplier ID from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [storeInfo, setStoreInfo] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log(supplierId);
                const supplierResponse = await axios.get(`/getSupplierInfo?supplierId=${supplierId}`);
                setStoreInfo(supplierResponse.data[0]);

                console.log(storeInfo)
                const response = await axios.get(`/getSupplierproducts?supplierId=${supplierId}`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching supplier's products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [supplierId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="head-store">
                <h1>Welcome to {storeInfo.store_name}</h1>
                <div className="store-info">
                    <div className="store-image">
                        <img src={`http://localhost:8000/${storeInfo.image}`} alt={storeInfo.store_name} />
                    </div>
                    <div className="store-label">
                        <h2 className="store-name">{storeInfo.store_name}</h2>
                        <p className="store-address">{storeInfo.store_address}</p>
                    </div>

                </div>
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


        </>
    );
}

export default SupplierProducts;
