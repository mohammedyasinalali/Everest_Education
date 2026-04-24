import { useRef } from 'react';
import { Container } from './ui';
import { statsData } from '../constants';
import { useCounter, useInView } from '../hooks';
import { useTranslation } from 'react-i18next';

// دالة لاستخراج الرقم من النص (مثل: "2,000" → 2000)
const extractNumber = (value: string): number => {
    const numStr = value.replace(/[^0-9]/g, '');
    return parseInt(numStr, 10) || 0;
};

// دالة لتنسيق الرقم مع الفواصل والرموز
const formatValue = (originalValue: string, currentCount: number): string => {
    const hasPlus = originalValue.includes('+');
    const hasComma = originalValue.includes(',');

    let formatted = currentCount.toString();

    // إضافة فاصلة للأرقام الكبيرة
    if (hasComma && currentCount >= 1000) {
        formatted = currentCount.toLocaleString('en-US');
    }

    // إضافة + في النهاية
    if (hasPlus) {
        formatted += '+';
    }

    return formatted;
};

const Stats = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef as React.RefObject<Element>, { threshold: 0.3, triggerOnce: true });

    return (
        <section ref={sectionRef} className="relative z-10 mb-20">
            <Container className="flex justify-center gap-5 flex-wrap">
                {statsData.map((stat, index) => {
                    const targetNumber = extractNumber(stat.value);
                    const currentCount = useCounter({
                        end: targetNumber,
                        duration: 2500,
                        isVisible,
                    });

                    return (
                        <div
                            key={index}
                            className="bg-[rgba(32,50,82,0.95)] backdrop-blur-lg text-white py-8 px-5 rounded-xl text-center min-w-[200px] flex-1 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 border-b-4 border-[#FF822E] hover:-translate-y-2.5"
                        >
                            <h3 className="text-4xl text-[#FF822E] font-extrabold mb-2.5 tabular-nums">
                                {formatValue(stat.value, currentCount)}
                            </h3>
                            <p className="text-base">{t(stat.label)}</p>
                        </div>
                    );
                })}
            </Container>
        </section>
    );
};

export default Stats;
