import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ScoreContextType {
    score: number;
    setScore: (score: number) => void;
    resetScore: () => void;
    incrementScore: () => void;
    collectedCountries: string[];
    addCollectedCountry: (country: string) => void;
    resetCollectedCountries: () => void;
    getCollectedCountries: () => string[];

}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState(0);
    const [collectedCountries, setCollectedCountries] = useState<string[]>([]);

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
        };
    }

    const resetCollectedCountries = () => {
        setCollectedCountries([]);
    };

    const getCollectedCountries = () => {
        return collectedCountries;
    };

    return (
        <ScoreContext.Provider value={{
            score, setScore, resetScore, incrementScore,
            collectedCountries, addCollectedCountry, resetCollectedCountries, getCollectedCountries
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
