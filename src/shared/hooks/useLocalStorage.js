import { useState } from 'react';

const useLocalStorage = (defaultKey, initialValue) => {
    const [key, setKey] = useState(defaultKey);
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    const clearValue = () => {
        localStorage.removeItem(key);
        setStoredValue(initialValue);
    };

    return [storedValue, setValue, clearValue, setKey];
};

export default useLocalStorage;
