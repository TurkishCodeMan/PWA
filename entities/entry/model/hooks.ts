import { CompanyForm, CompanyFormProps } from "@/features/entry/company-form";
import { Group } from "@/features/entry/detail-form";
import { fetcher } from "@/shared/api/client";
import { useMutation, useQueryClient } from "react-query";

type CompanySaveProps= {
    howManyEmployeeSize:number
    howManySubContracterSize:number
    groupsEmployees:Group[]
    groupsSubContracters:Group[]
} & CompanyFormProps


export function useSaveCompany() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CompanySaveProps) =>
      fetcher({ url: "/api/entry/save", method: "POST", body: data }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("company");
      },
    }
  );
}
