import { useUser, useModals } from "@/store/useUserStore";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import Loader from "./Loader";

const Header = () => {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLoggedIn } = useUser();
  const { toast } = useToast();
  const logoutFunction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://scissor-7s2y.onrender.com/logout"
      );
      if (response.status === 200) {
        setUserLoggedIn(false);
        toast({
          title: "Logged out",
          description: "Logged out successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unknown error occoured",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An uknown error occoured",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const { setSignIn, setSignUp } = useModals();
  const { userLoggedIn } = useUser();
  return (
    <nav className=" w-screen overflow-x-hidden py-5 flex items-center justify-between px-5 md:px-12 sticky top-0 bg-inherit shadow-2xl">
      <h1 className=" text-3xl text-white font-semibold">
        Scis<strong className="text-[#FF5E3A]">sor</strong>
      </h1>
      <div className=" flex w-fit gap-3">
        {" "}
        <button
          onClick={
            userLoggedIn ? () => logoutFunction() : () => setSignIn(true)
          }
          type="button"
          className=" md:rounded-full  md:flex md:px-10  rounded-full
       py-1 md:py-2 px-4 font-semibold text-center mr-2 justify-center items-center border-0 outline-none bg-[#FF5E3A] hover:brightness-75 transition-all ease-out duration-300 text-white"
        >
          {isLoading ? (
            <Loader />
          ) : userLoggedIn && !isLoading ? (
            "Logout"
          ) : (
            !userLoggedIn && !isLoading && "Login"
          )}
        </button>
        <button
          onClick={() => setSignUp(true)}
          type="button"
          className={`md:rounded-full  md:flex md:px-10  rounded-full ${
            userLoggedIn && "hidden"
          } py-1 md:py-2 px-4 font-semibold hidden lg:visible text-center mr-2 justify-center items-center border-0 outline-none bg-[#FF5E3A] hover:brightness-75 transition-all ease-out duration-300 text-white`}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Header;
