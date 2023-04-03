import { fetcher } from "@/shared/api/client";
import { Prisma, Task, TaskGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useUpdateTaskGroupOrder() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: {
      id: string;
      newOrder: number;
    
    }) => fetcher({ url: "/api/task/update-task-group", method: "PUT", body: data }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("task-groups");
      },
    }
  );
}
