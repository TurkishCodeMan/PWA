import { fetcher } from "@/shared/api/client";
import { Prisma, Task, TaskGroup, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/navigation"; // Router ile yönlendirme yapmak için
import { signIn } from "next-auth/react"; // NextAuth signIn fonksiyonu

const userWithCompanies = Prisma.validator<Prisma.UserArgs>()({
  include: {
    employeeCompany: true,
    ownerCompanies: true,
  },
});

export type UserWithCompanies = Prisma.UserGetPayload<typeof userWithCompanies>;

export function useMe() {
  const { data } = useSession();

  console.log(data, "Session");
  const queryClient = useQueryClient();

  const result = useQuery<UserWithCompanies>({
    queryKey: ["me"],
    enabled: !!data?.user?.email,
    queryFn: () => {
      return fetcher({ url: "/api/me", method: "GET" }).then((data) => data);
    },
    onSuccess(result) {
      return result;
    },
    // keepPreviousData: true,
  });

  return { ...result };
}

export function useRegister() {
  const router = useRouter();

  return useMutation(
    async (userData: {
      name: string;
      email: string;
      password: string;
      phone: string;
      taskGroup: string;
      companyId: string;
      role: string,
    }) => {
      // Register API'sine istek yap
      return fetcher({
        url: "/api/auth/register", // Register API endpoint'i
        method: "POST",
        body: userData, // Kullanıcı bilgileri
      });
    },
    {
      onSuccess: async (data, variables) => {
        // Kayıt başarılı olursa oturum aç
        const res = await signIn("credentials", {
          redirect: false, // Otomatik yönlendirmeyi durduruyoruz
          email: variables.email,
          password: variables.password,
        });

        console.log('On Success', res)

        if (res?.ok) {
          // Oturum açma başarılıysa, welcome sayfasına yönlendir
          router.push("/welcome");
        }
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    }
  );
}