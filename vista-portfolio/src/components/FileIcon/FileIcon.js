import React from 'react';
import styles from './FileIcon.module.css';

const FileIcon = ({ icon, title, href, onDoubleClick }) => {
    const content = (
        <div className={styles.icon}>
            <img src={icon} alt={`${title} icon`} className={styles.iconImage} />
            <span className={styles.iconTitle}>{title}</span>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                {content}
            </a>
        );
    }

    return (
        <div className={styles.iconLink} onDoubleClick={onDoubleClick}>
            {content}
        </div>
    );
};

export default FileIcon;
