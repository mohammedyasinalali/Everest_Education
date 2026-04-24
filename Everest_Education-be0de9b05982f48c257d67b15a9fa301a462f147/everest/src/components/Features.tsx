import { useTranslation } from 'react-i18next';
import { Container } from './ui';
import { featuresData } from '../constants';

const Features = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-gradient-to-br from-[#0859BC] to-[#203252] text-white py-16 mb-20">
            <Container className="flex justify-around flex-wrap gap-8">
                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 text-lg font-medium"
                    >
                        <i className={`${feature.icon} text-5xl text-white`}></i>
                        <span>{t(feature.label)}</span>
                    </div>
                ))}
            </Container>
        </section>
    );
};

export default Features;
