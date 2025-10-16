import React, { useState, useEffect } from 'react';
import styles from './MonitorFrame.module.css';
import VistaDesktop from '../VistaDesktop/VistaDesktop';

const MonitorFrame = () => {
    const [isPoweredOn, setIsPoweredOn] = useState(false);

    useEffect(() => {
        // This timer will now be shorter to match the new animation speed.
        const bootTimer = setTimeout(() => {
            setIsPoweredOn(true);
        }, 6800); // 6.8 seconds

        return () => clearTimeout(bootTimer);
    }, []);

    return (
        <div className={styles.monitorContainer}>
            <div className={styles.monitorAssembly}>
                <div className={styles.monitorBezel}>
                    <div className={styles.monitorScreen}>
                        {isPoweredOn ? (
                            <VistaDesktop />
                        ) : (
                            <div className={styles.powerOffScreen}>
                                <div className={styles.glare}></div>
                                <div className={styles.bootTextContainer}>
                                    <p className={styles.typewriter1}>Initializing Wicrosoft Bindows...</p>
                                    <p className={styles.typewriter2}>Memory Check: 64MB OK</p>
                                    <p className={styles.typewriter3}>Loading kernel...</p>
                                    <p className={styles.typewriter4}>Booting from C:\</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.monitorStand}></div>
            </div>
        </div>
    );
};

export default MonitorFrame;