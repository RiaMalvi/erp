import { UserLoginType, UserRegisterType } from "@/lib/auth";
import { Role, AuthDataType } from "@/types/user";
import { createContext } from "react";

const AuthContext = createContext<{
  authData: AuthDataType;
  login: (user: UserLoginType) => Promise<void>;
  logout: () => Promise<void>;
  register: (user: UserRegisterType) => Promise<void>;
  loading: boolean;
}>({
  authData: {
    user: null,
    role: Role.GUEST,
  },
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: true,
});

export default AuthContext;
