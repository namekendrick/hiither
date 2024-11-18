import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { id: userId } = await currentUser();

  if (!userId) {
    return false;
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    select: {
      status: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!subscription || subscription.status === "canceled") return false;

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
