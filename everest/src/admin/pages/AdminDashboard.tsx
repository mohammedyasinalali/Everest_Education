import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService, universityService } from '../services/api';

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  totalUniversities: number;
  publishedUniversities: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsData, univData] = await Promise.all([
          blogService.getAll(1, 1000),
          universityService.getAll(1, 1000),
        ]);
        setStats({
          totalBlogs: blogsData.total || 0,
          publishedBlogs: (blogsData.blogs || []).filter((b: any) => b.published).length,
          totalUniversities: univData.total || 0,
          publishedUniversities: (univData.universities || []).filter((u: any) => u.published).length,
        });
      } catch {
        setStats({ totalBlogs: 0, publishedBlogs: 0, totalUniversities: 0, publishedUniversities: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: 'إجمالي المدونات',
      value: stats?.totalBlogs ?? 0,
      sub: `${stats?.publishedBlogs ?? 0} منشور`,
      icon: '📝',
      color: 'from-blue-600 to-blue-700',
      link: '/admin/blogs',
    },
    {
      label: 'الجامعات',
      value: stats?.totalUniversities ?? 0,
      sub: `${stats?.publishedUniversities ?? 0} جامعة منشورة`,
      icon: '🏛️',
      color: 'from-indigo-600 to-indigo-700',
      link: '/admin/universities',
    },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          أهلاً بك مجدداً 👋
        </h1>
        <p className="text-gray-400 mt-1">
          تم تسجيل الدخول كـ <span className="text-blue-400" dir="ltr">{user.email}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-1/3 mb-3"></div>
                <div className="h-10 bg-gray-800 rounded w-1/4"></div>
              </div>
            ))
          : cards.map(({ label, value, sub, icon, color, link }) => (
              <Link
                key={label}
                to={link}
                className="group bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">{label}</p>
                    <p className="text-4xl font-bold text-white mt-2">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{sub}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl shadow-lg`}>
                    {icon}
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/blogs/new"
            className="flex items-center gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition-colors">
              ✏️
            </div>
            <div>
              <p className="font-medium text-white text-sm">مقال جديد</p>
              <p className="text-xs text-gray-500">إنشاء مقال بجميع اللغات المدعومة</p>
            </div>
          </Link>
          <Link
            to="/admin/universities/new"
            className="flex items-center gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-indigo-600/50 hover:bg-indigo-600/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/30 transition-colors">
              🏛️
            </div>
            <div>
              <p className="font-medium text-white text-sm">إضافة جامعة</p>
              <p className="text-xs text-gray-500">إضافة ملف جامعة جديد</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
