import { createContext } from "react";
import { CompanyType, Meta } from "@/types/company";

const CompanyContext = createContext<{
  companies: CompanyType[];
  nextPage: () => void;
  prevPage: () => void;
  meta: Meta;
  addCompany: (
    company: Omit<CompanyType, "id" | "createdAt" | "ownerId">
  ) => void;
  refreshCompanies: () => void;
  loading: boolean;
}>({
  companies: [],
  meta: {
    total: 0,
    limit: 10,
    page: 1,
    totalPages: 1,
  },
  nextPage: () => {},
  prevPage: () => {},
  addCompany: () => {},
  refreshCompanies: () => {},
  loading: true,
});

export default CompanyContext;
