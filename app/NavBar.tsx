"use client";
import Link from "next/link";
import React from "react";
import { IoBugOutline } from "react-icons/io5";
import { usePathname } from "next/navigation"; //it is a Next js hook that uses the browser API to fetch the current active page URL/pathname
import classNames from "classnames"; //this is a function that accepts a n object literal of key:value pairs
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-10 py-6 h-20 ">
      <Container>
        {/* We have simplified the above <nav> component as we Are now using the radix-ui classes and defining a separate Flex component within the above nav */}
        {/* <nav className="flex flex-row space-x-6 border-b mb-5 px-5 h-16 items-center"> */}
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/" prefetch={false}>
              <IoBugOutline size={18} color={"#8E4585"} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

//All the logic for rendering Navigation Links
const NavLinks = () => {
  const currentPathname = usePathname();
  let links = [
    { label: "Dashboard", href: "/", prefetch: false },
    { label: "Issues", href: "/issues/list", prefetch: false },
  ];
  console.log(currentPathname);
  return (
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
                "nav-link": true, //Defined in the globals.css file
                "!text-zinc-900": link.href === currentPathname,
              })}
              prefetch={link.prefetch}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

//All the logic for rendering conditionally the Auth Status of a user - anonymous or otherwise
const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <Skeleton width="3rem"></Skeleton>;
  }
  if (status === "unauthenticated") {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size={"3"}
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="left">
          <DropdownMenu.Label>
            <Text size="3" color="gray">
              {session!.user!.name!}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Label>
            <Text size="3" color="gray">
              {session!.user!.email!}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link
              href="/api/auth/signout"
              // className="text-gray-500 text-base hover:text-white"
            >
              Logout
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {/* // <Link
        //   href="/api/auth/signout"
        //   className="text-zinc-400 hover:text-zinc-800 transition-colors"
        // >
        //   Logout
        // </Link> */}
    </Box>
  );
};
export default NavBar;
