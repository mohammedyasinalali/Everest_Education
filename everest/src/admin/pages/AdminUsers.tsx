import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '../services/api';

interface AdminUser {
  id: number;
  email: string;
  role: string;
  permissions: string | null;
  languages: string | null;
  createdAt: string;
}

export default function AdminUsers() {
  const { t, i18n } = useTranslation();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'SUB_ADMIN',
    permissions: [] as string[],
    languages: [] as string[],
  });

  const availableModules = [
    { value: 'dashboard', label: t('admin.sidebar.dashboard') },
    { value: 'universities', label: t('admin.sidebar.universities') },
    { value: 'specialties', label: t('admin.sidebar.specialties') },
    { value: 'blogs', label: t('admin.sidebar.blogs') },
    { value: 'requests', label: t('admin.sidebar.requests') },
  ];

  const availableLanguages = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fa', label: 'فارسی' },
    { value: 'ru', label: 'Русский' },
  ];

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAll();
      setAdmins(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleOpenModal = (admin?: AdminUser) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        email: admin.email,
        password: '',
        role: admin.role,
        permissions: admin.permissions ? admin.permissions.split(',') : [],
        languages: admin.languages ? admin.languages.split(',') : [],
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        email: '',
        password: '',
        role: 'SUB_ADMIN',
        permissions: [],
        languages: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
  };

  const handleModuleToggle = (module: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(module)
        ? prev.permissions.filter((p) => p !== module)
        : [...prev.permissions, module],
    }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        password: formData.password || undefined,
        role: formData.role,
        permissions: formData.permissions.join(','),
        languages: formData.languages.join(','),
      };

      if (editingAdmin) {
        await adminService.update(editingAdmin.id, payload);
      } else {
        await adminService.create(payload);
      }
      handleCloseModal();
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert('Error saving admin');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t('admin.common.confirm_delete'))) return;
    try {
      await adminService.delete(id);
      fetchAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-6 font-['Tajawal'] ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#203252]">{t('admin.users.title')}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#0859BC] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-bold flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {t('admin.users.add_admin')}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.users.email')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.users.role')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.users.allowed_modules')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.users.allowed_languages')}</th>
                <th className={`px-6 py-4 font-bold text-[#203252] ${isRTL ? 'text-right' : 'text-left'}`}>{t('admin.common.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.loading')}</td></tr>
              ) : admins.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold">{t('admin.common.no_data')}</td></tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#203252]">{admin.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold ${admin.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {admin.role === 'SUPER_ADMIN' ? t('admin.users.role_super') : t('admin.users.role_sub')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {admin.role === 'SUPER_ADMIN' ? (
                        <span className="text-gray-400 font-medium">{t('admin.users.all_modules')}</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions?.split(',').filter(Boolean).map(p => (
                            <span key={p} className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{p}</span>
                          )) || <span className="text-gray-400 text-xs">{t('admin.users.none')}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {admin.role === 'SUPER_ADMIN' ? (
                        <span className="text-gray-400 font-medium">{t('admin.users.all_languages')}</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {admin.languages?.split(',').filter(Boolean).map(l => (
                            <span key={l} className="bg-gray-100 px-2 py-1 rounded text-xs font-bold uppercase">{l}</span>
                          )) || <span className="text-gray-400 text-xs">{t('admin.users.none')}</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleOpenModal(admin)} className="text-gray-400 hover:text-green-500 transition-colors">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button onClick={() => handleDelete(admin.id)} className="text-gray-400 hover:text-red-500 transition-colors">
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
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]">
              <h2 className="text-xl font-bold text-[#203252]">{editingAdmin ? t('admin.users.edit_admin') : t('admin.users.add_admin')}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('admin.users.email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0859BC]"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('admin.users.password')} {editingAdmin && <span className="text-gray-400 text-xs font-normal">{t('admin.users.password_note')}</span>}</label>
                  <input
                    type="password"
                    required={!editingAdmin}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0859BC]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('admin.users.role')}</label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0859BC]"
                  >
                    <option value="SUPER_ADMIN">{t('admin.users.role_super')}</option>
                    <option value="SUB_ADMIN">{t('admin.users.role_sub')}</option>
                  </select>
                </div>

                {formData.role === 'SUB_ADMIN' && (
                  <>
                    <div className="pt-4 border-t border-gray-100">
                      <label className="block text-sm font-bold text-[#203252] mb-3">{t('admin.users.allowed_modules')}</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableModules.map(module => (
                          <label key={module.value} className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.permissions.includes(module.value)}
                              onChange={() => handleModuleToggle(module.value)}
                              className="w-4 h-4 text-[#0859BC] rounded border-gray-300 focus:ring-[#0859BC]"
                            />
                            <span className="text-sm font-bold text-gray-700">{module.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <label className="block text-sm font-bold text-[#203252] mb-3">{t('admin.users.allowed_languages')}</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableLanguages.map(lang => (
                          <label key={lang.value} className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.languages.includes(lang.value)}
                              onChange={() => handleLanguageToggle(lang.value)}
                              className="w-4 h-4 text-[#0859BC] rounded border-gray-300 focus:ring-[#0859BC]"
                            />
                            <span className="text-sm font-bold text-gray-700">{lang.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">{t('admin.common.cancel')}</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-[#0859BC] text-white font-bold hover:bg-blue-700">{t('admin.users.save_admin')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
