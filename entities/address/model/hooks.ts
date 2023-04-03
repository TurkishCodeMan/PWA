import { fetcher } from "@/shared/api/client";
import { Address, Prisma, Task, TaskGroup, User } from "@prisma/client";
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
