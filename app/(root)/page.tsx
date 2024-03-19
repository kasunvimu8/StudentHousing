import PropertyList from "@/components/custom/PropertyList";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="bg-neutral-100 mb-5">
        Filter Area
      </div>
      <div className="bg-neutral-100 mb-5">
        Map List Selection
      </div>
      <div className="bg-neutral-100 mb-5">
         <PropertyList />
      </div>
    </div>
  );
}
