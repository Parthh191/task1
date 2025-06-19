import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingQueue, setLoadingQueue] = useState(0);

    const startLoading = useCallback(() => {
        setLoadingQueue(prev => prev + 1);
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setLoadingQueue(prev => Math.max(0, prev - 1));
    }, []);

    useEffect(() => {
        if (loadingQueue === 0) {
            setIsLoading(false);
        }
    }, [loadingQueue]);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl">
                        <Loader />
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};