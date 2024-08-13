import React from "react";

interface Input {
  image: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ image, placeholder, value, handleChange }: Input) => {
  return (
    <div className="flex w-full lg:w-fit  gap-3 items-center justify-center  ">
      <div className="w-fit bg-white rounded-xl flex justify-between gap-0 ">
        <input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          className=" px-4 py-2 rounded-l-xl outline-none border-none text-gray-500 font-semibold"
        />
        <div className="w-fit h-fit m-0 p-0 rounded-r-xl pr-4 flex justify-center items-center">
          <img src={image} width={24} height={24} alt="link" className=" m-0 mt-2 p-0 " />
        </div>
      </div>
    </div>
  );
};

export default Input;
