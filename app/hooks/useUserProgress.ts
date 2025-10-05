import { useEffect, useState } from 'react';
import { ensureProfile } from '../lib/ensureProfile';
import { getCorrectCountries, getCurrentLevel, recordCorrectCountry, setCurrentLevel } from '../lib/user_progress';

export function usePlayerProgress() {
    const [level, setLevel] = useState<number>(1);
    const [countries, setCountries] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await ensureProfile();
            const [lvl, list] = await Promise.all([getCurrentLevel(), getCorrectCountries()]);
            setLevel(lvl);
            setCountries(list);
            setLoading(false);
        })();
    }, []);

    // return {
    //     loading,
    //     level,
    //     countries,
    //     async advanceLevel() {
    //         const next = level + 1;
    //         await setCurrentLevel(next);
    //         setLevel(next);
    //     },
    //     async markCorrect(code: string, difficulty?: number) {
    //         await recordCorrectCountry(code, difficulty);
    //         setCountries(prev => (prev.includes(code.toUpperCase()) ? prev : [...prev, code.toUpperCase()]));
    //     },
    // };
    return {
        loading: false,
        level: 2,
        countries: ['taiwan', 'norway', 'laos'],
        async advanceLevel() {
            const next = level + 1;
            await setCurrentLevel(next);
            setLevel(next);
        },
        async markCorrect(code: string, difficulty?: number) {
            await recordCorrectCountry(code);
            setCountries(prev => (prev.includes(code.toUpperCase()) ? prev : [...prev, code.toUpperCase()]));
        },
    };
}
