import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { SearchContext } from "../../context/searchContext"
import '../css/header.css'

export default function Header() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const { searchValue, updateSearchValue } = useContext(SearchContext);

    const handleSearchChange = (event) => {
        updateSearchValue(event.target.value);
    };

    function logout() {
        fetch('http://localhost:8000/logout', {
            credentials: 'include',
            method: 'POST'
        }).then(() => {
            navigate("/");
            window.location.reload();
        })
    }

    return (
    <div>
        <div className="header">
        <Link to="/"><h1>Careegar</h1></Link>

            <input 
                className="search-bar" 
                type="text" 
                placeholder="Search for Products or Services" 
                onClick={() => navigate("/search")}
                onChange={handleSearchChange}
            />

            <div className="login-buttons">
                {user && (
                    <>
                        <Link to="/">Home</Link>
                        {user.userType === 'carOwner' && (
                            <>    
                                <Link to="/bookingsPage">Bookings</Link>
                            </>
                        )}
                        {user.userType === 'supplier' && (
                            <>    
                                <Link to="/supplierStore">My Store</Link>
                            </>
                        )}
                        {user.userType === 'mechanic' && (
                            <>
                                <Link to="/mechanicWorkshop">My Workshop</Link>
                            </>
                        )}
                        {user.userType === 'customizer' && (
                            <>
                                <Link to="/customizerWorkshop">My Workshop</Link>
                            </>
                        )}
                        <Link to="/3dConfigurator">3D Configurator</Link>
                        <Link to="/marketplace">Market</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/profile">{user.name}</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login">LogIn</Link>
                        <Link to="/register">SignUp</Link>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}