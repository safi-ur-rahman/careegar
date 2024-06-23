import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import '../css/preloader.css';
import '../css/3dConfigurator.css'
import modelImg from '../assets/wagonr.jpg'
import fortunerImg from '../assets/fortuner.jpg'
import s63Img from '../assets/s63.jpg'

export default function Configurator() {

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
    }, []); // Empty dependency array ensures the effect runs only once after the initial render


    return (
        <div>
            {loading ? (
                <div className="config-preloader-container">
                    <div className="config-preloader"></div>
                </div>
            ) : (
                <>
                    <h1 className="config-title">3D Configurator Page</h1>
                    <div className="config-cards-container">
                        <div className="config-select-card">
                            <Link to={`/configurator/${"wagonR"}`} className="config-card-link">
                                <div className="config-card-image">
                                    <img src={modelImg} alt="WagonR" />
                                </div>
                                <div className="config-card-info">
                                    <h2 className="config-card-title">WagonR</h2>
                                    <p className="config-card-description">This is a great car with amazing features and specifications.</p>
                                    <button className="config-card-button">Configure</button>
                                </div>
                            </Link>
                        </div>

                        {/* <div className="config-select-card">
                            <Link to={`/configurator/${"fortuner"}`} className="config-card-link">
                                <div className="config-card-image">
                                    <img src={fortunerImg} alt="Fortuner" />
                                </div>
                                <div className="config-card-info">
                                    <h2 className="config-card-title">Fortuner</h2>
                                    <p className="config-card-description">Experience the best performance and comfort with Fortuner.</p>
                                    <button className="config-card-button">Configure</button>
                                </div>
                            </Link>
                        </div> */}

                        <div className="config-select-card">
                            <Link to={`/configurator/${"s63"}`} className="config-card-link">
                                <div className="config-card-image">
                                    <img src={s63Img} alt="Mercedes S63" />
                                </div>
                                <div className="config-card-info">
                                    <h2 className="config-card-title">Mercedes S63</h2>
                                    <p className="config-card-description">Luxury and performance in one, the Mercedes S63 is unparalleled.</p>
                                    <button className="config-card-button">Configure</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
