import React, { useEffect } from "react";
import { useAllUserLinks, useUser } from "../store/useUserStore";
import axios from "axios";

const UseSession = ({ children }: { children: React.ReactNode }) => {
  axios.defaults.withCredentials = true;

  const { setUserLoggedIn, userLoggedIn } = useUser();
  const { setAllMyLinks } = useAllUserLinks();
  // Verify user login status on mount
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          "https://scissor-7s2y.onrender.com/verify"
        );
        setUserLoggedIn(response.status === 200);
      } catch {
        setUserLoggedIn(false);
      }
    };
    verify();
  }, []);
  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        // Assuming you might have a better method to determine if the user is logged in
        const response = await axios.get(
          "https://scissor-7s2y.onrender.com/all"
        );

        if (response.status === 200) {
          setAllMyLinks(response.data.allLinks);
          setUserLoggedIn(true); // Set userLoggedIn state to true upon successful fetch
        }

        console.log(response);
      } catch (err) {
        console.log(err);
        setUserLoggedIn(false); // Set userLoggedIn state to false in case of an error
      }
    };

    fetchAllLinks();
  }, [userLoggedIn, setUserLoggedIn]); // Ensure these dependencies are correct

  return <div className="w-screen h-screen">{children}</div>;
};

export default UseSession;
