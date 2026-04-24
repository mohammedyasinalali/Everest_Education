import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
<<<<<<< HEAD
import { blogCategories } from '../constants/blogs';
import type { BlogPost } from '../constants/blogs';
import { publicApi } from '../services/publicApi';
=======
import { getPostsByLang, blogCategories } from '../constants/blogs';
import type { BlogPost } from '../constants/blogs';
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147

const POSTS_PER_PAGE = 6;

const Blog = () => {
    const { t, i18n } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const currentLang = i18n.language;
<<<<<<< HEAD
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const data = await publicApi.getBlogs(currentLang);
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, [currentLang]);

=======
    const posts = getPostsByLang(currentLang);
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147
    const categories = blogCategories[currentLang] || blogCategories['ar'];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeFilter === 'all' || post.category === activeFilter;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
            || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            || post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Reset to page 1 when filter/search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchQuery]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    // Format date based on language
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : currentLang === 'fa' ? 'fa-IR' : currentLang === 'ru' ? 'ru-RU' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <SEO
                title={t('header.blog')}
                description={t('blog_description') || undefined}
            />

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop")',
                        backgroundPosition: 'center 40%'
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#001D4A]/80 z-10"></div>

                <Container className="relative z-20 text-center">
                    <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm bg-white/5">
                        <nav className="text-sm font-medium flex items-center justify-center gap-2" aria-label="Breadcrumb">
                            <Link to="/" className="text-white/70 hover:text-white transition-colors">{t('header.home')}</Link>
                            <span className="text-secondary">/</span>
                            <span className="text-secondary font-semibold">{t('header.blog')}</span>
                        </nav>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-['Tajawal'] leading-tight">
                        {t('blog_title') || t('header.blog')}
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Tajawal'] mb-10">
                        {t('blog_description') || ''}
                    </p>
                </Container>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Search & Filter Section */}
            <section className="py-16 bg-white relative">
                <div className="absolute top-0 left-0 w-80 h-80 bg-[#FF822E]/5 rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#0859BC]/5 rounded-full translate-x-1/4 pointer-events-none"></div>

                <Container size="xl">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={currentLang === 'ar' ? 'ابحث في المدونة...' : currentLang === 'fa' ? 'جستجو در وبلاگ...' : currentLang === 'ru' ? 'Поиск по блогу...' : 'Search the blog...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#0859BC] focus:outline-none text-lg font-['Tajawal'] bg-gray-50/50 transition-all shadow-sm focus:shadow-lg pr-14"
                            />
                            <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 font-['Tajawal'] ${activeFilter === cat.id
                                    ? 'bg-[#0859BC] text-white shadow-lg shadow-[#0859BC]/30 scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
<<<<<<< HEAD
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin w-10 h-10 border-4 border-[#0859BC] border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
=======
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {paginatedPosts.map((post: BlogPost) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                            >
                                {/* Image with date overlay */}
                                <div className="h-60 overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    {/* Date Badge on image */}
                                    <div className="absolute bottom-4 right-4">
                                        <span className="text-sm font-semibold px-4 py-2 rounded-lg font-['Tajawal'] bg-[#0859BC]/90 text-white backdrop-blur-sm shadow-md">
                                            {formatDate(post.publishedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-[#203252] mb-3 font-['Tajawal'] group-hover:text-[#0859BC] transition-colors leading-relaxed line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 font-['Tajawal'] line-clamp-2 flex-1">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More */}
                                    <div className="flex items-center gap-2 text-[#0859BC] font-bold text-sm font-['Tajawal'] group-hover:gap-4 transition-all pt-4 border-t border-gray-100">
                                        <span>{currentLang === 'ar' ? 'اقرأ المزيد' : currentLang === 'fa' ? 'ادامه مطلب' : currentLang === 'ru' ? 'Читать далее' : 'Read More'}</span>
                                        <i className={`fas ${currentLang === 'ar' || currentLang === 'fa' ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs group-hover:translate-x-[-4px] transition-transform`}></i>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
<<<<<<< HEAD
                    )}
=======
>>>>>>> be0de9b05982f48c257d67b15a9fa301a462f147

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <i className="fas fa-search text-6xl text-gray-200 mb-6 block"></i>
                            <h3 className="text-2xl font-bold text-gray-400 mb-3 font-['Tajawal']">
                                {currentLang === 'ar' ? 'لم يتم العثور على مقالات' : currentLang === 'fa' ? 'مقاله‌ای یافت نشد' : currentLang === 'ru' ? 'Статьи не найдены' : 'No articles found'}
                            </h3>
                            <p className="text-gray-400 font-['Tajawal']">
                                {currentLang === 'ar' ? 'حاول تغيير كلمات البحث أو الفلتر' : currentLang === 'fa' ? 'عبارت جستجو یا فیلتر را تغییر دهید' : currentLang === 'ru' ? 'Попробуйте изменить запрос' : 'Try changing your search or filter'}
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-16">
                            {/* First Page */}
                            <button
                                onClick={() => goToPage(1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
                                aria-label="First page"
                            >
                                <i className="fas fa-angles-right"></i>
                            </button>

                            {/* Previous Page */}
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
                                aria-label="Previous page"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 font-['Tajawal'] ${currentPage === page
                                        ? 'bg-[#0859BC] text-white shadow-lg shadow-[#0859BC]/30'
                                        : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Page */}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
                                aria-label="Next page"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            {/* Last Page */}
                            <button
                                onClick={() => goToPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-gray-100"
                                aria-label="Last page"
                            >
                                <i className="fas fa-angles-left"></i>
                            </button>
                        </div>
                    )}
                </Container>
            </section>

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default Blog;
