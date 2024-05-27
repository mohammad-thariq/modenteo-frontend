import React, { useState } from 'react';
import '../../styles/goback.css'; 
import { IonIcon } from '@ionic/react';
import { arrowUpOutline } from 'ionicons/icons';
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    window.addEventListener('scroll', toggleVisibility);
    return (
        <div>
            {isVisible && 
                <button className="scroll-to-top-btn" onClick={scrollToTop}>
                    <IonIcon icon={arrowUpOutline} />
                </button>
            }
        </div>
    );
};

export default ScrollToTopButton;
