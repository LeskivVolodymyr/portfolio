import { useState, useRef, useCallback } from 'react';

export function useExpandable(delay = 1500) {
    const [expanded, setExpanded] = useState(false);
    const [isAutoCollapse, setIsAutoCollapse] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = useCallback(() => {
        timerRef.current = setTimeout(() => setExpanded(true), delay);
    }, [delay]);

    const handleMouseLeave = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (isAutoCollapse) setExpanded(false);
    }, [isAutoCollapse]);

    const handleToggle = useCallback(() => {
        setIsAutoCollapse(false); // Disable auto-collapse on manual toggle
        setExpanded((prev) => !prev);
    }, []);

    return {
        expanded,
        setExpanded,
        isAutoCollapse,
        setIsAutoCollapse,
        handleMouseEnter,
        handleMouseLeave,
        handleToggle,
    };
}
