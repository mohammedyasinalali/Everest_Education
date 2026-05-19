import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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

// Admin imports
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminBlogs from './admin/pages/AdminBlogs';
import AdminBlogForm from './admin/pages/AdminBlogForm';
import AdminUniversities from './admin/pages/AdminUniversities';
import AdminUniversityForm from './admin/pages/AdminUniversityForm';
import { AdminSpecialties } from './admin/pages/AdminSpecialties';
import { AdminSpecialtyForm } from './admin/pages/AdminSpecialtyForm';
import { AdminRequests } from './admin/pages/AdminRequests';
import AdminUsers from './admin/pages/AdminUsers';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

const MainLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const AdminLayoutWrapper = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayoutWrapper />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="blogs/new" element={<AdminBlogForm />} />
          <Route path="blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="universities" element={<AdminUniversities />} />
          <Route path="universities/new" element={<AdminUniversityForm />} />
          <Route path="universities/edit/:id" element={<AdminUniversityForm />} />
          <Route path="specialties" element={<AdminSpecialties />} />
          <Route path="specialties/new" element={<AdminSpecialtyForm />} />
          <Route path="specialties/edit/:id" element={<AdminSpecialtyForm />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>

        {/* Main Website Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/specialties" element={<TopSpecialties />} />
          <Route path="/specialties/:id" element={<SpecialtyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;