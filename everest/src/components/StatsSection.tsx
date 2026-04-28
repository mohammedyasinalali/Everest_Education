import { useTranslation } from 'react-i18next';
import { statsData, type Stat } from '../constants';

const StatsSection = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat: Stat, index: number) => (
                    <div key={index} className="bg-navy rounded-2xl p-8 text-center border-b-8 border-secondary shadow-xl hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-5xl font-bold text-secondary mb-4" dir="ltr">
                            {stat.value}
                        </h3>
                        <p className="text-white text-lg font-medium">
                            {t(stat.label)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;
