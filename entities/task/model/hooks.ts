import { fetcher } from "@/shared/api/client";
import { Prisma, Task, TaskGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";
const taskGroupWithTasks = Prisma.validator<Prisma.TaskGroupArgs>()({
  include: {
    tasks: {
      include: {
        users: true,
      },
    },
  },
});

export type TaskGroupWithTasks = Prisma.TaskGroupGetPayload<
  typeof taskGroupWithTasks
>;

export function useAllTaskGroups() {
  const queryClient = useQueryClient();

  const result = useQuery<TaskGroupWithTasks[]>({
    queryKey: ["task-groups"],
    queryFn: () => {
      return fetcher({ url: "/api/task/task-groups", method: "GET" }).then(
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

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: {
      taskId: string;
      sourceGroupId: string;
      destinationGroupId: string;
    }) => fetcher({ url: "/api/task/task-groups", method: "PUT", body: data }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("task-groups");
      },
    }
  );
}

export function useUpdateTaskDetail() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Task) =>
      fetcher({ url: "/api/task/task", method: "PUT", body: data }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("task-groups");
      },
    }
  );
}
