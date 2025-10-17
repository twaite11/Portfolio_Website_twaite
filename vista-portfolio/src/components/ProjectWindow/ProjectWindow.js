import React from 'react';
import styles from './ProjectWindow.module.css';
import folderIcon from '../../assets/folder-icon-xp.png';

const ProjectWindow = ({ project }) => {
    if (!project) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={folderIcon} alt="Project Icon" />
                <h1>{project.name}</h1>
            </div>
            <div className={styles.content}>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.stack}>
                    <strong>Tech Stack:</strong>
                    <span>{project.stack.join(', ')}</span>
                    <img src={project.image} alt={project.name} />
                </div>
            </div>
            <div className={styles.footer}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                    Visit Project
                </a>
            </div>
        </div>
    );
};

export default ProjectWindow;

