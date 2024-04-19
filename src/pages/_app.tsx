import AuthProvider from "@/providers/auth";
import CompanyProvider from "@/providers/company";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CompanyProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </CompanyProvider>
    </AuthProvider>
  );
}
