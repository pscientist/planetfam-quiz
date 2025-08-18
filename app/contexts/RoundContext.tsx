import { createContext, ReactNode, useContext, useState } from 'react';

interface RoundContextType {
    currentRound: number;
    incrementRound: () => void;
    resetToRound1: () => void;
}


const RoundContext = createContext<RoundContextType | undefined>(undefined);

export function RoundProvider({ children }: { children: ReactNode }) {
    const [currentRound, setCurrentRound] = useState(1);

    const resetToRound1 = () => {
        setCurrentRound(1);
        console.log('resetToRound1', currentRound);
    };

    const incrementRound = () => {
        setCurrentRound(prev => prev + 1);
        console.log('incrementRound', currentRound);
    };

    return (
        <RoundContext.Provider value={{ currentRound, incrementRound, resetToRound1 }}>
            {children}
        </RoundContext.Provider>
    )
}

export function useRound() {
    const context = useContext(RoundContext);
    if (context === undefined) {
        throw new Error('useRound must be used within a RoundProvider');
    }
    return context;
}