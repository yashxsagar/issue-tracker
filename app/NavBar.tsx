import Link from "next/link";
import React from "react";
import { IoBugOutline } from "react-icons/io5";

const NavBar = () => {
  let links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex flex-row space-x-6 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <IoBugOutline size={18} color={"coral"} />
      </Link>
      <ul className="flex flex-row space-x-6">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-500 hover:text-zinc-800  transition-colors "
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
