import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface RoundContextType {
    currentRound: number;
    completedRounds: number[];
    incrementRound: () => void;
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
    const [currentRound, setCurrentRound] = useState(0);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);

    // Load completed rounds from storage on initialization
    useEffect(() => {
        loadCompletedRounds();
    }, []);

    // Helper function to calculate next round from completed rounds array
    const getNextRoundToPlayFromCompleted = (completed: number[]) => {
        // Return the first round that's not completed, or 0 if all are completed
        for (let round = 1; round <= 3; round++) {
            if (!completed.includes(round)) {
                return round;
            }
        }
        // If all rounds are completed, return 0 to indicate no more rounds to play
        return 0;
    };

    const loadCompletedRounds = async () => {
        try {
            const stored = await AsyncStorage.getItem(COMPLETED_ROUNDS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setCompletedRounds(parsed);
                console.log('Loaded completed rounds:', parsed);

                // Set currentRound to the next round that needs to be played
                const nextRound = getNextRoundToPlayFromCompleted(parsed);
                setCurrentRound(nextRound);
                console.log('Set current round to:', nextRound);
            } else {
                // If no stored data, start with round 1
                setCurrentRound(1);
            }
        } catch (error) {
            console.error('Error loading completed rounds:', error);
            // If error, default to round 1
            setCurrentRound(1);
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

    const incrementRound = () => {
        setCurrentRound(prev => prev + 1);
        console.log('incrementRound to ', currentRound + 1);
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
        // Return the first round that's not completed, or 0 if all are completed
        for (let round = 1; round <= 3; round++) {
            if (!completedRounds.includes(round)) {
                return round;
            }
        }
        // If all rounds are completed, return 0 to indicate no more rounds to play
        return 0;
    };

    const getTotalRounds = () => {
        return 3;
    };

    const resetCompletedRounds = () => {
        setCompletedRounds([]);
        saveCompletedRounds([]);
        setCurrentRound(1);
        console.log('resetCompletedRounds');
    };

    const resetToRound = (round: number) => {
        setCurrentRound(round);
    };

    return (
        <RoundContext.Provider value={{
            currentRound,
            completedRounds,
            incrementRound,
            markRoundAsCompleted,
            areAllRoundsCompleted,
            resetCompletedRounds,
            getNextRoundToPlay,
            getTotalRounds,
            resetToRound
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