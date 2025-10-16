// src/components/MonitorFrame/MonitorFrame.js
import React from 'react';
import styles from './MonitorFrame.module.css';
import VistaDesktop from '../VistaDesktop/VistaDesktop'; // We will create this next

const MonitorFrame = () => {
    return (
        <div className={styles.monitorContainer}>
            <div className={styles.monitorBezel}>
                <div className={styles.monitorScreen}>
                    {/* The Vista Desktop will be rendered here */}
                    <VistaDesktop />
                </div>
            </div>
        </div>
    );
};

export default MonitorFrame;