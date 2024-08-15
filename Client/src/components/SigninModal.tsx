import { useForm, useModals, useUser } from "@/store/useUserStore";
import Form from "./Form";
import { Dialog, DialogContent } from "./ui/dialog";

import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useState } from "react";
const SigninModal = () => {
  axios.defaults.withCredentials = true;
  const { toast } = useToast();
  const { signInOpen, setSignIn } = useModals();
  const { setUserLoggedIn, setUserId } = useUser();
  const { email, password, setPassword, setEmail } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const submitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValid = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    if (!emailValid) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email address",
      });
      return;
    }
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password needs to be 8 or more characters long",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("https://scissor-se6d.onrender.com/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong with your request",
        });
      }
      if (response.status === 200) {
        setPassword("");
        setEmail("");
        setUserId(response.data.userValid._id);
        setUserLoggedIn(true);
        setSignIn(false);
        toast({
          title: "Success",
          description: "Welcome to scissor",
        });
      }
    } catch (err) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.error || "An unknown error occurred";

        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } else {
        // Handle non-Axios errors
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={signInOpen}
      onOpenChange={() => {
        setEmail("");
        setPassword("");
        setSignIn(false);
      }}
    >
      <DialogContent className="  bg-gradient-to-tr from-[#1B6830] to-black opacity-100 text-white shadow-2xl">
        <Form isLoading={isLoading} submit={submitFunction} action="In" />
      </DialogContent>
    </Dialog>
  );
};

export default SigninModal;
