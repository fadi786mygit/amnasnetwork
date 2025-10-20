import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/Signup';
import Contact from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserManagement from './Pages/Admin/UserManagement';
import CourseManagement from './Pages/Admin/CourseManagement';
import EditCourse from './Pages/Admin/EditCourse';
import Courses from './Pages/Courses';
import CourseDetail from './Pages/CourseDetail';
import Careers from './Pages/Careers';
import CareerDetail from './Pages/CareerDetail';
import CareerManagement from './Pages/Admin/CareerManagement';
import EditCareers from './Pages/Admin/EditCareers';
import UserDashboard from './Pages/User/UserDashboard';
import ProfileUpdate from './Pages/User/ProfileUpdate';
import PaymentDetails from './Pages/PaymentDetails';

// Protected Route Component for Admin
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem('adminToken');
  return isAdmin ? children : <Navigate to="/admin" />;
};

// Layout component for user pages (with Navbar and Footer)
const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes with Navbar and Footer */}
        <Route 
          path="/" 
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          } 
        />
        <Route 
          path="/login" 
          element={
            <UserLayout>
              <SignIn />
            </UserLayout>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <UserLayout>
              <SignUp />
            </UserLayout>
          } 
        />
        <Route 
          path="/contactus" 
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <UserLayout>
              <AboutUs />
            </UserLayout>
          } 
        />
        <Route 
          path="/services" 
          element={
            <UserLayout>
              <Services />
            </UserLayout>
          } 
        />

         <Route 
          path="/courses" 
          element={
            <UserLayout>
              <Courses />
            </UserLayout>
          } 
        />
        <Route 
          path="/courses/:id" 
          element={
            <UserLayout>
              <CourseDetail />
            </UserLayout>
          } 
        />
        <Route 
          path="/careers" 
          element={
            <UserLayout>
              <Careers />
            </UserLayout>
          } 
        />


        <Route 
          path="/careers/:id" 
          element={
            <UserLayout>
              <CareerDetail />
            </UserLayout>
          } 
        />

         <Route 
          path="/courses/:id/payment" 
          element={
            <UserLayout>
              <PaymentDetails />
            </UserLayout>
          } 
        />

         <Route 
          path="/user/dashboard" 
          element={
           
              <UserDashboard />
           
          } 
        />

        <Route 
          path="/user/profile/update" 
          element={
            <ProfileUpdate />
          }
          />
    
        {/* Admin Routes without Navbar and Footer */}
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard>
                <UserManagement />
              </AdminDashboard>
            </ProtectedAdminRoute>
          } 
        />
        <Route 
          path="/admin/courses" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard>
                <CourseManagement />
              </AdminDashboard>
            </ProtectedAdminRoute>
          } 
        />

        <Route 
          path="/admin/courses/edit/:id" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard>
                <EditCourse />
              </AdminDashboard>
            </ProtectedAdminRoute>
          } 
        />

        <Route 
          path="/admin/careers" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard>
                <CareerManagement />
              </AdminDashboard>
            </ProtectedAdminRoute>
          } 
        />

        <Route 
          path="/admin/careers/edit/:id" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard>
                <EditCareers />
              </AdminDashboard>
            </ProtectedAdminRoute>
          } 
        />

       
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;