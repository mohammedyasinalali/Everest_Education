import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicApi } from '../services/publicApi';

export interface ContactFormData {
    name: string;
    lastname: string;
    gender: 'male' | 'female';
    country: string;
    helpType: string;
    phone: string;
}

const initialData: ContactFormData = {
    name: '',
    lastname: '',
    gender: 'male',
    country: '',
    helpType: '',
    phone: ''
};

/**
 * Custom hook to encapsulate contact form state and submission logic.
 */
export const useContactForm = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<ContactFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleGenderChange = (gender: 'male' | 'female') => {
        setFormData(prev => ({ ...prev, gender }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const payload = {
            firstName: formData.name,
            lastName: formData.lastname,
            gender: formData.gender,
            country: formData.country,
            service: formData.helpType,
            phone: formData.phone,
            language: i18n.language || 'ar'
        };

        const success = await publicApi.submitRequest(payload);
        setIsSubmitting(false);

        if (success) {
            alert(t('contact_form.success_message') || 'تم إرسال طلبك بنجاح. سنتواصل معك قريباً.');
            setFormData(initialData);
        } else {
            alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        }
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleGenderChange,
        handleSubmit
    };
};
