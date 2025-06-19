import { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [preloadedImages, setPreloadedImages] = useState({});

    const preloadImages = async (imageUrls) => {
        const loadImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(url);
                img.onerror = () => reject(url);
            });
        };

        try {
            const newImages = {};
            await Promise.all(
                imageUrls.map(async (url) => {
                    if (!preloadedImages[url]) {
                        await loadImage(url);
                        newImages[url] = true;
                    }
                })
            );
            setPreloadedImages(prev => ({ ...prev, ...newImages }));
        } catch (error) {
            console.error('Failed to preload some images:', error);
        }
    };

    return (
        <ImageContext.Provider value={{ preloadImages, preloadedImages }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
};