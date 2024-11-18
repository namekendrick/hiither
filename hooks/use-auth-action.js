import { useCurrentUser } from "@/features/auth/hooks";
import { useToast } from "@/hooks/use-toast";

export function useAuthAction() {
  const user = useCurrentUser();
  const { toast } = useToast();

  function handleAuthAction(authAction) {
    if (user) {
      return authAction;
    } else {
      toast({
        description: "Please join in to do that.",
      });
    }
  }

  return handleAuthAction;
}
