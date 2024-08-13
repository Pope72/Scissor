import { useForm, useModals } from "@/store/useUserStore";
import Form from "./Form";
import { Dialog, DialogContent } from "./ui/dialog";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
const SignupModal = () => {
  const { toast } = useToast();
  const { signUpOpen, setSignUp } = useModals();
  const [isLoading, setIsLoading] = useState(false);
  const { email, setEmail, password, setPassword } = useForm();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await axios.post(
        "https://scissor-7s2y.onrender.com/signup",
        {
          email,
          password,
        }
      );
      if (response.status !== 201) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong with your request",
        });
      }
      if (response.status === 201) {
        setPassword("");
        setEmail("");
        setSignUp(false);
        toast({
          title: "Success",
          description: "Acount created successfully",
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
      open={signUpOpen}
      onOpenChange={() => {
        setEmail("");
        setPassword("");
        setSignUp(false);
      }}
    >
      <DialogContent className="  bg-gradient-to-tr from-[#1B6830] to-black opacity-100 text-white shadow-2xl">
        <Form isLoading={isLoading} submit={handleSubmit} action="Up" />
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
