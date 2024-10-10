import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Biến trạng thái cho biết đang kiểm tra xác thực hay không
    const navigate = useNavigate();

    const checkAuth = () => {
        const session = sessionStorage.getItem('user');
        console.log('Session storage:', session); // Kiểm tra dữ liệu session
        const userIsAuthenticated = session ? true : false;
        setIsLoggedIn(userIsAuthenticated);
        setIsCheckingAuth(false); 
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        console.log('isLoggedIn:', isLoggedIn); // Kiểm tra trạng thái đăng nhập
        if (!isLoggedIn && !isCheckingAuth) {
            navigate('/logins');
        }
    }, [isLoggedIn, isCheckingAuth, navigate]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    // Nếu người dùng đã đăng nhập, hiển thị nội dung trang chủ
    return (
       
        <product />
       
    );
};

export default Home;
