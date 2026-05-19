import { useEffect, useState, useRef, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { universityService } from '../services/api';
import { LOCALES } from '../constants';
import { useTranslation } from 'react-i18next';

interface Translation {
  locale: string;
  name: string;
  description: string;
}

const defaultTranslations = (): Translation[] =>
  LOCALES.map(({ code }) => ({ locale: code, name: '', description: '' }));

export default function AdminUniversityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();

  const [slug, setSlug] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [published, setPublished] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>(defaultTranslations());
  const [activeLocale, setActiveLocale] = useState('ar'); // Default to Arabic
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const univ = await universityService.getById(Number(id));
        setSlug(univ.slug);
        setCountry(univ.country || '');
        setCity(univ.city || '');
        setWebsite(univ.website || '');
        setPublished(univ.published);
        if (univ.logoImage) setLogoPreview(`http://localhost:5000${univ.logoImage}`);
        const merged = defaultTranslations().map((def) => {
          const found = univ.translations.find((t: Translation) => t.locale === def.locale);
          return found ? { locale: found.locale, name: found.name, description: found.description } : def;
        });
        setTranslations(merged);
      } catch {
        setError(t('admin.common.no_data')); // fallback
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, isEdit]);

  const updateTranslation = (locale: string, field: 'name' | 'description', value: string) => {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, [field]: value } : t))
    );
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const filledTranslations = translations.filter((t) => t.name.trim() || t.description.trim());

    if (!slug) {
      setError('Slug is required');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('website', website);
    formData.append('published', String(published));
    formData.append('translations', JSON.stringify(filledTranslations));
    if (logoFile) formData.append('logoImage', logoFile);

    try {
      if (isEdit) {
        await universityService.update(Number(id), formData);
      } else {
        await universityService.create(formData);
      }
      navigate('/admin/universities');
    } catch (err: any) {
      setError(err.message || 'Error saving');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const activeTrans = translations.find((t) => t.locale === activeLocale)!;

  return (
    <div className="max-w-4xl space-y-6" dir="rtl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/universities')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          {i18n.language === 'ar' ? '→' : '←'} {t('admin.forms.back')}
        </button>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? t('admin.forms.edit') : t('admin.universities.add_university')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Multilingual Tabs */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="flex border-b border-gray-800">
                {LOCALES.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setActiveLocale(code)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeLocale === code
                        ? 'text-white border-b-2 border-indigo-500 bg-indigo-600/5'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{flag}</span>
                    <span>{label}</span>
                    {translations.find((t) => t.locale === code)?.name && (
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('admin.forms.university.name_label')} <span className="text-gray-500">({activeLocale})</span>
                  </label>
                  <input
                    type="text"
                    value={activeTrans.name}
                    onChange={(e) => {
                      updateTranslation(activeLocale, 'name', e.target.value);
                      if (!isEdit && activeLocale === 'en') setSlug(autoSlug(e.target.value));
                    }}
                    placeholder={t('admin.forms.university.name_placeholder')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    dir={['ar', 'fa'].includes(activeLocale) ? 'rtl' : 'ltr'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('admin.forms.university.desc_label')} <span className="text-gray-500">({activeLocale})</span>
                  </label>
                  <textarea
                    value={activeTrans.description}
                    onChange={(e) => updateTranslation(activeLocale, 'description', e.target.value)}
                    rows={8}
                    dir={['ar', 'fa'].includes(activeLocale) ? 'rtl' : 'ltr'}
                    placeholder={t('admin.forms.university.desc_placeholder')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* General Info */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">{t('admin.forms.university.info_title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t('admin.forms.university.country_label')}</label>
                  <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t('admin.forms.university.city_label')}</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">{t('admin.forms.university.website_label')}</label>
                  <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} dir="ltr" placeholder="https://university.edu" className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-left" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Publish */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">{t('admin.forms.publish_status')}</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition-colors ${published ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white transition-transform ${published ? '-translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                <span className="text-sm text-gray-300">{published ? t('admin.forms.published') : t('admin.forms.draft')}</span>
              </label>
            </div>

            {/* Slug */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <label className="block text-sm font-semibold text-white mb-3">{t('admin.forms.slug_label')}</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required dir="ltr" placeholder="university-name" className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-left" />
              <p className="text-xs text-gray-500 mt-2 text-left" dir="ltr">/universities/{slug || 'slug'}</p>
            </div>

            {/* Logo */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h3 className="text-sm font-semibold text-white mb-3">{t('admin.forms.university.logo_label')}</h3>
              {logoPreview ? (
                <div className="relative group">
                  <img src={logoPreview} alt="" className="w-full h-32 object-contain rounded-xl bg-white p-2" />
                  <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(null); if (fileRef.current) fileRef.current.value = ''; }} className="absolute top-2 left-2 w-7 h-7 bg-red-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">✕</button>
                </div>
              ) : (
                <button type="button" onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-700 rounded-xl hover:border-indigo-500 hover:bg-indigo-600/5 transition-all">
                  <span className="text-2xl mb-1">🏛️</span>
                  <span className="text-xs text-gray-400">{t('admin.forms.click_to_upload')}</span>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">⚠️ {error}</div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
              {loading ? t('admin.forms.saving') : isEdit ? t('admin.forms.save_changes') : t('admin.universities.add_university')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}