import React from "react";

export default function MobileMenuButton() {
  return (
    <div className="h-12 w-16 bg-gray-300 flex justify-center items-center">
      <div className="flex flex-col h-4 w-4 justify-between items-center">
        <div className="w-full h-[0.2rem] bg-black rounded"></div>
        <div className="w-full h-[0.2rem] bg-black rounded"></div>
        <div className="w-full h-[0.2rem] bg-black rounded"></div>
      </div>
    </div>
  );
}
