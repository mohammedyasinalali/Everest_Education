import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogService, universityService, specialtyService, requestService } from '../services/api';

interface Stats {
  totalBlogs: number;
  totalUniversities: number;
  totalSpecialties: number;
  totalRequests: number;
}

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsData, univData, specData, reqData] = await Promise.all([
          blogService.getAll(1, 1),
          universityService.getAll(1, 1),
          specialtyService.getAll(1, 1),
          requestService.getAll(1, 5) // Fetch recent 5 requests
        ]);

        setStats({
          totalBlogs: blogsData.total || 0,
          totalUniversities: univData.total || 0,
          totalSpecialties: specData.total || 0,
          totalRequests: reqData.total || 0,
        });

        setRequests(reqData.requests || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats({ totalBlogs: 0, totalUniversities: 0, totalSpecialties: 0, totalRequests: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isRTL = i18n.language === 'ar';

  const cards = [
    {
      label: t('admin.dashboard.total_students'),
      value: stats?.totalRequests ?? 0,
      icon: '👥',
      bgClass: 'bg-[#eef2ff]', // Light Blue
      textClass: 'text-[#3b82f6]',
    },
    {
      label: t('admin.dashboard.universities'),
      value: stats?.totalUniversities ?? 0,
      icon: '🏛️',
      bgClass: 'bg-[#fff7ed]', // Light Orange
      textClass: 'text-[#f97316]',
    },
    {
      label: t('admin.dashboard.active_specialties'),
      value: stats?.totalSpecialties ?? 0,
      icon: '📗',
      bgClass: 'bg-[#f0fdf4]', // Light Green
      textClass: 'text-[#22c55e]',
    },
    {
      label: t('admin.dashboard.pending_requests'),
      value: requests.filter(r => r.status === 'pending').length ?? 0,
      icon: '🕒',
      bgClass: 'bg-[#fef2f2]', // Light Red/Pink
      textClass: 'text-[#ef4444]',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-[#fff7ed] text-[#f97316] px-3 py-1 rounded-md text-xs font-bold">{t('admin.dashboard.status.pending')}</span>;
      case 'contacted':
        return <span className="bg-[#f0fdf4] text-[#22c55e] px-3 py-1 rounded-md text-xs font-bold">{t('admin.dashboard.status.contacted')}</span>;
      case 'closed':
        return <span className="bg-[#fef2f2] text-[#ef4444] px-3 py-1 rounded-md text-xs font-bold">{t('admin.dashboard.status.closed')}</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className={`space-y-8 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold text-[#203252]">
           {t('admin.dashboard.title')}
         </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse border border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))
          : cards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.bgClass} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
              >
                <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-2xl opacity-80`}>
                   {card.icon}
                </div>
                <p className={`text-sm font-bold mb-2 ${card.textClass}`}>{card.label}</p>
                <p className="text-4xl font-black text-[#203252]">{card.value}</p>
              </div>
            ))}
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]">
           <h2 className="text-xl font-bold text-[#203252]">{t('admin.dashboard.recent_requests')}</h2>
           <Link to="/admin/requests" className="bg-[#0859BC] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
              <span className="text-lg">👥</span> {t('admin.sidebar.requests')}
           </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.student_name')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.university')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.specialty')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.date')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.status')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.dashboard.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">جاري التحميل...</td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">لا يوجد طلبات حديثة</td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${req.firstName}+${req.lastName}&background=random`} alt="User" />
                         </div>
                         <span className="font-bold text-[#203252]">{req.firstName} {req.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{req.university || '-'}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{req.service || '-'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                       {new Date(req.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                       {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <button className="text-gray-400 hover:text-[#0859BC] transition-colors"><i className="fas fa-eye"></i></button>
                         <button className="text-gray-400 hover:text-green-500 transition-colors"><i className="fas fa-pencil-alt"></i></button>
                         <button className="text-gray-400 hover:text-red-500 transition-colors"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
