import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });


const siteConfig = {
  name: "Libmate",
  description: "An Advanced Library Management Application",
  ogImage: "http://localhost:3000//og-image.png",
  url: "http://localhost:3000/",
}

export const metadata = {
  title: siteConfig?.name,
  description: siteConfig?.description,
  keywords: [
    "book",
    "library",
    "books",
    "lib",
    "online library",
    "library books",
    "book management application",
    "book management system",
    "library management system",
    "library management application",
    "library management",
    "libmate",
    "ysskrishna",
  ],
  authors: [
    {
      name: "Y. Siva Sai Krishna",
      url: "https://github.com/ysskrishna",
    },
  ],
  creator: "Y. Siva Sai Krishna",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@ysskrishna",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
