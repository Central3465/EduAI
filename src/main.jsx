// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext"; // Import NotificationProvider
import { AppProvider } from "./context/AppContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";

// Pages
import LandingPage from "./pages/LandingPage";
import TeacherLoginPage from "./pages/TeacherLoginPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import RequestAccessPage from "./pages/RequestAccessPage";
import TeacherRegistrationPage from "./pages/TeacherRegistrationPage";
import StudentRegistrationPage from "./pages/StudentRegistrationPage";
import Dashboard from "./pages/Dashboard";
import AssignmentPage from "./pages/AssignmentPage";
import RouteErrorElement from "./components/ui/RouteErrorElement";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import EmailVerificationFallback from "./pages/EmailVerificationFallback";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import JobDetailPage from "./pages/JobDetailPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import CareersPage from "./pages/CareersPage";

import "./index.css";

const RootLayout = () => <Outlet />;

// Add this to catch ALL navigation events
window.addEventListener('beforeunload', (event) => {
  console.log('=== PAGE UNLOADING ===');
  console.log('Current URL:', window.location.href);
});

// Add this to catch navigation attempts
const originalPushState = window.history.pushState;
window.history.pushState = function() {
  console.log('=== PUSH STATE CALLED ===');
  console.log('Arguments:', arguments);
  console.log('New URL would be:', arguments[2]);
  return originalPushState.apply(this, arguments);
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<RouteErrorElement />}
    >
      {/* Public routes */}
      <Route index element={<LandingPage />} />
      <Route path="teacher-login" element={<TeacherLoginPage />} />
      <Route path="student-login" element={<StudentLoginPage />} />
      <Route path="request-access" element={<RequestAccessPage />} />
      <Route
        path="teacher-registration"
        element={<TeacherRegistrationPage />}
      />
      <Route
        path="student-registration"
        element={<StudentRegistrationPage />}
      />
      <Route path="verify-email" element={<EmailVerificationPage />} />
      <Route path="/EduAI/verify-email" element={<EmailVerificationFallback />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/job" element={<JobDetailPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />

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
    basename: "/EduAI",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <SubscriptionProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </SubscriptionProvider>
    </AppProvider>
  </React.StrictMode>
);

