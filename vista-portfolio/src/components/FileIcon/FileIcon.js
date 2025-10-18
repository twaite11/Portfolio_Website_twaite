import React, { useMemo, useRef, useCallback } from 'react';
import styles from './FileIcon.module.css';

const FileIcon = ({ icon, title, href, onDoubleClick }) => {
    const isTouchCapable = useMemo(() => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }, []);

    const lastPointerTypeRef = useRef(null);

    const openLink = useCallback(() => {
        if (!href) return;
        // Open explicitly to avoid accidental delayed click navigation on mobile
        window.open(href, '_blank', 'noopener,noreferrer');
    }, [href]);

    const handlePointerUp = useCallback((e) => {
        lastPointerTypeRef.current = e.pointerType || (isTouchCapable ? 'touch' : 'mouse');
        const isMouse = lastPointerTypeRef.current === 'mouse';
        if (!isMouse) {
            // Touch/pen: single-tap behavior
            if (href) {
                e.preventDefault?.();
                e.stopPropagation?.();
                openLink();
            } else if (onDoubleClick) {
                e.preventDefault?.();
                e.stopPropagation?.();
                onDoubleClick();
            }
        }
        // For mouse users, keep desktop double-click behavior via onDoubleClick prop
    }, [href, isTouchCapable, openLink, onDoubleClick]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (href) {
                openLink();
            } else if (onDoubleClick) {
                onDoubleClick();
            }
        }
    }, [href, onDoubleClick, openLink]);

    const content = (
        <div className={styles.icon}>
            <img src={icon} alt={`${title} icon`} className={styles.iconImage} />
            <span className={styles.iconTitle}>{title}</span>
        </div>
    );

    if (href) {
        return (
            <div
                className={styles.iconLink}
                role="link"
                tabIndex={0}
                aria-label={`${title} link`}
                onPointerUp={handlePointerUp}
                onDoubleClick={openLink}
                onKeyDown={handleKeyDown}
            >
                {content}
            </div>
        );
    }

    return (
        <div
            className={styles.iconLink}
            onDoubleClick={onDoubleClick}
            onPointerUp={handlePointerUp}
            role="button"
            tabIndex={0}
            aria-label={title}
            onKeyDown={handleKeyDown}
        >
            {content}
        </div>
    );
};

export default FileIcon;
