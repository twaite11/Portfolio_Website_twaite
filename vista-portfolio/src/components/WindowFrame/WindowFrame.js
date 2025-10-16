import React, { useState, useEffect, useRef } from 'react';
import styles from './WindowFrame.module.css';
import xpIcon from '../../assets/xp-icon.png';

const WindowFrame = ({ title, children, onClose, width = 640, height = 480 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (windowRef.current && windowRef.current.parentElement) {
            const parent = windowRef.current.parentElement;
            const parentWidth = parent.offsetWidth;
            const parentHeight = parent.offsetHeight;

            setPosition({
                x: parentWidth / 2 - width / 2,
                y: parentHeight / 2 - height / 2,
            });
        }
    }, [width, height]);


    const handleMouseDown = (e) => {
        if (e.target.classList.contains(styles.controlButton) || e.target.classList.contains(styles.closeButton)) {
            return;
        }

        if (!windowRef.current) return;
        setIsDragging(true);

        const offset = {
            x: e.clientX - windowRef.current.offsetLeft,
            y: e.clientY - windowRef.current.offsetTop,
        };
        offsetRef.current = offset;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !windowRef.current) return;
        e.preventDefault();
        const newPos = {
            x: e.clientX - offsetRef.current.x,
            y: e.clientY - offsetRef.current.y,
        };
        setPosition(newPos);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    return (
        <div
            ref={windowRef}
            className={styles.window}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <div className={styles.titleBar} onMouseDown={handleMouseDown}>
                <div className={styles.titleBarText}>
                    <img src={xpIcon} alt="" className={styles.titleBarIcon} />
                    <span>{title}</span>
                </div>
                <div className={styles.titleBarControls}>
                    <button className={styles.controlButton}>_</button>
                    <button className={styles.controlButton}>☐</button>
                    <button className={`${styles.controlButton} ${styles.closeButton}`} onClick={onClose}>
                        X
                    </button>
                </div>
            </div>
            <div className={styles.windowBody}>
                {children}
            </div>
        </div>
    );
};

export default WindowFrame;