import React from 'react';
import styles from './ClippyPopup.module.css';
import clippy from '../../assets/clippy.png';

const ClippyPopup = ({ onClose }) => {
    return (
        <div className={styles.clippyContainer}>
            <div className={styles.speechBubble}>
                <p>
                    It looks like you're visiting this portfolio! Press the <b>Bindows</b> button in the bottom-left corner for info on this website to begin.
                </p>
                <button onClick={onClose}>Got it!</button>
            </div>
            <img src={clippy} alt="Clippy" className={styles.clippyImage} />
        </div>
    );
};

export default ClippyPopup;