import React from 'react';
import styles from './DesktopIcon.module.css';

const DesktopIcon = ({ icon, title, onDoubleClick }) => {
    return (
        <div className={styles.icon} onDoubleClick={onDoubleClick}>
            <img src={icon} alt={`${title} icon`} className={styles.iconImage} />
            <span className={styles.iconTitle}>{title}</span>
        </div>
    );
};

export default DesktopIcon;
