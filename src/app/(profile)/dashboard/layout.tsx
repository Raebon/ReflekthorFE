import { NavigationMenuDemo } from "@/components/dashboard-page/DashboardNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[85rem] mx-auto min-h-[80vh] px-6 shadow-md rounded-[0.185rem]">
      <NavigationMenuDemo />
      {children}
    </main>
  );
}
