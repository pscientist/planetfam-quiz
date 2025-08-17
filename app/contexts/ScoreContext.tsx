import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ScoreContextType {
    score: number;
    setScore: (score: number) => void;
    resetScore: () => void;
    incrementScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState(0);

    const resetScore = () => {
        setScore(0);
        console.log('resetScore', score);
    };

    const incrementScore = () => {
        setScore(prev => prev + 1);
        console.log('incrementScore', score);
    };

    return (
        <ScoreContext.Provider value={{ score, setScore, resetScore, incrementScore }}>
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
