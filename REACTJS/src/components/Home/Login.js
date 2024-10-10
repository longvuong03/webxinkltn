import React, { useState } from 'react';
import { logins } from '../../services/UserServices';
import '../../asset/css/styledn.css';
import { useNavigate } from "react-router-dom";
import Header from '../Common/Header';

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Thêm state cho thông báo lỗi
    const [emailError, setEmailError] = useState(''); // Thêm state cho lỗi email
    const [passwordError, setPasswordError] = useState(''); // Thêm state cho lỗi password
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Kiểm tra định dạng email bằng regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset lỗi tổng quan
        setEmailError(''); // Reset lỗi email
        setPasswordError(''); // Reset lỗi password

        // Kiểm tra tính hợp lệ của email và password
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email.');
            valid = false;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            valid = false;
        }

        // Nếu email và password không hợp lệ thì không gửi yêu cầu login
        if (!valid) return;

        try {
            let res = await logins(email, password);
            if (res && res.id && res.first_name) {
                console.log('Login successful', res);
                sessionStorage.setItem('user', JSON.stringify({
                    id: res.id,
                    email: res.email,
                    first_name: res.first_name,
                    last_name: res.last_name,
                }));
                handleLogin(res);
            } else {
                setErrorMessage('Wrong username or password!'); // Thông báo lỗi
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setErrorMessage('Login failed! Please try again later.'); // Thông báo lỗi từ server
        }
    };

    const handleClickRegis = () => {
      navigate(`/register`);
    };

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-5 col-sm-12 mt-5">
                        <div className="row">
                            <p className="fs-2 fw-bold">LOGIN</p>
                        </div>
                        <div className="row border p-2 rounded-1 mb-5">
                            <form onSubmit={handleLoginSubmit} className="row needs-validation" noValidate>
                                <div className="row mt-3">
                                    <label htmlFor="validationCustomUsername" className="form-label fw-bolder">Username (Email)</label>
                                    <div className="input-group has-validation">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className={`form-control inputdn ${emailError ? 'is-invalid' : ''}`} 
                                            id="validationCustomUsername" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder="Enter Email" 
                                            required 
                                        />
                                        {/* Hiển thị thông báo lỗi email */}
                                        {emailError && (
                                            <div className="invalid-feedback">
                                                {emailError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <label htmlFor="validationCustomPassword" className="form-label fw-bolder">Password</label>
                                    <div className="input-group has-validation">
                                        <input 
                                            type="password" 
                                            name="password" 
                                            className={`form-control inputdn ${passwordError ? 'is-invalid' : ''}`} 
                                            id="validationCustomPassword" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            placeholder="Enter Password" 
                                            required 
                                        />
                                        {/* Hiển thị thông báo lỗi password */}
                                        {passwordError && (
                                            <div className="invalid-feedback">
                                                {passwordError}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Hiển thị thông báo lỗi chung */}
                                {errorMessage && (
                                    <div className="row mt-3">
                                        <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                        </div>
                                    </div>
                                )}

                                <div className="col-12 text-center">
                                    <button type="submit" className="btnlogin mt-3 mb-3">Login</button>
                                </div>
                            </form>
                            <div className="row mt-4 mb-4 loginsocial">
                                <div className="col-6">
                                    <span className="fontchulogin fw-bold">
                                    <i className="fa-brands fa-facebook text-primary"></i>&emsp;&emsp; Login With Facebook
                                    </span>
                                </div>
                                <div className="col-6">
                                    <span className="fontchulogin fw-bold">
                                    <i className="fa-brands fa-google text-secondary"></i>&emsp;&emsp; Login With Google
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-12 mt-5 mx-auto">
                        <div className="row">
                            <p className="fs-3 fw-bold">NEW CUSTOMER</p>
                        </div>
                        <div className="row mt-3">
                            <p className="fw-bold">CREATE AN ACCOUNT</p>
                            <p className="text-secondary mt-3">
                                Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.
                            </p>
                            <button className="btnsignup">
                                <a onClick={handleClickRegis} className="text-decoration-none text-white fw-bold">CREATE AN ACCOUNT</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
