import React, { useEffect, useState } from "react";
import CompanyContext from "@/contexts/companies";
import { CompanyType, Meta } from "@/types/company";
import { getCompanies, addCompany } from "@/lib/company";
import useAuth from "@/hooks/auth";
import { useSearchParams } from "next/navigation";

export default function CompanyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  let page = parseInt(searchParams.get("page") || "1");
  const [companies, setCompanies] = React.useState<CompanyType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    limit: 10,
    page,
    totalPages: 1,
  });
  const { user } = useAuth();

  const refreshCompanies = async ({ page = 1 } = { page: 1 }) => {
    try {
      setLoading(true);
      const companies = await getCompanies({ page });
      setCompanies(companies.companies);
      setMeta(companies.meta);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (meta.page < meta.totalPages) {
      refreshCompanies({ page: meta.page + 1 });
    }
  };

  const prevPage = () => {
    if (meta.page > 1) {
      refreshCompanies({ page: meta.page - 1 });
    }
  };

  useEffect(() => {
    refreshCompanies();
  }, [user]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        meta,
        addCompany: async (company) => {
          await addCompany(company);
          refreshCompanies();
        },
        refreshCompanies,
        nextPage,
        prevPage,
        loading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
