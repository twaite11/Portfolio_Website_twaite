import React from 'react';
import styles from './MyDocumentsWindow.module.css';
import FileIcon from '../FileIcon/FileIcon'; // We'll reuse this component
import folderIcon from '../../assets/folder-icon-xp.png';
import fileIcon from '../../assets/file-icon.png';

const MyDocumentsWindow = () => {
    // TODO: Replace with your actual project names and URLs
    const projects = [
        { name: 'Project Alpha', href: '#' },
        { name: 'AI Chatbot', href: '#' },
        { name: 'E-commerce Platform', href: '#' },
        { name: 'Data Visualization Tool', href: '#' },
        { name: 'Robotics Control System', href: '#' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.treePane}>
                <ul className={styles.directoryTree}>
                    <li><img src={folderIcon} alt="folder" /> My Computer</li>
                    <li className={styles.selected}><img src={folderIcon} alt="folder" /> My Projects</li>
                    <ul>
                        <li><img src={folderIcon} alt="folder" /> secret_folder</li>
                    </ul>
                </ul>
            </div>
            <div className={styles.filePane}>
                {projects.map(project => (
                    <FileIcon
                        key={project.name}
                        title={project.name}
                        icon={fileIcon}
                        href={project.href}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyDocumentsWindow;