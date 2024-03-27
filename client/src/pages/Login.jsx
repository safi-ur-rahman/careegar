import { useState } from "react"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import '../css/login.css'
import loginImg from '../assets/loginCar.png'

export default function Login() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const { data } = await axios.post('/login', {
                email,
                password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({});
                navigate('/')
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="left-container">
                <div className="imgLogin">
                    <img src={loginImg}></img>
                </div>
                <div className="loginTxt">
                    <h1>Careegar</h1>
                    <p>Driven by Enthusiasm: Your Gateway to the World of Cars.</p>
                </div>
            </div>

            <div className="right-container">
                <form onSubmit={loginUser}>

                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />



                    <label>Password</label>
                    <input type='password' placeholder='Enter your password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />



                    <button type='submit' className="login-button">LogIn</button>
                </form>
            </div>
        </div>
    )
}
