import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import axios from 'axios';

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { mobile, password });
            if(res && res.data.success){
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/about');
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form-container">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputEmail" className="form-label">Email</label> */}
                        <input
                            type="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="form-control"
                            id="exampleInputMobile"
                            placeholder="Enter Your Mobile"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            LOGIN
                        </button>
                    </div>
                    <div className='mb-3'>
                    {/* <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>
                        FORGOT PASSWORD
                    </button> */}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { navigate('/register') }}>
                        DON'T HAVE ACCOUNT REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
