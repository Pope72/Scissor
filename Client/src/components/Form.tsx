import React from "react";
import { useForm, useModals } from "@/store/useUserStore";
import Loader from "./Loader";

const Form = ({
  action,
  submit,
  isLoading,
}: {
  action: string;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) => {
  const { email, password, setEmail, setPassword } = useForm();
  const { setSignIn, setSignUp } = useModals();
  return (
    <form onSubmit={submit} className=" w-full px-4 py-2 ">
      <label className=" text-white font-semibold flex flex-col w-full h-fit gap-3 mb-3">
        Email address
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter email address"
          className=" border border-[#FF5E3A] px-4 py-1 font-light  rounded-md bg-inherit outline-none"
        />
      </label>
      <label className=" text-white font-semibold flex flex-col w-full h-fit gap-3 mb-3">
        Password
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          className=" border border-[#FF5E3A] font-light px-4 py-1 rounded-md bg-inherit outline-none"
        />
      </label>
      <div className=" flex w-full px-2 justify-between items-center">
        {" "}
        <button
          className={`bg-white ${
            isLoading && "brightness-75 cursor-not-allowed"
          } text-black font-semibold px-4 py-2 rounded-full`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : `Sign ${action}`}
        </button>
        <p
          className=" underline text-gray-500 md:hidden"
          onClick={() => {
            if (action === "In") {
              setSignIn(false);
              setSignUp(true);
            } else {
              setSignUp(false);
              setSignIn(true);
            }
          }}
        >
          {action === "In" ? "Signup?" : "Signin"}
        </p>
      </div>
    </form>
  );
};

export default Form;
