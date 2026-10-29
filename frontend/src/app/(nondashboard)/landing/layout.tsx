"use client";
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authuser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (authLoading) return;

  if (authuser) {
    const userole = authuser.userRole?.toLowerCase();

    if (
      userole === "manager" &&
      (pathname.startsWith("/search") || pathname === "/")
    ) {
      router.push("/managers/properties", { scroll: false });
      return;
    }
  }

  setIsLoading(false);
}, [authuser, authLoading, router, pathname]);

   if (authLoading || isLoading) return <>Loading...</>;  

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
