import linkModel from "../schemas/link.js";
import convertFunction from "../utils/helpers/convertFunction.js";
import getCountry from "../utils/helpers/fetchCountry.js";
export const createLink = async (req, res) => {
  try {
    const user = req.user; // Assuming user is added to the request object
    const { link, domain } = req.body;
    console.log(domain);
    // Validate input
    if (!link) return res.status(400).json({ err: "Please input a link" });

    let myDomain;

    // Handle case where domain is not provided
    if (domain == "") {
      // Generate a random domain
      myDomain = convertFunction(); // Ensure convertFunction is correctly implemented
      let isMatch = await linkModel.findOne({ shortenedLink: myDomain });

      // Ensure the domain is unique
      while (isMatch) {
        myDomain = convertFunction();
        isMatch = await linkModel.findOne({ shortenedLink: myDomain });
      }
    } else {
      // If a domain is provided, use it
      myDomain = domain;
    }

    // Check if the provided or generated domain already exists
    const domainExists = await linkModel.findOne({ shortenedLink: myDomain });

    if (domainExists)
      return res.status(400).json({ err: "Domain already taken" });

    // Create the new link entry
    const newDomain = await linkModel.create({
      linkOwner: user._id,
      originalLink: link,
      shortenedLink: myDomain,
      clicks: [],
      qrCodeUrl: link,
    });

    // Respond with the created domain info
    res.status(200).json({
      newLink: {
        originalLink: newDomain.originalLink,
        shortenedLink: newDomain.shortenedLink,
        qrCodeUrl: newDomain.qrCodeUrl,
        clicks: newDomain.clicks,
      },
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
};
export const getLink = async (req, res) => {
  const { link } = req.params;
  console.log(link);
  try {
    const clientIp = await getCountry();

    // Fetch location data from ipapi
    const locationResponse = await fetch(`http://ipapi.co/${clientIp}/json/`);
    const locationData = await locationResponse.json();
    // Extract country information
    const country = locationData.country_name || "Unknown";

    // Find the original link from the database
    let linkUrl = await linkModel.findOne({ shortenedLink: link });
    if (!linkUrl) return res.status(404).json({ err: "Invalid link" });

    // Check if the country exists in the clicks array
    const countryIndex = linkUrl.clicks.findIndex(
      (click) => click.country === country
    );

    if (countryIndex !== -1) {
      // If the country exists, increment the count
      linkUrl.clicks[countryIndex].count += 1;
    } else {
      // If the country doesn't exist, add a new entry to the clicks array
      linkUrl.clicks.push({ count: 1, country });
    }

    // Save the updated link document
    await linkUrl.save();

    // Respond with the original link and country information
    res.status(200).json({ originalLink: linkUrl.originalLink, country });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const fetchAllLinks = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({ err: "Must login to use this feature" });
    const allLinks = await linkModel.find({ linkOwner: user._id });
    if (!allLinks) return res.status(400).json({ err: "No Link created" });
    res.status(200).json({ allLinks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
