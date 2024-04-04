import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex px-10 sm:px-20 h-screen flex-col primary-font-color">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
