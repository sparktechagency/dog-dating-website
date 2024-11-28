"use client";
import React, { useState } from "react";
import DashboardNav from "./DashboardNav";
import SearchField from "./SearchField";
import Foods from "./Food/Foods";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div className="flex ">
        <div className="flex-1">
          <SearchField />
          <Foods />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardPage;
