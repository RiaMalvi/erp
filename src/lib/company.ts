import axios from "@/config/axios.config";
import { CompanyType, Meta } from "@/types/company";

export async function getCompanies(
  {
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  } = {
    page: 1,
    limit: 10,
  }
): Promise<{
  companies: CompanyType[];
  meta: Meta;
}> {
  try {
    const response = await axios.get("/users/companies", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function addCompany(
  company: Omit<CompanyType, "id" | "createdAt" | "ownerId">
) {
  await axios.post("/company/create", company, {
    withCredentials: true,
  });
}
