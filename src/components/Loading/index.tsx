import React from "react";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLoader color="#2563EB" />
    </div>
  );
};

export default Loading;
