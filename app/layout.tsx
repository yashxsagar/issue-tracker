import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import "./theme-config.css";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

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
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="plum">
              <NavBar />
              <main className="p-6">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
