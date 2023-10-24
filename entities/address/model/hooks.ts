import { fetcher } from "@/shared/api/client";
import { Address, Prisma, Task, TaskGroup, User } from "@prisma/client";
import { q } from "msw/lib/glossary-de6278a9";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Address & {
      taskGroupId:string,
      taskId:string
    }) => fetcher({ url: "/api/address/address", method: "PUT", body: data }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("task-groups");
      },
    }
  );
}

export function useAdressByQuery(query: string){
  const queryClient=useQueryClient();
  const result=useQuery({
    queryKey:[`address-list-${query}`],
    enabled:query!='',
    queryFn:()=>fetch(`https://api.dataforsyningen.dk/adresser?q=${query}`).then(data=>data.json())
  })
  console.log(result)
  return result
}