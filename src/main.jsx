// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet
} from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext'; // Import NotificationProvider
import { AppProvider } from './context/AppContext';

// Pages
import LandingPage from './pages/LandingPage';
import TeacherLoginPage from './pages/TeacherLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RequestAccessPage from './pages/RequestAccessPage';
import TeacherRegistrationPage from './pages/TeacherRegistrationPage';
import StudentRegistrationPage from './pages/StudentRegistrationPage';
import Dashboard from './pages/Dashboard';
import AssignmentPage from './pages/AssignmentPage';
import RouteErrorElement from './components/ui/RouteErrorElement';
import ProtectedRoute from './components/ui/ProtectedRoute';

import './index.css';

// Root layout component
const RootLayout = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<RouteErrorElement />}>
      {/* Public routes */}
      <Route index element={<LandingPage />} />
      <Route path="teacher-login" element={<TeacherLoginPage />} />
      <Route path="student-login" element={<StudentLoginPage />} />
      <Route path="request-access" element={<RequestAccessPage />} />
      <Route path="teacher-registration" element={<TeacherRegistrationPage />} />
      <Route path="student-registration" element={<TeacherRegistrationPage />} />

      {/* 🔒 Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assignment/:id" element={<AssignmentPage />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<LandingPage />} />
    </Route>
  ),
  {
    basename: '/EduAI',
  }
);

// Wrap the entire app with NotificationProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </React.StrictMode>
);