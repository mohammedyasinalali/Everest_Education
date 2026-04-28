import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import { useTranslation } from 'react-i18next';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: t('admin.sidebar.dashboard'), path: '/admin', icon: '📊' },
    { label: t('admin.sidebar.universities'), path: '/admin/universities', icon: '🏛️' },
    { label: t('admin.sidebar.specialties'), path: '/admin/specialties', icon: '🎓' },
    { label: t('admin.sidebar.blogs'), path: '/admin/blogs', icon: '📝' },
    { label: t('admin.sidebar.requests'), path: '/admin/requests', icon: '✉️' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Tajawal'] text-[#203252] flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-[#203252] text-white z-50">
        <div className="flex items-center gap-2">
           <img src="/images/logo.png" alt="Everest Logo" className="h-8 w-auto bg-white rounded-full p-1" />
           <span className="text-xl font-bold tracking-tight">{t('admin.sidebar.title')}</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-50 w-64 bg-[#203252] border-[#2a4066] transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        }`}
      >
        <div className="flex flex-col h-full text-white">
          <div className="p-6">
            <div className="flex flex-col items-center gap-3 mb-8 pb-6 border-b border-[#2a4066]">
              <img src="/images/logo.png" alt="Everest Logo" className="h-20 w-20 bg-white rounded-full p-2 shadow-lg" />
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `bg-[#0859BC] font-bold ${isRTL ? 'border-r-4 border-[#FF822E]' : 'border-l-4 border-[#FF822E]'}`
                        : 'text-gray-300 hover:bg-[#2a4066] hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-[#2a4066]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <span className="text-xl">🚪</span>
              <span>{t('admin.sidebar.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${isRTL ? 'md:pr-64' : 'md:pl-64'} md:pt-0 pt-16 flex flex-col`}>
        
        {/* Top Header */}
        <header className="bg-white h-20 shadow-sm px-8 flex items-center justify-between sticky top-0 z-40">
           {/* Search */}
           <div className="relative w-96 hidden md:block">
              <input 
                type="text" 
                placeholder={t('admin.header.search')}
                className={`w-full bg-gray-50 border border-gray-200 rounded-lg py-2 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-[#0859BC] focus:ring-1 focus:ring-[#0859BC] transition-colors`}
              />
              <svg className={`absolute top-2.5 ${isRTL ? 'right-3' : 'left-3'} text-gray-400 w-5 h-5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
           </div>

           {/* Actions */}
           <div className="flex items-center gap-6 ms-auto">
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => changeLanguage('ar')}
                   className={`px-3 py-1 rounded ${i18n.language === 'ar' ? 'bg-[#0859BC] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} font-bold text-sm transition-colors`}
                 >
                   AR
                 </button>
                 <button 
                   onClick={() => changeLanguage('en')}
                   className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-[#0859BC] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} font-bold text-sm transition-colors`}
                 >
                   EN
                 </button>
              </div>

              <button className="relative p-2 text-gray-400 hover:text-[#0859BC] transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                 </svg>
                 <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FF822E] border-2 border-white rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 border-l pl-6 ml-2 border-gray-200">
                 <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-[#0859BC]">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=0859BC&color=fff" alt="Admin" className="w-full h-full object-cover" />
                 </div>
                 <div className="hidden md:block">
                    <p className="text-sm font-bold text-[#203252]">{t('admin.header.admin')}</p>
                 </div>
              </div>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
