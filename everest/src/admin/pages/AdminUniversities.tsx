import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { universityService } from '../services/api';

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
    if (!confirm('هل أنت متأكد من حذف هذه الجامعة؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    setDeleting(id);
    try {
      await universityService.delete(id);
      setUniversities((prev) => prev.filter((u) => u.id !== id));
      setTotal((t) => t - 1);
    } catch (err: any) {
      alert('حدث خطأ أثناء الحذف');
    } finally {
      setDeleting(null);
    }
  };

  const getName = (u: University) => {
    const ar = u.translations.find((t) => t.locale === 'ar');
    const en = u.translations.find((t) => t.locale === 'en');
    return ar?.name || en?.name || u.translations[0]?.name || '—';
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">الجامعات</h1>
          <p className="text-gray-400 text-sm mt-1">{total} جامعة إجمالاً</p>
        </div>
        <Link
          to="/admin/universities/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-indigo-600/20"
        >
          <span>+</span> إضافة جامعة
        </Link>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3"></div>
            جاري التحميل...
          </div>
        ) : universities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">🏛️</p>
            <p className="text-gray-400">لا يوجد جامعات حتى الآن.</p>
            <Link to="/admin/universities/new" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 inline-block">
              أضف أول جامعة ←
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الجامعة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الموقع</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">اللغات المتوفرة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {universities.map((univ) => (
                  <tr key={univ.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {univ.logoImage ? (
                          <img
                            src={`http://localhost:5000${univ.logoImage}`}
                            alt=""
                            className="w-10 h-10 rounded-lg object-contain bg-white p-1 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600 flex-shrink-0">
                            🏛️
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">{getName(univ)}</p>
                          <p className="text-xs text-gray-500 text-left" dir="ltr">{univ.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {[univ.city, univ.country].filter(Boolean).join('، ') || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {univ.translations.map((t) => (
                          <span key={t.locale} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-md">
                            {t.locale.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        univ.published
                          ? 'bg-green-900/40 text-green-400 border border-green-800'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${univ.published ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                        {univ.published ? 'منشورة' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/universities/edit/${univ.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-indigo-400 bg-indigo-900/20 border border-indigo-800/50 rounded-lg hover:bg-indigo-900/40 transition-colors"
                        >
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(univ.id)}
                          disabled={deleting === univ.id}
                          className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg hover:bg-red-900/40 transition-colors disabled:opacity-50"
                        >
                          {deleting === univ.id ? 'جاري...' : 'حذف'}
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
