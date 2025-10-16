import React, { useState, useEffect, useRef } from 'react';
import styles from './TerminalResume.module.css';

const TerminalResume = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isCommandEntered, setIsCommandEntered] = useState(false);
    const inputRef = useRef(null);

    const resumeText = `
Michael Scott - Regional Manager

SUMMARY
-------
Great boss. Best boss. The World's Best Boss, in fact. 
I have been the regional manager of the Dunder Mifflin Scranton branch for years. 
I am a great leader and a great friend.

EXPERIENCE
----------
Dunder Mifflin, Scranton, PA - Regional Manager
- Increased sales by... a lot.
- Created a fun and productive work environment.
- Won multiple Dundie awards.

EDUCATION
---------
School of Hard Knocks

SKILLS
------
- Management
- Sales
- Motivation
- Comedy
- Magic
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

