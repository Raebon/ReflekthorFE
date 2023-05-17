export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-5xl mx-auto min-h-[80vh] px-6">{children}</main>
  );
}
