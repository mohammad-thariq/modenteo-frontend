import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Social } from '../../common';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            toast.success('Password reset link sent to your email', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            toast.error('Please enter your email', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div className="main-login">
            <ToastContainer />
            <div className="signin-page">
                <div className="inner-login">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="left-login-content">
                                <div className=""><Link className="items-center justify-center" to="/"><center>                                        <img src="/assets/images/logo3.png" alt="Logo" />
                                </center></Link></div>
                                <div className="signin-content">
                                    <h3>Welcome Back!</h3>
                                    <p>To keep connected with us please login</p>
                                    <Link to="/login" className="btn btn-primary text-white">Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="register-form-outer">
                                <h3>Forget Password</h3>
                                <div className="other-logins">
                                    <ul className="d-flex">
                                        <Social />
                                    </ul>
                                </div>
                                <div className="login-form">
                                    <input type="hidden" name="_token" value="HoqOKXu4SkMcnwyX16NXvTqWq60dVBze22fCqNIC" autoComplete="off" />
                                    <div className="form-group search" style={{ marginTop: '20px' }}>
                                        <i className="fa fa-envelope"></i>
                                        <input type="email" className="form-control" id="mail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    </div>
                                    <button type="button" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
