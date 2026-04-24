import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
import { statsData, type Stat } from '../constants';
=======
import { aboutStatsData } from '../constants';
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147

const StatsSection = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
                {statsData.map((stat: Stat, index: number) => (
=======
                {aboutStatsData.map((stat, index) => (
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147
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
