import fetch from "node-fetch";

const getCountry = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const clientIp = data.ip;
    // Use the IP address as needed
    return clientIp;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
};
export default getCountry;
