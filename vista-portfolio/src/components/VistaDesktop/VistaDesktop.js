// src/components/VistaDesktop/VistaDesktop.js
import React from 'react';
import styles from './VistaDesktop.module.css';
import wallpaper from '../../assets/vista-wallpaper.jpeg';
import startOrb from '../../assets/start-orb.png';

const VistaDesktop = () => {
    return (
        <div
            className={styles.desktop}
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className={styles.taskbar}>
                <img src={startOrb} alt="Start" className={styles.startOrb} />
                <div className={styles.clock}>
                    8:03 PM
                </div>
            </div>
        </div>
    );
};

export default VistaDesktop;