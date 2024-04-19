import { Role, AuthDataType } from "@/types/user";
import React, { useEffect } from "react";
import AuthContext from "@/contexts/auth";
import {
  UserLoginType,
  login as l,
  validate as v,
  logout as signOut,
  signUp,
  UserRegisterType,
} from "@/lib/auth";
import { useRouter } from "next/router";

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [authData, setAuthData] = React.useState<AuthDataType>({
    role: Role.GUEST,
    user: null,
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  const login = async (user: UserLoginType) => {
    try {
      setLoading(true);
      const userData = await l(user);
      setAuthData({
        role: Role.USER,
        user: userData,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const validate = async () => {
    try {
      setLoading(true);
      const userData = await v();
      setAuthData({
        role: Role.USER,
        user: userData,
      });
      if (router.pathname === "/auth/login" || router.pathname === "/") {
        router.push("/dashboard");
      }
    } catch (err) {
      setAuthData({
        role: Role.GUEST,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      setAuthData({
        role: Role.GUEST,
        user: null,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: UserRegisterType) => {
    try {
      setLoading(true);
      const userData = await signUp(user);
      setAuthData({
        role: Role.USER,
        user: userData,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authData.user) {
      validate();
    } else {
      setLoading(false);
    }
  }, [authData.user]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
