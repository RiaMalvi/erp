import React from "react";
import DashboardLayout from "@/components/layout/dashboard";
import useAuth from "@/hooks/auth";
import useCompanies from "@/hooks/useCompanies";
import StatCard, {
  StatCardProps,
} from "@/components/Dasboard/atoms/cards/stats";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";

const Dashboard = () => {
  const hours = new Date().getHours();
  const { user } = useAuth();
  const { companies, meta, loading, nextPage, prevPage } = useCompanies();

  const stats: StatCardProps[] = [
    {
      type: "redirect",
      icon: <RiBuilding2Fill size={32} />,
      title: "Total Companies",
      value: `${meta.total}`,
      path: "/companies",
      iconClassName: "bg-blue-500 text-white",
    },
    {
      type: "default",
      icon: <FaStar size={32} />,
      title: "Top Performing Company",
      value: `${companies[0]?.name}`,
      iconClassName: "bg-yellow-500 text-white",
    },
  ];

  return (
    <DashboardLayout>
      {(user) => (
        <>
          <div>
            <h1 className="text-xl font-medium">{`Good ${
              hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening"
            } ${user?.name.split(" ")[0]},`}</h1>
          </div>
          <div className="grid-cols-4 gap-4 grid mt-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} loading={loading} />
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
