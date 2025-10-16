import React from 'react';
import styles from './Tetris.module.css';
import Cell from './Cell';

const Stage = ({ stage }) => (
    <div className={styles.stage}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
);

export default Stage;