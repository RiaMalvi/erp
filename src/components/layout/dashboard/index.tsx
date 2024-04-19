import React from "react";
import clsx from "clsx";
import Header from "./header";
import useAuth from "@/hooks/auth";
import { UserType } from "@/types/user";
import Loading from "@/components/Loading";

const DashboardLayout = ({
  children,
}: {
  children: (user: UserType) => React.ReactNode;
}) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <div>Unauthenticated</div>;
  }
  return (
    <div className="bg-pallete1-background px-14 grid grid-rows-[auto,1fr] h-screen overflow-hidden">
      <Header />
      <main className={clsx("overflow-y-auto py-2")}>{children(user)}</main>
    </div>
  );
};

export default DashboardLayout;
