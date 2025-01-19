import { cn } from "@/lib/utils";
import React from "react";

const Loader = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full h-full mx-auto flex items-center justify-center",
        className
      )}
    >
      <div
        className="inline-block  h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#F88D58]"
        role="status"
      ></div>
    </div>
  );
};

export default Loader;
