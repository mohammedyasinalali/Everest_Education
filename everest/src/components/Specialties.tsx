import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container, Card } from './ui';
import { specialtiesData } from '../constants';

const Specialties = () => {
    const { t } = useTranslation();

    return (
        <section id="specialties" className="mb-24">
            <Container>
                <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0859BC] mb-16">
                    {t('hero.top_specialties')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialtiesData.map((specialty, index) => (
                        <Link key={index} to={`/specialties/${specialty.slug}`} className="no-underline">
                            <Card
                                padding="none"
                                className="text-center pb-5 group overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={specialty.image}
                                        alt={t(specialty.title)}
                                        className="w-full h-[200px] mb-4 group-hover:scale-105 transition-transform duration-500 object-cover"
                                        loading={index > 2 ? 'lazy' : 'eager'}
                                    />
                                </div>
                                <h3 className="text-[#0859BC] mb-1 font-semibold text-lg px-4">
                                    {t(specialty.title)}
                                </h3>
                                <span className="text-gray-500 text-sm">{t(specialty.category)}</span>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Specialties;

