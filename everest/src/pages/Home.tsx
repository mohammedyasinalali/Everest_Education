import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import Stats from '../components/Stats';
import Features from '../components/Features';
import About from '../components/About';
import Services from '../components/Services';
import Consultation from '../components/Consultation';
import Specialties from '../components/Specialties';
import Partners from '../components/Partners';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO />
            <Hero />
            <SearchFilter />
            <Stats />
            <Features />
            <About />
            <Services />
            <Consultation />
            <Specialties />
            <Partners />
            <FAQ />
            <ContactForm />
        </>
    );
};

export default Home;
