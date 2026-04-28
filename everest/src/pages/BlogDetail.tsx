import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/ui';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { blogCategories } from '../constants/blogs';
import type { BlogPost } from '../constants/blogs';
import { publicApi } from '../services/publicApi';

const BlogDetail = () => {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = blogCategories[currentLang] || blogCategories['ar'];

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const data = await publicApi.getBlogBySlug(slug || '', currentLang);
            if (data) {
                setPost(data);
                const all = await publicApi.getBlogs(currentLang);
                setRelatedPosts(all.filter(p => p.id !== data.id).slice(0, 3));
            } else {
                setPost(null);
                setRelatedPosts([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [slug, currentLang]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : currentLang === 'fa' ? 'fa-IR' : currentLang === 'ru' ? 'ru-RU' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#0859BC] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-newspaper text-6xl text-gray-200 mb-6 block"></i>
                    <h2 className="text-2xl font-bold mb-4 font-['Tajawal'] text-[#203252]">
                        {currentLang === 'ar' ? 'المقال غير موجود' : 'Article not found'}
                    </h2>
                    <Link to="/blog" className="text-[#0859BC] hover:underline font-['Tajawal'] font-bold">
                        {currentLang === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={post.tags}
                image={post.image}
            />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 text-white overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D4A] via-[#001D4A]/70 to-transparent z-10"></div>

                <Container className="relative z-20">
                    {/* Breadcrumb */}
                    <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 mb-6 backdrop-blur-sm bg-white/5">
                        <nav className="text-sm font-medium flex items-center gap-2" aria-label="Breadcrumb">
                            <Link to="/" className="text-white/70 hover:text-white transition-colors">{t('header.home')}</Link>
                            <span className="text-[#FF822E]">/</span>
                            <Link to="/blog" className="text-white/70 hover:text-white transition-colors">{t('header.blog')}</Link>
                            <span className="text-[#FF822E]">/</span>
                            <span className="text-[#FF822E] font-semibold">{categories.find(c => c.id === post.category)?.label}</span>
                        </nav>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black font-['Tajawal'] mb-6 leading-tight max-w-4xl">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-white/80 font-['Tajawal']">
                        <span className="flex items-center gap-2">
                            <i className="fas fa-user text-[#FF822E]"></i>
                            {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fas fa-calendar-alt text-[#FF822E]"></i>
                            {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fas fa-clock text-[#FF822E]"></i>
                            {post.readTime}
                        </span>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                                <div
                                    className="prose prose-lg max-w-none font-['Tajawal']
                                        prose-headings:text-[#203252] prose-headings:font-['Tajawal'] prose-headings:font-bold
                                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                                        prose-p:text-gray-600 prose-p:leading-loose prose-p:mb-4
                                        prose-li:text-gray-600 prose-li:mb-2 prose-li:leading-relaxed
                                        prose-ul:my-4 prose-ul:pr-6
                                        prose-strong:text-[#0859BC]
                                        prose-a:text-[#0859BC] prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Tags */}
                                <div className="mt-10 pt-8 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-[#EBF5FF] text-[#0859BC] rounded-full text-sm font-bold font-['Tajawal']"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Share */}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-400 mb-4 font-['Tajawal']">
                                        {currentLang === 'ar' ? 'شارك المقال:' : 'Share:'}
                                    </h4>
                                    <div className="flex gap-3">
                                        <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`} target="_blank" rel="noreferrer"
                                            className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                            <i className="fab fa-whatsapp"></i>
                                        </a>
                                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"
                                            className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer"
                                            className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Author Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#0859BC] to-[#064a96] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-pen-nib text-white text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#203252] mb-2 font-['Tajawal']">{post.author}</h3>
                                <p className="text-sm text-gray-500 font-['Tajawal']">
                                    {currentLang === 'ar' ? 'فريق إيفرست التعليمية المتخصص في الاستشارات الأكاديمية' : 'Everest Education specialized academic consulting team'}
                                </p>
                            </div>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-[#203252] mb-6 font-['Tajawal']">
                                        {currentLang === 'ar' ? 'مقالات ذات صلة' : currentLang === 'fa' ? 'مقالات مرتبط' : currentLang === 'ru' ? 'Похожие статьи' : 'Related Articles'}
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedPosts.map(related => (
                                            <Link
                                                key={related.id}
                                                to={`/blog/${related.slug}`}
                                                className="flex gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-[#203252] group-hover:text-[#0859BC] transition-colors font-['Tajawal'] line-clamp-2 mb-1">
                                                        {related.title}
                                                    </h4>
                                                    <span className="text-xs text-gray-400 font-['Tajawal']">
                                                        {formatDate(related.publishedAt)}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-[#0859BC] to-[#064a96] rounded-3xl p-8 text-white text-center sticky top-32">
                                <i className="fas fa-graduation-cap text-4xl text-[#FF822E] mb-4 block"></i>
                                <h3 className="text-xl font-bold mb-3 font-['Tajawal']">
                                    {currentLang === 'ar' ? 'ابدأ رحلتك الدراسية' : 'Start Your Journey'}
                                </h3>
                                <p className="text-blue-100 text-sm mb-6 font-['Tajawal']">
                                    {currentLang === 'ar' ? 'تواصل معنا الآن واحصل على استشارة مجانية' : 'Contact us now for a free consultation'}
                                </p>
                                <a
                                    href="https://wa.me/905451365495"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full bg-[#FF822E] hover:bg-[#e0701f] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl font-['Tajawal'] flex items-center justify-center gap-2"
                                >
                                    <i className="fab fa-whatsapp text-xl"></i>
                                    {currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default BlogDetail;
