import { Link } from 'react-router-dom';
import { useLocalization } from '../../hooks/useLocalization';
import { universities, type University } from '../../constants/universities';

interface RelatedUniversitiesProps {
    uni: University;
}

export const RelatedUniversities = ({ uni }: RelatedUniversitiesProps) => {
    const { currentLang, getLocalizedText } = useLocalization();

    // Related universities: same country, different id
    const relatedUnis = universities
        .filter(u => u.country === uni.country && u.id !== uni.id)
        .slice(0, 6);

    // If not enough from same country, add featured ones
    const additionalUnis = relatedUnis.length < 4
        ? universities.filter(u => u.id !== uni.id && u.country !== uni.country && u.featured).slice(0, 6 - relatedUnis.length)
        : [];

    const allRelated = [...relatedUnis, ...additionalUnis];

    if (allRelated.length === 0) return null;

    return (
        <section id="related" className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-[#0859BC] mb-8 font-['Tajawal'] flex items-center gap-3">
                <span className="w-10 h-10 bg-[#EBF5FF] rounded-xl flex items-center justify-center">
                    <i className="fas fa-university text-[#0859BC]"></i>
                </span>
                {currentLang === 'ar' ? 'جامعات أخرى' : 'Other Universities'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {allRelated.map((relUni: University) => (
                    <Link
                        key={relUni.id}
                        to={`/universities/${relUni.id}`}
                        className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#EBF5FF] transition-all hover:shadow-md border border-transparent hover:border-[#0859BC]/20"
                    >
                        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
                            <img
                                src={relUni.logo}
                                alt={getLocalizedText(relUni.name)}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <h4 className="text-sm font-bold text-[#203252] group-hover:text-[#0859BC] transition-colors font-['Tajawal'] mb-1 line-clamp-2">
                            {getLocalizedText(relUni.name)}
                        </h4>
                        <p className="text-xs text-gray-400 font-['Tajawal']">
                            {getLocalizedText(relUni.city)}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};
