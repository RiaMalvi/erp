import React from "react";
import LoginForm from "@/components/auth/molecules/LoginForm";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center h-screen">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
