import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ScoreContextType {
    score: number;
    setScore: (score: number) => void;
    resetScore: () => void;
    incrementScore: () => void;
    collectedCountries: string[];
    allCollectedCountries: string[];
    addCollectedCountry: (country: string) => void;
    addAllCollectedCountry: (country: string) => void;
    resetCollectedCountries: () => void;
    getCollectedCountries: () => string[];
    getAllCollectedCountries: () => string[];
    loadAllCollectedCountries: () => Promise<string[]>; // New: load on demand
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Storage key for persistent flags
const ALL_COLLECTED_COUNTRIES_KEY = 'allCollectedCountries';

export function ScoreProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState(0);
    const [collectedCountries, setCollectedCountries] = useState<string[]>([]);
    const [allCollectedCountries, setAllCollectedCountries] = useState<string[]>([]);

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
                console.log('Loaded persistent flags:', parsed);
                return parsed;
            }
            return [];
        } catch (error) {
            console.error('Error loading all collected countries:', error);
            return [];
        }
    };

    const resetScore = () => {
        setScore(0);
        console.log('resetScore', score);
    };

    const incrementScore = () => {
        setScore(prev => prev + 1);
        console.log('incrementScore', score);
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
            saveAllCollectedCountries(newAllCountries); // 🔑 Save to AsyncStorage
            console.log('Added new flag:', country);
        }
    };

    const resetCollectedCountries = () => {
        setCollectedCountries([]);
    };

    const getCollectedCountries = () => {
        return collectedCountries;
    };

    const getAllCollectedCountries = () => {
        return allCollectedCountries;
    };

    return (
        <ScoreContext.Provider value={{
            score, setScore, resetScore, incrementScore,
            collectedCountries, addCollectedCountry, resetCollectedCountries, getCollectedCountries,
            allCollectedCountries, addAllCollectedCountry, getAllCollectedCountries,
            loadAllCollectedCountries
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
