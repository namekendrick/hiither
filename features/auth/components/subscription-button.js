"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionButton = ({ isSubscribed = false }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({ title: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isSubscribed ? "outline" : "default"}
      disabled={isLoading}
      onClick={onClick}
    >
      {isSubscribed ? "Manage Billing" : "Upgrade"}
      {!isSubscribed && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};
