import { fetcher } from "@/shared/api/client";
import { Prisma, Task, TaskGroup, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";

const companyWithUsers = Prisma.validator<Prisma.CompanyArgs>()({
  include: {
    employees:true,
    owners:true,
      
    
  },
});

export type CompanyWithUsers = Prisma.CompanyGetPayload<
  typeof companyWithUsers
>;

export function useMyCompany() {
  const queryClient = useQueryClient();

  const result = useQuery<CompanyWithUsers>({
    queryKey: ["my-company"],
    queryFn: () => {
      return fetcher({ url: "/api/company/company", method: "GET" }).then(
        (data) => data
      );
    },
    onSuccess(result) {
      return result;
    },
    // keepPreviousData: true,
  });

  return { ...result };
}


export function useAllCompany(){
  const queryClient=useQueryClient()


  const result=useQuery<any>({
    queryKey:['all-company'],
    queryFn:()=>{
      return fetcher({url:'/api/company/all-company',method:'GET'}).then((data)=>data);
    },
    onSuccess(result){
      return result
    },
    onError(err){
      console.log(err)
    }
  })

  return { ...result };
}