import type { BlogPost } from '../constants/blogs';
import type { University } from '../constants/universities';

const API_URL = 'http://localhost:5000/api';

const getImageUrl = (url: string | null | undefined) => {
    if (!url) return 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'; // fallback
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
};

export const publicApi = {
    getBlogs: async (locale: string): Promise<BlogPost[]> => {
        try {
            const res = await fetch(`${API_URL}/blogs?page=1&limit=100&published=true&locale=${locale}`);
            if (!res.ok) return [];
            const data = await res.json();
            
            // فلترة المقالات لكي تظهر فقط المقالات التي تحتوي على ترجمة باللغة المطلوبة
            const blogsWithLocale = data.blogs.filter((b: any) => b.translations && b.translations.length > 0);

            return blogsWithLocale.map((b: any) => {
                const t = b.translations[0];
                
                return {
                    id: String(b.id),
                    slug: b.slug,
                    lang: locale,
                    title: t.title || 'بدون عنوان',
                    excerpt: t.content ? t.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '',
                    content: t.content || '',
                    image: getImageUrl(b.coverImage),
                    category: 'study', // hardcoded for now
                    author: 'إيفرست',
                    publishedAt: b.createdAt,
                    readTime: '5 دقائق',
                    tags: []
                };
            });
        } catch (err) {
            console.error('Failed to fetch blogs', err);
            return [];
        }
    },

    getBlogBySlug: async (slug: string, locale: string): Promise<BlogPost | undefined> => {
        try {
            const res = await fetch(`${API_URL}/blogs/slug/${slug}?locale=${locale}`);
            if (!res.ok) return undefined;
            const b = await res.json();
            const t = b.translations?.[0] || {};
            
            return {
                id: String(b.id),
                slug: b.slug,
                lang: locale,
                title: t.title || 'بدون عنوان',
                excerpt: t.content ? t.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '',
                content: t.content || '',
                image: getImageUrl(b.coverImage),
                category: 'study',
                author: 'إيفرست',
                publishedAt: b.createdAt,
                readTime: '5 دقائق',
                tags: []
            };
        } catch (err) {
            return undefined;
        }
    },

    getUniversities: async (locale: string): Promise<University[]> => {
        try {
            const res = await fetch(`${API_URL}/universities?page=1&limit=100&published=true`);
            if (!res.ok) return [];
            const data = await res.json();
            return data.universities.map((u: any) => {
                const nameMap: Record<string, string> = {};
                const descMap: Record<string, string> = {};
                u.translations?.forEach((t: any) => {
                    nameMap[t.locale] = t.name;
                    descMap[t.locale] = t.description;
                });
                
                return {
                    id: String(u.id), // Use API ID, wait, Universities.tsx routes to /universities/:id which is slug or ID? Old mock used string ID. Let's use string id from API. Wait, UniversityDetail uses id.
                    originalSlug: u.slug,
                    name: nameMap,
                    country: u.country || 'turkey',
                    city: { ar: u.city || '', en: u.city || '' },
                    logo: getImageUrl(u.logoImage),
                    image: getImageUrl(u.logoImage), // fallback
                    established: new Date().getFullYear(),
                    description: descMap,
                    specialties: [],
                    languages: ['English', 'Turkish'],
                    tuitionRange: { ar: 'تواصل معنا', en: 'Contact us' },
                    website: u.website || '',
                    featured: false,
                };
            });
        } catch (err) {
            console.error('Failed to fetch universities', err);
            return [];
        }
    },

    getUniversityById: async (id: string, locale: string): Promise<University | undefined> => {
        try {
            const res = await fetch(`${API_URL}/universities/${id}?locale=${locale}`);
            if (!res.ok) return undefined;
            const u = await res.json();
            
            const nameMap: Record<string, string> = {};
            const descMap: Record<string, string> = {};
            u.translations?.forEach((t: any) => {
                nameMap[t.locale] = t.name;
                descMap[t.locale] = t.description;
            });
            
            return {
                id: String(u.id),
                name: nameMap,
                country: u.country || 'turkey',
                city: { ar: u.city || '', en: u.city || '' },
                logo: getImageUrl(u.logoImage),
                image: getImageUrl(u.logoImage),
                established: new Date().getFullYear(),
                description: descMap,
                specialties: [],
                languages: ['English', 'Turkish'],
                tuitionRange: { ar: 'تواصل معنا', en: 'Contact us' },
                website: u.website || '',
                featured: false,
            };
        } catch (err) {
            return undefined;
        }
    },

    submitRequest: async (data: any): Promise<boolean> => {
        try {
            const res = await fetch(`${API_URL}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return res.ok;
        } catch (err) {
            console.error('Failed to submit request', err);
            return false;
        }
    },

    getSpecialties: async (locale: string, category?: string): Promise<any[]> => {
        try {
            let url = `${API_URL}/specialties?page=1&limit=100&locale=${locale}`;
            if (category) url += `&category=${category}`;
            
            const res = await fetch(url);
            if (!res.ok) return [];
            const data = await res.json();
            
            return data.specialties.map((s: any) => ({
                id: s.slug,
                category: s.category,
                name: s.name,
                nameEn: s.name, // Fallback since it's locale-specific now
                icon: s.icon || 'fas fa-graduation-cap',
                color: s.color || '#0859BC',
                image: getImageUrl(s.image) || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
                duration: s.duration || '',
                language: s.language || '',
                description: s.description || '',
                tags: s.tags ? s.tags.split(',') : [],
            }));
        } catch (err) {
            console.error('Failed to fetch specialties', err);
            return [];
        }
    }
};
