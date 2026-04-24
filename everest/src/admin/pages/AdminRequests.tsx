import { useEffect, useState } from 'react';
import { requestService } from '../services/api';

interface StudentRequest {
  id: number;
  firstName: string;
  lastName: string;
  gender: string | null;
  country: string | null;
  phone: string;
  service: string | null;
  status: string;
  language: string;
  createdAt: string;
}

export const AdminRequests = () => {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await requestService.getAll(page, 15, statusFilter, langFilter);
      if (data.requests) {
        setRequests(data.requests);
        setTotal(data.total || 0);
      } else {
        setRequests([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
      alert('فشل في جلب الطلبات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, statusFilter, langFilter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await requestService.updateStatus(id, newStatus);
      fetchRequests();
    } catch (err) {
      alert('فشل في تحديث الحالة');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      await requestService.delete(id);
      fetchRequests();
    } catch (err) {
      alert('فشل الحذف');
    }
  };

  const statusLabels: Record<string, string> = {
    pending: 'قيد الانتظار',
    contacted: 'تم التواصل',
    closed: 'مغلق'
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    closed: 'bg-green-100 text-green-800'
  };

  const langLabels: Record<string, string> = {
    ar: 'العربية',
    en: 'English',
    fa: 'فارسی',
    ru: 'Русский'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-['Tajawal'] text-gray-800">طلبات الاستشارة</h1>
        <div className="flex gap-4">
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
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border rounded-lg px-4 py-2 font-['Tajawal'] outline-none focus:ring-2 focus:ring-[#FF822E]"
          >
            <option value="">كل الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="contacted">تم التواصل</option>
            <option value="closed">مغلق</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-['Tajawal']">جاري التحميل...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right font-['Tajawal']">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الاسم</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">رقم الهاتف</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الدولة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الخدمة المطلوبة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">تاريخ الطلب</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">اللغة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">الحالة</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      لا يوجد طلبات حالياً
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold">{req.firstName} {req.lastName}</td>
                      <td className="px-6 py-4 text-sm" dir="ltr">{req.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{req.country || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{req.service || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(req.createdAt).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {langLabels[req.language] || req.language}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className={`text-xs px-3 py-1 rounded-full font-bold outline-none cursor-pointer ${statusColors[req.status]}`}
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="contacted">تم التواصل</option>
                          <option value="closed">مغلق</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a 
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="تواصل عبر واتساب"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                          <button 
                            onClick={() => handleDelete(req.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف الطلب"
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
