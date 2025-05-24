import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Landing Page
import LandingPage from './pages/landing/LandingPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import EnrolledCourses from './pages/student/EnrolledCourses';
import AvailableCourses from './pages/student/AvailableCourses';
import StudentProfile from './pages/student/StudentProfile';
import EditProfile from './pages/student/EditProfile';
import ViewProfile from './pages/student/ViewProfile';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyCourses from './pages/faculty/FacultyCourses';
import FacultyStudents from './pages/faculty/FacultyStudents';
import FacultyAttendance from './pages/faculty/FacultyAttendance';
import FacultyProfile from './pages/faculty/FacultyProfile';
import EditFacultyProfile from './pages/faculty/EditFacultyProfile';
import ViewFacultyProfile from './pages/faculty/ViewFacultyProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminStudents from './pages/admin/AdminStudents';
import AdminCourses from './pages/admin/AdminCourses';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import FacultyLayout from './layouts/FacultyLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentDashboard />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="available-courses" element={<AvailableCourses />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="profile/view" element={<ViewProfile />} />
            </Route>

            {/* Faculty Routes */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute role="faculty">
                  <FacultyLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<FacultyDashboard />} />
              <Route path="courses" element={<FacultyCourses />} />
              <Route path="students" element={<FacultyStudents />} />
              <Route path="attendance" element={<FacultyAttendance />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="profile/edit" element={<EditFacultyProfile />} />
              <Route path="profile/view" element={<ViewFacultyProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="courses" element={<AdminCourses />} />
            </Route>

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;