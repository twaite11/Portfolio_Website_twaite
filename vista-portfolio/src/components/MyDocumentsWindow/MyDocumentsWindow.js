import React from 'react';
import styles from './MyDocumentsWindow.module.css';
import FileIcon from '../FileIcon/FileIcon';
import folderIcon from '../../assets/folder-icon-xp.png';
import fileIcon from '../../assets/file-icon.png';

const MyDocumentsWindow = ({ onOpenFile }) => {
    // The full project data is now managed in VistaDesktop.js
    // This component now just receives the handler to open a file.
    const projects = [
        { id: 'proj1', name: 'AI Powered Surf Prediction App' },
        { id: 'proj2', name: 'This Website!' },
        { id: 'proj3', name: 'E-commerce Website' },
        { id: 'proj4', name: 'Patent Pending: scRNA ML Pipeline' },
        { id: 'proj5', name: 'AI Computer Vision Security System' },
        { id: 'proj6', name: 'SpringBoot Backend App Builds' },
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
                        key={project.id}
                        title={project.name}
                        icon={fileIcon}
                        onDoubleClick={() => onOpenFile(project.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyDocumentsWindow;
