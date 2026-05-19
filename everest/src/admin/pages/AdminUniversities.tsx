import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { universityService, authService } from '../services/api';

interface University {
  id: number;
  slug: string;
  logoImage: string | null;
  country: string | null;
  city: string | null;
  published: boolean;
  createdAt: string;
  translations: { locale: string; name: string }[];
}

export default function AdminUniversities() {
  const { t, i18n } = useTranslation();
  const [universities, setUniversities] = useState<University[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const data = await universityService.getAll();
      setUniversities(data.universities || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUniversities(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(t('admin.common.confirm_delete'))) return;
    setDeleting(id);
    try {
      await universityService.delete(id);
      setUniversities((prev) => prev.filter((u) => u.id !== id));
      setTotal((t) => t - 1);
    } catch (err: any) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const getName = (u: University) => {
    const ar = u.translations.find((t) => t.locale === 'ar');
    const en = u.translations.find((t) => t.locale === 'en');
    return i18n.language === 'ar' 
      ? (ar?.name || en?.name || u.translations[0]?.name || '—')
      : (en?.name || ar?.name || u.translations[0]?.name || '—');
  };

  const isRTL = i18n.language === 'ar';

  const adminUser = authService.getCurrentAdmin();
  const allowedLanguages = adminUser?.role === 'SUPER_ADMIN' 
    ? null 
    : adminUser?.languages ? adminUser.languages.split(',') : [];

  const displayUniversities = universities.filter(u => {
    if (allowedLanguages && !u.translations.some(t => allowedLanguages.includes(t.locale))) {
      return false;
    }
    return true;
  });

  return (
    <div className={`space-y-6 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#203252]">{t('admin.universities.title')}</h1>
          <p className="text-gray-500 text-sm mt-1 font-bold">{total} {t('admin.universities.total_universities')}</p>
        </div>
        <Link
          to="/admin/universities/new"
          className="bg-[#0859BC] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {t('admin.universities.add_university')}
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-bold">
            {t('admin.common.loading')}
          </div>
        ) : universities.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fas fa-university"></i>
            </div>
            <p className="text-gray-500 font-bold text-lg mb-2">{t('admin.common.no_data')}</p>
            <Link to="/admin/universities/new" className="text-[#0859BC] hover:underline font-bold text-sm inline-block">
              + {t('admin.universities.add_university')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f8fafc] border-b border-gray-100">
                <tr>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.universities.table.university')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.universities.table.location')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.universities.table.languages')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.universities.table.status')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.universities.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayUniversities.map((univ) => (
                  <tr key={univ.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {univ.logoImage ? (
                          <div className="w-12 h-12 rounded-xl border border-gray-100 bg-white p-1 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img
                              src={`http://localhost:5000${univ.logoImage}`}
                              alt=""
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-university text-xl"></i>
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[#203252] text-base">{getName(univ)}</p>
                          <p className="text-xs text-gray-400 font-sans mt-0.5"><span className="bg-gray-100 px-1.5 py-0.5 rounded">{univ.slug}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-bold">
                      {[univ.city, univ.country].filter(Boolean).join('، ') || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {univ.translations.map((tr) => (
                          <span key={tr.locale} className="px-2 py-1 bg-gray-100 text-gray-600 font-bold text-xs rounded-md">
                            {tr.locale.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${
                        univ.published
                          ? 'bg-[#f0fdf4] text-[#22c55e]'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {univ.published ? t('admin.common.published') : t('admin.common.draft')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/universities/edit/${univ.id}`}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title={t('admin.common.edit')}
                        >
                          <i className="fas fa-pencil-alt text-lg"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(univ.id)}
                          disabled={deleting === univ.id}
                          className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title={t('admin.common.delete')}
                        >
                          <i className="fas fa-trash text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
