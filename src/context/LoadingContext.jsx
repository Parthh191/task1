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
                <div className="fixed inset-0 bg-white/10 dark:bg-blog-dark-deeper/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white/90 dark:black-600/90 p-4 rounded-xl shadow-xl backdrop-blur-md">
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