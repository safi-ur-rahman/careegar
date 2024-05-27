import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext"
import '../css/preloader.css';

export default function CustomizerWorkshop() {

    const {user} = useContext(UserContext)
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
    }, []); // Empty dependency array ensures the effect runs only once after the initial render


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
                    <h1>Customizer Workshop Page</h1>            
                </>
            )}
        </div>
    )
}
