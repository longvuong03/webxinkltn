import React, { useState, useEffect } from 'react';
import '../../asset/css/Scrolltotop.css'; // Tạo file CSS nếu cần

const Scrolltotop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showButton && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    <i class="fa-solid fa-up-long"></i>
                </button>
            )}
        </>
    );
};

export default Scrolltotop;
