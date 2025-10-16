import React from 'react';
import styles from './FileIcon.module.css';

const FileIcon = ({ icon, title, href }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <div className={styles.icon}>
                <img src={icon} alt={`${title} icon`} className={styles.iconImage} />
                <span className={styles.iconTitle}>{title}</span>
            </div>
        </a>
    );
};

export default FileIcon;