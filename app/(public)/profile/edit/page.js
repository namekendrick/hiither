"use client";

import { useRouter } from "next/navigation";

import { ProfileImageForm } from "@/app/(public)/_components/profile-image-form";
import { ProfileNameForm } from "@/app/(public)/_components/profile-name-form";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";

const EditProfilePage = () => {
  const user = useCurrentUser();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-[640px] p-4 pt-20">
      <div className="flex flex-col gap-y-10 px-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="items-center text-3xl font-extrabold">
            Edit Profile
          </div>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="font-bold text-slate-500"
          >
            Done
          </Button>
        </div>
        <ProfileImageForm user={user} />
        <ProfileNameForm user={user} />
      </div>
    </div>
  );
};

export default EditProfilePage;
