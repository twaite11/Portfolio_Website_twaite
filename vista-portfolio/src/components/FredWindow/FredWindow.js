import React from 'react';
import styles from './FredWindow.module.css';

import jetsonImage from './FredAssets/jetsonxav.jpeg';
import realsenseImage from './FredAssets/realsense.jpeg';
import speakerImage from './FredAssets/speakers.jpeg';
import screenImage from './FredAssets/screen.jpeg';
import wholeAssemblyImage from './FredAssets/whole_assembly.jpeg';
import wholeSystemImage from './FredAssets/wholesystem.jpeg';

const FredWindow = () => {
    return (
        <div className={styles.container}>
            <div className={styles.scrollableContent}>
                <h2>Project Overview: F.R.E.D.</h2>
                <p>
                    F.R.E.D. (Facial Recognition Entry Detection) is an intelligent, edge-based home security and greeting system. Think, Ring Doorbell Camera, but customized, self-built, subscription free, and meta-critically built around this sheep painting. It runs all AI processing locally on an NVIDIA Jetson Xavier NX for maximum performance and privacy.
                </p>

                <div className={styles.githubLink}>
                    <a href="https://github.com/twaite11/F.R.E.D-facial-recognition-entry-detection" target="_blank" rel="noopener noreferrer">
                        View Project on GitHub
                    </a>
                </div>

                <div className={styles.fullSystemImageContainer}>
                    <img src={wholeSystemImage} alt="F.R.E.D. Full System Assembly" />
                </div>
                <p>
                    The system uses the RealSense camera to monitor a video feed in real-time. It performs high-speed, GPU-accelerated face detection and recognition to identify individuals. It captures images and sends them to a private Discord server for real-time alerts.
                </p>

                <h3>Core Features:</h3>
                <ul>
                    <li><strong>GPU-Accelerated AI:</strong> Uses PyTorch and facenet-pytorch's MTCNN model to run face detection on the Jetson's GPU (cuda:0).</li>
                    <li><strong>Real-time Recognition:</strong> Identifies known users and greets them by name.</li>
                    <li><strong>Instant Discord Alerts:</strong> Sends an immediate push notification to a private Discord server with a snapshot, name, and timestamp.</li>
                    <li><strong>Autonomous Enrollment:</strong> Automatically starts a voice-based registration process for unknown users.</li>
                    <li><strong>Self-Updating AI:</strong> Re-trains its recognition model and restarts after any new face is registered.</li>
                </ul>

                <h2>Live Demo (12s)</h2>
                <div className={styles.videoWrapper}>

                    <iframe width="1840" height="1035" src="https://www.youtube.com/embed/f_BrAEtiaHw"
                            title="F.R.E.D (facial recognition entry detection)" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                </div>

                <h2>Technical Architecture</h2>

                <h3>Hardware Components</h3>
                <div className={styles.hardwareGrid}>
                    <div className={styles.hardwareItem}>
                        <img src={jetsonImage} alt="NVIDIA Jetson Xavier NX" />
                        <p>NVIDIA Jetson Xavier NX</p>
                    </div>
                    <div className={styles.hardwareItem}>
                        <img src={realsenseImage} alt="Intel RealSense D455" />
                        <p>Intel RealSense D455</p>
                    </div>
                    <div className={styles.hardwareItem}>
                        <img src={speakerImage} alt="USB Speaker" />
                        <p>USB Speaker</p>
                    </div>
                    <div className={styles.hardwareItem}>
                        <img src={screenImage} alt="7-inch HDMI Screen" />
                        <p>7" HDMI Screen</p>
                    </div>
                </div>

                <h3>Built From Scratch</h3>
                <div className={styles.buildSection}>
                    <img src={wholeAssemblyImage} alt="The whole F.R.E.D. assembly on a workbench" />
                    <div className={styles.buildText}>
                        <h4>Custom Hardware Integration</h4>
                        <p>
                            This wasn't just a software project. The entire hardware assembly was built from scratch,
                            involving custom mounts, wiring, and careful component selection to ensure everything
                            worked together in a compact, edge-computing form factor.
                        </p>
                    </div>
                </div>

                <h3>Core Software & Libraries</h3>
                <ul>
                    <li><strong>Environment:</strong> Python 3.8 (via venv)</li>
                    <li><strong>Core AI Framework:</strong> PyTorch (NVIDIA-built)</li>
                    <li><strong>GPU Face Detector:</strong> facenet-pytorch (MTCNN)</li>
                    <li><strong>Face Recognition:</strong> face_recognition</li>
                    <li><strong>Camera Interface:</strong> pyrealsense2</li>
                    <li><strong>Display:</strong> OpenCV</li>
                    <li><strong>Voice I/O:</strong> SpeechRecognition, gTTS & mpg123</li>
                    <li><strong>Alerts:</strong> requests (for Discord Webhooks)</li>
                </ul>

                <h3>The MTCNN Advantage (Performance)</h3>
                <p>
                    The face_recognition library's built-in CNN model is too slow for real-time use on a Jetson (1-2 FPS). By replacing only the detection step with a GPU-accelerated MTCNN model (CUDA-based), the AI workload is offloaded to the Jetson's GPU. This provides a 10x-30x speedup, enabling a fast, responsive framerate on the full video feed.
                </p>
            </div>
        </div>
    );
};

export default FredWindow;
