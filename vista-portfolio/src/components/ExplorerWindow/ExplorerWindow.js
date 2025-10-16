import React from 'react';
import styles from './ExplorerWindow.module.css';
import yahooLogo from '../../assets/yahoo-logo-old.png';
import searchButton from '../../assets/search-button-xp.png';

const ExplorerWindow = () => {
    return (
        <div className={styles.explorer}>
            <div className={styles.menuBar}>
                <span><u>F</u>ile</span>
                <span><u>E</u>dit</span>
                <span><u>V</u>iew</span>
                <span><u>F</u>avorites</span>
                <span><u>T</u>ools</span>
                <span><u>H</u>elp</span>
            </div>
            <div className={styles.addressBar}>
                <span className={styles.addressLabel}>Address</span>
                <input type="text" value="http://search.yahoo.com/search?p=Tyler+Waite" readOnly />
            </div>
            <div className={styles.contentArea}>
                <div className={styles.searchHeader}>
                    <img src={yahooLogo} alt="Yahoo!" className={styles.yahooLogo} />
                    <div className={styles.searchBox}>
                        <input className={styles.searchInput} type="text" value="Tyler Waite" readOnly />
                        <img src={searchButton} alt="Search" className={styles.searchButton} />
                    </div>
                </div>
                <div className={styles.searchResults}>
                    <div className={styles.resultItem}>
                        <h3><a href="#">Tyler Waite - Fullstack Developer & AI Engineer</a></h3>
                        <p className={styles.resultBlurb}>
                            A results-driven Software Engineer based in San Francisco, with a Master's degree and specialized expertise in developing and deploying AI-powered applications. I possess a comprehensive skill set that spans the full software development lifecycle, from initial data analysis and machine learning model creation to full-stack implementation and deployment. My background in detail-oriented lab environments has equipped me with a strong systems-thinking mindset, ideal for building complex and scalable software.
                        </p>
                            <p className={styles.resultBlurb}>
                                <b>Key Competencies:</b>
                            </p>
                                <p className={styles.resultBlurb}>
                                </p><b>AI & Machine Learning:</b>  Development and implementation of large-scale analytical models, data analysis, and creating end-to-end AI solutions.
                                    <p className={styles.resultBlurb}>
                                    </p><b>Full-Stack Development:</b> Proficient in building and maintaining robust software applications for both industry and academic use cases.
                                        <p className={styles.resultBlurb}>
                                        </p><b>Systems Thinking:</b> Over 5 years of lab experience, fostering a meticulous and methodical approach to solving complex engineering challenges.
                                            <p className={styles.resultBlurb}>
                                            <b>Community Engagement:</b> Active contributor to open-source projects
                                            </p>
                        <div className={styles.contactInfo}>
                            <span><b>Email:</b> tyco711@gmail.com</span>
                            <span><b>Phone:</b> 415-636-1448</span>
                            <span><b>Website:</b> <a href="http://tylerwaite.com" target="_blank" rel="noopener noreferrer">tylerwaite.com</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorerWindow;