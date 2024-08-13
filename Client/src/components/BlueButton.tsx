import { ReactNode } from "react";

interface BlueButton {
  buttonText: string | ReactNode;
  handleClick: (e:React.FormEvent) => void;
  className?: string;
  type?: "submit" | "button";
}

const BlueButton = ({
  buttonText,
  handleClick,
  type,
  className,
}: BlueButton) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={` md:rounded-full  md:flex md:px-10 ${
        className || "h-[2.3rem] hidden "
      } py-0  text-center mr-2 justify-center items-center border-0 outline-none bg-[#144EE3] hover:bg-[#144fe3c5] transition-all ease-out duration-300 text-white`}
    >
      {buttonText}
    </button>
  );
};

export default BlueButton;
