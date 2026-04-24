import { useEffect, useState, FormEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogService } from '../services/api';
import { LOCALES } from '../constants';

interface Translation {
  locale: string;
  title: string;
  content: string;
}

const defaultTranslations = (): Translation[] =>
  LOCALES.map(({ code }) => ({ locale: code, title: '', content: '' }));

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>(defaultTranslations());
  const [activeLocale, setActiveLocale] = useState('ar'); // Default to Arabic in RTL mode
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const fetch = async () => {
      try {
        const blog = await blogService.getById(Number(id));
        setSlug(blog.slug);
        setPublished(blog.published);
        if (blog.coverImage) setImagePreview(`http://localhost:5000${blog.coverImage}`);
        const merged = defaultTranslations().map((def) => {
          const found = blog.translations.find((t: Translation) => t.locale === def.locale);
          return found ? { locale: found.locale, title: found.title, content: found.content } : def;
        });
        setTranslations(merged);
      } catch {
        setError('فشل في جلب بيانات المقال');
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, [id, isEdit]);

  const updateTranslation = (locale: string, field: 'title' | 'content', value: string) => {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, [field]: value } : t))
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleTitleChange = (value: string) => {
    updateTranslation('en', 'title', value);
    if (!isEdit && activeLocale === 'en') setSlug(autoSlug(value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const filledTranslations = translations.filter((t) => t.title.trim() || t.content.trim());

    if (!slug) {
      setError('الرابط (Slug) مطلوب.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('published', String(published));
    formData.append('translations', JSON.stringify(filledTranslations));
    if (imageFile) formData.append('coverImage', imageFile);

    try {
      if (isEdit) {
        await blogService.update(Number(id), formData);
      } else {
        await blogService.create(formData);
      }
      navigate('/admin/blogs');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const activeTrans = translations.find((t) => t.locale === activeLocale)!;

  return (
    <div className="max-w-4xl space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/blogs')}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          → عودة
        </button>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? 'تعديل المقال' : 'مقال جديد'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Tabs */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="flex border-b border-gray-800">
                {LOCALES.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setActiveLocale(code)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeLocale === code
                        ? 'text-white border-b-2 border-blue-500 bg-blue-600/5'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{flag}</span>
                    <span>{label}</span>
                    {translations.find((t) => t.locale === code)?.title && (
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    العنوان <span className="text-gray-500">({activeLocale})</span>
                  </label>
                  <input
                    type="text"
                    value={activeTrans.title}
                    onChange={(e) =>
                      activeLocale === 'en'
                        ? handleTitleChange(e.target.value)
                        : updateTranslation(activeLocale, 'title', e.target.value)
                    }
                    placeholder={`عنوان المقال باللغة ${LOCALES.find((l) => l.code === activeLocale)?.label}`}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    dir={['ar', 'fa'].includes(activeLocale) ? 'rtl' : 'ltr'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    المحتوى <span className="text-gray-500">({activeLocale})</span>
                  </label>
                  <textarea
                    value={activeTrans.content}
                    onChange={(e) => updateTranslation(activeLocale, 'content', e.target.value)}
                    rows={12}
                    placeholder={`اكتب محتوى المقال هنا...`}
                    dir={['ar', 'fa'].includes(activeLocale) ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Publish */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">حالة النشر</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${published ? 'bg-blue-600' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white transition-transform ${published ? '-translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                <span className="text-sm text-gray-300">{published ? 'منشور' : 'مسودة'}</span>
              </label>
            </div>

            {/* Slug */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <label className="block text-sm font-semibold text-white mb-3">رابط المقال (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                dir="ltr"
                placeholder="my-blog-post"
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-left"
              />
              <p className="text-xs text-gray-500 mt-2 text-left" dir="ltr">/blog/{slug || 'slug'}</p>
            </div>

            {/* Cover Image */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h3 className="text-sm font-semibold text-white mb-3">صورة الغلاف</h3>
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="" className="w-full h-40 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                    className="absolute top-2 left-2 w-7 h-7 bg-red-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-600/5 transition-all">
                  <span className="text-2xl mb-1">🖼️</span>
                  <span className="text-xs text-gray-400">اضغط لرفع صورة</span>
                  <span className="text-xs text-gray-600 mt-1">PNG, JPG, WebP لغاية 5MB</span>
                </label>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {!imagePreview && (
                <button type="button" onClick={() => fileRef.current?.click()} className="mt-3 w-full py-2 text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  اختر ملفاً
                </button>
              )}
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              {loading ? 'جاري الحفظ...' : isEdit ? 'حفظ التعديلات' : 'نشر المقال'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
