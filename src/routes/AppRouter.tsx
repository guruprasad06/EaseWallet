import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "../layouts/AppLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/app/DashboardPage";
import MyVaultPage from "../pages/app/MyVaultPage";
import ProfilePage from "../pages/app/ProfilePage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
  path="/app/dashboard"
  element={
    <ProtectedRoute>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </ProtectedRoute>
  }
/>

        <Route
  path="/app/vault"
  element={
    <ProtectedRoute>
      <AppLayout>
        <MyVaultPage />
      </AppLayout>
    </ProtectedRoute>
  }
/>

        <Route
  path="/app/profile"
  element={
    <ProtectedRoute>
      <AppLayout>
        <ProfilePage />
      </AppLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AdminDashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}