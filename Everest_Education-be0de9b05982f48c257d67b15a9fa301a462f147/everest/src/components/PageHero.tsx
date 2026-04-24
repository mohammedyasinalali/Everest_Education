import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './ui';

interface PageHeroProps {
    title: string;
    breadcrumb?: string;
    backgroundImage?: string;
    children?: ReactNode;
}

const PageHero = ({
    title,
    breadcrumb,
    backgroundImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    children
}: PageHeroProps) => {
    const { t } = useTranslation();

    return (
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Dark Blue Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929]/95 via-[#0a1929]/90 to-[#0a1929]/85"></div>
            </div>

            {/* Content */}
            <Container>
                <div className="relative z-10 text-center text-white">
                    {/* Breadcrumb */}
                    {breadcrumb && (
                        <div className="mb-6 flex items-center justify-center gap-2 text-sm">
                            <span className="text-white/70">{t('header.home')}</span>
                            <span className="text-[#FF822E]">/</span>
                            <span className="text-[#FF822E] font-semibold">{breadcrumb}</span>
                        </div>
                    )}

                    {/* Page Title */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        {title}
                    </h1>

                    {/* Additional Content */}
                    {children}
                </div>
            </Container>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" />
                </svg>
            </div>
        </section>
    );
};

export default PageHero;
