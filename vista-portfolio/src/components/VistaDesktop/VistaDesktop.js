import React, { useState, useEffect } from 'react';
import styles from './VistaDesktop.module.css';
import wallpaper from '../../assets/vista-wallpaper.jpeg';
import startOrb from '../../assets/start-orb.png';
import cmdIcon from '../../assets/cmd-icon.png';
import myComputerIcon from '../../assets/my-computer-icon.png';
import tetrisIcon from '../../assets/tetris-icon.png';
import explorerIcon from '../../assets/explorer-icon.png';
import myDocumentsIcon from '../../assets/my-documents-icon.png';

// Import all components
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import WindowFrame from '../WindowFrame/WindowFrame';
import TerminalResume from '../TerminalResume/TerminalResume';
import MyComputerWindow from '../MyComputerWindow/MyComputerWindow';
import TetrisWindow from '../Tetris/TetrisWindow';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import ExplorerWindow from '../ExplorerWindow/ExplorerWindow';
import MyDocumentsWindow from '../MyDocumentsWindow/MyDocumentsWindow';
import ClippyPopup from '../ClippyPopup/ClippyPopup';

const VistaDesktop = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isMyComputerOpen, setIsMyComputerOpen] = useState(false);
    const [isTetrisOpen, setIsTetrisOpen] = useState(false);
    const [isWelcomeBannerOpen, setIsWelcomeBannerOpen] = useState(false);
    const [isExplorerOpen, setIsExplorerOpen] = useState(false);
    const [isMyDocumentsOpen, setIsMyDocumentsOpen] = useState(false);
    const [showClippy, setShowClippy] = useState(false); // State for Clippy

    useEffect(() => {
        const timerId = setInterval(() => setCurrentDateTime(new Date()), 1000);

        // Timer to make Clippy appear after a delay
        const clippyTimer = setTimeout(() => {
            setShowClippy(true);
        }, 2000); // Show Clippy after 2 seconds

        return () => {
            clearInterval(timerId);
            clearTimeout(clippyTimer);
        };
    }, []);

    return (
        <div
            className={styles.desktop}
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className={styles.desktopIcons}>
                <DesktopIcon
                    title="My Resume"
                    icon={cmdIcon}
                    onDoubleClick={() => setIsResumeOpen(true)}
                />
                <DesktopIcon
                    title="My Links"
                    icon={myComputerIcon}
                    onDoubleClick={() => setIsMyComputerOpen(true)}
                />
                <DesktopIcon
                    title="Search- About Me"
                    icon={explorerIcon}
                    onDoubleClick={() => setIsExplorerOpen(true)}
                />
                <DesktopIcon
                    title="My Projects"
                    icon={myDocumentsIcon}
                    onDoubleClick={() => setIsMyDocumentsOpen(true)}
                />
                <DesktopIcon
                    title="My Games"
                    icon={tetrisIcon}
                    onDoubleClick={() => setIsTetrisOpen(true)}
                />
            </div>

            {isResumeOpen && (
                <WindowFrame title="C:\BINDOWS\system32\cmd.exe" onClose={() => setIsResumeOpen(false)}>
                    <TerminalResume />
                </WindowFrame>
            )}

            {isMyComputerOpen && (
                <WindowFrame title="My Computer" onClose={() => setIsMyComputerOpen(false)}>
                    <MyComputerWindow />
                </WindowFrame>
            )}

            {isExplorerOpen && (
                <WindowFrame
                    title="Tyler Waite - Yahoo! Search - Wicrosoft Internet Explorer"
                    onClose={() => setIsExplorerOpen(false)}
                    width={750}
                    height={550}
                >
                    <ExplorerWindow />
                </WindowFrame>
            )}

            {isMyDocumentsOpen && (
                <WindowFrame
                    title="My Projects"
                    onClose={() => setIsMyDocumentsOpen(false)}
                    width={700}
                    height={500}
                >
                    <MyDocumentsWindow />
                </WindowFrame>
            )}

            {isTetrisOpen && (
                <WindowFrame
                    title="Tetris"
                    onClose={() => setIsTetrisOpen(false)}
                    width={440}
                    height={480}
                >
                    <TetrisWindow />
                </WindowFrame>
            )}

            {isWelcomeBannerOpen && <WelcomeBanner onClose={() => setIsWelcomeBannerOpen(false)} />}

            {showClippy && <ClippyPopup onClose={() => setShowClippy(false)} />}

            <div className={styles.taskbar}>
                <img
                    src={startOrb}
                    alt="Start"
                    className={styles.startOrb}
                    onClick={() => setIsWelcomeBannerOpen(prev => !prev)}
                />
                <div className={styles.clock}>
                    <span>{currentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                    <span>{currentDateTime.toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default VistaDesktop;