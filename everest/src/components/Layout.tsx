import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButtons from './FloatingContactButtons';

import { useTranslation } from 'react-i18next';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { i18n } = useTranslation();
    
    return (
        <div className="font-['Tajawal'] antialiased" dir={i18n.dir()}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
            <FloatingContactButtons />
        </div>
    );
};

export default Layout;
