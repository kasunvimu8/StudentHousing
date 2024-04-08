import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <div className="w-full p-2 fixed bg-white z-10">
        <Header />
      </div>
      <div className="flex px-10 sm:px-20 flex-col primary-font-color pt-[120px]">
        <div className="flex-1 h">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
