import Header from "@/components/Header";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import SigninModal from "@/components/SigninModal";
import axios from "axios";
import SignupModal from "@/components/SignupModal";
import { useToast } from "@/components/ui/use-toast";
import ViewAccountLinks from "@/components/ViewShortenedLinks";
import { useAllUserLinks, useUser } from "@/store/useUserStore";
import React, { useEffect, useState } from "react";

// Define types for props and state
interface ErrorResponse {
  response: {
    status: number;
    data: {
      error: string;
    };
  };
}
interface UserLink {
  originalLink: string;
  shortenedLink: string;
  qrCodeUrl: string;
  clicks: { count: number; country: string }[];
}
const Home = () => {
  axios.defaults.withCredentials = true;
  const { toast } = useToast();
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const [link, setLink] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const { setAllMyLinks } = useAllUserLinks();
  const submitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userLoggedIn) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to use this feature",
      });
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://scissor2.onrender.com/create",
        {
          link: link,
          domain: domain,
        }
      );
      if (response.status === 200) {
        const newDomain: UserLink = response.data.newLink;
        setAllMyLinks((prevLinks) => [...prevLinks, newDomain]);

        toast({
          title: "Success",
          description: "URL shortened successfully",
        });
      }
      setDomain("");
      setLink("");
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please login to use this feature",
        });
      } else if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Domain already taken",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response.data.error || "An unexpected error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          "https://scissor2.onrender.com/verify"
        );
        setUserLoggedIn(response.status === 200);
      } catch {
        setUserLoggedIn(false);
      } finally {
        setPageLoading(false);
      }
    };
    verify();
  }, []);
  if (pageLoading)
    return (
      <main className=" w-screen h-screen bg-gradient-to-tr from-[#1B6830] to-black flex justify-center items-center">
        <Loader />
      </main>
    );
  return (
    <section className="w-screen h-screen bg-gradient-to-tr  from-[#1B6830] to-black ">
      <Header />
      <main className=" w-screen h-fit py-4 px-6 lg:px-40 mt-12 lg:mt-24 flex flex-col gap-4">
        <p className=" lg:text-4xl text-white break-words text-2xl  text-left ">
          Effortlessly <strong className=" text-[#FF5E3A]">shorten</strong>{" "}
          those long, <br /> pesky URLs with just a{" "}
          <strong className=" text-[#FF5E3A]">single click!</strong>
          <br /> Say goodbye to cluttered links and
          <br /> hello to simplicity
        </p>
        <form
          onSubmit={submitFunction}
          className="flex flex-col lg:flex-row w-full  gap-4 md:gap-2 lg:mt-2"
        >
          <Input
            value={link}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
            placeholder="Enter the original link"
            image="./link-icon.png"
          />
          <Input
            value={domain}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDomain(e.target.value)
            }
            placeholder="Customize your URL"
            image="./wand.png"
          />
          <button
            type="submit"
            className=" bg-[#FF5E3A] px-3 py-2 text-white text-xl rounded-l-2xl rounded-br-2xl hover:brightness-75 transition-all ease-in-out duration-300 font-semibold"
          >
            {loading ? <Loader /> : "Snip!"}
          </button>
        </form>
        <button
          onClick={() => {
            if (userLoggedIn && userLoggedIn !== null) {
              setIsLinkOpen(true);
            } else {
              return toast({
                variant: "destructive",
                title: "Error",
                description: "You must be logged in to use this feature",
              });
            }
          }}
          type="button"
          className=" md:rounded-full  md:flex md:px-10  rounded-full
       py-3 md:py-2 px-4 font-semibold text-center w-full lg:w-fit  mr-2 justify-center items-center border-0 outline-none bg-[#FF5E3A] hover:brightness-75 transition-all ease-out duration-300 text-white"
        >
          View shortened links
        </button>
      </main>
      <SignupModal />
      <SigninModal />
      <ViewAccountLinks
        open={isLinkOpen}
        setOpenChange={() => setIsLinkOpen(false)}
      />
    </section>
  );
};

export default Home;
