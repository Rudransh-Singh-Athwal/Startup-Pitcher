"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Session } from "next-auth";

const NavbarClient = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex gap-5 items-center text-black">
      {session && session?.user ? (
        <>
          <Link href={"/startup/create"}>
            <span>Create</span>
          </Link>

          <form
            action={async () => {
              await signOut({ callbackUrl: "/" });
            }}
          >
            <button type="submit" className="hover:cursor-pointer">
              Logout
            </button>
          </form>

          <Link href={`/user/${session?.user?.id}`}>
            <span>{session?.user?.name}</span>
          </Link>
        </>
      ) : (
        <>
          <form
            action={async () => {
              await signIn("github");
            }}
          >
            <button type="submit" className="hover:cursor-pointer">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NavbarClient;
