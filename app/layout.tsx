import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description:
    "A modern full-stack web-app for teams to track and assign software dev issues ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="plum">
          <NavBar />
          <main className="p-6">{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
