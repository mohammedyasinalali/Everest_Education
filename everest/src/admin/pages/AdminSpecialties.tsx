import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { specialtyService } from '../services/api';

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
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [langFilter, setLangFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);

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
      alert('فشل في جلب التخصصات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, [page, langFilter, categoryFilter]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التخصص؟')) return;
    try {
      await specialtyService.delete(id);
      fetchSpecialties();
    } catch (err) {
      alert('فشل الحذف');
    }
  };

  const togglePublish = async (specialty: Specialty) => {
    try {
      await specialtyService.update(specialty.id, { ...specialty, published: !specialty.published });
      fetchSpecialties();
    } catch (err) {
      alert('فشل في التحديث');
    }
  };

  const langLabels: Record<string, string> = {
    ar: 'العربية',
    en: 'English',
    fa: 'فارسی',
    ru: 'Русский'
  };

  const categoryLabels: Record<string, string> = {
    bachelor: 'بكالوريوس',
    master: 'ماجستير',
    phd: 'دكتوراه',
    diploma: 'دبلوم',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-['Tajawal'] text-gray-800">إدارة التخصصات</h1>
        <Link 
          to="/admin/specialties/new" 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          إضافة تخصص
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <select 
          value={langFilter} 
          onChange={(e) => { setLangFilter(e.target.value); setPage(1); }}
          className="border rounded-lg px-4 py-2 font-['Tajawal'] outline-none focus:ring-2 focus:ring-[#FF822E]"
        >
          <option value="">كل اللغات</option>
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fa">فارسی</option>
          <option value="ru">Русский</option>
        </select>

        <select 
          value={categoryFilter} 
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="border rounded-lg px-4 py-2 font-['Tajawal'] outline-none focus:ring-2 focus:ring-[#FF822E]"
        >
          <option value="">كل الدرجات</option>
          <option value="bachelor">بكالوريوس</option>
          <option value="master">ماجستير</option>
          <option value="phd">دكتوراه</option>
          <option value="diploma">دبلوم</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-['Tajawal']">جاري التحميل...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right font-['Tajawal']">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">اسم التخصص</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الرابط (Slug)</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الدرجة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">اللغة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الحالة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {specialties.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      لا يوجد تخصصات مضافة
                    </td>
                  </tr>
                ) : (
                  specialties.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500" dir="ltr">{item.slug}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {categoryLabels[item.category] || item.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {langLabels[item.locale] || item.locale}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => togglePublish(item)}
                          className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
                            item.published 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {item.published ? 'منشور' : 'مسودة'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link 
                            to={`/admin/specialties/edit/${item.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        )}
        
        {/* Pagination */}
        {total > 15 && (
          <div className="px-6 py-4 border-t flex justify-between items-center bg-gray-50">
            <span className="text-sm text-gray-600 font-['Tajawal']">إجمالي: {total}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                السابق
              </button>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * 15 >= total}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
