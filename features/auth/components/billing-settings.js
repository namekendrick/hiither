"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SubscriptionButton } from "@/features/auth/components/subscription-button";

export const BillingSettings = ({ isSubscribed }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-sm font-bold uppercase text-slate-600">
        Billing Settings
      </h2>
      <Card className="max-w-[500px] pt-4">
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="text-xs text-muted-foreground">Current plan:</div>
              <div className="text-lg font-bold">
                {isSubscribed ? "Unlimited Panels" : "One Free Panel"}
              </div>
            </div>
            <SubscriptionButton isSubscribed={isSubscribed} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
