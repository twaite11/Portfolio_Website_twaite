import React from 'react';
import styles from './WelcomeBanner.module.css';
import infoIcon from '../../assets/info-icon.png';

const WelcomeBanner = ({ onClose }) => {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerContent}>
                <div className={styles.header}>
                    <img src={infoIcon} alt="Info" className={styles.icon} />
                    <span className={styles.title}>Welcome to my Portfolio!</span>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.body}>
                    <p>
                        My love for computers started on Windows XP. I have many fond memories of this OS and its role in my childhood. I feel so fortunate to have a career centered around the same technology that has meant so much to me.
                    </p>
                    <p>
                        <b>How it works:</b> This site is a tribute to that era. You can open applications by double-clicking the icons on the desktop. Feel free to drag the windows around and explore!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;