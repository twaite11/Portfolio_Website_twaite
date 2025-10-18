import React, { useMemo, useCallback, useRef } from 'react';
import styles from './DesktopIcon.module.css';

const DesktopIcon = ({ icon, title, onDoubleClick }) => {
    const isTouchCapable = useMemo(() => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }, []);

    // Prevent double firing from synthetic mouse after touch on some browsers
    const lastPointerTypeRef = useRef(null);

    const handlePointerUp = useCallback((e) => {
        lastPointerTypeRef.current = e.pointerType || (isTouchCapable ? 'touch' : 'mouse');
        if (!onDoubleClick) return;
        // For touch/pen, trigger action on single tap
        if (lastPointerTypeRef.current !== 'mouse') {
            e.preventDefault?.();
            onDoubleClick();
        }
        // For mouse, keep desktop double-click behavior via onDoubleClick prop
    }, [onDoubleClick, isTouchCapable]);

    const handleKeyDown = useCallback((e) => {
        if (!onDoubleClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDoubleClick();
        }
    }, [onDoubleClick]);

    return (
        <div
            className={styles.icon}
            onDoubleClick={onDoubleClick}
            onPointerUp={handlePointerUp}
            role="button"
            tabIndex={0}
            aria-label={title}
            onKeyDown={handleKeyDown}
        >
            <img src={icon} alt={`${title} icon`} className={styles.iconImage} />
            <span className={styles.iconTitle}>{title}</span>
        </div>
    );
};

export default DesktopIcon;
