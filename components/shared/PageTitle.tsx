import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold min-w-10">{title}</h1>
    </div>
  );
};

export default PageTitle;
