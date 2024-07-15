import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import axios from 'axios';

const Register = () => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMobile(localStorage.getItem('mob'));
            const res = await axios.post(`http://localhost:8080/api/v1/auth/register/initiate`, { mobile, password, confirmPassword });
            if(res && res.data.success){
                navigate('/validate');
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
                    <h4 className="title">REGISTER FORM</h4>

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
                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword2"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            REGISTER
                        </button>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { navigate('/') }}>
                        HAVE ACCOUNT LOGIN
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register