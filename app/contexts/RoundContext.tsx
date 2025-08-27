import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface RoundContextType {
    currentRound: number;
    completedRounds: number[];
    incrementRound: () => void;
    resetToRound1: () => void;
    markRoundAsCompleted: (round: number) => void;
    areAllRoundsCompleted: () => boolean;
    resetCompletedRounds: () => void;
    getNextRoundToPlay: () => number;
    getTotalRounds: () => number;
    resetToRound: (round: number) => void;
}

const RoundContext = createContext<RoundContextType | undefined>(undefined);

const COMPLETED_ROUNDS_KEY = 'completedRounds';

export function RoundProvider({ children }: { children: ReactNode }) {
    const [currentRound, setCurrentRound] = useState(1);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);

    // Load completed rounds from storage on initialization
    useEffect(() => {
        loadCompletedRounds();
    }, []);

    const loadCompletedRounds = async () => {
        try {
            const stored = await AsyncStorage.getItem(COMPLETED_ROUNDS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setCompletedRounds(parsed);
                console.log('Loaded completed rounds:', parsed);
            }
        } catch (error) {
            console.error('Error loading completed rounds:', error);
        }
    };

    const saveCompletedRounds = async (rounds: number[]) => {
        try {
            await AsyncStorage.setItem(COMPLETED_ROUNDS_KEY, JSON.stringify(rounds));
            console.log('Saved completed rounds:', rounds);
        } catch (error) {
            console.error('Error saving completed rounds:', error);
        }
    };

    const resetToRound1 = () => {
        setCurrentRound(1);
        console.log('resetToRound1', currentRound);
    };

    const resetToRound = (round: number) => {
        setCurrentRound(round);
        console.log('resetToRound', currentRound);
    };

    const incrementRound = () => {
        setCurrentRound(prev => prev + 1);
        console.log('incrementRound', currentRound);
    };

    const markRoundAsCompleted = (round: number) => {
        setCompletedRounds(prev => {
            if (!prev.includes(round)) {
                const newCompletedRounds = [...prev, round];
                saveCompletedRounds(newCompletedRounds);
                return newCompletedRounds;
            }
            return prev;
        });
    };

    const areAllRoundsCompleted = () => {
        return completedRounds.includes(1) && completedRounds.includes(2) && completedRounds.includes(3);
    };

    const getNextRoundToPlay = () => {
        return 3; // debug

        // // Return the first round that's not completed, or 1 if all are completed
        // for (let round = 1; round <= 3; round++) {
        //     if (!completedRounds.includes(round)) {
        //         return round;
        //     }
        // }
        // // If all rounds are completed, return 1 to allow replay
        // return 1;
    };

    const getTotalRounds = () => {
        return 3;
    };

    const resetCompletedRounds = () => {
        setCompletedRounds([]);
        saveCompletedRounds([]);
        console.log('resetCompletedRounds');
    };

    return (
        <RoundContext.Provider value={{
            currentRound,
            completedRounds,
            incrementRound,
            resetToRound1,
            resetToRound,
            markRoundAsCompleted,
            areAllRoundsCompleted,
            resetCompletedRounds,
            getNextRoundToPlay,
            getTotalRounds
        }}>
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