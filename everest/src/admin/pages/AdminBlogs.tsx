import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/api';

interface Blog {
  id: number;
  slug: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  translations: { locale: string; title: string }[];
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getAll();
      setBlogs(data.blogs || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    setDeleting(id);
    try {
      await blogService.delete(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setTotal((t) => t - 1);
    } catch (err: any) {
      alert('حدث خطأ أثناء الحذف');
    } finally {
      setDeleting(null);
    }
  };

  const getTitle = (blog: Blog) => {
    const ar = blog.translations.find((t) => t.locale === 'ar');
    const en = blog.translations.find((t) => t.locale === 'en');
    return ar?.title || en?.title || blog.translations[0]?.title || '—';
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">المدونات</h1>
          <p className="text-gray-400 text-sm mt-1">{total} مقال إجمالاً</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-blue-600/20"
        >
          <span>+</span> مقال جديد
        </Link>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
            جاري التحميل...
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-gray-400">لا يوجد مقالات حتى الآن.</p>
            <Link to="/admin/blogs/new" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
              قم بإنشاء مقالك الأول ←
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">المقال</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">اللغات المتوفرة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">تاريخ النشر</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.coverImage ? (
                          <img
                            src={`http://localhost:5000${blog.coverImage}`}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600 flex-shrink-0">
                            📄
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate max-w-xs">{getTitle(blog)}</p>
                          <p className="text-xs text-gray-500 text-left" dir="ltr">{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {blog.translations.map((t) => (
                          <span key={t.locale} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-md">
                            {t.locale.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        blog.published
                          ? 'bg-green-900/40 text-green-400 border border-green-800'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                        {blog.published ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400" dir="ltr">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-900/20 border border-blue-800/50 rounded-lg hover:bg-blue-900/40 transition-colors"
                        >
                          تعديل
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={deleting === blog.id}
                          className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-900/20 border border-red-800/50 rounded-lg hover:bg-red-900/40 transition-colors disabled:opacity-50"
                        >
                          {deleting === blog.id ? 'جاري...' : 'حذف'}
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
