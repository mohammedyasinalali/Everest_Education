import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { specialtyService, authService } from '../services/api';

interface Specialty {
  id: number;
  slug: string;
  name: string;
  category: string;
  locale: string;
  published: boolean;
  createdAt: string;
}

export const AdminSpecialties = () => {
  const { t, i18n } = useTranslation();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [langFilter, setLangFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const adminUser = authService.getCurrentAdmin();
  const allowedLanguages = adminUser?.role === 'SUPER_ADMIN' 
    ? null 
    : adminUser?.languages ? adminUser.languages.split(',') : [];

  const fetchSpecialties = async () => {
    setLoading(true);
    try {
      const data = await specialtyService.getAll(page, 15, categoryFilter, langFilter);
      if (data.specialties) {
        setSpecialties(data.specialties);
        setTotal(data.total || 0);
      } else {
        setSpecialties([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, [page, langFilter, categoryFilter]);

  const handleDelete = async (id: number) => {
    if (!window.confirm(t('admin.common.confirm_delete'))) return;
    try {
      await specialtyService.delete(id);
      fetchSpecialties();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublish = async (specialty: Specialty) => {
    try {
      await specialtyService.update(specialty.id, { ...specialty, published: !specialty.published });
      fetchSpecialties();
    } catch (err) {
      console.error(err);
    }
  };

  const isRTL = i18n.language === 'ar';

  const categoryLabels: Record<string, string> = {
    bachelor: t('admin.specialties.degrees.bachelor'),
    master: t('admin.specialties.degrees.master'),
    phd: t('admin.specialties.degrees.phd'),
    diploma: t('admin.specialties.degrees.diploma'),
  };

  const langLabels: Record<string, string> = {
    ar: 'العربية',
    en: 'English',
    fa: 'فارسی',
    ru: 'Русский'
  };

  const availableLanguages = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fa', label: 'فارسی' },
    { value: 'ru', label: 'Русский' },
  ].filter(lang => !allowedLanguages || allowedLanguages.includes(lang.value));

  return (
    <div className={`space-y-6 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#203252]">{t('admin.specialties.title')}</h1>
        <Link 
          to="/admin/specialties/new" 
          className="bg-[#0859BC] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {t('admin.specialties.add_specialty')}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {availableLanguages.length > 0 && (
          <select 
            value={langFilter} 
            onChange={(e) => { setLangFilter(e.target.value); setPage(1); }}
            className={`bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold text-[#203252] outline-none focus:ring-2 focus:ring-[#0859BC]`}
          >
            <option value="">{t('admin.common.all_languages')}</option>
            {availableLanguages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        )}

        <select 
          value={categoryFilter} 
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className={`bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold text-[#203252] outline-none focus:ring-2 focus:ring-[#0859BC]`}
        >
          <option value="">{t('admin.specialties.all_degrees')}</option>
          <option value="bachelor">{t('admin.specialties.degrees.bachelor')}</option>
          <option value="master">{t('admin.specialties.degrees.master')}</option>
          <option value="phd">{t('admin.specialties.degrees.phd')}</option>
          <option value="diploma">{t('admin.specialties.degrees.diploma')}</option>
        </select>
      </div>

      {/* Modern Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.name')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.slug')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.degree')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.language')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.status')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.specialties.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.loading')}</td>
                </tr>
              ) : specialties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.no_data')}</td>
                </tr>
              ) : (
                specialties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center text-blue-500">
                           <i className="fas fa-graduation-cap"></i>
                         </div>
                         <span className="font-bold text-[#203252]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium font-sans">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{item.slug}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-bold">
                      {categoryLabels[item.category] || item.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-bold">
                        {langLabels[item.locale] || item.locale}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => togglePublish(item)}
                        className={`text-xs px-3 py-1 rounded-md font-bold transition-colors ${
                          item.published 
                            ? 'bg-[#f0fdf4] text-[#22c55e] hover:bg-green-100' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {item.published ? t('admin.common.published') : t('admin.common.draft')}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link 
                          to={`/admin/specialties/edit/${item.id}`}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title={t('admin.common.edit')}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title={t('admin.common.delete')}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {total > 15 && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-[#f8fafc]">
            <span className="text-sm text-gray-600 font-bold">إجمالي: {total}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold hover:bg-gray-50 disabled:opacity-50"
              >
                {isRTL ? 'السابق' : 'Prev'}
              </button>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * 15 >= total}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold hover:bg-gray-50 disabled:opacity-50"
              >
                {isRTL ? 'التالي' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
