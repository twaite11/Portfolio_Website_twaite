import React, { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styles from './AIPaintWindow.module.css';

/**
 * Helper function to convert a Base64 data URL into a Blob.
 * This is more memory-efficient for rendering in the browser.
 */
const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

const AIPaintWindow = () => {
    const canvasRef = useRef(null);
    const [prompt, setPrompt] = useState('');
    // State for the new "Doodle Strength" slider
    const [controlStrength, setControlStrength] = useState(0.75);
    // This state will hold the temporary blob URL for the image
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // State to manage the fade-in effect for the loaded image
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    // State to manage the visibility of the instructions pop-up
    const [showInstructions, setShowInstructions] = useState(true);

    /**
     * Effect to clean up the temporary Object URL to prevent memory leaks.
     * This runs when the component unmounts or when a new imageUrl is created.
     */
    useEffect(() => {
        // This is the cleanup function
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]); // Dependency array ensures this runs when imageUrl changes

    /**
     * Handles the AI image generation process.
     */
    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a prompt!');
            return;
        }
        setIsLoading(true);
        setError(null);

        // Clean up previous image URL if it exists
        if (imageUrl) URL.revokeObjectURL(imageUrl);
        setImageUrl(null);
        setIsImageLoaded(false);

        try {
            // 1. Export the doodle from the canvas as a Base64 data URL
            const doodleImage = await canvasRef.current.exportImage('png');

            // 2. Send all data to our secure backend API function
            const response = await fetch('/api/generateImage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: doodleImage,
                    prompt,
                    controlStrength // Send the new strength value
                }),
            });

            if (!response.ok) {
                // Try to parse the error message from the backend
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.details || 'Failed to generate image from server.');
            }

            // 3. Get the generated image back from our API
            const data = await response.json();
            const fullDataUrl = `data:image/png;base64,${data.image}`;

            // 4. Convert to a Blob and create a temporary Object URL for efficient rendering
            const imageBlob = dataURLtoBlob(fullDataUrl);
            const objectUrl = URL.createObjectURL(imageBlob);
            setImageUrl(objectUrl);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Clears the drawing canvas.
     */
    const handleClear = () => {
        canvasRef.current.clearCanvas();
    };

    /**
     * The instructional pop-up component.
     * You should update the text here to explain the new API and slider.
     */
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
                <p>This is my modernized take on a timeless classic: <strong>MS Paint</strong>. In my opinion, the timeless simplicity of MS Paint is a quiet monument to good, clean programming. I have taken a small snapshot of the original and did what no one asked for... or probably wanted... Anyway, the instructions are below please enjoy!</p>
                <p>Here's how it works:</p>
                <ol>
                    <li><strong>Draw a Doodle:</strong> Use the canvas to draw a simple shape or outline.</li>
                    <li><strong>Write a Prompt:</strong> Describe what you want the AI to create.</li>
                    <li><strong>Set Doodle Strength:</strong> Use the slider! A high value (e.g., 0.9) forces the AI to follow your lines closely. A low value (e.g., 0.4) gives the AI more creative freedom.</li>
                    <li><strong>How it Works:</strong> Your doodle, prompt, and strength setting are sent to a secure backend function, which uses the Stability AI API & it's sketch feature to generate your new image.</li>
                </ol>
                <button onClick={() => setShowInstructions(false)}>Got it, let's paint!</button>
            </div>
        </div>
    );

    return (
        <div className={styles.paintContainer}>
            {/* Render the pop-up if showInstructions is true */}
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

            {/* The new "Doodle Strength" slider */}
            <div className={styles.sliderContainer}>
                <label>Doodle Strength: {controlStrength}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={controlStrength}
                    onChange={(e) => setControlStrength(parseFloat(e.target.value))}
                    className={styles.slider}
                />
            </div>

            {/* The drawing canvas */}
            <div className={styles.canvasArea}>
                <ReactSketchCanvas
                    ref={canvasRef}
                    className={styles.canvas}
                    strokeWidth={4}
                    strokeColor="black"
                    canvasColor="white"
                />
            </div>

            {/* Feedback messages */}
            {error && <div className={styles.error}>{error}</div>}
            {isLoading && <div className={styles.loading}>Generating your masterpiece... ✨</div>}

            {/* The generated image result area */}
            {imageUrl && (
                <div className={styles.resultArea}>
                    <h3>AI Masterpiece:</h3>
                    <img
                        src={imageUrl}
                        alt="AI generated art"
                        // Apply fade-in effect once the image is loaded
                        className={`${styles.resultImage} ${isImageLoaded ? styles.loaded : ''}`}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            )}
        </div>
    );
};

export default AIPaintWindow;
