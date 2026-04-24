import { useEffect, useState } from 'react';

/**
 * A custom hook to track the active section within a page based on scroll position.
 * @param sectionIds Array of HTML element IDs to track
 * @param defaultSection The initial active section ID
 * @param offset The top offset used to determine intersection
 * @returns { activeSection, scrollToSection }
 */
export const useScrollSpy = (sectionIds: string[], defaultSection: string, offset: number = 150) => {
    const [activeSection, setActiveSection] = useState(defaultSection);

    useEffect(() => {
        const handleScroll = () => {
            for (const sectionId of sectionIds) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If the section is currently visible considering the offset
                    if (rect.top <= offset && rect.bottom > offset) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Fire once on mount in case we start down the page
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    /**
     * Smoothly scrolls the window to the given section ID.
     */
    const scrollToSection = (sectionId: string, scrollOffset: number = 100) => {
        const el = document.getElementById(sectionId);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return { activeSection, scrollToSection };
};
