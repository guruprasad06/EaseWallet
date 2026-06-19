import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

export default function useAuth() {
  return useContext(AuthContext);
}
