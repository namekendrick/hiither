"use client";

import { logout } from "@/features/auth/api/logout";

export const LogoutButton = ({ children }) => {
  const onClick = () => {
    logout();
  };

  return <span onClick={onClick}>{children}</span>;
};
