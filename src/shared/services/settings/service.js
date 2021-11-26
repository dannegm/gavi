import { doc, getDoc } from 'firebase/firestore/lite';

import { db } from '../firebase';

const SETTINGS_COLLECTION = 'settings';
const SETTINGS_KEY = process.env.REACT_APP_SETTINGS_KEY;

export const getAllSettings = async () => {
    try {
        const settingsCollectionRef = doc(db, SETTINGS_COLLECTION, SETTINGS_KEY);
        const settingsSnapshot = await getDoc(settingsCollectionRef);

        if (!settingsSnapshot.exists()) {
            return {
                error: {
                    message: 'Giving settings key is not exists',
                },
            };
        }

        return settingsSnapshot.data();
    } catch (error) {
        return { error };
    }
};
