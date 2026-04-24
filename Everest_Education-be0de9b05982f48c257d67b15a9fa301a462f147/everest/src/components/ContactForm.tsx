import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './ui';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        gender: 'male',
        country: '',
        helpType: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('contact_form.success_message'));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                        {/* Decorative Curve - Custom Shape for transition */}
                        <div className="absolute top-0 bottom-0 -left-1 w-24 bg-[#0859BC] hidden lg:block" style={{ clipPath: 'ellipse(50% 100% at 0% 50%)' }}></div>
                        {/* Actually, styling the curve is tricky without complex SVG or clip-path. The user image has a rounded overlapping effect. */}
                        {/* A simple rounded container for the form inputs can work too. */}

                        <div className="w-full max-w-2xl mx-auto relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.name')}</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md shadow-inner"
                                                placeholder={t('contact_form.name')}
                                            />
                                            <i className="fas fa-user text-base absolute top-1/2 -translate-y-1/2 left-4 text-white/30 pointer-events-none group-focus-within:text-white/80 transition-colors rtl:left-auto rtl:right-4"></i>
                                        </div>
                                    </div>
                                    {/* Lastname */}
                                    <div className="space-y-2">
                                        <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.lastname')}</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md shadow-inner"
                                                placeholder={t('contact_form.lastname')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.gender')}</label>
                                    <div className="flex gap-4 p-1.5 rounded-2xl bg-white/10 border border-white/20 w-full">
                                        {['male', 'female'].map((g) => (
                                            <label key={g} className={`flex flex-1 items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 ${formData.gender === g ? 'bg-white text-[#0859BC] shadow-sm' : 'text-white/70 hover:bg-white/5'}`}>
                                                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="hidden" />
                                                <span className="font-medium">{t(`contact_form.${g}`)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Country & Help Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.country')}</label>
                                        <div className="relative">
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#0859BC] text-white/50">{t('contact_form.country')}</option>
                                                <option value="Turkey" className="bg-[#0859BC] text-white">{t('contact_form.countries.turkey')}</option>
                                                <option value="Saudi Arabia" className="bg-[#0859BC] text-white">{t('contact_form.countries.saudi_arabia')}</option>
                                                <option value="UAE" className="bg-[#0859BC] text-white">{t('contact_form.countries.uae')}</option>
                                            </select>
                                            <i className="fas fa-chevron-down text-base absolute top-1/2 -translate-y-1/2 left-4 text-white/50 pointer-events-none rtl:left-auto rtl:right-4"></i>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.help_type')}</label>
                                        <div className="relative">
                                            <select
                                                name="helpType"
                                                value={formData.helpType}
                                                onChange={handleChange}
                                                className="w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#0859BC] text-white/50">{t('contact_form.help_type')}</option>
                                                <option value="Admission" className="bg-[#0859BC] text-white">{t('contact_form.help_types.admission')}</option>
                                                <option value="Consultation" className="bg-[#0859BC] text-white">{t('contact_form.help_types.consultation')}</option>
                                            </select>
                                            <i className="fas fa-chevron-down text-base absolute top-1/2 -translate-y-1/2 left-4 text-white/50 pointer-events-none rtl:left-auto rtl:right-4"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-white/90 text-sm font-medium pr-2 block">{t('contact_form.phone')}</label>
                                    <div className="relative group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full h-14 pr-5 pl-12 rtl:pl-5 rtl:pr-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md shadow-inner"
                                            placeholder={t('contact_form.phone')}
                                        />
                                        <i className="fas fa-phone text-base absolute top-1/2 -translate-y-1/2 left-4 text-white/30 pointer-events-none group-focus-within:text-white/80 transition-colors rtl:left-auto rtl:right-4"></i>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button type="submit" className="w-full h-16 bg-white text-[#0859BC] rounded-2xl font-bold text-lg hover:bg-[#FF822E] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(255,130,46,0.3)] transform hover:-translate-y-1 mt-6 flex items-center justify-center gap-3">
                                    <span>{t('contact_form.submit')}</span>
                                    <i className="fas fa-paper-plane text-current"></i>
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
