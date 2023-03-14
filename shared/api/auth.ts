import { useMutation, useQueryClient } from "react-query";
import { fetcher } from "./client";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation(
    (user:any) =>
      fetcher({
        url: `api/register`,
        method: "POST",
        body: user,
        json: false,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
}
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(
    (user:any) =>
      fetcher({
        url: `api/login`,
        method: "POST",
        body: user,
        json: false,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
}