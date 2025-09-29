import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoadingScreen from './components/common/LoadingScreen';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Team = lazy(() => import('./pages/public/Team'));
const Achievements = lazy(() => import('./pages/public/Achievements'));
const Publications = lazy(() => import('./pages/public/Publications'));
const Events = lazy(() => import('./pages/public/Events'));
const EventDetails = lazy(() => import('./pages/public/EventDetails'));

const StudentLogin = lazy(() => import('./pages/student/StudentLogin'));
const StudentSignup = lazy(() => import('./pages/student/StudentSignup'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AddEvent = lazy(() => import('./pages/admin/AddEvent'));

// Route protection components
const ProtectedRoute = ({ children, requireAuth = 'none' }: { 
  children: React.ReactNode, 
  requireAuth?: 'student' | 'admin' | 'none' 
}) => {
  const { user, admin } = useAuth();

  if (requireAuth === 'student' && !user) {
    return <Navigate to="/student/login" replace />;
  }

  if (requireAuth === 'admin' && !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const { user, admin } = useAuth();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showNavFooter = !isAdminRoute || location.pathname === '/admin/login';

  return (
    <div className="min-h-screen flex flex-col">
      {showNavFooter && <Navbar />}
      
      <main className="flex-1">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Student Routes */}
            <Route path="/student/login" element={
              user ? <Navigate to="/student/dashboard" replace /> : <StudentLogin />
            } />
            <Route path="/student/signup" element={
              user ? <Navigate to="/student/dashboard" replace /> : <StudentSignup />
            } />
            <Route path="/student/dashboard" element={
              <ProtectedRoute requireAuth="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={
              admin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requireAuth="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/event/new" element={
              <ProtectedRoute requireAuth="admin">
                <AddEvent />
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute requireAuth="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/participants" element={
              <ProtectedRoute requireAuth="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requireAuth="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {showNavFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;