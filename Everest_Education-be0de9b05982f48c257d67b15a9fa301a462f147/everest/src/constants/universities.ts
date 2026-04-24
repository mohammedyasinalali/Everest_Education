// University Interface — Dashboard-Ready
// When migrating to a dashboard, this interface maps directly to the database schema.
// Only the data source changes (constants → API), UI stays the same.

export interface Faculty {
    name: Record<string, string>;
    departments: Record<string, string>[];
}

export interface University {
    id: string;
    name: Record<string, string>;       // { ar: '...', en: '...', ... }
    country: string;                     // country ID for filtering
    city: Record<string, string>;
    logo: string;
    image: string;
    established: number;
    ranking?: string;
    studentsCount?: string;
    description: Record<string, string>;
    specialties: string[];               // key specialties offered
    languages: string[];                 // teaching languages
    tuitionRange: Record<string, string>; // e.g. { ar: '3,000$ - 15,000$', en: '...' }
    website?: string;
    featured?: boolean;
    // Detail page fields
    aboutContent?: Record<string, string>;    // extended about text
    vision?: Record<string, string>;
    mission?: Record<string, string>;
    advantages?: Record<string, string[]>;    // list of advantages per lang
    faculties?: Faculty[];
    admissionRequirements?: {
        bachelor?: Record<string, string[]>;
        master?: Record<string, string[]>;
        phd?: Record<string, string[]>;
    };
    videoUrl?: string;                        // YouTube embed URL
    gallery?: string[];                       // additional images
}

// Country filters
export interface Country {
    id: string;
    name: Record<string, string>;
    flag: string;
}

export const countries: Country[] = [
    { id: 'all', name: { ar: 'الكل', en: 'All', fa: 'همه', ru: 'Все' }, flag: '🌍' },
    { id: 'turkey', name: { ar: 'تركيا', en: 'Turkey', fa: 'ترکیه', ru: 'Турция' }, flag: '🇹🇷' },
    { id: 'germany', name: { ar: 'ألمانيا', en: 'Germany', fa: 'آلمان', ru: 'Германия' }, flag: '🇩🇪' },
    { id: 'china', name: { ar: 'الصين', en: 'China', fa: 'چین', ru: 'Китай' }, flag: '🇨🇳' },
    { id: 'malaysia', name: { ar: 'ماليزيا', en: 'Malaysia', fa: 'مالزی', ru: 'Малайзия' }, flag: '🇲🇾' },
    { id: 'uk', name: { ar: 'بريطانيا', en: 'United Kingdom', fa: 'بریتانیا', ru: 'Великобритания' }, flag: '🇬🇧' },
    { id: 'usa', name: { ar: 'أمريكا', en: 'United States', fa: 'آمریکا', ru: 'США' }, flag: '🇺🇸' },
    { id: 'canada', name: { ar: 'كندا', en: 'Canada', fa: 'کانادا', ru: 'Канада' }, flag: '🇨🇦' },
    { id: 'russia', name: { ar: 'روسيا', en: 'Russia', fa: 'روسیه', ru: 'Россия' }, flag: '🇷🇺' },
    { id: 'north-cyprus', name: { ar: 'قبرص الشمالية', en: 'Northern Cyprus', fa: 'قبرس شمالی', ru: 'Северный Кипр' }, flag: '🇨🇾' },
];

// Sample universities
export const universities: University[] = [
    // Turkey
    {
        id: 'istanbul-aydin',
        name: { ar: 'جامعة إسطنبول آيدن', en: 'Istanbul Aydin University', fa: 'دانشگاه استانبول آیدین', ru: 'Стамбульский университет Айдын' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Istanbul_Aydin_University_logo.svg/1200px-Istanbul_Aydin_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
        established: 2007,
        ranking: 'Top 100 Turkey',
        studentsCount: '40,000+',
        description: {
            ar: 'جامعة إسطنبول آيدن من أبرز الجامعات الخاصة في تركيا، تقدم برامج أكاديمية متنوعة بمعايير دولية.',
            en: 'Istanbul Aydin University is one of the leading private universities in Turkey, offering diverse academic programs with international standards.',
            fa: 'دانشگاه استانبول آیدین یکی از برجسته‌ترین دانشگاه‌های خصوصی ترکیه است.',
            ru: 'Стамбульский университет Айдын — один из ведущих частных университетов Турции.',
        },
        specialties: ['medicine', 'engineering', 'business', 'law'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '3,000$ - 15,000$', en: '$3,000 - $15,000', fa: '3,000$ - 15,000$', ru: '$3,000 - $15,000' },
        website: 'https://www.aydin.edu.tr',
        featured: true,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        aboutContent: {
            ar: 'تأسست جامعة إسطنبول آيدن عام 2007 من قبل مؤسسة الأناضول للتعليم والثقافة، وهي واحدة من أبرز الجامعات الخاصة في تركيا. تضم الجامعة 11 كلية و3 معاهد للدراسات العليا ومعهداً مهنياً، وتقدم أكثر من 80 برنامجاً أكاديمياً في مرحلتي البكالوريوس والدراسات العليا. تتميز الجامعة بموقعها الاستراتيجي في قلب مدينة إسطنبول، وتستقبل أكثر من 40,000 طالب من 110 دولة حول العالم.',
            en: 'Founded in 2007 by the Anadolu Education and Culture Foundation, Istanbul Aydin University is one of Turkey\'s leading private universities. The university hosts 11 faculties, 3 graduate institutes, and a vocational school, offering over 80 academic programs. Its strategic location in the heart of Istanbul attracts over 40,000 students from 110 countries worldwide.',
        },
        vision: {
            ar: 'أن تكون جامعة رائدة ومبتكرة على المستوى العالمي، ملتزمة بالتميز الأكاديمي والبحث العلمي، وإعداد خريجين قادرين على المنافسة في سوق العمل الدولي.',
            en: 'To be a globally leading and innovative university, committed to academic excellence and scientific research, preparing graduates who can compete in the international job market.',
        },
        mission: {
            ar: 'تقديم تعليم عالي الجودة يجمع بين النظرية والتطبيق، وتعزيز البحث العلمي والابتكار، وبناء جسور التعاون الأكاديمي مع المؤسسات الدولية لخدمة المجتمع والتنمية المستدامة.',
            en: 'To provide high-quality education combining theory and practice, promote scientific research and innovation, and build bridges of academic cooperation with international institutions for community service and sustainable development.',
        },
        advantages: {
            ar: [
                'موقع استراتيجي في قلب مدينة إسطنبول بالقرب من وسائل النقل العام',
                'اعترافات ومعادلات دولية تضمن قبول الشهادة في جميع أنحاء العالم',
                'برامج تبادل طلابي مع أكثر من 200 جامعة حول العالم (Erasmus+)',
                'مختبرات ومرافق حديثة مجهزة بأحدث التقنيات',
                'طاقم تدريسي أكاديمي متميز من ذوي الخبرة الدولية',
                'برامج تدريب عملي وتعاون مع كبرى الشركات التركية والدولية',
                'مكتبة مركزية ضخمة ومصادر رقمية متاحة على مدار الساعة',
                'أنشطة طلابية ونوادي متنوعة تشمل الرياضة والفنون والثقافة',
            ],
            en: [
                'Strategic location in the heart of Istanbul near public transportation',
                'International accreditations ensuring worldwide degree recognition',
                'Student exchange programs with 200+ universities worldwide (Erasmus+)',
                'Modern laboratories and facilities equipped with latest technology',
                'Distinguished academic staff with international experience',
                'Practical training programs and cooperation with major Turkish & international companies',
                'Extensive central library and digital resources available 24/7',
                'Diverse student activities and clubs including sports, arts, and culture',
            ],
        },
        faculties: [
            {
                name: { ar: 'كلية إدارة الأعمال', en: 'Faculty of Business Administration' },
                departments: [
                    { ar: 'إدارة الأعمال', en: 'Business Administration' },
                    { ar: 'الاقتصاد والمالية', en: 'Economics & Finance' },
                    { ar: 'التجارة الدولية', en: 'International Trade' },
                    { ar: 'نظم المعلومات الإدارية', en: 'Management Information Systems' },
                ],
            },
            {
                name: { ar: 'كلية الطيران والفضاء', en: 'Faculty of Aviation & Space' },
                departments: [
                    { ar: 'هندسة الطيران', en: 'Aeronautical Engineering' },
                    { ar: 'إدارة الطيران', en: 'Aviation Management' },
                    { ar: 'الطيران المدني', en: 'Civil Aviation' },
                ],
            },
            {
                name: { ar: 'كلية الهندسة', en: 'Faculty of Engineering' },
                departments: [
                    { ar: 'هندسة الحاسوب', en: 'Computer Engineering' },
                    { ar: 'الهندسة الكهربائية والإلكترونية', en: 'Electrical & Electronics Engineering' },
                    { ar: 'الهندسة الميكانيكية', en: 'Mechanical Engineering' },
                    { ar: 'الهندسة المدنية', en: 'Civil Engineering' },
                    { ar: 'هندسة البرمجيات', en: 'Software Engineering' },
                ],
            },
            {
                name: { ar: 'كلية الطب', en: 'Faculty of Medicine' },
                departments: [
                    { ar: 'الطب العام', en: 'General Medicine' },
                ],
            },
            {
                name: { ar: 'كلية طب الأسنان', en: 'Faculty of Dentistry' },
                departments: [
                    { ar: 'طب الأسنان', en: 'Dentistry' },
                ],
            },
            {
                name: { ar: 'كلية النقل الجوي', en: 'Faculty of Air Transport' },
                departments: [
                    { ar: 'إدارة الطيران المدني', en: 'Civil Aviation Management' },
                    { ar: 'علوم الطيران', en: 'Aviation Sciences' },
                ],
            },
        ],
        admissionRequirements: {
            bachelor: {
                ar: [
                    'شهادة الثانوية العامة (أو ما يعادلها) بمعدل لا يقل عن 60%',
                    'صورة عن جواز السفر ساري المفعول',
                    'صور شخصية بخلفية بيضاء',
                    'كشف درجات الثانوية العامة مترجم ومصدق',
                    'شهادة إتقان اللغة الإنجليزية (TOEFL/IELTS) أو اجتياز اختبار الجامعة',
                    'خطاب نوايا (اختياري)',
                ],
                en: [
                    'High school diploma (or equivalent) with minimum 60% GPA',
                    'Valid passport copy',
                    'Personal photos with white background',
                    'Translated and certified high school transcript',
                    'English proficiency certificate (TOEFL/IELTS) or university placement test',
                    'Statement of purpose (optional)',
                ],
            },
            master: {
                ar: [
                    'شهادة البكالوريوس مع كشف الدرجات مصدق ومترجم',
                    'صورة عن جواز السفر ساري المفعول',
                    'صور شخصية بخلفية بيضاء',
                    'شهادة إتقان اللغة الإنجليزية (TOEFL/IELTS)',
                    'خطابا توصية أكاديمية (2)',
                    'السيرة الذاتية (CV)',
                    'خطاب نوايا يوضح الأهداف البحثية',
                ],
                en: [
                    'Bachelor\'s degree with certified and translated transcript',
                    'Valid passport copy',
                    'Personal photos with white background',
                    'English proficiency certificate (TOEFL/IELTS)',
                    'Two academic recommendation letters',
                    'Curriculum Vitae (CV)',
                    'Statement of purpose outlining research goals',
                ],
            },
            phd: {
                ar: [
                    'شهادة الماجستير مصدقة ومترجمة مع كشف الدرجات',
                    'صورة عن جواز السفر ساري المفعول',
                    'صور شخصية بخلفية بيضاء',
                    'شهادة إتقان اللغة الإنجليزية (TOEFL 90+ / IELTS 6.5+)',
                    'مقترح بحثي تفصيلي (Research Proposal)',
                    'خطابا توصية أكاديمية من أساتذة جامعيين (2)',
                    'السيرة الذاتية الأكاديمية مع قائمة المنشورات',
                    'اجتياز المقابلة الأكاديمية مع لجنة القبول',
                ],
                en: [
                    'Certified and translated Master\'s degree with transcript',
                    'Valid passport copy',
                    'Personal photos with white background',
                    'English proficiency certificate (TOEFL 90+ / IELTS 6.5+)',
                    'Detailed Research Proposal',
                    'Two academic recommendation letters from university professors',
                    'Academic CV with list of publications',
                    'Passing the academic interview with admission committee',
                ],
            },
        },
    },
    {
        id: 'bahcesehir',
        name: { ar: 'جامعة بهتشه شهير', en: 'Bahçeşehir University', fa: 'دانشگاه باهچه‌شهیر', ru: 'Университет Бахчешехир' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bah%C3%A7e%C5%9Fehir_University_logo.svg/1200px-Bah%C3%A7e%C5%9Fehir_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=2074&auto=format&fit=crop',
        established: 1998,
        ranking: 'Top 50 Turkey',
        studentsCount: '25,000+',
        description: {
            ar: 'جامعة بهتشه شهير تقع في قلب إسطنبول وتتميز ببرامجها الدولية وشراكاتها مع جامعات عالمية.',
            en: 'Bahçeşehir University is located in the heart of Istanbul, known for international programs and global partnerships.',
            fa: 'دانشگاه باهچه‌شهیر در قلب استانبول قرار دارد.',
            ru: 'Университет Бахчешехир расположен в самом центре Стамбула.',
        },
        specialties: ['architecture', 'engineering', 'media', 'business'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '5,000$ - 20,000$', en: '$5,000 - $20,000', fa: '5,000$ - 20,000$', ru: '$5,000 - $20,000' },
        website: 'https://bau.edu.tr',
        featured: true,
        aboutContent: {
            ar: 'تأسست جامعة بهتشه شهير عام 1998 وتعد من أرقى الجامعات الخاصة في تركيا. تقع في موقع مميز على ساحل بحر مرمرة في إسطنبول. تضم الجامعة أكثر من 25,000 طالب من 100 جنسية مختلفة، وتتميز بشبكة واسعة من الشراكات مع جامعات عالمية في أكثر من 40 دولة. تقدم الجامعة برامج أكاديمية باللغتين التركية والإنجليزية عبر 9 كليات ومعاهد متعددة.',
            en: 'Founded in 1998, Bahçeşehir University is one of Turkey\'s most prestigious private universities. Located at a prime spot on the coast of the Marmara Sea in Istanbul. The university hosts over 25,000 students from 100 nationalities, with an extensive partnership network spanning 40+ countries.',
        },
        vision: {
            ar: 'أن تكون مؤسسة تعليمية عالمية رائدة تساهم في تشكيل مستقبل التعليم من خلال الابتكار والبحث العلمي والتعاون الدولي.',
            en: 'To be a leading global educational institution shaping the future of education through innovation, research, and international cooperation.',
        },
        mission: {
            ar: 'إعداد قادة المستقبل من خلال توفير بيئة تعليمية متميزة تجمع بين الإبداع والتفكير النقدي والمسؤولية الاجتماعية.',
            en: 'To prepare future leaders through an outstanding educational environment combining creativity, critical thinking, and social responsibility.',
        },
        advantages: {
            ar: [
                'موقع فريد على ساحل بحر مرمرة في قلب إسطنبول',
                'شبكة تبادل طلابي مع جامعات في أكثر من 40 دولة',
                'فروع دولية في برلين وواشنطن وتورنتو وباتومي',
                'تركيز قوي على التكنولوجيا والابتكار وريادة الأعمال',
                'مرافق حديثة تشمل استوديوهات إعلامية ومختبرات متطورة',
                'برامج تدريب عملي مع شركات عالمية رائدة',
            ],
            en: [
                'Unique location on the Marmara Sea coast in the heart of Istanbul',
                'Student exchange network with universities in 40+ countries',
                'International campuses in Berlin, Washington DC, Toronto, and Batumi',
                'Strong focus on technology, innovation, and entrepreneurship',
                'Modern facilities including media studios and advanced labs',
                'Practical training programs with leading global companies',
            ],
        },
        faculties: [
            {
                name: { ar: 'كلية الهندسة والعلوم الطبيعية', en: 'Faculty of Engineering & Natural Sciences' },
                departments: [
                    { ar: 'هندسة الحاسوب', en: 'Computer Engineering' },
                    { ar: 'هندسة البرمجيات', en: 'Software Engineering' },
                    { ar: 'الهندسة الكهربائية', en: 'Electrical Engineering' },
                    { ar: 'الهندسة الصناعية', en: 'Industrial Engineering' },
                ],
            },
            {
                name: { ar: 'كلية العمارة والتصميم', en: 'Faculty of Architecture & Design' },
                departments: [
                    { ar: 'العمارة', en: 'Architecture' },
                    { ar: 'العمارة الداخلية', en: 'Interior Architecture' },
                    { ar: 'التصميم الجرافيكي', en: 'Graphic Design' },
                ],
            },
            {
                name: { ar: 'كلية الاتصال', en: 'Faculty of Communication' },
                departments: [
                    { ar: 'الصحافة', en: 'Journalism' },
                    { ar: 'العلاقات العامة', en: 'Public Relations' },
                    { ar: 'السينما والتلفزيون', en: 'Film & Television' },
                    { ar: 'الإعلام الرقمي', en: 'Digital Media' },
                ],
            },
            {
                name: { ar: 'كلية العلوم الصحية', en: 'Faculty of Health Sciences' },
                departments: [
                    { ar: 'التمريض', en: 'Nursing' },
                    { ar: 'العلاج الطبيعي', en: 'Physiotherapy' },
                    { ar: 'التغذية والحمية', en: 'Nutrition & Dietetics' },
                ],
            },
        ],
        admissionRequirements: {
            bachelor: {
                ar: [
                    'شهادة الثانوية العامة بمعدل 65% فما فوق',
                    'صورة عن جواز السفر ساري المفعول',
                    'كشف درجات مصدق ومترجم للتركية أو الإنجليزية',
                    'شهادة لغة إنجليزية (TOEFL 79+ / IELTS 6.5+) للبرامج الإنجليزية',
                    'صور شخصية حديثة',
                ],
                en: [
                    'High school diploma with 65%+ GPA',
                    'Valid passport copy',
                    'Certified transcript translated to Turkish or English',
                    'English proficiency (TOEFL 79+ / IELTS 6.5+) for English programs',
                    'Recent personal photos',
                ],
            },
            master: {
                ar: [
                    'شهادة البكالوريوس مصدقة ومترجمة',
                    'كشف درجات البكالوريوس',
                    'شهادة لغة إنجليزية',
                    'خطاب نوايا',
                    'رسالتا توصية',
                    'السيرة الذاتية',
                ],
                en: [
                    'Certified and translated Bachelor\'s degree',
                    'Bachelor\'s transcript',
                    'English proficiency certificate',
                    'Statement of purpose',
                    'Two recommendation letters',
                    'Curriculum Vitae',
                ],
            },
            phd: {
                ar: [
                    'شهادة الماجستير مصدقة ومترجمة',
                    'كشف درجات الماجستير',
                    'شهادة لغة إنجليزية (TOEFL 90+ / IELTS 6.5+)',
                    'مقترح بحثي مفصل في مجال التخصص',
                    'رسالتا توصية من أساتذة أكاديميين',
                    'السيرة الذاتية الأكاديمية',
                    'قائمة المنشورات والأبحاث السابقة (إن وجدت)',
                    'اجتياز المقابلة الشخصية الأكاديمية',
                ],
                en: [
                    'Certified and translated Master\'s degree',
                    'Master\'s transcript',
                    'English proficiency (TOEFL 90+ / IELTS 6.5+)',
                    'Detailed research proposal in the field of specialization',
                    'Two recommendation letters from academic professors',
                    'Academic Curriculum Vitae',
                    'List of publications and previous research (if available)',
                    'Passing the academic interview',
                ],
            },
        },
    },
    {
        id: 'medipol',
        name: { ar: 'جامعة ميديبول', en: 'Medipol University', fa: 'دانشگاه مدیپل', ru: 'Университет Медиполь' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Medipol_logo.png',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        established: 2009,
        ranking: 'Top 30 Turkey',
        studentsCount: '30,000+',
        description: {
            ar: 'جامعة ميديبول إسطنبول رائدة في المجالات الطبية والصحية مع مستشفيات تابعة توفر تدريباً عملياً ممتازاً.',
            en: 'Istanbul Medipol University is a leader in medical and health sciences with affiliated hospitals providing excellent clinical training.',
            fa: 'دانشگاه مدیپل استانبول پیشرو در علوم پزشکی و بهداشتی است.',
            ru: 'Университет Медиполь — лидер в области медицинских наук.',
        },
        specialties: ['medicine', 'dentistry', 'pharmacy', 'nursing'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '8,000$ - 25,000$', en: '$8,000 - $25,000', fa: '8,000$ - 25,000$', ru: '$8,000 - $25,000' },
        website: 'https://www.medipol.edu.tr',
        featured: true,
    },
    {
        id: 'altinbas',
        name: { ar: 'جامعة ألتن باش', en: 'Altınbaş University', fa: 'دانشگاه آلتین‌باش', ru: 'Университет Алтынбаш' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Alt%C4%B1nba%C5%9F_%C3%9Cniversitesi_Logo.png/1200px-Alt%C4%B1nba%C5%9F_%C3%9Cniversitesi_Logo.png',
        image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop',
        established: 2008,
        studentsCount: '12,000+',
        description: {
            ar: 'جامعة ألتن باش جامعة حديثة تركز على التكنولوجيا والهندسة مع مختبرات متطورة.',
            en: 'Altınbaş University is a modern university focusing on technology and engineering with state-of-the-art facilities.',
            fa: 'دانشگاه آلتین‌باش دانشگاهی مدرن با تمرکز بر فناوری و مهندسی است.',
            ru: 'Университет Алтынбаш — современный вуз с упором на технологии.',
        },
        specialties: ['engineering', 'computer-science', 'business', 'design'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '3,000$ - 10,000$', en: '$3,000 - $10,000', fa: '3,000$ - 10,000$', ru: '$3,000 - $10,000' },
        website: 'https://www.altinbas.edu.tr',
    },
    {
        id: 'gelisim',
        name: { ar: 'جامعة جيليشيم', en: 'Gelişim University', fa: 'دانشگاه گلیشیم', ru: 'Университет Гелишим' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/IGU_logo.png/800px-IGU_logo.png',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
        established: 2008,
        studentsCount: '35,000+',
        description: {
            ar: 'جامعة جيليشيم من أسرع الجامعات نمواً في تركيا مع أسعار منافسة جداً.',
            en: 'Gelişim University is one of the fastest growing universities in Turkey with very competitive prices.',
            fa: 'دانشگاه گلیشیم از سریع‌ترین دانشگاه‌های در حال رشد ترکیه است.',
            ru: 'Университет Гелишим — один из самых быстрорастущих вузов Турции.',
        },
        specialties: ['business', 'engineering', 'health', 'arts'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '2,500$ - 8,000$', en: '$2,500 - $8,000', fa: '2,500$ - 8,000$', ru: '$2,500 - $8,000' },
        website: 'https://www.gelisim.edu.tr',
    },

    // Germany
    {
        id: 'tu-berlin',
        name: { ar: 'جامعة برلين التقنية', en: 'Technical University of Berlin', fa: 'دانشگاه فنی برلین', ru: 'Берлинский технический университет' },
        country: 'germany',
        city: { ar: 'برلين', en: 'Berlin', fa: 'برلین', ru: 'Берлин' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/TU_Berlin_Logo.svg/1200px-TU_Berlin_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop',
        established: 1879,
        ranking: 'Top 150 World',
        studentsCount: '35,000+',
        description: {
            ar: 'واحدة من أعرق الجامعات التقنية في أوروبا، تتميز ببرامج الهندسة والعلوم.',
            en: 'One of the most prestigious technical universities in Europe, known for engineering and sciences.',
            fa: 'یکی از معتبرترین دانشگاه‌های فنی اروپا.',
            ru: 'Один из самых престижных технических университетов Европы.',
        },
        specialties: ['engineering', 'computer-science', 'architecture', 'mathematics'],
        languages: ['German', 'English'],
        tuitionRange: { ar: 'مجاناً (رسوم فصلية فقط)', en: 'Free (semester fees only)', fa: 'رایگان (فقط شهریه ترم)', ru: 'Бесплатно (только семестровые сборы)' },
        website: 'https://www.tu.berlin',
        featured: true,
    },
    {
        id: 'lmu-munich',
        name: { ar: 'جامعة لودفيغ ماكسيميليان ميونخ', en: 'LMU Munich', fa: 'دانشگاه لودویگ ماکسیمیلیان مونیخ', ru: 'Мюнхенский университет' },
        country: 'germany',
        city: { ar: 'ميونخ', en: 'Munich', fa: 'مونیخ', ru: 'Мюнхен' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/LMU_Muenchen_Logo.svg/1200px-LMU_Muenchen_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=2070&auto=format&fit=crop',
        established: 1472,
        ranking: 'Top 50 World',
        studentsCount: '50,000+',
        description: {
            ar: 'من أقدم وأعرق الجامعات في ألمانيا وأوروبا، تشتهر بالبحث العلمي المتقدم.',
            en: 'One of the oldest and most prestigious universities in Germany and Europe, renowned for advanced research.',
            fa: 'یکی از قدیمی‌ترین و معتبرترین دانشگاه‌های آلمان و اروپا.',
            ru: 'Один из старейших и престижнейших университетов Германии и Европы.',
        },
        specialties: ['medicine', 'law', 'sciences', 'humanities'],
        languages: ['German', 'English'],
        tuitionRange: { ar: 'مجاناً (رسوم فصلية فقط)', en: 'Free (semester fees only)', fa: 'رایگان', ru: 'Бесплатно' },
        website: 'https://www.lmu.de',
    },

    // China
    {
        id: 'tsinghua',
        name: { ar: 'جامعة تسينغهوا', en: 'Tsinghua University', fa: 'دانشگاه تسینگوا', ru: 'Университет Цинхуа' },
        country: 'china',
        city: { ar: 'بكين', en: 'Beijing', fa: 'پکن', ru: 'Пекин' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tsinghua_University_Logo.svg/1200px-Tsinghua_University_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=2070&auto=format&fit=crop',
        established: 1911,
        ranking: 'Top 20 World',
        studentsCount: '50,000+',
        description: {
            ar: 'جامعة تسينغهوا من أفضل الجامعات في آسيا والعالم، رائدة في الهندسة والتكنولوجيا.',
            en: 'Tsinghua University is one of the best universities in Asia and the world, a leader in engineering and technology.',
            fa: 'دانشگاه تسینگوا از بهترین دانشگاه‌های آسیا و جهان است.',
            ru: 'Университет Цинхуа — один из лучших вузов Азии и мира.',
        },
        specialties: ['engineering', 'computer-science', 'business', 'sciences'],
        languages: ['Chinese', 'English'],
        tuitionRange: { ar: '3,000$ - 10,000$', en: '$3,000 - $10,000', fa: '3,000$ - 10,000$', ru: '$3,000 - $10,000' },
        website: 'https://www.tsinghua.edu.cn',
        featured: true,
    },
    {
        id: 'fudan',
        name: { ar: 'جامعة فودان', en: 'Fudan University', fa: 'دانشگاه فودان', ru: 'Университет Фудань' },
        country: 'china',
        city: { ar: 'شنغهاي', en: 'Shanghai', fa: 'شانگهای', ru: 'Шанхай' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Fudan_University_Logo.svg/1200px-Fudan_University_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2070&auto=format&fit=crop',
        established: 1905,
        ranking: 'Top 40 World',
        studentsCount: '32,000+',
        description: {
            ar: 'جامعة فودان من أعرق الجامعات البحثية في الصين، تتميز بالعلوم الإنسانية والطبية.',
            en: 'Fudan University is one of the most prestigious research universities in China.',
            fa: 'دانشگاه فودان یکی از معتبرترین دانشگاه‌های تحقیقاتی چین است.',
            ru: 'Фудань — один из самых престижных исследовательских университетов Китая.',
        },
        specialties: ['medicine', 'humanities', 'business', 'sciences'],
        languages: ['Chinese', 'English'],
        tuitionRange: { ar: '2,500$ - 8,000$', en: '$2,500 - $8,000', fa: '2,500$ - 8,000$', ru: '$2,500 - $8,000' },
        website: 'https://www.fudan.edu.cn',
    },

    // Malaysia
    {
        id: 'utm',
        name: { ar: 'جامعة مالايا', en: 'University of Malaya', fa: 'دانشگاه مالایا', ru: 'Университет Малайя' },
        country: 'malaysia',
        city: { ar: 'كوالالمبور', en: 'Kuala Lumpur', fa: 'کوالالامپور', ru: 'Куала-Лумпур' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/University_of_Malaya_coat_of_arms.svg/1200px-University_of_Malaya_coat_of_arms.svg.png',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop',
        established: 1905,
        ranking: 'Top 100 World',
        studentsCount: '28,000+',
        description: {
            ar: 'جامعة مالايا هي أقدم وأعرق جامعة في ماليزيا، معترف بها دولياً.',
            en: 'University of Malaya is the oldest and most prestigious university in Malaysia, internationally recognized.',
            fa: 'دانشگاه مالایا قدیمی‌ترین و معتبرترین دانشگاه مالزی است.',
            ru: 'Университет Малайя — старейший и престижнейший вуз Малайзии.',
        },
        specialties: ['engineering', 'medicine', 'business', 'sciences'],
        languages: ['English', 'Malay'],
        tuitionRange: { ar: '2,000$ - 7,000$', en: '$2,000 - $7,000', fa: '2,000$ - 7,000$', ru: '$2,000 - $7,000' },
        website: 'https://www.um.edu.my',
        featured: true,
    },
    {
        id: 'monash-malaysia',
        name: { ar: 'جامعة موناش ماليزيا', en: 'Monash University Malaysia', fa: 'دانشگاه موناش مالزی', ru: 'Университет Монаш Малайзия' },
        country: 'malaysia',
        city: { ar: 'سيلانغور', en: 'Selangor', fa: 'سلانگور', ru: 'Селангор' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Monash_University_shield.svg/1200px-Monash_University_shield.svg.png',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?q=80&w=2070&auto=format&fit=crop',
        established: 1998,
        ranking: 'Top 60 World',
        studentsCount: '8,000+',
        description: {
            ar: 'فرع جامعة موناش الأسترالية في ماليزيا، تقدم تعليماً أسترالياً بتكاليف أقل.',
            en: 'Monash University Malaysia is the Malaysian campus of the prestigious Australian university.',
            fa: 'شعبه دانشگاه موناش استرالیا در مالزی.',
            ru: 'Малайзийский кампус престижного австралийского университета Монаш.',
        },
        specialties: ['engineering', 'business', 'pharmacy', 'sciences'],
        languages: ['English'],
        tuitionRange: { ar: '5,000$ - 12,000$', en: '$5,000 - $12,000', fa: '5,000$ - 12,000$', ru: '$5,000 - $12,000' },
        website: 'https://www.monash.edu.my',
    },

    // Turkey (more)
    {
        id: 'istanbul-kultur',
        name: { ar: 'جامعة إسطنبول كولتور', en: 'Istanbul Kültür University', fa: 'دانشگاه استانبول کولتور', ru: 'Стамбульский университет Кюльтюр' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/IKU_logo.png/800px-IKU_logo.png',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
        established: 1997,
        studentsCount: '15,000+',
        description: {
            ar: 'جامعة إسطنبول كولتور تتميز بالفنون والعمارة والعلاقات الدولية مع بيئة أكاديمية متميزة.',
            en: 'Istanbul Kültür University excels in arts, architecture, and international relations with a distinguished academic environment.',
            fa: 'دانشگاه استانبول کولتور در هنر، معماری و روابط بین‌الملل برتری دارد.',
            ru: 'Университет Кюльтюр отличается в области искусства, архитектуры и международных отношений.',
        },
        specialties: ['architecture', 'arts', 'law', 'international-relations'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '2,500$ - 9,000$', en: '$2,500 - $9,000', fa: '2,500$ - 9,000$', ru: '$2,500 - $9,000' },
        website: 'https://www.iku.edu.tr',
    },
    {
        id: 'ozyegin',
        name: { ar: 'جامعة أوزيجين', en: 'Özyeğin University', fa: 'دانشگاه اوزیگین', ru: 'Университет Озйегин' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/tr/thumb/5/53/OzU_Logo.png/800px-OzU_Logo.png',
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop',
        established: 2007,
        ranking: 'Top 40 Turkey',
        studentsCount: '8,000+',
        description: {
            ar: 'جامعة أوزيجين من أفضل الجامعات الخاصة في تركيا، تصنف ضمن أفضل الجامعات الحديثة عالمياً.',
            en: 'Özyeğin University is one of the top private universities in Turkey, ranked among the best young universities globally.',
            fa: 'دانشگاه اوزیگین از بهترین دانشگاه‌های خصوصی ترکیه است.',
            ru: 'Университет Озйегин — один из лучших молодых частных университетов Турции.',
        },
        specialties: ['engineering', 'business', 'hospitality', 'aviation'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '6,000$ - 18,000$', en: '$6,000 - $18,000', fa: '6,000$ - 18,000$', ru: '$6,000 - $18,000' },
        website: 'https://www.ozyegin.edu.tr',
        featured: true,
    },
    {
        id: 'nisantasi',
        name: { ar: 'جامعة نيشان تاشي', en: 'Nişantaşı University', fa: 'دانشگاه نیشان‌تاشی', ru: 'Университет Нишанташи' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ni%C5%9Fanta%C5%9F%C4%B1_University_logo.png/800px-Ni%C5%9Fanta%C5%9F%C4%B1_University_logo.png',
        image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2070&auto=format&fit=crop',
        established: 2009,
        studentsCount: '20,000+',
        description: {
            ar: 'جامعة نيشان تاشي تقع في قلب إسطنبول الأوروبية وتقدم برامج متنوعة بأسعار مناسبة جداً.',
            en: 'Nişantaşı University is located in the heart of European Istanbul, offering diverse programs at very affordable prices.',
            fa: 'دانشگاه نیشان‌تاشی در قلب استانبول اروپایی واقع شده است.',
            ru: 'Университет Нишанташи расположен в центре европейского Стамбула.',
        },
        specialties: ['business', 'design', 'computer-science', 'health'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '1,500$ - 5,000$', en: '$1,500 - $5,000', fa: '1,500$ - 5,000$', ru: '$1,500 - $5,000' },
        website: 'https://www.nisantasi.edu.tr',
    },
    {
        id: 'yeditepe',
        name: { ar: 'جامعة يدي تبه', en: 'Yeditepe University', fa: 'دانشگاه یدی‌تپه', ru: 'Университет Едитепе' },
        country: 'turkey',
        city: { ar: 'إسطنبول', en: 'Istanbul', fa: 'استانبول', ru: 'Стамбул' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Yeditepe_University_logo.svg/1200px-Yeditepe_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?q=80&w=2070&auto=format&fit=crop',
        established: 1996,
        ranking: 'Top 20 Turkey',
        studentsCount: '18,000+',
        description: {
            ar: 'جامعة يدي تبه من أوائل الجامعات الخاصة في تركيا، تشتهر بكلية الطب والصيدلة.',
            en: 'Yeditepe University is one of the first private universities in Turkey, renowned for its faculty of medicine and pharmacy.',
            fa: 'دانشگاه یدی‌تپه از اولین دانشگاه‌های خصوصی ترکیه است.',
            ru: 'Университет Едитепе — один из первых частных вузов Турции.',
        },
        specialties: ['medicine', 'pharmacy', 'dentistry', 'engineering'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '6,000$ - 22,000$', en: '$6,000 - $22,000', fa: '6,000$ - 22,000$', ru: '$6,000 - $22,000' },
        website: 'https://www.yeditepe.edu.tr',
    },

    // Germany (more)
    {
        id: 'rwth-aachen',
        name: { ar: 'جامعة آخن التقنية', en: 'RWTH Aachen University', fa: 'دانشگاه فنی آخن', ru: 'Ахенский технический университет' },
        country: 'germany',
        city: { ar: 'آخن', en: 'Aachen', fa: 'آخن', ru: 'Ахен' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/RWTH_Aachen_University_Logo.svg/1200px-RWTH_Aachen_University_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1569742866068-2e4e3e3c6ea0?q=80&w=2070&auto=format&fit=crop',
        established: 1870,
        ranking: 'Top 100 World',
        studentsCount: '47,000+',
        description: {
            ar: 'جامعة آخن التقنية من أفضل الجامعات التقنية في أوروبا، خاصة في الهندسة الميكانيكية.',
            en: 'RWTH Aachen is one of the best technical universities in Europe, especially in mechanical engineering.',
            fa: 'دانشگاه فنی آخن یکی از بهترین دانشگاه‌های فنی اروپا است.',
            ru: 'RWTH Aachen — один из лучших технических вузов Европы.',
        },
        specialties: ['engineering', 'computer-science', 'sciences', 'mathematics'],
        languages: ['German', 'English'],
        tuitionRange: { ar: 'مجاناً (رسوم فصلية فقط)', en: 'Free (semester fees only)', fa: 'رایگان', ru: 'Бесплатно' },
        website: 'https://www.rwth-aachen.de',
    },

    // China (more)
    {
        id: 'zhejiang',
        name: { ar: 'جامعة تشجيانغ', en: 'Zhejiang University', fa: 'دانشگاه ژجیانگ', ru: 'Чжэцзянский университет' },
        country: 'china',
        city: { ar: 'هانغتشو', en: 'Hangzhou', fa: 'هانگژوو', ru: 'Ханчжоу' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Zhejiang_University_Logo.svg/1200px-Zhejiang_University_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop',
        established: 1897,
        ranking: 'Top 50 World',
        studentsCount: '60,000+',
        description: {
            ar: 'جامعة تشجيانغ من أقدم وأعرق الجامعات في الصين، تحتل مراتب عالمية متقدمة.',
            en: 'Zhejiang University is one of the oldest and most prestigious universities in China.',
            fa: 'دانشگاه ژجیانگ از قدیمی‌ترین و معتبرترین دانشگاه‌های چین است.',
            ru: 'Чжэцзянский университет — один из старейших и престижнейших вузов Китая.',
        },
        specialties: ['engineering', 'sciences', 'medicine', 'agriculture'],
        languages: ['Chinese', 'English'],
        tuitionRange: { ar: '2,000$ - 7,000$', en: '$2,000 - $7,000', fa: '2,000$ - 7,000$', ru: '$2,000 - $7,000' },
        website: 'https://www.zju.edu.cn',
    },
    {
        id: 'wuhan',
        name: { ar: 'جامعة ووهان', en: 'Wuhan University', fa: 'دانشگاه ووهان', ru: 'Уханьский университет' },
        country: 'china',
        city: { ar: 'ووهان', en: 'Wuhan', fa: 'ووهان', ru: 'Ухань' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Wuhan_University_Logo.svg/1200px-Wuhan_University_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?q=80&w=2069&auto=format&fit=crop',
        established: 1893,
        ranking: 'Top 200 World',
        studentsCount: '55,000+',
        description: {
            ar: 'جامعة ووهان واحدة من أجمل الجامعات في الصين وتتميز بالعلوم الإنسانية والطبيعية.',
            en: 'Wuhan University is one of the most beautiful campuses in China, excelling in humanities and natural sciences.',
            fa: 'دانشگاه ووهان یکی از زیباترین دانشگاه‌های چین است.',
            ru: 'Уханьский университет — один из красивейших кампусов Китая.',
        },
        specialties: ['humanities', 'sciences', 'law', 'engineering'],
        languages: ['Chinese', 'English'],
        tuitionRange: { ar: '2,000$ - 6,000$', en: '$2,000 - $6,000', fa: '2,000$ - 6,000$', ru: '$2,000 - $6,000' },
        website: 'https://www.whu.edu.cn',
    },

    // UK
    {
        id: 'ucl',
        name: { ar: 'كلية لندن الجامعية', en: 'University College London', fa: 'کالج دانشگاهی لندن', ru: 'Университетский колледж Лондона' },
        country: 'uk',
        city: { ar: 'لندن', en: 'London', fa: 'لندن', ru: 'Лондон' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_College_London_logo.svg/1200px-University_College_London_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=2070&auto=format&fit=crop',
        established: 1826,
        ranking: 'Top 10 World',
        studentsCount: '42,000+',
        description: {
            ar: 'كلية لندن الجامعية من أعرق الجامعات في العالم وعضو في مجموعة راسل البريطانية.',
            en: 'UCL is one of the most prestigious universities in the world and a member of the Russell Group.',
            fa: 'UCL یکی از معتبرترین دانشگاه‌های جهان و عضو گروه راسل است.',
            ru: 'UCL — один из самых престижных университетов мира.',
        },
        specialties: ['medicine', 'law', 'engineering', 'education'],
        languages: ['English'],
        tuitionRange: { ar: '20,000£ - 40,000£', en: '£20,000 - £40,000', fa: '20,000£ - 40,000£', ru: '£20,000 - £40,000' },
        website: 'https://www.ucl.ac.uk',
        featured: true,
    },
    {
        id: 'edinburgh',
        name: { ar: 'جامعة إدنبرة', en: 'University of Edinburgh', fa: 'دانشگاه ادینبورگ', ru: 'Эдинбургский университет' },
        country: 'uk',
        city: { ar: 'إدنبرة', en: 'Edinburgh', fa: 'ادینبورگ', ru: 'Эдинбург' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/University_of_Edinburgh_ceremonial_roundel.svg/1200px-University_of_Edinburgh_ceremonial_roundel.svg.png',
        image: 'https://images.unsplash.com/photo-1560448204-603e685de377?q=80&w=2070&auto=format&fit=crop',
        established: 1583,
        ranking: 'Top 20 World',
        studentsCount: '35,000+',
        description: {
            ar: 'جامعة إدنبرة من أقدم الجامعات في العالم الناطق بالإنجليزية، تتميز بالبحث العلمي.',
            en: 'University of Edinburgh is one of the oldest English-speaking universities, distinguished in research.',
            fa: 'دانشگاه ادینبورگ از قدیمی‌ترین دانشگاه‌های انگلیسی‌زبان است.',
            ru: 'Один из старейших англоязычных университетов мира.',
        },
        specialties: ['medicine', 'AI', 'sciences', 'humanities'],
        languages: ['English'],
        tuitionRange: { ar: '18,000£ - 35,000£', en: '£18,000 - £35,000', fa: '18,000£ - 35,000£', ru: '£18,000 - £35,000' },
        website: 'https://www.ed.ac.uk',
    },

    // USA 
    {
        id: 'nyu',
        name: { ar: 'جامعة نيويورك', en: 'New York University', fa: 'دانشگاه نیویورک', ru: 'Нью-Йоркский университет' },
        country: 'usa',
        city: { ar: 'نيويورك', en: 'New York', fa: 'نیویورک', ru: 'Нью-Йорк' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/New_York_University_Seal.svg/1200px-New_York_University_Seal.svg.png',
        image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop',
        established: 1831,
        ranking: 'Top 30 World',
        studentsCount: '55,000+',
        description: {
            ar: 'جامعة نيويورك من أشهر الجامعات في العالم، تقع في قلب مدينة نيويورك.',
            en: 'New York University is one of the most famous universities in the world, located in the heart of New York City.',
            fa: 'دانشگاه نیویورک از مشهورترین دانشگاه‌های جهان است.',
            ru: 'Нью-Йоркский университет — один из самых известных вузов мира.',
        },
        specialties: ['business', 'arts', 'law', 'medicine'],
        languages: ['English'],
        tuitionRange: { ar: '50,000$ - 80,000$', en: '$50,000 - $80,000', fa: '50,000$ - 80,000$', ru: '$50,000 - $80,000' },
        website: 'https://www.nyu.edu',
        featured: true,
    },
    {
        id: 'usc',
        name: { ar: 'جامعة جنوب كاليفورنيا', en: 'University of Southern California', fa: 'دانشگاه کالیفرنیای جنوبی', ru: 'Университет Южной Калифорнии' },
        country: 'usa',
        city: { ar: 'لوس أنجلوس', en: 'Los Angeles', fa: 'لس آنجلس', ru: 'Лос-Анджелес' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/USC_Trojans_logo.svg/1200px-USC_Trojans_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1580982324076-d95e795c05f5?q=80&w=2070&auto=format&fit=crop',
        established: 1880,
        ranking: 'Top 60 World',
        studentsCount: '48,000+',
        description: {
            ar: 'جامعة جنوب كاليفورنيا معروفة ببرامج السينما والتكنولوجيا وإدارة الأعمال.',
            en: 'USC is known for its cinema, technology, and business programs in the heart of Los Angeles.',
            fa: 'USC به برنامه‌های سینما، فناوری و کسب‌وکار شهرت دارد.',
            ru: 'USC известен программами кинематографа, технологий и бизнеса.',
        },
        specialties: ['cinema', 'engineering', 'business', 'computer-science'],
        languages: ['English'],
        tuitionRange: { ar: '55,000$ - 75,000$', en: '$55,000 - $75,000', fa: '55,000$ - 75,000$', ru: '$55,000 - $75,000' },
        website: 'https://www.usc.edu',
    },

    // Canada
    {
        id: 'utoronto',
        name: { ar: 'جامعة تورنتو', en: 'University of Toronto', fa: 'دانشگاه تورنتو', ru: 'Университет Торонто' },
        country: 'canada',
        city: { ar: 'تورنتو', en: 'Toronto', fa: 'تورنتو', ru: 'Торонто' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png',
        image: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?q=80&w=2070&auto=format&fit=crop',
        established: 1827,
        ranking: 'Top 25 World',
        studentsCount: '90,000+',
        description: {
            ar: 'جامعة تورنتو أفضل جامعة في كندا ومن أفضل 25 جامعة في العالم.',
            en: 'University of Toronto is the top university in Canada and ranks among the top 25 globally.',
            fa: 'دانشگاه تورنتو بهترین دانشگاه کانادا و از 25 دانشگاه برتر جهان است.',
            ru: 'Университет Торонто — лучший вуз Канады и один из 25 лучших в мире.',
        },
        specialties: ['medicine', 'engineering', 'AI', 'business'],
        languages: ['English', 'French'],
        tuitionRange: { ar: '30,000$ - 60,000$ CAD', en: 'CAD $30,000 - $60,000', fa: '30,000$ - 60,000$ CAD', ru: 'CAD $30,000 - $60,000' },
        website: 'https://www.utoronto.ca',
        featured: true,
    },
    {
        id: 'mcgill',
        name: { ar: 'جامعة ماكغيل', en: 'McGill University', fa: 'دانشگاه مک‌گیل', ru: 'Университет Макгилл' },
        country: 'canada',
        city: { ar: 'مونتريال', en: 'Montreal', fa: 'مونترال', ru: 'Монреаль' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2070&auto=format&fit=crop',
        established: 1821,
        ranking: 'Top 30 World',
        studentsCount: '40,000+',
        description: {
            ar: 'جامعة ماكغيل من أعرق الجامعات في كندا، تشتهر بالطب والقانون والأبحاث العلمية.',
            en: 'McGill University is one of the most prestigious in Canada, renowned for medicine, law, and research.',
            fa: 'دانشگاه مک‌گیل از معتبرترین دانشگاه‌های کانادا است.',
            ru: 'Университет Макгилл — один из самых престижных вузов Канады.',
        },
        specialties: ['medicine', 'law', 'sciences', 'music'],
        languages: ['English', 'French'],
        tuitionRange: { ar: '20,000$ - 50,000$ CAD', en: 'CAD $20,000 - $50,000', fa: '20,000$ - 50,000$ CAD', ru: 'CAD $20,000 - $50,000' },
        website: 'https://www.mcgill.ca',
    },

    // Russia
    {
        id: 'msu',
        name: { ar: 'جامعة موسكو الحكومية', en: 'Moscow State University', fa: 'دانشگاه دولتی مسکو', ru: 'МГУ имени Ломоносова' },
        country: 'russia',
        city: { ar: 'موسكو', en: 'Moscow', fa: 'مسکو', ru: 'Москва' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/MSU_emblem.png/800px-MSU_emblem.png',
        image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=2070&auto=format&fit=crop',
        established: 1755,
        ranking: 'Top 80 World',
        studentsCount: '47,000+',
        description: {
            ar: 'جامعة موسكو الحكومية أعرق وأقدم جامعة في روسيا، رمز التعليم العالي الروسي.',
            en: 'Moscow State University is the most prestigious and oldest university in Russia, a symbol of Russian higher education.',
            fa: 'دانشگاه دولتی مسکو معتبرترین و قدیمی‌ترین دانشگاه روسیه است.',
            ru: 'МГУ — самый престижный и старейший университет России.',
        },
        specialties: ['sciences', 'mathematics', 'humanities', 'medicine'],
        languages: ['Russian', 'English'],
        tuitionRange: { ar: '3,000$ - 8,000$', en: '$3,000 - $8,000', fa: '3,000$ - 8,000$', ru: '$3,000 - $8,000' },
        website: 'https://www.msu.ru',
        featured: true,
    },
    {
        id: 'spbsu',
        name: { ar: 'جامعة سانت بطرسبورغ الحكومية', en: 'Saint Petersburg State University', fa: 'دانشگاه دولتی سن‌پترزبورگ', ru: 'СПбГУ' },
        country: 'russia',
        city: { ar: 'سانت بطرسبورغ', en: 'Saint Petersburg', fa: 'سن‌پترزبورگ', ru: 'Санкт-Петербург' },
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SPbGU_Logo.svg/1200px-SPbGU_Logo.svg.png',
        image: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?q=80&w=2067&auto=format&fit=crop',
        established: 1724,
        ranking: 'Top 250 World',
        studentsCount: '30,000+',
        description: {
            ar: 'ثاني أقدم جامعة في روسيا، خرّجت رؤساء دول ونوبليين في العلوم والآداب.',
            en: 'The second oldest university in Russia, home to Nobel laureates and world leaders.',
            fa: 'دومین دانشگاه قدیمی روسیه، زادگاه برندگان نوبل و رهبران جهان.',
            ru: 'Второй старейший вуз России, alma mater нобелевских лауреатов.',
        },
        specialties: ['law', 'humanities', 'sciences', 'international-relations'],
        languages: ['Russian', 'English'],
        tuitionRange: { ar: '2,500$ - 7,000$', en: '$2,500 - $7,000', fa: '2,500$ - 7,000$', ru: '$2,500 - $7,000' },
        website: 'https://www.spbu.ru',
    },
    // Northern Cyprus
    {
        id: 'emu',
        name: { ar: 'جامعة شرق البحر المتوسط', en: 'Eastern Mediterranean University', fa: 'دانشگاه مدیترانه شرقی', ru: 'Восточно-Средиземноморский университет' },
        country: 'north-cyprus',
        city: { ar: 'فاماغوستا', en: 'Famagusta', fa: 'فاماگوستا', ru: 'Фамагуста' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Eastern_Mediterranean_University_logo.svg/1200px-Eastern_Mediterranean_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=2074&auto=format&fit=crop',
        established: 1979,
        ranking: 'Top 1000',
        studentsCount: '20,000+',
        description: {
            ar: 'جامعة شرق البحر المتوسط هي جامعة حكومية دولية في شمال قبرص، تقدم برامج أكاديمية متميزة بأكثر من 100 تخصص.',
            en: 'Eastern Mediterranean University is a state international university in Northern Cyprus offering outstanding academic programs in over 100 specializations.',
            fa: 'دانشگاه مدیترانه شرقی یک دانشگاه بین‌المللی دولتی در قبرس شمالی است.',
            ru: 'Восточно-Средиземноморский университет — государственный международный университет в Северном Кипре.'
        },
        specialties: ['engineering', 'medicine', 'business', 'law', 'computer-science', 'architecture'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '3,000$ - 8,000$', en: '$3,000 - $8,000', fa: '3,000$ - 8,000$', ru: '$3,000 - $8,000' },
        website: 'https://www.emu.edu.tr',
        featured: true,
    },
    {
        id: 'neu',
        name: { ar: 'جامعة الشرق الأدنى', en: 'Near East University', fa: 'دانشگاه خاور نزدیک', ru: 'Университет Ближнего Востока' },
        country: 'north-cyprus',
        city: { ar: 'نيقوسيا', en: 'Nicosia', fa: 'نیکوزیا', ru: 'Никосия' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Near_East_University_logo.svg/1200px-Near_East_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
        established: 1988,
        ranking: 'Top 600',
        studentsCount: '26,000+',
        description: {
            ar: 'جامعة الشرق الأدنى من أكبر الجامعات في قبرص الشمالية، تضم 19 كلية وتقدم تعليماً عالمياً بمعايير أوروبية.',
            en: 'Near East University is one of the largest universities in Northern Cyprus with 19 faculties offering world-class education with European standards.',
            fa: 'دانشگاه خاور نزدیک یکی از بزرگ‌ترین دانشگاه‌های قبرس شمالی است.',
            ru: 'Университет Ближнего Востока — один из крупнейших университетов Северного Кипра.'
        },
        specialties: ['medicine', 'dentistry', 'pharmacy', 'engineering', 'law', 'business'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '3,500$ - 12,000$', en: '$3,500 - $12,000', fa: '3,500$ - 12,000$', ru: '$3,500 - $12,000' },
        website: 'https://www.neu.edu.tr',
        featured: true,
    },
    {
        id: 'ciu',
        name: { ar: 'جامعة قبرص الدولية', en: 'Cyprus International University', fa: 'دانشگاه بین‌المللی قبرس', ru: 'Кипрский международный университет' },
        country: 'north-cyprus',
        city: { ar: 'نيقوسيا', en: 'Nicosia', fa: 'نیکوزیا', ru: 'Никосия' },
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Cyprus_International_University_logo.svg/1200px-Cyprus_International_University_logo.svg.png',
        image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2074&auto=format&fit=crop',
        established: 1997,
        ranking: 'Top 1500',
        studentsCount: '15,000+',
        description: {
            ar: 'جامعة قبرص الدولية تقدم تعليماً متميزاً بأسعار مناسبة مع اعترافات دولية واسعة وبيئة متعددة الثقافات.',
            en: 'Cyprus International University offers outstanding education at affordable prices with wide international recognition and a multicultural environment.',
            fa: 'دانشگاه بین‌المللی قبرس آموزش با کیفیت و مقرون‌به‌صرفه ارائه می‌دهد.',
            ru: 'Кипрский международный университет предлагает качественное образование по доступным ценам.'
        },
        specialties: ['business', 'engineering', 'communication', 'tourism', 'health-sciences'],
        languages: ['English', 'Turkish'],
        tuitionRange: { ar: '2,500$ - 6,000$', en: '$2,500 - $6,000', fa: '2,500$ - 6,000$', ru: '$2,500 - $6,000' },
        website: 'https://www.ciu.edu.tr',
    },
];

// Helper: get universities by country
export const getUniversitiesByCountry = (countryId: string): University[] => {
    if (countryId === 'all') return universities;
    return universities.filter(uni => uni.country === countryId);
};

// Helper: get university by id
export const getUniversityById = (id: string): University | undefined => {
    return universities.find(uni => uni.id === id);
};

// Helper: get featured universities
export const getFeaturedUniversities = (): University[] => {
    return universities.filter(uni => uni.featured);
};
