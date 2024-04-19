import AuthContext from "@/contexts/auth";
import { useContext } from "react";

export default function useAuth() {
  const {
    loading,
    authData: { user, role },
    login,
    logout,
    register,
  } = useContext(AuthContext);

  return {
    loading,
    user,
    role,
    login,
    logout,
    register,
  };
}
