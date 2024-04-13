"use client";
import Link from "next/link";
import React from "react";
import { IoBugOutline } from "react-icons/io5";
import { usePathname } from "next/navigation"; //it is a Next js hook that uses the browser API to fetch the current active page URL/pathname
import classNames from "classnames"; //this is a function that accepts a n object literal of key:value pairs
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPathname = usePathname();
  let links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  console.log(currentPathname);
  return (
    <nav className="border-b mb-5 px-10 py-6 h-20 ">
      <Container>
        {/* We have simplified the above <nav> component as we Are now using the radix-ui classes and defining a separate Flex component within the above nav */}
        {/* <nav className="flex flex-row space-x-6 border-b mb-5 px-5 h-16 items-center"> */}
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/">
              <IoBugOutline size={18} color={"#8E4585"} />
            </Link>
            <ul className="flex flex-row space-x-6">
              {links.map((link) => {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      //   className={`${
                      //     (link.href === currentPathname && "text-zinc-900") ||
                      //     "text-zinc-400"
                      //   } hover:text-zinc-800  transition-colors `}
                      //Using the classNames function imported from the classNames module/package
                      className={classNames({
                        "text-zinc-900": link.href === currentPathname,
                        "text-zinc-400": link.href !== currentPathname,
                        "hover:text-zinc-800 transition-colors": true, //Render regardles of any condition
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link
                href="/api/auth/signout"
                className="text-zinc-400 hover:text-zinc-800 transition-colors"
              >
                Logout
              </Link>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/api/auth/signin"
                className="text-zinc-400 hover:text-zinc-800 transition-colors"
              >
                Login
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
