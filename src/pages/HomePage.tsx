export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center w-full bg-black mt-10 h-40 pt-2 ">
        <div className="border-[#eeff00] h-20  bg-black mt-10  relative border-dotted w-2/3 lg:w-1/2 border-4 flex justify-center">
          <p className="text-center text-[#eeff00] pt-5">READY!</p>
          {/* packman */}
          <div className="absolute bottom-9 left-0 pt-3 ">
            <div className="w-20 h-20 rounded-full bg-[#eeff00] relative mt-5">
              <div className="absolute w-2 h-2 rounded-full top-4 right-10 bg-[#333333]"></div>
              <div className="bg-[#000] absolute w-full h-full clip-path-packman_mouth"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
