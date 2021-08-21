import { useEffect, useRef } from 'react';

export const handleClickOutside = (container, handler, event) => {
    if (container.current && event.target !== null) {
        if (!container.current.contains(event.target)) {
            handler(event);
        }
    }
};

const useClickOutside = (handler) => {
    const container = useRef(null);
    useEffect(() => {
        document.addEventListener('click', (event) =>
            handleClickOutside(container, handler, event)
        );
        return () => {
            document.removeEventListener('click', (event) =>
                handleClickOutside(container, handler, event)
            );
        };
    }, [container]);
    return container;
};

export default useClickOutside;
