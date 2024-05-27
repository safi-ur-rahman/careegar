import { useContext, Suspense, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import '../css/preloader.css';
import '../css/productCard.css';
import '../css/home.css';
import Fortuner from '../3d Models/fortuner'
import WagonR from '../3d Models/wagonR'
import introImg from '../assets/home-intro.jpg'
import axios from 'axios'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


export default function Home() {

    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching user data)
        const fetchData = async () => {
            try {
                const response = await axios.get('/getProducts');
                setProducts(response.data);

                await new Promise(resolve => setTimeout(resolve, 1500));
                setLoading(false);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="home-container">
            {loading ? (
                // Display preloader while loading
                <div className="preloader-container">
                    {/* Add your preloader animation here */}
                    <div className="preloader"></div>
                </div>
            ) : (
                <>


                    <div className="intro-container">
                        <div className="intro-container-heading">
                            <h1>Welcome to Careegar!</h1>
                        </div>
                        <div className="intro-container-main">
                            <div className="intro-container-left">
                                <span>One Stop Shop for any Car, anywhere.</span>
                                <p>
                                    Explore the future of car shopping with our online marketplace.
                                    Immerse yourself in a personalized experience using our cutting-edge
                                    3D configurator, bringing your dream car to life right from your screen.
                                    Your journey to automotive excellence starts here
                                </p>
                                <button className="intro-container-left-btn">Get Started</button>
                            </div>
                            <div className="intro-container-right">
                                <img src={introImg}></img>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div className="intro-container-heading">
                            <h1 style={{color:'black'}}>3D Configurator</h1>
                        </div>
                        <div className="intro-container-main">
                            <div className="intro-container-right">
                                <Canvas style={{ width: '100%', height: '90vh' }}
                                    camera={{ position: [10, 10, 15] }}
                                    gl={{ antialias: true }}
                                    pixelRatio={window.devicePixelRatio} >
                                    <Suspense fallback={null}>
                                        <ambientLight />
                                        <directionalLight color="white" intensity={5} position={[10, 10, 5]} />
                                        <WagonR />
                                        <OrbitControls />
                                    </Suspense>
                                </Canvas>
                            </div>
                            <div className="intro-container-left-config">
                            <span>Customize any vehicle in 3D</span>
                                <p>
                                    Explore the future of car shopping with our online marketplace.
                                    Immerse yourself in a personalized experience using our cutting-edge
                                    3D configurator, bringing your dream car to life right from your screen.
                                    Your journey to automotive excellence starts here.
                                </p>

                            </div>


                        </div>
                    </div>


                    <div className="products-grid">
                        <h1>MarketPlace</h1>
                        <ul className="grid">
                            {products.map((product) => (
                                <li key={product._id} className="grid-item">
                                    <div className="product-card">
                                        <p>Product Name: {product.product_name}</p>
                                        <p>Description: {product.product_description}</p>                            
                                        <p>Price: {product.product_price}</p>
                                        <p>Available: In Stock</p>
                                        {/* Additional product details can be added here */}
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>


                </>
            )}
        </div>
    )
}
