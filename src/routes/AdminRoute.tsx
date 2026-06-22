import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  if (auth?.user?.role !== "admin") {
    return <Navigate to="/app/dashboard" />;
  }

  return <>{children}</>;
}