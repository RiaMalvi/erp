import instance from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseURL) {
  throw new Error("BACKEND URL is not defined");
}

const axios = instance.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export default axios;
