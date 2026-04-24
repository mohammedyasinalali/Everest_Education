import { useEffect, useState, type RefObject } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useInView = <T extends Element>(
    ref: RefObject<T>,
    { threshold = 0.1, rootMargin = '0px', triggerOnce = true }: UseInViewOptions = {}
): boolean => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold, rootMargin, triggerOnce]);

    return isInView;
};
