import { useEffect, useState } from 'react';

import { getAllSettings } from './service';

export const useSettings = () => {
    const [loaded, setLoaded] = useState(false);
    const [settings, setSettings] = useState({});

    const fetchSettings = async () => {
        const allSettingsResult = await getAllSettings();
        setSettings(allSettingsResult);
        setLoaded(true);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return { loaded, ...settings };
};
