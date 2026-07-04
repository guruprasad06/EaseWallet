import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import UsersPage from "../pages/admin/UserPage";
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
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Routes */}
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

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminLayout>
          <UsersPage />
        </AdminLayout>
      </AdminRoute>
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}