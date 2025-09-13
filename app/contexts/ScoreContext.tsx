import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ScoreContextType {
    score: number;
    setScore: (score: number) => void;
    resetScore: () => void;
    incrementScore: () => void;
    getAllScoresCount: () => number;
    collectedCountries: string[];
    allCollectedCountries: string[];
    addCollectedCountry: (country: string) => void;
    addAllCollectedCountry: (country: string) => void;
    resetCollectedCountries: () => void;
    getCollectedCountries: () => string[];
    getAllCollectedCountries: () => string[];
    loadAllCollectedCountries: () => Promise<string[]>; // New: load on demand
    isDataLoaded: boolean;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Storage key for persistent flags
const ALL_COLLECTED_COUNTRIES_KEY = 'allCollectedCountries';


export function ScoreProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState(0);
    const [collectedCountries, setCollectedCountries] = useState<string[]>([]);
    const [allCollectedCountries, setAllCollectedCountries] = useState<string[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        loadAllCollectedCountries();
    }, []);

    // Save allCollectedCountries to AsyncStorage
    const saveAllCollectedCountries = async (countries: string[]) => {
        try {
            await AsyncStorage.setItem(
                ALL_COLLECTED_COUNTRIES_KEY,
                JSON.stringify(countries)
            );
            console.log('Saved flags to storage:', countries);
        } catch (error) {
            console.error('Error saving all collected countries:', error);
        }
    };

    // Load allCollectedCountries from AsyncStorage (called on demand)
    const loadAllCollectedCountries = async (): Promise<string[]> => {
        try {
            const stored = await AsyncStorage.getItem(ALL_COLLECTED_COUNTRIES_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setAllCollectedCountries(parsed);
                if (__DEV__) {
                    // Add enough test countries to see trophy and crown earned
                    const testCountries = [
                        'france', 'spain', 'sweden', 'nz', 'netherlands',
                        'germany', 'usa', 'uk', 'australia', 'italy',
                        'japan', 'china', 'india', 'brazil', 'russia',
                        'ethiopia', 'norway', 'iceland', 'finland', 'switzerland',
                        'taiwan', 'hk', 'malaysia', 'laos', 'mongolia',
                        'philippines', 'png', 'colombia', 'uzbekistan', 'srilanka',
                        'south_sudan', 'saudi', 'argentina', 'cuba', 'belgium',
                        'iran', 'mexico', 'afghanistan'  // 38 countries total - enough for trophy (30) and working towards crown (90)
                    ];
                    setAllCollectedCountries(testCountries);
                }
                console.log('Loaded persistent flags:', parsed);
                setIsDataLoaded(true);

                return parsed;
            }
            setIsDataLoaded(true);
            return [];
        } catch (error) {
            console.error('Error loading all collected countries:', error);
            setIsDataLoaded(true);
            return [];
        }
    };

    const resetScore = () => {
        setScore(0);
        console.log('set score: = 0');
    };

    const incrementScore = () => {
        setScore(prev => prev + 1);
        console.log('incrementScore to ', score + 1);
    };

    const addCollectedCountry = (country: string) => {
        if (!collectedCountries.includes(country)) {
            setCollectedCountries(prev => [...prev, country]);
        }
    };

    const addAllCollectedCountry = (country: string) => {
        if (!allCollectedCountries.includes(country)) {
            const newAllCountries = [...allCollectedCountries, country];
            setAllCollectedCountries(newAllCountries);
            saveAllCollectedCountries(newAllCountries); // 🔑 TODO: use debouse save
            console.log('Added new flag:', country);
        }
    };

    const resetCollectedCountries = () => {
        saveAllCollectedCountries([]);
        setCollectedCountries([]);
        console.log('resetCollectedCountries');
    };

    const getCollectedCountries = () => {
        return collectedCountries;
    };

    const getAllCollectedCountries = () => {
        return allCollectedCountries;
    };

    const getAllScoresCount = () => {
        return allCollectedCountries.length;
    }

    return (
        <ScoreContext.Provider value={{
            score, setScore, resetScore, incrementScore, getAllScoresCount,
            collectedCountries, addCollectedCountry, resetCollectedCountries, getCollectedCountries,
            allCollectedCountries, addAllCollectedCountry, getAllCollectedCountries,
            loadAllCollectedCountries, isDataLoaded
        }}>
            {children}
        </ScoreContext.Provider>
    );
}

export function useScore() {
    const context = useContext(ScoreContext);
    if (context === undefined) {
        throw new Error('useScore must be used within a ScoreProvider');
    }
    return context;
}
