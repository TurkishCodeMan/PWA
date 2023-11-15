import { fetcher } from "@/shared/api/client";
import { Prisma, Task, TaskGroup, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const userWithCompanies = Prisma.validator<Prisma.UserArgs>()({
  include: {
   employeeCompany:true,
   ownerCompanies:true,
  },
});

export type UserWithCompanies = Prisma.UserGetPayload<
  typeof userWithCompanies
>;

export function useMe() {
  const {data}=useSession();
 console.log(data,'DATA');
  const queryClient = useQueryClient();

  const result = useQuery<UserWithCompanies>({
    queryKey: ["me"],
    enabled:!!data?.user?.email,
    queryFn: () => {
      return fetcher({ url: "/api/me", method: "GET" }).then(
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



