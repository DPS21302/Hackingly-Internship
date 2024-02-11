import {

  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

export default function SocialLinksField({ socialLinks, setSocialLinks }) {
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState("");
  const [currentSocialLink, setCurrentSocialLink] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const socialMediaPlatforms = [
    {
      label: "INSTAGRAM",
      platform: "INSTAGRAM",
      key: "INSTAGRAM",
    },
  ];

  const handleAddSocialLink = () => {
    // Regex patterns for different social media platforms
    const regexPatterns = {
      INSTAGRAM: /^(https?:\/\/)?(?:www\.)?instagram\.com\/[\w.-]+\/?$/,
      LINKEDIN:
        /^(?:https?:\/\/(?:www\.)?linkedin\.com\/(?:in|pub)\/[\w-]+\/?(?:\?.*)?)|(?:www\.)?linkedin\.com\/(?:in|pub)\/[\w-]+\/?(?:\?.*)?$/,
      TWITTER: /^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/?$/,
      FACEBOOK:
        /^(?:https?:\/\/(?:www\.)?facebook\.com\/\w+(?:\/)?)|(?:www\.)?facebook\.com\/\w+(?:\/)?$/,
      OTHER: /^(https?:\/\/|www\.)\S*$/,
    };

    // Validate the link based on the selected platform
    const isValidLink =
      regexPatterns[currentSocialPlatform]?.test(currentSocialLink);

    if (!isValidLink) {
      // You can handle the validation error here, e.g., show an alert or update state
      console.error("Invalid social media link");
      return;
    }

    // Check if the platform is not already selected
    if (!selectedPlatforms.includes(currentSocialPlatform)) {
      const newSocialLink = {
        id: Date.now(), // Add a unique identifier to each social link
        platform: currentSocialPlatform,
        link: currentSocialLink,
      };

      setSocialLinks((prevLinks) => [...prevLinks, newSocialLink]);
      setSelectedPlatforms((prevPlatforms) => [
        ...prevPlatforms,
        currentSocialPlatform,
      ]);
    } else {
      // You can handle the case where the platform is already selected
      console.warn("Platform already selected");
    }

    // Resetting state variables
    setCurrentSocialPlatform("");
    setCurrentSocialLink("");
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  return (
    <>
      <div className="flex gap-3 flex-col border border-gray-300 p-3 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-primary">Social Links</h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            items={socialMediaPlatforms}
            label="Social Media Platform"
            variant="faded"
            color="primary"
            onChange={(event) => {
              setCurrentSocialPlatform(event.target.value);
            }}
          >
            {(platform) => (
              <SelectItem key={platform.value}>{platform.label}</SelectItem>
            )}
          </Select>

          <Input
            label="Social Media Link"
            color="primary"
            variant="faded"
            placeholder="Paste social media link here"
            value={currentSocialLink}
            onChange={(e) => setCurrentSocialLink(e.target.value)}
          />
        </div>
        <Button color="primary" onClick={handleAddSocialLink} className="w-fit">
          Add
        </Button>
        {socialLinks.length > 0 ? (
          socialLinks.map((link, i) => (
            <Card key={i + 1} className="p-3 border border-gray-300 w-fit">
              <CardBody>
                <div>
                  <a
                    href={link?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform === "INSTAGRAM" && (
                      <FaInstagram color="#bc2a8d" size={36} />
                    )}
                    {link.platform === "LINKEDIN" && (
                      <FaLinkedin color="#0077b5" size={36} />
                    )}
                    {link.platform === "TWITTER" && (
                      <FaTwitter color="#1da1f2" size={36} />
                    )}
                    {link.platform === "FACEBOOK" && (
                      <FaFacebook color="#1877f2" size={36} />
                    )}
                    {link.platform === "OTHER" && (
                      <FaLink color="#000" size={36} />
                    )}
                  </a>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p className="text-danger">No Social Links added</p>
        )}
      </div>
    </>
  );
}

