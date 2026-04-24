import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingContactButtons from './FloatingContactButtons';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="font-['Tajawal'] antialiased">
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
