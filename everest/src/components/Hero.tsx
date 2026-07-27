import { useTranslation, Trans } from 'react-i18next';
import { Button } from './ui';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section
            className="relative h-screen min-h-[600px] flex items-center text-white text-center bg-cover bg-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop')`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 max-w-[800px] mx-auto px-5">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-5 leading-tight">
                    <Trans i18nKey="hero.start_journey_title" />
                </h1>
                <p className="text-lg md:text-xl mb-10 opacity-90">
                    {t('hero.join_students_subtitle')}
                </p>

                <div className="flex justify-center gap-5 flex-wrap">
                    <Button 
                        as="a" 
                        href={`https://wa.me/905451365495?text=${encodeURIComponent(t('hero.whatsapp_msg'))}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        variant="primary" 
                        size="lg"
                    >
                        {t('hero.get_consultation')}
                    </Button>
                    <Button
                        as="a"
                        href="#specialties"
                        variant="secondary"
                        size="lg"
                        icon="fas fa-arrow-down"
                    >
                        {t('hero.top_specialties')}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
