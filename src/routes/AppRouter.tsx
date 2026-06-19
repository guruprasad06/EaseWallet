import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

          <Route path="/app/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute> }/>
        <Route path="/app/vault" element={<ProtectedRoute><MyVaultPage /></ProtectedRoute>}/>
 
        <Route path="/app/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}