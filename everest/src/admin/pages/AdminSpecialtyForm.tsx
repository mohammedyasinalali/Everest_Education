import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { specialtyService } from '../services/api';

// Helper: auto-generate slug from name
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')  // keep arabic + english + dashes
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
};

export const AdminSpecialtyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditing = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    slug: '',
    locale: 'ar',
    name: '',
    category: 'bachelor',
    icon: 'fas fa-graduation-cap',
    color: '#0859BC',
    image: '',
    duration: '',
    language: '',
    description: '',
    tags: '',
    published: true,
  });

  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [stages, setStages] = useState<string[]>([]);
  const [careers, setCareers] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      fetchSpecialty();
    }
  }, [id]);

  const fetchSpecialty = async () => {
    try {
      setLoading(true);
      const data = await specialtyService.getById(Number(id));
      setFormData({ ...data });
      try {
        if (data.stages) setStages(JSON.parse(data.stages));
      } catch (e) {}
      try {
        if (data.careers) setCareers(JSON.parse(data.careers));
      } catch (e) {}
      if (data.image) {
        if (data.image.startsWith('/uploads')) {
          setImageMode('upload');
          setImagePreview(`http://localhost:5000${data.image}`);
        } else {
          setImageMode('url');
          setImagePreview(data.image);
        }
      }
    } catch (err) {
      setError(t('admin.common.no_data')); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newVal = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newVal };
      // Auto-generate slug from name (only when creating new, not editing)
      if (name === 'name' && !isEditing) {
        updated.slug = generateSlug(String(newVal));
      }
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = { 
        ...formData,
        stages: JSON.stringify(stages.filter(s => s.trim() !== '')),
        careers: JSON.stringify(careers.filter(c => c.trim() !== ''))
      };
      // If uploading a file, clear the image URL field so the server uses the file
      if (imageMode === 'upload' && imageFile) {
        dataToSend.image = '';
      }

      if (!formData.name || !formData.slug || !formData.description) {
        throw new Error('الرجاء تعبئة جميع الحقول المطلوبة (الاسم، الرابط، النبذة)');
      }

      if (isEditing) {
        await specialtyService.update(Number(id), dataToSend, imageFile || undefined);
      } else {
        await specialtyService.create(dataToSend, imageFile || undefined);
      }
      navigate('/admin/specialties');
    } catch (err: any) {
      setError(err.message || 'Error saving');
      alert('حدث خطأ: ' + (err.message || 'Error saving'));
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div className="p-8 text-center">{t('admin.common.loading')}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
          <i className="fas fa-arrow-right"></i>
        </button>
        <h1 className="text-3xl font-bold font-['Tajawal'] text-gray-800">
          {isEditing ? t('admin.forms.edit') : t('admin.specialties.add_specialty')}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-['Tajawal'] border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-6 font-['Tajawal']">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.language_label')}</label>
            <select
              name="locale"
              value={formData.locale}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none bg-gray-50"
              disabled={isEditing}
              required
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fa">فارسی</option>
              <option value="ru">Русский</option>
            </select>
            {!isEditing && <p className="text-xs text-gray-500">{t('admin.forms.specialty.language_note')}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.name_label')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('admin.forms.specialty.name_placeholder')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.slug_label')} *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder={t('admin.forms.slug_placeholder')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none bg-gray-50"
              dir="ltr"
            />
            <p className="text-xs text-gray-500">
              {t('admin.forms.slug_note')} <span dir="ltr" className="text-blue-600">eversteducation.org/specialties/<strong>{formData.slug || 'medicine'}</strong></span>
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.degree_label')}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none bg-gray-50"
            >
              <option value="bachelor">{t('admin.specialties.degrees.bachelor')}</option>
              <option value="master">{t('admin.specialties.degrees.master')}</option>
              <option value="phd">{t('admin.specialties.degrees.phd')}</option>
              <option value="diploma">{t('admin.specialties.degrees.diploma')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.duration_label')}</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder={t('admin.forms.specialty.duration_placeholder')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">لغة الدراسة</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none bg-gray-50"
            >
              <option value="">غير محدد</option>
              <option value="التركية">التركية</option>
              <option value="الإنجليزية">الإنجليزية</option>
              <option value="التركية والإنجليزية">التركية والإنجليزية</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.icon_label')}</label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="fas fa-stethoscope"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none"
                dir="ltr"
              />
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: formData.color }}
              >
                <i className={formData.icon}></i>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-700">{t('admin.forms.specialty.icon_color_label')}</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-12 p-1 border rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* ── Image Section ── */}
        <div className="space-y-3 border-t pt-6">
          <label className="font-bold text-gray-700 block">{t('admin.forms.cover_image')}</label>
          
          {/* Toggle */}
          <div className="flex gap-2 mb-4">
            <button 
              type="button"
              onClick={() => setImageMode('upload')}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors ${
                imageMode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-upload mx-2"></i>
              {t('admin.forms.upload_image')}
            </button>
            <button 
              type="button"
              onClick={() => setImageMode('url')}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-colors ${
                imageMode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-link mx-2"></i>
              {t('admin.forms.paste_url')}
            </button>
          </div>

          {imageMode === 'upload' ? (
            <div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
              >
                {imagePreview && imageMode === 'upload' ? (
                  <img src={imagePreview} alt="preview" className="max-h-48 mx-auto rounded-lg mb-3" />
                ) : (
                  <div className="text-gray-400">
                    <i className="fas fa-cloud-upload-alt text-4xl mb-3 block"></i>
                    <p className="font-bold">{t('admin.forms.click_to_upload')}</p>
                    <p className="text-xs mt-1">{t('admin.forms.image_format')}</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={(e) => {
                  handleChange(e);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none"
                dir="ltr"
              />
              {imagePreview && imageMode === 'url' && (
                <img src={imagePreview} alt="preview" className="max-h-48 rounded-lg mt-3" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-700">{t('admin.forms.specialty.short_desc_label')}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('admin.forms.specialty.short_desc_placeholder')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-700">لماذا دراسة هذا التخصص؟</label>
          <textarea
            name="advantages"
            value={(formData as any).advantages || ''}
            onChange={handleChange}
            placeholder={t('admin.forms.specialty.advantages_placeholder')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none min-h-[120px]"
          />
          <p className="text-xs text-gray-500">{t('admin.forms.specialty.advantages_note')}</p>
        </div>

        {/* Dynamic Stages Section */}
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">المراحل الدراسية خلال السنوات</label>
            <button type="button" onClick={() => setStages([...stages, ''])} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              + إضافة مرحلة
            </button>
          </div>
          {stages.map((stage, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text" 
                value={stage}
                onChange={(e) => {
                  const newStages = [...stages];
                  newStages[index] = e.target.value;
                  setStages(newStages);
                }}
                placeholder={`المرحلة ${index + 1}`}
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => setStages(stages.filter((_, i) => i !== index))} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          {stages.length === 0 && <p className="text-sm text-gray-500 text-center">لم يتم إضافة أي مراحل. (لن يتم عرض هذا القسم للمستخدم)</p>}
        </div>

        {/* Dynamic Careers Section */}
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">مجالات العمل بعد التخرج</label>
            <button type="button" onClick={() => setCareers([...careers, ''])} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              + إضافة مجال
            </button>
          </div>
          {careers.map((career, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text" 
                value={career}
                onChange={(e) => {
                  const newCareers = [...careers];
                  newCareers[index] = e.target.value;
                  setCareers(newCareers);
                }}
                placeholder={`مجال العمل ${index + 1}`}
                className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => setCareers(careers.filter((_, i) => i !== index))} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          {careers.length === 0 && <p className="text-sm text-gray-500 text-center">لم يتم إضافة أي مجالات. (لن يتم عرض هذا القسم للمستخدم)</p>}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-700">{t('admin.forms.specialty.tags_label')}</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder={t('admin.forms.specialty.tags_placeholder')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF822E] outline-none"
            dir="ltr"
          />
          <p className="text-xs text-gray-500">{t('admin.forms.specialty.tags_note')}</p>
        </div>

        <div className="flex items-center gap-2 mt-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <label htmlFor="published" className="font-bold text-gray-700 cursor-pointer">
            {t('admin.forms.specialty.publish_label')}
          </label>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold disabled:opacity-50"
          >
            {loading ? t('admin.forms.saving') : isEditing ? t('admin.forms.save_changes') : t('admin.specialties.add_specialty')}
          </button>
        </div>
      </form>
    </div>
  );
};