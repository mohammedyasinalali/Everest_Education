import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
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
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t('admin.common.confirm_delete'))) return;
    try {
      await requestService.delete(id);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const isRTL = i18n.language === 'ar';

  const getStatusBadge = (req: StudentRequest) => {
    const status = req.status;
    const SelectClass = "text-xs px-3 py-1 rounded-md font-bold outline-none cursor-pointer border-r-4 pr-2 appearance-none text-center min-w-[100px]";
    
    let colorClass = "";
    switch(status) {
      case 'pending':
        colorClass = "bg-[#fff7ed] text-[#f97316] border-[#f97316]";
        break;
      case 'contacted':
        colorClass = "bg-[#f0fdf4] text-[#22c55e] border-[#22c55e]";
        break;
      case 'closed':
        colorClass = "bg-[#fef2f2] text-[#ef4444] border-[#ef4444]";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-600 border-gray-400";
    }

    return (
      <select 
        value={status}
        onChange={(e) => handleStatusChange(req.id, e.target.value)}
        className={`${SelectClass} ${colorClass}`}
      >
        <option value="pending">{t('admin.dashboard.status.pending')}</option>
        <option value="contacted">{t('admin.dashboard.status.contacted')}</option>
        <option value="closed">{t('admin.dashboard.status.closed')}</option>
      </select>
    );
  };

  const langLabels: Record<string, string> = {
    ar: 'العربية',
    en: 'English',
    fa: 'فارسی',
    ru: 'Русский'
  };

  return (
    <div className={`space-y-6 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#203252]">{t('admin.requests_page.title')}</h1>
        <div className="flex gap-4">
          <select 
            value={langFilter} 
            onChange={(e) => { setLangFilter(e.target.value); setPage(1); }}
            className={`bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold text-[#203252] outline-none focus:ring-2 focus:ring-[#0859BC]`}
          >
            <option value="">{t('admin.common.all_languages')}</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fa">فارسی</option>
            <option value="ru">Русский</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className={`bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold text-[#203252] outline-none focus:ring-2 focus:ring-[#0859BC]`}
          >
            <option value="">{t('admin.requests_page.all_statuses')}</option>
            <option value="pending">{t('admin.dashboard.status.pending')}</option>
            <option value="contacted">{t('admin.dashboard.status.contacted')}</option>
            <option value="closed">{t('admin.dashboard.status.closed')}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.name')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.phone')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.country')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.service')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.date')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.language')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.status')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.requests_page.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.loading')}</td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.no_data')}</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                           <img src={`https://ui-avatars.com/api/?name=${req.firstName}+${req.lastName}&background=random`} alt="User" />
                         </div>
                         <span className="font-bold text-[#203252]">{req.firstName} {req.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-sans" dir="ltr">{req.phone}</td>
                    <td className="px-6 py-4 text-gray-500 font-bold">{req.country || '—'}</td>
                    <td className="px-6 py-4 text-[#0859BC] font-bold">{req.service || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm font-sans" dir="ltr">
                      {new Date(req.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-bold">
                        {langLabels[req.language] || req.language}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <a 
                          href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title="WhatsApp"
                        >
                          <i className="fab fa-whatsapp text-lg"></i>
                        </a>
                        <button 
                          onClick={() => handleDelete(req.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title={t('admin.common.delete')}
                        >
                          <i className="fas fa-trash text-lg"></i>
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
