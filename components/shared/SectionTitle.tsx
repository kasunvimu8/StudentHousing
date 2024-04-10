import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default SectionTitle;
