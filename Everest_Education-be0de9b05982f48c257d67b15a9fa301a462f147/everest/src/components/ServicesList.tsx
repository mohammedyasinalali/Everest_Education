import { useTranslation } from 'react-i18next';
import { servicesData } from '../constants/data';

const ServicesList = () => {
    const { t } = useTranslation();

    return (
        <div className="grid md:grid-cols-2 gap-5">
            {servicesData.map((service, index) => {
                // Logic for alternating colors (Checkerboard O-B-B-O): 
                // Index 0: Orange, Index 1: Blue
                // Index 2: Blue, Index 3: Orange
                const isOrange = index % 4 === 0 || index % 4 === 3;

                return (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl p-8 min-h-[280px] flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-2 shadow-xl ${isOrange ? 'bg-[#FF822E] text-[#203252]' : 'bg-[#0859BC] text-white'
                            }`}
                    >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                        {/* Sidebar effect */}
                        <div className={`absolute top-0 right-0 w-1/4 h-full ${isOrange ? 'bg-[#FF9E5E]/50' : 'bg-[#064299]/50'
                            }`}></div>

                        {/* Animated Background - VISIBLE */}
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
                            <h3 className="text-xl md:text-2xl font-bold mb-3 font-['Tajawal']">
                                {t(service.title)}
                            </h3>
                            <p className={`text-sm md:text-base leading-relaxed font-medium ${isOrange ? 'text-[#203252]' : 'text-white/90'}`}>
                                {t(service.title + '_desc')}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ServicesList;
