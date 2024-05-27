import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import loginImg from '../assets/loginCar.png'

export default function Register() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setData({ ...data, confirmPassword: newConfirmPassword });

        // Check if confirm password matches in real-time
        if (data.password !== newConfirmPassword) {
            toast.dismiss()
            toast.loading("Passwords not matching.");
        } else if (data.password == newConfirmPassword) {
            toast.remove();
            toast.success("Passwords matched.");
        }
    };

    const registerUser = async (e) => {
        e.preventDefault()
        const { name, phoneNumber, email, password, confirmPassword } = data

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const { data } = await axios.post('/register', {
                name, phoneNumber, email, password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Register Successful.')
                navigate('/login')
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

            <div className="right-container-signup">
                <form onSubmit={registerUser}>
                    <label>Name</label>
                    <input type='text' placeholder='Enter your full name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

                    <label>Phone Number</label>
                    <input type='number' placeholder='Enter your phone number' value={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} />

                    <label>Email</label>
                    <input type='email' placeholder='Enter your email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

                    <label>Password</label>
                    <input type='password' placeholder='Create a strong password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

                    <label>Confirm Password</label>
                    <input type='password' placeholder='Confirm your created password' value={data.confirmPassword} onChange={handleConfirmPasswordChange} />

                    <button type='submit' className="login-button">Register</button>
                </form>
            </div>

        </div>
    )
}
