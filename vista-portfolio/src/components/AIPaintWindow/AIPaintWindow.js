import React, { useState, useRef } from 'react';
import styles from './AIPaintWindow.module.css';
import {ReactSketchCanvas} from "react-sketch-canvas";

const AIPaintWindow = () => {
    const canvasRef = useRef(null);
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a prompt!');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            // Get the doodle as a Base64 encoded PNG
            const doodleImage = await canvasRef.current.exportImage('png');

            // Send the doodle and prompt to our backend API
            const response = await fetch('/api/generateImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: doodleImage, prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate image from the server.');
            }

            const data = await response.json();
            setGeneratedImage(`data:image/png;base64,${data.image}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        // CHANGED: The clear method has a new name
        canvasRef.current.clearCanvas();
    };

    const InstructionsPopup = () => (
        <div className={styles.instructionsOverlay}>
            <div className={styles.instructionsPopup}>
                <button
                    onClick={() => setShowInstructions(false)}
                    className={styles.popupCloseButton}
                >
                    X
                </button>
                <h3>Welcome to AI Paint!</h3>
                <p>This is my modernized take on a timeless classic: MS Paint. In my opinion, the timeless simplicity of MS Paint is a quiet monument to good, clean programming. I have taken a small snapshot of the original and did what no one asked for... or probably wanted. But.. here we are. Anyway, the instructions are below please enjoy!</p>
                <p>Here's how it works:</p>
                <ol>
                    <li><strong>Draw a Doodle:</strong> Use the canvas to draw a simple shape or outline. This becomes the structural guide for the AI.</li>
                    <li><strong>Write a Prompt:</strong> Describe what you want the AI to create. The more descriptive, the better! This is the stylistic guide.</li>
                    <li><strong>Secure Backend Logic:</strong> When you click "Use AI Brush," your "doodle" and "prompt" are sent from the browser to a secure backend function.</li>
                    <li><strong>The AI's Turn:</strong> The backend uses the Stability AI model. It performs an "Image-to-Image" task, using your doodle as a starting point and your prompt as the creative direction to generate a brand new, detailed image.</li>
                </ol>
                <button onClick={() => setShowInstructions(false)}>Got it, let's paint!</button>
            </div>
        </div>
    );

    return (
        <div className={styles.paintContainer}>
            {showInstructions && <InstructionsPopup />}

            <div className={styles.controls}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A photorealistic cat, 4k"
                    className={styles.promptInput}
                />
                <button onClick={handleGenerate} disabled={isLoading} className={styles.aiButton}>
                    {isLoading ? 'Painting...' : 'Use AI Brush'}
                </button>
                <button onClick={handleClear} className={styles.clearButton}>
                    Clear
                </button>
            </div>

            <div className={styles.canvasArea}>
                {/* CHANGED: Swapped the component and updated styles */}
                <ReactSketchCanvas
                    ref={canvasRef}
                    className={styles.canvas}
                    strokeWidth={4}
                    strokeColor="black"
                    canvasColor="white"
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {isLoading && <div className={styles.loading}>Generating your masterpiece... ✨</div>}
            {generatedImage && (
                <div className={styles.resultArea}>
                    <h3>AI Masterpiece:</h3>
                    <img src={generatedImage} alt="AI generated art" className={styles.resultImage}/>
                </div>
            )}
        </div>
    );
};

export default AIPaintWindow;