import { UserType } from "@/types/user";
import axios from "@/config/axios.config";
import { AxiosError } from "axios";

export type UserLoginType = {
  identifier: string;
  password: string;
};

export type UserRegisterType = {
  email: string;
  username: string;
  password: string;
  name: string;
};

export async function login(user: UserLoginType) {
  const response = await axios.post("/auth/login", user, {
    withCredentials: true,
  });
  return response.data.user;
}

export async function validate(): Promise<UserType> {
  const response = await axios.post("/auth/validate", {
    withCredentials: true,
  });
  return response.data.data;
}

export async function logout() {
  await axios.post("/auth/logout", undefined, {
    withCredentials: true,
  });
  return null;
}

export async function signUp(user: UserRegisterType) {
  const response = await axios.post("/auth/register", user);
  return response.data.user;
}

export async function usernameExists(username: string) {
  const res = await axios.post("/users/usernameExists", { username });
  return res.data;
}
