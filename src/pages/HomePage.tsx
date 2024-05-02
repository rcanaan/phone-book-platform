import React, { useState } from "react";
import clsx from "clsx";
export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <h1 className="text-center font-bold text-2xl">Home Page</h1>

      <div className="flex flex-col items-center lg:w-1/3 w-full bg-black mt-10 h-44 pt-2 ">
        <button
          className=" border-[#eeff00] h-20 bg-black mt-10 relative border-dotted w-2/3 lg:w-1/2  border-4 flex justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="text-center text-[#eeff00] pt-5">READY!</p>
          {/* packman */}
          <div className="absolute bottom-9 left-0 pt-3 w-auto">
            <div
              id="packman"
              className={clsx(
                "w-20 h-20 rounded-full bg-[#eeff00] relative mt-5",
                "transform transition-transform duration-300",

                { "animate-moveComplete": isHovered }
              )}
              style={{ transformOrigin: "center" }}
            >
              <div
                id="packman_eye"
                className="absolute w-2 h-2 rounded-full top-4 right-10 bg-[#333333]"
              ></div>
              <div
                id="packman_mouth"
                className={clsx(
                  "bg-[#000] absolute w-full h-full clip-path-packman_mouth",
                  { "animate-eat": isHovered }
                )}
              ></div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
