import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import TopSpecialties from './pages/TopSpecialties';
import SpecialtyDetail from './pages/SpecialtyDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/specialties" element={<TopSpecialties />} />
          <Route path="/specialties/:id" element={<SpecialtyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
