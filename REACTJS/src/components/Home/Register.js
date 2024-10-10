import React, { useState } from 'react';
import { registerUser } from '../../services/UserServices'; // Đường dẫn đến file chứa API services của em
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset lỗi
        setEmailError('');
        setPasswordError('');
        setFirstNameError('');
        setLastNameError('');
        setErrorMessage('');

        let valid = true;

        // Kiểm tra email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email.');
            valid = false;
        }

        // Kiểm tra password
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            valid = false;
        }

        // Kiểm tra firstName
        if (firstName.trim() === '') {
            setFirstNameError('First name cannot be empty.');
            valid = false;
        }

        // Kiểm tra lastName
        if (lastName.trim() === '') {
            setLastNameError('Last name cannot be empty.');
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await registerUser(email, firstName, lastName, password);
            if (response.status === 200 || response.status === 201) {
                alert('Registration successful!');
                navigate('/logins');
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed. Email may already be in use.');
        }
    };


    return (
        <div className="register-container">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-5 col-sm-12 mt-5">
                        <div className="row">
                            <p className="fs-2 fw-bold">Register</p>
                        </div>
                        <div className="row border p-2 rounded-1 mb-5">
                            <form onSubmit={handleRegister} className="row needs-validation" noValidate>
                                <div className="row mt-3">
                                    <label htmlFor="validationCustomEmail" className="form-label fw-bolder">Email</label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control inputdn ${emailError ? 'is-invalid' : ''}`}
                                            id="validationCustomEmail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Email"
                                            required
                                        />
                                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="validationCustomFirstName" className="form-label fw-bolder">First Name</label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="text"
                                            name="firstName"
                                            className={`form-control inputdn ${firstNameError ? 'is-invalid' : ''}`}
                                            id="validationCustomFirstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Enter First Name"
                                            required
                                        />
                                        {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <label htmlFor="validationCustomLastName" className="form-label fw-bolder">Last Name</label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="text"
                                            name="lastName"
                                            className={`form-control inputdn ${lastNameError ? 'is-invalid' : ''}`}
                                            id="validationCustomLastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Enter Last Name"
                                            required
                                        />
                                        {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
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
                                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                    </div>
                                </div>

                                <div className="col-12 text-center">
                                    <button type="submit" className="btnlogin mt-3 mb-3 text-center">Signup</button>
                                </div>
                            </form>


                            <div className="row mt-4 mb-4 loginsocial">
                                <div className="col-6">
                                    <span className="fontchulogin fw-bold">
                                        <i className="fa-brands fa-facebook text-primary"></i>&emsp;&emsp; Signup With Facebook
                                    </span>
                                </div>
                                <div className="col-6">
                                    <span className="fontchulogin fw-bold">
                                        <i className="fa-brands fa-google text-secondary"></i>&emsp;&emsp; Signup With Google
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
                                <a href="/register" className="text-decoration-none text-white fw-bold">CREATE AN ACCOUNT</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
