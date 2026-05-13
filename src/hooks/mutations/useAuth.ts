import { authKeys } from "@/lib/queryKeys";
import { registerUser } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser(), data);
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });
};

// export const useLogin = () => {
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: login
//     })
// }
