import React, { useState } from 'react';
import styles from './Tetris.module.css';

// Helpers
import { createStage, checkCollision } from './gameHelpers';

// Custom Hooks
import { useInterval } from './useInterval';
import { usePlayer } from './usePlayer';
import { useStage } from './useStage';
import { useGameStatus } from './useGameStatus';

// Components
import Stage from './Stage';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) { // Left
                movePlayer(-1);
            } else if (keyCode === 39) { // Right
                movePlayer(1);
            } else if (keyCode === 40) { // Down
                dropPlayer();
            } else if (keyCode === 38) { // Up (Rotate)
                playerRotate(stage, 1);
            }
        }
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div
            className={styles.tetrisWrapper}
            role="button"
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            <div className={styles.tetris}>
                <Stage stage={stage} />
                <aside className={styles.sidebar}>
                    {gameOver ? (
                        <div className={styles.display}>Game Over</div>
                    ) : (
                        <div>
                            <div className={styles.display}>Score: {score}</div>
                            <div className={styles.display}>Rows: {rows}</div>
                            <div className={styles.display}>Level: {level}</div>
                        </div>
                    )}
                    <button className={styles.startButton} onClick={startGame}>Start Game</button>

                    {/* Controls positioned directly under Start Game button */}
                    <div className={styles.controlsBar} aria-label="Move controls">
                        <button
                            type="button"
                            className={styles.controlBtn}
                            aria-label="Move left"
                            title="Move left"
                            onPointerUp={() => movePlayer(-1)}
                        >
                            &lt;
                        </button>
                        <button
                            type="button"
                            className={styles.controlBtn}
                            aria-label="Move right"
                            title="Move right"
                            onPointerUp={() => movePlayer(1)}
                        >
                            &gt;
                        </button>
                    </div>
                </aside>
            </div>

        </div>
    );
};

export default Tetris;