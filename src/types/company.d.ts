export type CompanyType = {
  id: string;
  name: string;
  address: string;
  gstin: string;
  companyType: "Product" | "Service";
  logo: string;
  website: string;
  createdAt: Date;
  ownerId: string;
};

export type Meta = {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};
