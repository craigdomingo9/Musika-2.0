import { Metadata } from "next";
import Favicon from '/favicon.ico';


export const metadata: Metadata = {
  title: "Musika | Dashboard",
  description: "Zimbabwe's fastest growing marketplace.",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  )
}

