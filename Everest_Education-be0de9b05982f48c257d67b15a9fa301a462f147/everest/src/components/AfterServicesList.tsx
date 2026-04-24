import { useTranslation } from 'react-i18next';
import { afterServicesData } from '../constants/data';

const AfterServicesList = () => {
    const { t } = useTranslation();

    const getCardStyle = (index: number) => {
        const position = index % 3;
        // 0: Blue (Primary), 1: Orange (Secondary), 2: Dark Navy (Brand Dark)
        if (position === 0) {
            return 'bg-[#0859BC] text-white'; // Blue
        } else if (position === 1) {
            return 'bg-[#FF822E] text-[#203252]'; // Orange
        } else {
            return 'bg-[#203252] text-white'; // Dark Navy
        }
    };

    return (
        <div className="grid md:grid-cols-3 gap-5">
            {afterServicesData.map((service, index) => {
                const cardStyle = getCardStyle(index);

                return (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl p-8 min-h-[250px] flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-2 shadow-xl ${cardStyle}`}
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                        {/* Animated Background - Floating shapes */}
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        {/* Content */}
                        <div className="relative z-10 w-full px-4">
                            <div className="mb-6 flex justify-center">
                                <i className={`${service.icon} text-5xl opacity-90`}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-['Tajawal']">
                                {t(service.title)}
                            </h3>
                            <p className="text-sm leading-relaxed font-medium opacity-90">
                                {t(service.title + '_desc')}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AfterServicesList;
