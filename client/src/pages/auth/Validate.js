import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Validate = () => {
    const [otp, setOtp] = useState("");
    const [mobile, setMobile] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMobile(localStorage.getItem('mob'));
            const res = await axios.post('http://localhost:8080/api/v1/auth/register/verify', {mobile, otp});
            if(res && res.data.success){
                navigate('/login');
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
                    <h4 className="title">VALIDATE NUMBER</h4>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputEmail" className="form-label">Email</label> */}
                        <input
                            type="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-control"
                            id="exampleInputMobile"
                            placeholder="Enter Your OTP"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            VERIFY
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { navigate('/register') }}>
                        REGISTER AGAIN
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Validate
