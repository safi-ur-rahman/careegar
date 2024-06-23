import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import axios from 'axios'
import '../css/preloader.css';
import '../css/productCard.css';
import { toast } from 'react-hot-toast'
import editSVG from '../assets/edit.svg'
import deleteSVG from '../assets/trash.svg'
import ProductModal from "../components/productModal";


export default function SupplierStore() {

    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [prodModal, setprodModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setproductToEdit] = useState({});
    //console.log(user.id)
    useEffect(() => {
        // Fetch products when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Make a request to your server to get the products for a specific supplier
            const response = await axios.get('/storeProducts');
            setProducts(response.data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setLoading(false);

        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    const DeleteProduct = async (productId) => {
        try {
           
            await axios.delete(`/deleteProduct/${productId}`); // Corrected endpoint with productId in the URL
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );
            toast.success('Product deleted successfully.'); // Toast notification for success
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product.'); // Toast notification for failure
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
        setprodModal(false);
    };


    return (
        <div>
            {loading ? (
                // Display preloader while loading
                <div className="preloader-container">
                    {/* Add your preloader animation here */}
                    <div className="preloader"></div>
                </div>
            ) : (
                <>
                    <h1 style={{ color: 'black', fontSize: '44px' }}>Store Page</h1>
                    <button onClick={() => { setprodModal(true); setproductToEdit(null) }}>Add Product</button>
                </>
            )}
            {prodModal && (
                // Render your modal component here
                <ProductModal 
                    isOpen={prodModal} 
                    onClose={() => setprodModal(false)} 
                    productToEdit={productToEdit}
                    onProductAdded={handleProductAdded} />
            )}

            <div className="products-grid">
                <h1 style={{ color: 'white', fontSize: '44px' }}>Products</h1>
                <ul className="grid">
                    {products.map((product) => (
                        <li key={product._id} className="grid-item">
                            <div className="product-card">

                                <div>
                                    {product.images.map((image, index) => (
                                        <React.Fragment key={index}>
                                            <img style={{ width: '30px' }} src={`http://localhost:8000/${image}`} />
                                        </React.Fragment>
                                    ))}
                                </div>

                                <p>Product Name: {product.product_name}</p>
                                <p>Description: {product.product_description}</p>
                                <p>Quantity: {product.product_quantity}</p>
                                <p>Price: {product.product_price}</p>
                                <div className="prod-icons">
                                    <img src={editSVG} onClick={() => { setproductToEdit(product); setprodModal(true) }} alt="Edit Logo" />
                                    <img src={deleteSVG} onClick={() => { DeleteProduct(product._id) }} />

                                </div>
                                {/* Additional product details can be added here */}
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}