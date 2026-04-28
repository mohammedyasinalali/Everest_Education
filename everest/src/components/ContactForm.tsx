import { useTranslation } from 'react-i18next';
import { Container } from './ui';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { useContactForm } from '../hooks/useContactForm';

const ContactForm = () => {
    const { t } = useTranslation();
    const { formData, isSubmitting, handleChange, handleGenderChange, handleSubmit } = useContactForm();

    const countryOptions = [
        { value: 'Turkey', label: t('contact_form.countries.turkey') },
        { value: 'Saudi Arabia', label: t('contact_form.countries.saudi_arabia') },
        { value: 'UAE', label: t('contact_form.countries.uae') }
    ];

    const helpTypeOptions = [
        { value: 'Admission', label: t('contact_form.help_types.admission') },
        { value: 'Consultation', label: t('contact_form.help_types.consultation') }
    ];

    return (
        <section className="py-20 overflow-hidden">
            <Container>
                <div className="flex flex-col lg:flex-row rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(8,89,188,0.15)]">
                    {/* Info Side (Yellow/Orange) */}
                    <div className="lg:w-2/5 bg-[#FF822E] p-12 flex flex-col justify-center relative min-h-[500px]">
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                        <div className="relative z-10 text-white">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                {t('contact_form.title')}
                            </h2>
                            <p className="text-white/90 text-lg mb-12 leading-relaxed font-medium">
                                {t('contact_form.subtitle')}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-5 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                                        <i className="fas fa-envelope text-2xl text-white transform group-hover:scale-110 transition-transform duration-300"></i>
                                    </div>
                                    <div>
                                        <div className="text-white/70 text-sm mb-1">{t('contact_form.email_label')}</div>
                                        <a href="mailto:info@everesteducation.org" className="text-xl font-bold hover:text-white/90 transition-colors block" dir="ltr">info@everesteducation.org</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                                        <i className="fas fa-phone-alt text-2xl text-white transform group-hover:scale-110 transition-transform duration-300"></i>
                                    </div>
                                    <div>
                                        <div className="text-white/70 text-sm mb-1">{t('contact_form.phone_label')}</div>
                                        <a href="tel:+905343816803" className="text-xl font-bold hover:text-white/90 transition-colors block" dir="ltr"> +90 545 136 54 95</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side (Blue) */}
                    <div className="lg:w-3/5 bg-[#0859BC] p-12 relative flex items-center">
                        <div className="absolute top-0 bottom-0 -left-1 w-24 bg-[#0859BC] hidden lg:block" style={{ clipPath: 'ellipse(50% 100% at 0% 50%)' }}></div>

                        <div className="w-full max-w-2xl mx-auto relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        name="name"
                                        label={t('contact_form.name')}
                                        placeholder={t('contact_form.name')}
                                        value={formData.name}
                                        onChange={handleChange}
                                        icon={<i className="fas fa-user text-base"></i>}
                                        required
                                    />
                                    <Input
                                        name="lastname"
                                        label={t('contact_form.lastname')}
                                        placeholder={t('contact_form.lastname')}
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Gender Radio */}
                                <div className="space-y-2">
                                    <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.gender')}</label>
                                    <div className="flex gap-4 p-1.5 rounded-2xl bg-white/10 border border-white/20 w-full">
                                        {(['male', 'female'] as const).map((g) => (
                                            <label key={g} className={`flex flex-1 items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 ${formData.gender === g ? 'bg-white text-[#0859BC] shadow-sm' : 'text-white/70 hover:bg-white/5'}`}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={formData.gender === g}
                                                    onChange={() => handleGenderChange(g)}
                                                    className="hidden"
                                                />
                                                <span className="font-medium">{t(`contact_form.${g}`)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        name="country"
                                        label={t('contact_form.country')}
                                        placeholder={t('contact_form.country')}
                                        value={formData.country}
                                        onChange={handleChange}
                                        options={countryOptions}
                                        required
                                    />
                                    <Select
                                        name="helpType"
                                        label={t('contact_form.help_type')}
                                        placeholder={t('contact_form.help_type')}
                                        value={formData.helpType}
                                        onChange={handleChange}
                                        options={helpTypeOptions}
                                        required
                                    />
                                </div>

                                <Input
                                    type="tel"
                                    name="phone"
                                    label={t('contact_form.phone')}
                                    placeholder={t('contact_form.phone')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    icon={<i className="fas fa-phone text-base"></i>}
                                    required
                                />

                                {/* Submit button */}
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full h-16 bg-white text-[#0859BC] rounded-2xl font-bold text-lg hover:bg-[#FF822E] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(255,130,46,0.3)] transform hover:-translate-y-1 mt-6 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>{t('contact_form.submit')}</span>
                                            <i className="fas fa-paper-plane text-current"></i>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactForm;
