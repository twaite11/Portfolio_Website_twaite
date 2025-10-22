import React, { useState, useEffect } from 'react';
import styles from './VistaDesktop.module.css';
import wallpaper from '../../assets/vista-wallpaper.jpeg';
import startOrb from '../../assets/start-orb.png';
import cmdIcon from '../../assets/cmd-icon.png';
import myComputerIcon from '../../assets/my-computer-icon.png';
import tetrisIcon from '../../assets/tetris-icon.png';
import explorerIcon from '../../assets/explorer-icon.png';
import myDocumentsIcon from '../../assets/my-documents-icon.png';
import kookpyDemo from '../../assets/kookpy_demo.JPG';
import dcaf from '../../assets/dcaf.JPG';
import java from '../../assets/java.JPG';
import scRNAseq from '../../assets/scRNAseq.png';
import website from '../../assets/website.JPG';
import pihole from '../../assets/pihole.JPG';
import kookpyLogo from '../../assets/kookpy_demo.png';
import paintIcon from '../../assets/paint-icon.png';

// Import all components
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import WindowFrame from '../WindowFrame/WindowFrame';
import TerminalResume from '../TerminalResume/TerminalResume';
import MyComputerWindow from '../MyComputerWindow/MyComputerWindow';
import TetrisWindow from '../Tetris/TetrisWindow';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import ExplorerWindow from '../ExplorerWindow/ExplorerWindow';
import MyDocumentsWindow from '../MyDocumentsWindow/MyDocumentsWindow';
import ProjectWindow from '../ProjectWindow/ProjectWindow';
import ClippyPopup from '../ClippyPopup/ClippyPopup';
import ClippyTaskbarIcon from '../ClippyTaskbarIcon/ClippyTaskbarIcon';
import StreamlitAppWindow from '../StreamlitAppWindow/StreamlitAppWindow';
import AIPaintWindow from '../AIPaintWindow/AIPaintWindow';


const projectData = {
    proj1: { id: 'proj1', name: 'AI Powered Surf Prediction App', href: 'https://kookpy.streamlit.app/', description: 'This web application generates a predictive surf quality score using a unique machine learning model. It trains a Convolutional Neural Network (CNN) on a library of manually labeled wave images, captured at specific beaches with recorded times and dates. This visual analysis is then mapped via a fusion layer with corresponding weather data, pulled from an API for the exact same time and location. This meteorological data is processed by a Multi-Layer Perceptron (MLP), allowing the model to provide surfers with a comprehensive and accurate forecast.', stack: ['Python', 'Heroku', 'Scikit-learn', 'pandas', 'XGBoost', 'ResNet', 'Tensorflow'], image: kookpyDemo},
    proj2: { id: 'proj2', name: 'This Website!', href: 'https://github.com/twaite11/Portfolio_Website_twaite', description: 'A retro-themed portfolio website built with React, designed to emulate the look and feel of the Windows XP/Vista operating systems. All components are custom-styled to be interactive and nostalgic.', stack: ['React', 'CSS Modules', 'JavaScript'], image: website },
    proj3: { id: 'proj3', name: 'E-commerce Website', href: 'https://www.dcaffeinate.com/', description: 'A fully functional e-commerce platform for a coffee brand, featuring product listings, a shopping cart, and a secure checkout process. Built with a focus on user experience and responsive design.', stack: ['Shopify', 'Liquid', 'HTML5', 'CSS3'], image:dcaf },
    proj4: { id: 'proj4', name: 'AWS-Deployed scRNA-seq Pipeline', href: 'https://patents.google.com/patent/WO2025097031A1/en?oq=WO2025097031A1', description: 'Developed a containerized bioinformatics pipeline on AWS to support a patent filing for a novel cell therapy drug. The pipeline leverages Salmon, Scanpy, and the scDLC deep learning tool to identify potential protein receptors from single-cell data, with interactive visualization provided by Cellxgene.', stack: ['Python', 'scDLC', 'scanpy', 'scikit-learn', 'squidpy', 'pandas'], image: scRNAseq },
    proj5: { id: 'proj5', name: 'AI Computer Vision Security System', href: 'https://github.com/twaite11/home_security_bot', description: 'An intelligent home security system that uses computer vision to detect visitors and guests. Using an Intel RealSense D455 camera, it detects when a person walks through the door and processes the feed on its powerful NVIDIA Jetson Xavier board. A facial recognition script determines the individual\'s identity. The underlying AI model is trained in TensorFlow, employing a Siamese Network architecture to effectively learn unique facial features from images. If the person is found in its NVMe-stored database, the robot greets them with a personalized message via its integrated speaker. If unrecognized, it uses its speaker and microphone to interactively prompt for registration, capturing new images to create a profile.', stack: ['Python', 'OpenCV', 'TensorFlow', 'NVIDIA Jetson Xavier', 'Intel RealSense SDK'] },
    proj6: { id: 'proj6', name: 'Several SpringBoot Backend App Builds', href: 'https://github.com/twaite11/hotel_booking_app_landon', description: 'A collection of robust backend applications built with the SpringBoot framework. These projects include RESTful APIs for services like hotel bookings, user management, and data processing, showcasing strong Java backend skills.', stack: ['Java', 'Spring Boot', 'Maven', 'PostgreSQL', 'REST APIs'], image: java },
    proj7: { id: 'proj7', name: 'Project: Pi-hole DHCP Ad-Blocking Network', href: 'https://github.com/twaite11/hotel_booking_app_landon', description: 'This project involved creating a robust, always-on ad and tracker blocking solution for an entire home network. Using a Raspberry Pi Zero 2 W running Pi-hole, I aimed to filter content at the network level for all connected devices.\n' +
            '\n' +
            'A significant hurdle emerged when I discovered the router\'s firmware restricted any changes to its DNS settings. To overcome this, I pivoted from the standard DNS setup to a more advanced DHCP configuration. This involved carefully disabling the router\'s own DHCP server and enabling the one on the Pi-hole. This strategy successfully forced every device on the network to request its IP address from the Pi-hole, thereby inheriting its DNS settings automatically and ensuring complete ad-blocking coverage.', stack: ['Bash', 'Pi-OS', 'pi-hole', 'lighttpd', 'DHCP'], image: pihole },
};

const VistaDesktop = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isMyComputerOpen, setIsMyComputerOpen] = useState(false);
    const [isTetrisOpen, setIsTetrisOpen] = useState(false);
    const [isWelcomeBannerOpen, setIsWelcomeBannerOpen] = useState(false);
    const [isExplorerOpen, setIsExplorerOpen] = useState(false);
    const [isMyDocumentsOpen, setIsMyDocumentsOpen] = useState(false);
    const [isClippyOpen, setIsClippyOpen] = useState(false);
    const [isSurfAppOpen, setIsSurfAppOpen] = useState(false);
    const [openProjects, setOpenProjects] = useState([]);
    const [isPaintOpen, setIsPaintOpen] = useState(false);
    const [resultImageUrl, setResultImageUrl] = useState(null);

    // Mobile detection and sizing for Resume window
    const [isMobile, setIsMobile] = useState(false);
    const [mobileResumeSize, setMobileResumeSize] = useState({ width: 320, height: 220 });
    // Mobile full-screen sizing for apps like Tetris
    const [mobileFullSize, setMobileFullSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const timerId = setInterval(() => setCurrentDateTime(new Date()), 1000);

        const clippyTimer = setTimeout(() => {
            setIsClippyOpen(true);
        }, 2000);

        return () => {
            clearInterval(timerId);
            clearTimeout(clippyTimer);
        };
    }, []);

    // Track viewport size to decide mobile layout and compute compact resume window size
    useEffect(() => {
        const compute = () => {
            const w = window.innerWidth || document.documentElement.clientWidth;
            const h = window.innerHeight || document.documentElement.clientHeight;
            const mobile = w <= 768;
            setIsMobile(mobile);
            if (mobile) {
                const padding = 16; // keep away from edges within monitor frame
                const taskbarHeight = 40; // matches taskbar css
                const maxWidth = Math.min(340, Math.max(240, w - padding * 2));
                const maxHeight = Math.min(240, Math.max(160, h - taskbarHeight - padding * 2));
                setMobileResumeSize({ width: Math.round(maxWidth), height: Math.round(maxHeight) });

                // Full-screen-ish sizing for immersive apps (e.g., Tetris)
                const fullWidth = Math.max(240, w - padding * 2);
                const fullHeight = Math.max(200, h - taskbarHeight - padding * 2);
                setMobileFullSize({ width: Math.round(fullWidth), height: Math.round(fullHeight) });
            }
        };
        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    const handleOpenProject = (projectId) => {
        if (!openProjects.find(p => p.id === projectId)) {
            const project = projectData[projectId];
            setOpenProjects(prev => [...prev, project]);
        }
    };

    const handleImageGenerated = (imageUrl) => {
        setResultImageUrl(imageUrl);
    };

    const handleCloseResultWindow = () => {
        if (resultImageUrl) {
            URL.revokeObjectURL(resultImageUrl);
        }
        setResultImageUrl(null);
    };

    const handleCloseProject = (projectId) => {
        setOpenProjects(prev => prev.filter(p => p.id !== projectId));
    };

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
                <DesktopIcon
                    title="KookpyAI.exe"
                    icon={kookpyLogo}
                    onDoubleClick={() => setIsSurfAppOpen(true)}
                />
                <DesktopIcon
                    title="MSpaint.exe"
                    icon={paintIcon}
                    onDoubleClick={() => setIsPaintOpen(true)}
                />
            </div>

            {isResumeOpen && (
                <WindowFrame
                    title="C:\\BINDOWS\\system32\\cmd.exe"
                    onClose={() => setIsResumeOpen(false)}
                    width={isMobile ? mobileResumeSize.width : 640}
                    height={isMobile ? mobileResumeSize.height : 480}
                >
                    <TerminalResume />
                </WindowFrame>
            )}

            {isMyComputerOpen && (
                <WindowFrame
                    title="My Computer"
                    onClose={() => setIsMyComputerOpen(false)}
                    width={isMobile ? mobileResumeSize.width : 640}
                    height={isMobile ? mobileResumeSize.height : 480}
                >
                    <MyComputerWindow />
                </WindowFrame>
            )}

            {isExplorerOpen && (
                <WindowFrame
                    title="Tyler Waite - Yahoo! Search - Wicrosoft Internet Explorer"
                    onClose={() => setIsExplorerOpen(false)}
                    width={isMobile ? mobileResumeSize.width : 750}
                    height={isMobile ? mobileResumeSize.height : 550}
                >
                    <ExplorerWindow />
                </WindowFrame>
            )}

            {isMyDocumentsOpen && (
                <WindowFrame
                    title="My Projects"
                    onClose={() => setIsMyDocumentsOpen(false)}
                    width={isMobile ? mobileResumeSize.width : 700}
                    height={isMobile ? mobileResumeSize.height : 500}
                >
                    <MyDocumentsWindow onOpenFile={handleOpenProject} />
                </WindowFrame>
            )}

            {openProjects.map(project => (
                <WindowFrame
                    key={project.id}
                    title={project.name}
                    onClose={() => handleCloseProject(project.id)}
                    width={isMobile ? Math.round(mobileFullSize.width * 0.95) : 550}
                    height={isMobile ? Math.round(mobileFullSize.height * 0.95) : 400}
                >
                    <ProjectWindow project={project} />
                </WindowFrame>
            ))}

            {isTetrisOpen && (
                <WindowFrame
                    title="Tetris"
                    onClose={() => setIsTetrisOpen(false)}
                    width={isMobile ? Math.round(mobileFullSize.width * 0.83) : 440}
                    height={isMobile ? Math.round(mobileFullSize.height * 0.83) : 480}
                >
                    <TetrisWindow />
                </WindowFrame>
            )}

            {isSurfAppOpen && (
                <WindowFrame
                    title="Kookpy Surf AI"
                    onClose={() => setIsSurfAppOpen(false)}
                    width={isMobile ? Math.round(mobileFullSize.width * 0.95) : 900}
                    height={isMobile ? Math.round(mobileFullSize.height * 0.95) : 600}
                >
                    <StreamlitAppWindow />
                </WindowFrame>
            )}

            {isPaintOpen && (
                <WindowFrame
                    title="AI Paint"
                    onClose={() => setIsPaintOpen(false)}
                    width={isMobile ? Math.round(mobileFullSize.width * 0.95) : 900}
                    height={isMobile ? Math.round(mobileFullSize.height * 0.95) : 600}

                >
                    <AIPaintWindow onImageGenerated={handleImageGenerated} />
                </WindowFrame>
            )}

            {isWelcomeBannerOpen && <WelcomeBanner onClose={() => setIsWelcomeBannerOpen(false)} />}

            {isClippyOpen && <ClippyPopup onClose={() => setIsClippyOpen(false)} />}

            <div className={styles.taskbar}>
                <img
                    src={startOrb}
                    alt="Start"
                    className={styles.startOrb}
                    onClick={() => setIsWelcomeBannerOpen(prev => !prev)}
                />
                <div className={styles.taskbarRight}>
                    <ClippyTaskbarIcon onClick={() => setIsClippyOpen(true)} />
                    <div className={styles.clock}>
                        <span>{currentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                        <span>{currentDateTime.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VistaDesktop;