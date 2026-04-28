import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
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
    if (!confirm(t('admin.common.confirm_delete'))) return;
    setDeleting(id);
    try {
      await blogService.delete(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setTotal((t) => t - 1);
    } catch (err: any) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const getTitle = (blog: Blog) => {
    const ar = blog.translations.find((t) => t.locale === 'ar');
    const en = blog.translations.find((t) => t.locale === 'en');
    return i18n.language === 'ar' 
      ? (ar?.title || en?.title || blog.translations[0]?.title || '—')
      : (en?.title || ar?.title || blog.translations[0]?.title || '—');
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-6 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#203252]">{t('admin.blogs.title')}</h1>
          <p className="text-gray-500 text-sm mt-1 font-bold">{total} {t('admin.blogs.total_blogs')}</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="bg-[#0859BC] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {t('admin.blogs.add_blog')}
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 font-bold">
            {t('admin.common.loading')}
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fas fa-file-alt"></i>
            </div>
            <p className="text-gray-500 font-bold text-lg mb-2">{t('admin.common.no_data')}</p>
            <Link to="/admin/blogs/new" className="text-[#0859BC] hover:underline font-bold text-sm inline-block">
              + {t('admin.blogs.add_blog')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f8fafc] border-b border-gray-100">
                <tr>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.blogs.table.article')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.blogs.table.author')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.blogs.table.date')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.blogs.table.status')}</th>
                  <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.blogs.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.coverImage ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={`http://localhost:5000${blog.coverImage}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-file-alt text-xl"></i>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-[#203252] text-base truncate max-w-[200px]">{getTitle(blog)}</p>
                          <p className="text-xs text-gray-400 font-sans mt-0.5"><span className="bg-gray-100 px-1.5 py-0.5 rounded">{blog.slug}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-bold">
                      <div className="flex gap-1 flex-wrap">
                        {blog.translations.map((tr) => (
                          <span key={tr.locale} className="px-2 py-1 bg-gray-100 text-gray-600 font-bold text-xs rounded-md">
                            {tr.locale.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm font-sans" dir="ltr">
                      {new Date(blog.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${
                        blog.published
                          ? 'bg-[#f0fdf4] text-[#22c55e]'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {blog.published ? t('admin.common.published') : t('admin.common.draft')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="text-gray-400 hover:text-green-500 transition-colors"
                          title={t('admin.common.edit')}
                        >
                          <i className="fas fa-pencil-alt text-lg"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={deleting === blog.id}
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
