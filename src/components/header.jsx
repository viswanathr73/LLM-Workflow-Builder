import { HiOutlinePlay } from "react-icons/hi";

export default function Header() {
  return (
    <header className="flex h-[63px] items-center justify-between border-b border-gray-200 shadow-sm bg-white px-6">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white font-bold">O</span>
        </div>
        <span className="font-semibold">OpenAGI</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-gray-400 text-white text-[14px] font-semibold leading-[16.94px] border hover:bg-gray-500 cursor-pointer text-right font-inter">
          Deploy
        </button>

        <button className="w-[78px] h-[31px] px-[15px] py-[7px] rounded-[8px] bg-green-600 text-white text-sm flex items-center gap-[5px] hover:bg-green-700">
          <HiOutlinePlay className="text-xl" />
          Run
        </button>
      </div>
    </header>
  );
}
