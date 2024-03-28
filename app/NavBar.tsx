"use client";
import Link from "next/link";
import React from "react";
import { IoBugOutline } from "react-icons/io5";
import { usePathname } from "next/navigation"; //it is a Next js hook that uses the browser API to fetch the current active page URL/pathname
import classNames from "classnames"; //this is a function that accepts a n object literal of key:value pairs

const NavBar = () => {
  const currentPathname = usePathname();
  let links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  console.log(currentPathname);
  return (
    <nav className="flex flex-row space-x-6 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <IoBugOutline size={18} color={"black"} />
      </Link>
      <ul className="flex flex-row space-x-6">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
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
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
