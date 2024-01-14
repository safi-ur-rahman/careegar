import { useContext, Suspense, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import '../css/preloader.css';
import Fortuner from '../3d Models/fortuner'
import WagonR from '../3d Models/wagonR'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


export default function Home() {

    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an asynchronous operation (e.g., fetching user data)
        const fetchData = async () => {
            try {
                // Perform any asynchronous operation here (e.g., fetching user data)
                // For demonstration purposes, let's use a setTimeout to simulate an API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

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
                    <h1>Home</h1>
                    <Canvas style={{ width: '100%', height: '100vh' }}
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
                </>
            )}
        </div>
    )
}
