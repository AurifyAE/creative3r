'use client';
import { useRef, useCallback } from 'react';

export const useHoverSound = () => {
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

    const playHoverSound = useCallback(() => {
        if (!hoverSoundRef.current) {
            hoverSoundRef.current = new Audio('/assets/sounds/tick.mp3');
            hoverSoundRef.current.volume = 0.3;
        }

        const sound = hoverSoundRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.1;
        sound.play().catch(err => {
            console.log('Audio play failed:', err);
        });
    }, []);

    return playHoverSound;
};
