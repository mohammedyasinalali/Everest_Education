// Navigation Links
export interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}

export const navLinks: NavLink[] = [
    { label: 'header.home', href: '/', active: true },
    { label: 'header.services', href: '/services' },
    { label: 'header.universities', href: '/universities' },
    { label: 'header.specialties', href: '/specialties' },
    { label: 'header.about_us', href: '/about' },
    { label: 'header.blog', href: '/blog' },
];

// Stats Data
export interface Stat {
    value: string;
    label: string;
}

export const statsData: Stat[] = [
    { value: '+5', label: 'hero.stats.years_experience' },
    { value: '+26', label: 'hero.stats.private_universities' },
    { value: '+12', label: 'hero.stats.academic_advisors' },
    { value: '10,000+', label: 'hero.stats.university_admissions' },
];

// Features Data
export interface Feature {
    icon: string;
    label: string;
}

export const featuresData: Feature[] = [
    { icon: 'fas fa-box-open', label: 'features_section.quality' },
    { icon: 'fas fa-search-dollar', label: 'features_section.affordability' },
    { icon: 'fas fa-globe-americas', label: 'features_section.culture' },
    { icon: 'fas fa-user-graduate', label: 'features_section.support' },
];

// Services Data
export interface Service {
    icon: string;
    title: string;
}

export const servicesData: Service[] = [
    { icon: 'fas fa-file-contract', title: 'services_section.items.admissions' },
    { icon: 'fas fa-building', title: 'services_section.items.housing' },
    { icon: 'fas fa-graduation-cap', title: 'services_section.items.equivalency' },
    { icon: 'fas fa-passport', title: 'services_section.items.residence' },
];

export const afterServicesData: Service[] = [
    { icon: 'fas fa-graduation-cap', title: 'services_section.after_items.equivalency' }, // Blue
    { icon: 'fas fa-id-card', title: 'services_section.after_items.residence' }, // Yellow
    { icon: 'fas fa-home', title: 'services_section.after_items.housing_secure' }, // Dark
    { icon: 'fas fa-bus', title: 'services_section.after_items.transport_card' }, // Blue
    { icon: 'fas fa-university', title: 'services_section.after_items.bank_account' }, // Yellow
    { icon: 'fas fa-first-aid', title: 'services_section.after_items.insurance' }, // Dark
    { icon: 'fas fa-plane-arrival', title: 'services_section.after_items.pickup' }, // Blue
    { icon: 'fas fa-sim-card', title: 'services_section.after_items.sim_card' }, // Yellow
    { icon: 'fas fa-language', title: 'services_section.after_items.translation' }, // Dark
];

// Specialties Data
export interface Specialty {
    image: string;
    title: string;
    category: string;
    id: string;
}

export const specialtiesData: Specialty[] = [
    {
        id: 'dentistry',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop',
        title: 'search_filter.specialties.dentistry',
        category: 'header.specialties',
    },
    {
        id: 'pharmacy',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop',
        title: 'search_filter.specialties.pharmacy',
        category: 'header.specialties',
    },
    {
        id: 'medicine',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        title: 'search_filter.specialties.medicine',
        category: 'header.specialties',
    },
    {
        id: 'dentistry',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop',
        title: 'search_filter.specialties.dentistry',
        category: 'header.specialties',
    },
    {
        id: 'software-engineering',
        image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop',
        title: 'search_filter.specialties.software_eng',
        category: 'header.specialties',
    },
    {
        id: 'business-admin',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop',
        title: 'search_filter.specialties.business_admin',
        category: 'header.specialties',
    },
];

// FAQ Data
export interface FAQItem {
    question: string;
    answer: string;
}

export const faqData: FAQItem[] = [
    { question: 'faq.q1', answer: 'faq.a1' },
    { question: 'faq.q2', answer: 'faq.a2' },
    { question: 'faq.q3', answer: 'faq.a3' },
    { question: 'faq.q4', answer: 'faq.a4' },
    { question: 'faq.q5', answer: 'faq.a5' },
    { question: 'faq.q6', answer: 'faq.a6' },
    { question: 'faq.q7', answer: 'faq.a7' },
    { question: 'faq.q8', answer: 'faq.a8' },
];

// Partners Data
export interface Partner {
    name: string;
    logo: string;
}

export const partnersRow1: Partner[] = [
    { name: 'Medipol', logo: '/images/university-logos/Medipol.png' },
    { name: 'Aydin', logo: '/images/university-logos/Aydin.png' },
    { name: 'Okan', logo: '/images/university-logos/okan.png' },
    { name: 'Nisantasi', logo: '/images/university-logos/nisantasi.png' },
    { name: 'Atlas', logo: '/images/university-logos/atlas university.png' },
    { name: 'BAU', logo: '/images/university-logos/Bau.png' },
    { name: 'Bilgi', logo: '/images/university-logos/Istanbul Bilgi.png' },
    { name: 'Altinbas', logo: '/images/university-logos/Altinbas.png' },
    { name: 'Atilim', logo: '/images/university-logos/Atilim University.png' },
    { name: 'Beykent', logo: '/images/university-logos/Beykent_Universitesi_Logo_Yeni.png' },
    { name: 'Toros', logo: '/images/university-logos/Toros.png' }
];

export const partnersRow2: Partner[] = [
    { name: 'Gelisim', logo: '/images/university-logos/gelisim.png' },
    { name: 'Istinye', logo: '/images/university-logos/Istinye.png' },
    { name: 'Uskudar', logo: '/images/university-logos/uskudar.png' },
    { name: 'Bilkent', logo: '/images/university-logos/bilkent.png' },
    { name: 'Halic', logo: '/images/university-logos/halic.png' },
    { name: 'Dogus', logo: '/images/university-logos/dogus.png' },
    { name: 'Arel', logo: '/images/university-logos/istanbul arel.png' },
    { name: 'Yeni Yuzyil', logo: '/images/university-logos/yeni yuzyil.png' },
    { name: 'Ozyegin', logo: '/images/university-logos/Özyeğin university.png' },
    { name: 'Piri Reis', logo: '/images/university-logos/Piri reis.png' }
];

// Contact Info
export interface ContactInfo {
    icon: string;
    title: string;
    lines: string[];
    dir?: string;
}

export const contactInfo: ContactInfo[] = [
    {
        icon: 'fas fa-map-marker-alt',
        title: 'contact.address_title',
        lines: [
            'Mevlana Mah. Sultan Ahmet Cad. Delta',
            'Plaza iş Merkezi A1 Blok Kat:07 Daire:16',
            'Esenyurt/istanbul',
        ],
    },
    {
        icon: 'fas fa-phone-alt',
        title: 'contact.phone_title',
        lines: ['+90 545 136 54 95', '+90 545 136 54 95'],
        dir: 'ltr',
    },
    {
        icon: 'fas fa-envelope',
        title: 'contact.email_title',
        lines: ['info@everest-edu.com', 'admission@everest-edu.com'],
    },
];

// Social Links
export interface SocialLink {
    icon: string;
    href: string;
    label: string;
}

export const socialLinks: SocialLink[] = [
    { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
    { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
    { icon: 'fab fa-whatsapp', href: 'https://wa.me/905451365495', label: 'WhatsApp' },
];

export interface TeamMember {
    name: string;
    nameEn: string;
    position: string;
    positionEn: string;
    image: string;
}

export const leadershipData: TeamMember[] = [
    {
        name: '��� �������',
        nameEn: 'Omar Al-Husseini',
        position: '������ �����',
        positionEn: 'General Manager',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� �������',
        nameEn: 'Yasser Al-Mansour',
        position: '������ ��������',
        positionEn: 'Executive Director',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop'
    }
];

export const teamData: TeamMember[] = [
    {
        name: '���� ������',
        nameEn: 'Tariq Al-Shamri',
        position: '���� ���� ������',
        positionEn: 'Student Affairs Manager',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� ������',
        nameEn: 'Faisal Al-Rashed',
        position: '���� ������� �������',
        positionEn: 'HR Manager',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� ������',
        nameEn: 'Samer Al-Khatib',
        position: '���� �������',
        positionEn: 'Marketing Manager',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� �������',
        nameEn: 'Nader Al-Otaibi',
        position: '���� �������� ������',
        positionEn: 'Public Relations Manager',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� ������',
        nameEn: 'Ziad Al-Kurdi',
        position: '���� ��������',
        positionEn: 'Project Manager',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� �������',
        nameEn: 'Basel Al-Jabri',
        position: '������ ����',
        positionEn: 'Technical Consultant',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� ������',
        nameEn: 'Haitham Al-Salem',
        position: '������ �����',
        positionEn: 'Student Consultant',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: '���� �������',
        nameEn: 'Rami Al-Baytar',
        position: '������ �������',
        positionEn: 'Academic Consultant',
        image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&auto=format&fit=crop'
    }
];

export interface Reason {
    icon: string;
    key: string;
    color: string;
}

export const reasonsData: Reason[] = [
    { icon: 'fas fa-hand-holding-usd', key: 'free', color: 'from-primary to-navy' },
    { icon: 'fas fa-user-tie', key: 'experience', color: 'from-secondary to-secondary' },
    { icon: 'fas fa-university', key: 'universities', color: 'from-primary to-navy' },
    { icon: 'fas fa-plane-arrival', key: 'support', color: 'from-secondary to-secondary' }
];

