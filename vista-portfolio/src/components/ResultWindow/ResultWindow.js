import React, { useState } from 'react';
import styles from './ResultWindow.module.css';

const ResultWindow = ({ imageUrl }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleDownload = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'ai-masterpiece.png';
        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.resultContainer}>
            <div className={styles.resultHeader}>
                <h3>AI Masterpiece</h3>
                <button onClick={handleDownload} className={styles.downloadButton}>
                    Download
                </button>
            </div>
            <img
                src={imageUrl}
                alt="AI generated art"
                className={`${styles.resultImage} ${isImageLoaded ? styles.loaded : ''}`}
                onLoad={() => setIsImageLoaded(true)} // Triggers the fade-in effect
            />
        </div>
    );
};

export default ResultWindow;
