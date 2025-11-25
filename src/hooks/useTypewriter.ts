import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, delay: number = 1000) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (currentIndex < text.length && isTyping) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex >= text.length && isTyping) {
            // Finished typing
            setIsTyping(false);
        }
    }, [currentIndex, isTyping, text, speed]);

    return displayText;
};

export const useTypewriterLoop = (texts: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseDuration: number = 2000) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        const currentText = texts[textIndex];

        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length - 1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length + 1));
                if (displayText.length === currentText.length) {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return displayText;
};
