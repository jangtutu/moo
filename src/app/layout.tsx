import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import NavigationHeader from "@/components/common/navigation/NavigationHeader";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MOO BOX",
  description: "Generated by create next app",
  icons: {
    icon: "/images/mooboxBlack.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <NavigationHeader/>
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
