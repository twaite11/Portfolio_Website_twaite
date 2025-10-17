import React from 'react';
import styles from './ClippyTaskbarIcon.module.css';
import clippy from '../../assets/clippy.png';

const ClippyTaskbarIcon = ({ onClick }) => {
    return (
        <div className={styles.iconWrapper} onClick={onClick} title="Open AI Assistant">
            <img src={clippy} alt="Clippy Icon" />
        </div>
    );
};

export default ClippyTaskbarIcon;