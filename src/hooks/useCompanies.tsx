import CompanyContext from "@/contexts/companies";
import { useContext } from "react";

export default function useCompanies() {
  const {
    companies,
    meta,
    nextPage,
    prevPage,
    addCompany,
    refreshCompanies,
    loading,
  } = useContext(CompanyContext);

  return {
    companies,
    meta,
    nextPage,
    prevPage,
    addCompany,
    refreshCompanies,
    loading,
  };
}
