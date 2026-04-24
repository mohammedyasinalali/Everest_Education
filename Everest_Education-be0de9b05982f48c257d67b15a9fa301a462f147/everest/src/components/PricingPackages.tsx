import { useState } from 'react';


interface PackageFeature {
    text: string;
    included: boolean;
}

interface Package {
    name: string;
    icon: string;
    price: string;
    oldPrice: string;
    monthlyNote: string;
    color: string;
    gradientFrom: string;
    gradientTo: string;
    badgeColor: string;
    popular?: boolean;
    features: PackageFeature[];
}

const packages: Package[] = [
    {
        name: 'الباقة البرونزية',
        icon: 'fas fa-medal',
        price: '$249',
        oldPrice: '$350',
        monthlyNote: 'دفعة واحدة',
        color: '#CD7F32',
        gradientFrom: '#CD7F32',
        gradientTo: '#A0522D',
        badgeColor: 'bg-[#CD7F32]',
        features: [
            { text: 'استقبال من المطار', included: true },
            { text: 'ترجمة نوتر للسكن على المقعد', included: true },
            { text: 'ترجمة المعلومات الأولية على المقعد', included: true },
            { text: 'بطاقة نقل الطالب', included: true },
            { text: 'استخراج الخلاصة المدنية', included: false },
            { text: 'التأمين الصحي', included: false },
            { text: 'فتح حساب بنكي', included: false },
            { text: 'بطاقة المواصلات العامة', included: false },
            { text: 'استشارات قانونية دائمة', included: false },
            { text: 'المرافقة للتسجيل في الجامعة', included: false },
            { text: 'تسجيل الإقامة الإلكترونية والمادية', included: false },
            { text: 'فتح خطوط هاتف محلية مسجّلة', included: false },
            { text: 'قالب جنسيات خاص', included: false },
        ],
    },
    {
        name: 'الباقة الفضية',
        icon: 'fas fa-gem',
        price: '$399',
        oldPrice: '$520',
        monthlyNote: 'دفعة واحدة',
        color: '#A8A9AD',
        gradientFrom: '#A8A9AD',
        gradientTo: '#71706E',
        badgeColor: 'bg-[#A8A9AD]',
        features: [
            { text: 'استقبال من المطار', included: true },
            { text: 'ترجمة نوتر للسكن على المقعد', included: true },
            { text: 'ترجمة المعلومات الأولية على المقعد', included: true },
            { text: 'بطاقة نقل الطالب', included: true },
            { text: 'استخراج الخلاصة المدنية', included: true },
            { text: 'التأمين الصحي', included: true },
            { text: 'فتح حساب بنكي', included: true },
            { text: 'بطاقة المواصلات العامة', included: true },
            { text: 'استشارات قانونية دائمة', included: false },
            { text: 'المرافقة للتسجيل في الجامعة', included: false },
            { text: 'تسجيل الإقامة الإلكترونية والمادية', included: false },
            { text: 'فتح خطوط هاتف محلية مسجّلة', included: false },
            { text: 'قالب جنسيات خاص', included: false },
        ],
    },
    {
        name: 'الباقة الذهبية',
        icon: 'fas fa-crown',
        price: '$599',
        oldPrice: '$800',
        monthlyNote: 'دفعة واحدة',
        color: '#FFD700',
        gradientFrom: '#FFD700',
        gradientTo: '#DAA520',
        badgeColor: 'bg-[#DAA520]',
        popular: true,
        features: [
            { text: 'استقبال من المطار', included: true },
            { text: 'ترجمة نوتر للسكن على المقعد', included: true },
            { text: 'ترجمة المعلومات الأولية على المقعد', included: true },
            { text: 'بطاقة نقل الطالب', included: true },
            { text: 'استخراج الخلاصة المدنية', included: true },
            { text: 'التأمين الصحي', included: true },
            { text: 'فتح حساب بنكي', included: true },
            { text: 'بطاقة المواصلات العامة', included: true },
            { text: 'استشارات قانونية دائمة', included: true },
            { text: 'المرافقة للتسجيل في الجامعة', included: true },
            { text: 'تسجيل الإقامة الإلكترونية والمادية', included: true },
            { text: 'فتح خطوط هاتف محلية مسجّلة', included: true },
            { text: 'قالب جنسيات خاص', included: true },
        ],
    },
];

const PricingPackages = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, index) => {
                const isHovered = hoveredIndex === index;
                const isPopular = pkg.popular;

                return (
                    <div
                        key={index}
                        className={`relative rounded-3xl bg-white border-2 transition-all duration-500 overflow-hidden flex flex-col ${isPopular
                            ? 'border-[#DAA520] shadow-2xl shadow-[#DAA520]/20 scale-105 z-10'
                            : 'border-gray-100 shadow-xl hover:shadow-2xl'
                            } ${isHovered && !isPopular ? 'scale-[1.02]' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Popular badge */}
                        {isPopular && (
                            <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-white text-sm font-bold px-6 py-1.5 rounded-b-xl font-['Tajawal'] shadow-lg">
                                الأكثر طلباً ⭐
                            </div>
                        )}

                        {/* Header */}
                        <div
                            className="p-8 pb-6 text-center relative overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${pkg.gradientFrom}15, ${pkg.gradientTo}08)`,
                            }}
                        >
                            {/* Icon circle */}
                            <div
                                className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center shadow-lg transition-transform duration-300"
                                style={{
                                    background: `linear-gradient(135deg, ${pkg.gradientFrom}, ${pkg.gradientTo})`,
                                }}
                            >
                                <i className={`${pkg.icon} text-white text-3xl`}></i>
                            </div>

                            <h3 className="text-2xl font-black text-[#203252] mb-4 font-['Tajawal']">
                                {pkg.name}
                            </h3>

                            {/* Price */}
                            <div className="flex items-baseline justify-center gap-3 mb-1">
                                <span className="text-gray-400 line-through text-lg font-['Tajawal']">
                                    {pkg.oldPrice}
                                </span>
                                <span
                                    className="text-5xl font-black font-['Montserrat']"
                                    style={{ color: pkg.color === '#FFD700' ? '#DAA520' : pkg.color }}
                                >
                                    {pkg.price}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm font-['Tajawal']">{pkg.monthlyNote}</p>
                        </div>

                        {/* Divider */}
                        <div className="mx-8">
                            <div
                                className="h-[2px] rounded-full"
                                style={{
                                    background: `linear-gradient(to right, transparent, ${pkg.color}40, transparent)`,
                                }}
                            ></div>
                        </div>

                        {/* Features */}
                        <div className="p-8 pt-6 flex flex-col flex-grow">
                            <ul className="space-y-3">
                                {pkg.features.map((feature, fIdx) => (
                                    <li
                                        key={fIdx}
                                        className={`flex items-center gap-3 ${feature.included ? 'text-[#203252]' : 'text-gray-300'
                                            }`}
                                    >
                                        <i
                                            className={`${feature.included
                                                ? 'fas fa-check-circle'
                                                : 'fas fa-times-circle'
                                                } text-sm ${feature.included ? 'text-green-500' : 'text-gray-300'
                                                }`}
                                        ></i>
                                        <span
                                            className={`font-medium font-['Tajawal'] text-sm ${!feature.included ? 'line-through' : ''
                                                }`}
                                        >
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                className="w-full mt-auto py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 font-['Tajawal']"
                                style={{
                                    background: isPopular
                                        ? `linear-gradient(135deg, ${pkg.gradientFrom}, ${pkg.gradientTo})`
                                        : 'transparent',
                                    color: isPopular ? '#fff' : pkg.color === '#FFD700' ? '#DAA520' : pkg.color,
                                    border: isPopular ? 'none' : `2px solid ${pkg.color === '#FFD700' ? '#DAA520' : pkg.color}`,
                                    boxShadow: isPopular ? `0 8px 25px ${pkg.color}40` : 'none',
                                }}
                            >
                                اختر الباقة
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PricingPackages;
