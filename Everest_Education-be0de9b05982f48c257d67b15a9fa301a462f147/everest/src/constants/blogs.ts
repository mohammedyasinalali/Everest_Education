// Blog Post Interface — Dashboard-Ready
// When migrating to a dashboard, this interface maps directly to the database schema.
// Only the data source changes (constants → API), UI stays the same.

export interface BlogPost {
    id: string;
    slug: string;
    lang: 'ar' | 'en' | 'fa' | 'ru';
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    authorImage?: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
}

// Blog categories per language
export const blogCategories: Record<string, { id: string; label: string }[]> = {
    ar: [
        { id: 'all', label: 'الكل' },
        { id: 'study', label: 'الدراسة في تركيا' },
        { id: 'university', label: 'الجامعات' },
        { id: 'student-life', label: 'حياة الطالب' },
        { id: 'tips', label: 'نصائح' },
    ],
    en: [
        { id: 'all', label: 'All' },
        { id: 'study', label: 'Study in Turkey' },
        { id: 'university', label: 'Universities' },
        { id: 'student-life', label: 'Student Life' },
        { id: 'tips', label: 'Tips' },
    ],
    fa: [
        { id: 'all', label: 'همه' },
        { id: 'study', label: 'تحصیل در ترکیه' },
        { id: 'university', label: 'دانشگاه‌ها' },
        { id: 'student-life', label: 'زندگی دانشجویی' },
        { id: 'tips', label: 'نکات' },
    ],
    ru: [
        { id: 'all', label: 'Все' },
        { id: 'study', label: 'Учёба в Турции' },
        { id: 'university', label: 'Университеты' },
        { id: 'student-life', label: 'Жизнь студента' },
        { id: 'tips', label: 'Советы' },
    ],
};

// Sample blog posts — Arabic
export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'study-medicine-in-turkey',
        lang: 'ar',
        title: 'دليل شامل لدراسة الطب البشري في تركيا 2025',
        excerpt: 'كل ما تحتاج معرفته عن دراسة الطب في الجامعات التركية الخاصة، من شروط القبول إلى التكاليف والمنح الدراسية.',
        content: `
            <h2>لماذا تختار دراسة الطب في تركيا؟</h2>
            <p>تعتبر تركيا واحدة من أفضل الوجهات لدراسة الطب البشري في المنطقة. تتميز الجامعات التركية الخاصة ببنية تحتية متطورة ومناهج حديثة تواكب المعايير العالمية.</p>
            
            <h2>شروط القبول</h2>
            <p>للتقديم على كلية الطب في الجامعات التركية الخاصة، تحتاج إلى:</p>
            <ul>
                <li>شهادة الثانوية العامة بمعدل 70% فأعلى</li>
                <li>جواز سفر ساري المفعول</li>
                <li>صور شخصية</li>
                <li>شهادة لغة (إنجليزية أو تركية حسب لغة الدراسة)</li>
            </ul>
            
            <h2>التكاليف الدراسية</h2>
            <p>تتراوح الرسوم الدراسية السنوية لكلية الطب في الجامعات التركية الخاصة بين 10,000$ و 25,000$ حسب الجامعة ولغة الدراسة. وهي تكاليف تنافسية مقارنة بالجامعات الأوروبية.</p>
            
            <h2>مدة الدراسة</h2>
            <p>تستغرق دراسة الطب البشري في تركيا 6 سنوات، تشمل:</p>
            <ul>
                <li>السنوات الثلاث الأولى: العلوم الأساسية</li>
                <li>السنوات الثلاث الأخيرة: التدريب السريري في المستشفيات</li>
            </ul>
        `,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        category: 'study',
        author: 'فريق إيفرست',
        publishedAt: '2025-01-15',
        readTime: '8 دقائق',
        tags: ['طب', 'دراسة', 'تركيا', 'جامعات'],
    },
    {
        id: '2',
        slug: 'best-turkish-universities-2025',
        lang: 'ar',
        title: 'أفضل 10 جامعات تركية خاصة لعام 2025',
        excerpt: 'تعرف على أفضل الجامعات التركية الخاصة من حيث الجودة الأكاديمية والبنية التحتية وفرص العمل بعد التخرج.',
        content: `
            <h2>معايير التصنيف</h2>
            <p>اعتمدنا في تصنيفنا على عدة معايير أساسية تشمل: جودة التعليم، البنية التحتية، البحث العلمي، فرص التوظيف، والاعتراف الدولي.</p>
            
            <h2>1. جامعة كوتش (Koç University)</h2>
            <p>تُعد جامعة كوتش من أعرق الجامعات التركية الخاصة. تقع في إسطنبول وتتميز بمناهجها المتقدمة وشراكاتها الدولية مع أفضل الجامعات العالمية.</p>
            
            <h2>2. جامعة بهتشه شهير (Bahçeşehir University)</h2>
            <p>تتميز بموقعها المتميز في قلب إسطنبول وبرامجها المتنوعة التي تُدرَّس باللغة الإنجليزية.</p>
            
            <h2>3. جامعة ميديبول (Medipol University)</h2>
            <p>تُعتبر من أفضل الجامعات في المجالات الطبية والصحية، مع مستشفيات تابعة لها توفر تدريباً عملياً ممتازاً.</p>
        `,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
        category: 'university',
        author: 'فريق إيفرست',
        publishedAt: '2025-02-01',
        readTime: '10 دقائق',
        tags: ['جامعات', 'تصنيف', 'تركيا'],
    },
    {
        id: '3',
        slug: 'student-life-istanbul',
        lang: 'ar',
        title: 'حياة الطالب العربي في إسطنبول: دليل شامل',
        excerpt: 'اكتشف كيف يعيش الطلاب العرب في إسطنبول. من السكن والمواصلات إلى الترفيه والطعام الحلال.',
        content: `
            <h2>السكن الطلابي</h2>
            <p>تتوفر خيارات متعددة للسكن في إسطنبول:</p>
            <ul>
                <li>السكن الجامعي: يتراوح بين 200-500$ شهرياً</li>
                <li>الشقق المشتركة: 300-600$ شهرياً</li>
                <li>الشقق المستقلة: 400-800$ شهرياً</li>
            </ul>
            
            <h2>المواصلات</h2>
            <p>تتميز إسطنبول بشبكة مواصلات ممتازة تشمل المترو والترام والحافلات والعبّارات البحرية. يحصل الطلاب على بطاقة مخفضة للمواصلات.</p>
            
            <h2>الطعام الحلال</h2>
            <p>لن تواجه أي صعوبة في إيجاد الطعام الحلال في تركيا، فالغالبية العظمى من المطاعم تقدم طعاماً حلالاً.</p>
        `,
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        category: 'student-life',
        author: 'فريق إيفرست',
        publishedAt: '2025-02-10',
        readTime: '6 دقائق',
        tags: ['إسطنبول', 'حياة طلابية', 'سكن'],
    },
    {
        id: '4',
        slug: 'scholarship-tips',
        lang: 'ar',
        title: '7 نصائح ذهبية للحصول على منحة دراسية في تركيا',
        excerpt: 'نصائح عملية ومجربة تزيد فرصك في الحصول على منحة دراسية كاملة أو جزئية في الجامعات التركية.',
        content: `
            <h2>1. ابدأ التقديم مبكراً</h2>
            <p>معظم المنح الدراسية تفتح أبوابها قبل 6-8 أشهر من بداية العام الدراسي. التقديم المبكر يمنحك وقتاً كافياً لإعداد ملفك بشكل متقن.</p>
            
            <h2>2. حافظ على معدل عالٍ</h2>
            <p>المعدل الأكاديمي هو أول ما تنظر إليه لجان المنح. حاول أن يكون معدلك 85% فأعلى.</p>
            
            <h2>3. تعلم اللغة التركية</h2>
            <p>حتى لو كانت الدراسة بالإنجليزية، معرفة أساسيات التركية تعطيك أفضلية كبيرة.</p>
            
            <h2>4. جهز خطاب دافع قوي</h2>
            <p>اكتب خطاباً يشرح أهدافك الأكاديمية والمهنية بوضوح، ولماذا تستحق هذه المنحة.</p>
        `,
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
        category: 'tips',
        author: 'فريق إيفرست',
        publishedAt: '2025-02-15',
        readTime: '5 دقائق',
        tags: ['منح', 'نصائح', 'تقديم'],
    },
    {
        id: '5',
        slug: 'engineering-programs-turkey',
        lang: 'ar',
        title: 'تخصصات الهندسة في تركيا: دليل المقارنة الشامل',
        excerpt: 'مقارنة تفصيلية بين تخصصات الهندسة المتاحة في الجامعات التركية الخاصة مع متطلبات القبول والرسوم.',
        content: `
            <h2>هندسة البرمجيات</h2>
            <p>من أكثر التخصصات طلباً في سوق العمل. تركز على تطوير البرمجيات وإدارة المشاريع التقنية.</p>
            
            <h2>الهندسة المدنية</h2>
            <p>تخصص أساسي يركز على تصميم وبناء الهياكل والمنشآت. تركيا تُعد من أنشط دول العالم في مجال البناء.</p>
            
            <h2>الهندسة الكهربائية والإلكترونية</h2>
            <p>تخصص يجمع بين الأنظمة الكهربائية والإلكترونية مع تطبيقات واسعة في الصناعة والتكنولوجيا.</p>
        `,
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
        category: 'study',
        author: 'فريق إيفرست',
        publishedAt: '2025-03-01',
        readTime: '7 دقائق',
        tags: ['هندسة', 'تخصصات', 'مقارنة'],
    },

    // English posts
    {
        id: '6',
        slug: 'why-study-in-turkey',
        lang: 'en',
        title: 'Why Study in Turkey? Top 10 Reasons for International Students',
        excerpt: 'Discover why Turkey has become one of the most popular study destinations for international students worldwide.',
        content: `
            <h2>1. World-Class Education</h2>
            <p>Turkish universities offer internationally recognized programs with modern curricula that meet global standards.</p>
            
            <h2>2. Affordable Tuition</h2>
            <p>Compared to Europe and the US, tuition fees in Turkey are significantly lower while maintaining high educational quality.</p>
            
            <h2>3. Rich Cultural Experience</h2>
            <p>Turkey bridges Europe and Asia, offering a unique cultural experience that enriches your academic journey.</p>
            
            <h2>4. Safe Environment</h2>
            <p>Turkey provides a safe and welcoming environment for international students with a strong sense of community.</p>
        `,
        image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2069&auto=format&fit=crop',
        category: 'study',
        author: 'Everest Team',
        publishedAt: '2025-01-20',
        readTime: '6 min',
        tags: ['Turkey', 'Study Abroad', 'International'],
    },
    {
        id: '7',
        slug: 'student-visa-guide',
        lang: 'en',
        title: 'Complete Guide to Turkish Student Visa Application 2025',
        excerpt: 'Step-by-step guide to obtaining your Turkish student visa, including required documents and common mistakes to avoid.',
        content: `
            <h2>Required Documents</h2>
            <p>To apply for a Turkish student visa, you will need:</p>
            <ul>
                <li>Valid passport (at least 6 months validity)</li>
                <li>University acceptance letter</li>
                <li>Proof of financial means</li>
                <li>Health insurance</li>
                <li>Passport-size photos</li>
            </ul>
            
            <h2>Application Process</h2>
            <p>The student visa application process typically takes 2-4 weeks. We recommend starting the process at least 2 months before your intended travel date.</p>
            
            <h2>Common Mistakes</h2>
            <p>Avoid these common mistakes that can delay your visa:</p>
            <ul>
                <li>Incomplete documentation</li>
                <li>Late application</li>
                <li>Insufficient financial proof</li>
            </ul>
        `,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?q=80&w=2074&auto=format&fit=crop',
        category: 'tips',
        author: 'Everest Team',
        publishedAt: '2025-02-05',
        readTime: '8 min',
        tags: ['Visa', 'Guide', 'Documents'],
    },
];

// Helper: get posts by language
export const getPostsByLang = (lang: string): BlogPost[] => {
    return blogPosts.filter(post => post.lang === lang);
};

// Helper: get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};

// Helper: get related posts (same language, same category, excluding current)
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
    return blogPosts
        .filter(post => post.lang === currentPost.lang && post.id !== currentPost.id)
        .filter(post => post.category === currentPost.category || post.tags.some(tag => currentPost.tags.includes(tag)))
        .slice(0, limit);
};
