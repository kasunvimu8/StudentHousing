import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      {/* Have to increase the Z Index to overcome the Map layer */}
      <div className="w-full p-2 fixed bg-white" style={{ zIndex: "1001" }}>
        <Header />
      </div>
      <div
        className="flex px-10 sm:px-20 flex-col primary-font-color pt-[120px]"
        style={{ minHeight: "calc(100vh - 162px)" }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
