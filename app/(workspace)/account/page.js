import { BillingSettings } from "@/features/auth/components/billing-settings";
import { ProfileSettings } from "@/features/auth/components/profile-settings";
import { checkSubscription } from "@/features/auth/api/subscription";

const SettingsPage = async () => {
  const isSubscribed = await checkSubscription();

  return (
    <div className="mt-6 flex flex-col gap-y-10">
      <BillingSettings isSubscribed={isSubscribed} />
      <ProfileSettings />
    </div>
  );
};

export default SettingsPage;
