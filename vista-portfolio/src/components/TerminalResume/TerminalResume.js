import React, { useState, useEffect, useRef } from 'react';
import styles from './TerminalResume.module.css';

const TerminalResume = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isCommandEntered, setIsCommandEntered] = useState(false);
    const inputRef = useRef(null);

    const resumeText = `

Tyler Waite - AI & Software Engineer

EXPERIENCE
----------
Metagenomi, Emeryville, CA - Senior Research Associate (Feb2022-Feb2025)
    
- Designed deep-learning analysis pipeline using Python, Scanpy, and Tensorflow
- Implemented GCNs to model spatial relationships and cell-cell interactions 
- Managed cloud infrastructure development in AWS
- Feature development for in house analytics platform

Genentech, San Francisco, CA -  Researcher II (Feb2021-Feb2022)
    
- Built a bioinformatics pipeline (Python) for multivariate feature analysis  
- Implemented GCNs to model spatial relationships and cell-cell interactions 
- Piloted Spatial Transcriptomics technology 

Unity Biotechnology, San Francisco, CA -  Researcher I and II (Sep2019-Feb2021)
    
- Visiopharm Deep Learning Software Beta Tester  
- Fine-tuned application protocol packages via iterative training and correction 
- Trained Neural network models for retina image detection and classification  

EDUCATION
---------
Western Governors University (WGU): Master of Science(MS) in AI Engineering

Western Governors University (WGU): Bachelors of Science(BS) in Software Engineering

SKILLS
------
Python, TensorFlow, PyTorch, Scikit-learn, Machine Learning Algorithms, Deep Learning, 
Natural Language Processing (NLP), Computer Vision, Data Structures, Algorithms, SQL, Git, 
Docker, Kubernetes, Cloud Computing (AWS, GCP, or Azure), MLOps, Data Preprocessing, 
Model Deployment, REST APIs, Linear Algebra, and Statistics.

  `;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const command = input.trim().toLowerCase();
        const newOutput = [...output, { type: 'command', text: `C:\\Users\\Guest> ${input}` }];

        if (command === 'type resume.txt') { // Changed command
            newOutput.push({ type: 'response', text: resumeText });
            setIsCommandEntered(true);
        } else {
            newOutput.push({ type: 'error', text: `'${input}' is not recognized as an internal or external command. Please try again.` });
        }

        setOutput(newOutput);
        setInput('');
    };

    return (
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            <div className={styles.initialText}>
                Wicrosoft Bindows [Version 6.0.6002]
                <br />
                Copyright (c) 2006 Wicrosoft Corporation. All rights reserved.
                <br />
                <br />
                Hint: Try typing 'type resume.txt' and press Enter. {/* Changed hint */}
            </div>
            {output.map((line, index) => (
                <div key={index} className={styles[line.type]}>
                    {line.text}
                </div>
            ))}
            {!isCommandEntered && (
                <form onSubmit={handleFormSubmit} className={styles.inputLine}>
                    <span>C:\Users\Guest&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        className={styles.input}
                        autoFocus
                    />
                </form>
            )}
        </div>
    );
};

export default TerminalResume;

