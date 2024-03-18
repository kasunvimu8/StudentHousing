import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col primary-font-color">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
