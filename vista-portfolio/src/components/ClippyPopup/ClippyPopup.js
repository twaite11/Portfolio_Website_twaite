import React, { useState, useEffect, useRef } from 'react';
import styles from './ClippyPopup.module.css';
import clippy from '../../assets/clippy.png';

const ClippyPopup = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: " Hi, I'm Clippy, the nostalgic paperclip reimagined as an AI assistant. For information on where to start, click on the Bindows button in the bottom left corner. Feel free to ask me questions, or select one below", sender: 'ai' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPreloaded, setShowPreloaded] = useState(true);
    const messagesEndRef = useRef(null);

    const preloadedQuestions = [
        "What are Tyler's key skills?",
        "Tell me about his experience.",
        "What are his hobbies?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const getAiResponse = async (query) => {
        setIsLoading(true);
        setShowPreloaded(false);

        try {
            const systemPrompt = `
                You are Clippy, a friendly, nostalgic, and super goofy AI assistant on Tyler Waite's portfolio website.
                Your personality is cheerful and encouraging.
                You MUST answer questions based ONLY on the following information about Tyler Waite.
                Do not make up any information. If a question is outside of this scope, politely say you can only answer questions about Tyler's professional life.

                **Tyler Waite's Information:**
                - **Location:** San Francisco
                - **Profession:** Fullstack Software Developer & AI Engineer.
                - **Education:** Master of Science (MS) in Software Engineering with an Emphasis on AI Engineering.
                - **Experience:** Full-stack software development, AI infrastructure/implementation, and data analysis. Has developed software in both industry and academic settings. Experienced with creating large ML analytical models. Spent over 5 years in a lab setting, which made him very detail-oriented and a systems thinker.
                - **Key Competencies:** AI & Machine Learning, Full-Stack Development, Systems Thinking, Community Engagement (contributes to open-source projects).
                - **Hobbies:** Surfing, running, spearfishing, building robots, contributing to open-source projects.
                - **Contact:** Email: tyco711@gmail.com, Phone: 415-636-1448, Website: tylerwaite.com.
                - **Projects:**
                    1.  **AI Powered Surf Prediction App:** A web app using ML to predict surf conditions.
                    2.  **This Website!:** A retro Windows-themed portfolio.
                    3.  **E-commerce Website:** A platform for a coffee brand.
                    4.  **Patent Pending: scRNA ML Pipeline:** A novel ML pipeline for analyzing single-cell RNA sequencing data.
                    5.  **AI Computer Vision Security System:** A home security system using computer vision.
                    6.  **SpringBoot Backend Apps:** Various backend services for things like hotel bookings.
                -**Skills:**
                    - **Programming Languages:** Python, Java, JavaScript, C++, SQL, HTML, CSS, Swift, React, TypeScript and more.
                    - **AI Development:** Machine Learning, Deep Learning, NLP, Computer Vision, Data Analysis, Data Visualization, and more.
                    - **Systems Thinking:** Designing and implementing complex systems.
                    - **Community Engagement:** Contributing to open-source projects and organizing events.
                    - **Leadership:** Managing teams and projects, leading meetings, and mentoring junior developers.
                    - **Teamwork:** Collaborating with cross-functional teams to deliver high-quality software.
                    - **Problem-Solving:** Solving complex problems and finding innovative solutions.
                    - **Communication:** Effective communication skills for team collaboration and project management.
                    - **Time Management:** Organizing and prioritizing tasks effectively.
                    - **Adaptability:** Adapting to new technologies and environments.
                    - **Creativity:** Innovative problem-solving and creative thinking.
            `;

            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: query }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048,
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                ],
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error Response:", errorData);
                throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const result = await response.json();

            if (!result.candidates || result.candidates.length === 0) {
                console.warn("API Warning: Response was blocked or empty. Check safety settings.", result);
                setMessages(prev => [...prev, { id: Date.now(), text: "I'm not sure how to answer that. Could you try rephrasing your question?", sender: 'ai' }]);
            } else {
                const aiText = result.candidates[0].content.parts[0].text;
                setMessages(prev => [...prev, { id: Date.now(), text: aiText, sender: 'ai' }]);
            }
        } catch (error) {
            console.error("Error calling AI API:", error);
            setMessages(prev => [...prev, { id: Date.now(), text: "Oops! My circuits are a bit tangled. Please try again.", sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages = [...messages, { id: Date.now(), text: userInput, sender: 'user' }];
        setMessages(newMessages);
        getAiResponse(userInput);
        setUserInput('');
    };

    const handlePreloadedClick = (question) => {
        if (isLoading) return;

        const newMessages = [...messages, { id: Date.now(), text: question, sender: 'user' }];
        setMessages(newMessages);
        getAiResponse(question);
    };

    return (
        <div className={styles.clippyContainer}>
            <div className={styles.speechBubble}>
                <div className={styles.chatHeader}>
                    <span>Clippy AI Assistant</span>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.chatWindow}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>{msg.text}</div>
                    ))}
                    {isLoading && (
                        <div className={`${styles.message} ${styles.ai}`}><div className={styles.loadingDots}><span>.</span><span>.</span><span>.</span></div></div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {showPreloaded && (
                    <div className={styles.preloadedQuestions}>
                        {preloadedQuestions.map(q => <button key={q} onClick={() => handlePreloadedClick(q)}>{q}</button>)}
                    </div>
                )}

                <form className={styles.chatInputForm} onSubmit={handleSendMessage}>
                    <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Ask about Tyler..." disabled={isLoading} />
                    <button type="submit" disabled={isLoading}>Send</button>
                </form>
            </div>
            <img src={clippy} alt="Clippy" className={styles.clippyImage} />
        </div>
    );
};

export default ClippyPopup;