
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title,
    description,
    keywords = [],
    image = '/images/logo.png',
    url = 'https://everest-edu.com',
    type = 'website'
}: SEOProps) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const siteTitle = 'Everest Education | مؤسسة ايفرست التعليمية';
    const defaultDescription = 'مؤسسة ايفرست التعليمية - الخيار الأول للدراسة في تركيا. نقدم خدمات تسجيل الطلاب الدوليين في الجامعات والمدارس الخاصة في إسطنبول.';

    const fullTitle = title ? `${title} | Everest Education` : siteTitle;
    const metaDescription = description || defaultDescription;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <html lang={currentLang} dir={currentLang === 'ar' || currentLang === 'fa' ? 'rtl' : 'ltr'} />
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Everest Education" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;