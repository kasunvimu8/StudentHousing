import PropertyList from "@/components/custom/PropertyList";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="w-full h-full">
      <div className="bg-neutral-100 mb-5">Filter Area</div>
      <div className="bg-neutral-100 mb-5">Map List Selection</div>
      <div className="mb-5">
        <PropertyList query={query} page={page} />
      </div>
    </div>
  );
}
