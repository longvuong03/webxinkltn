import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const MainLayout = ({ children, isLoggedIn, userInfo, handleLogout }) => {
  
  return (
    
    <>
      <Header isLoggedIn={isLoggedIn} userInfo={userInfo} handleLogout={handleLogout} />
      <div className="main-layout">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
