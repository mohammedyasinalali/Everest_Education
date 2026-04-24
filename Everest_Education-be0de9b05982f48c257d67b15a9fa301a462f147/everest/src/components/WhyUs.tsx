import { useTranslation } from 'react-i18next';

const WhyUs = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {t('about_us.why_us.title')}
                </h2>
                <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                    {t('about_us.why_us.subtitle')}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: 'fas fa-hand-holding-usd',
                        key: 'free',
                        color: 'from-primary to-navy'
                    },
                    {
                        icon: 'fas fa-user-tie',
                        key: 'experience',
                        color: 'from-secondary to-secondary'
                    },
                    {
                        icon: 'fas fa-university',
                        key: 'universities',
                        color: 'from-primary to-navy'
                    },
                    {
                        icon: 'fas fa-plane-arrival',
                        key: 'support',
                        color: 'from-secondary to-secondary'
                    }
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                            <i className={item.icon}></i>
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">
                            {t(`about_us.why_us.features.${item.key}.title`)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {t(`about_us.why_us.features.${item.key}.desc`)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
