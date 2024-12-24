import { Metadata } from "next";
import Favicon from '/favicon.ico';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/Header/Header";
import PageContainer from "@/components/dashboard/PageContainer";
import DashboardMiddleware from "@/components/dashboard/DashboardMiddleware";


export const metadata: Metadata = {
  title: "Musika | Dashboard",
  description: "Musika Dashboard.",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <DashboardMiddleware />
        <PageContainer>
          {children}
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  )
}

