import React, { useEffect, useState } from "react";
import { EditOrgFieldSchema } from "@/utils/ValidationSchema";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { FaInstagram, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { baseURL } from "@/utils/BaseURL";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function EditOrganization({ organizationData }) {
  const {data:session} = useSession();
  const token = session?.user?.data?.access;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditOrgFieldSchema),
  });
  // states
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [cityData, setCityData] = useState();
  const [stateData, setStateData] = useState();
  const [socialLinks, setSocialLinks] = useState([]);
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState("");
  const [currentSocialLink, setCurrentSocialLink] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const countrydata = Country.getAllCountries();
  const handleAddSocialLink = () => {
    // Regex patterns for different social media platforms
    const regexPatterns = {
      INSTAGRAM:
        /^(?:https?:\/\/(?:www\.)?instagram\.com\/\w+(?:\/)?)|(?:www\.)?instagram\.com\/\w+(?:\/)?$/,
      LINKEDIN:
        /^(?:https?:\/\/(?:www\.)?linkedin\.com\/(?:in|pub)\/[\w-]+\/?(?:\?.*)?)|(?:www\.)?linkedin\.com\/(?:in|pub|company)\/[\w-]+\/?(?:\?.*)?$/,
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
      toast.error("Invalid social media link");
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
    }

    // Resetting state variables
    setCurrentSocialPlatform("");
    setCurrentSocialLink("");
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  useEffect(() => {
    const data = City.getCitiesOfState(selectedCountry, selectedState);

    setCityData(data);
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    const data = State.getStatesOfCountry(selectedCountry);

    setStateData(data);
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleStateChange = (e) => {
    // console.log("ee...", e.target.value);
    setSelectedState(e.target.value);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    setSelectedCountry(organizationData.country || "");
    setSelectedState(organizationData.state || "");
    setSelectedCity(organizationData.city || "");
    setSocialLinks(organizationData.social_links || []);
    setSelectedCoverImage(organizationData.cover_image || null);

    // You may need to update the logic based on your actual data structure
    setValue("orgName", organizationData.name || "");
    setValue("orgDescription", organizationData.description || "");
    setValue("state", organizationData.state || "");
    setValue("city", organizationData.city || "");
    setValue("country", organizationData.country || "");
    // Set initial values for contact details
    setValue("phoneNumber", organizationData.phone_number || "");
    setValue("email", organizationData.email || "");
    setValue("website", organizationData.website || "");
  }, [organizationData]);

  const handleLocationChange = (type, e) => {
    const value = e.target.value;
    if (type === "country") {
      setSelectedCountry(value);
      setSelectedState("");
      setSelectedCity("");
    } else if (type === "state") {
      setSelectedState(value);
      setSelectedCity("");
    } else if (type === "city") {
      setSelectedCity(value);
    }
  };
  const onSubmit = async (data, e) => {
    
    const id = organizationData.id;
    e.preventDefault();
    const requestData = {
      name: data.orgName,
      description: data.orgDescription,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      social_links: socialLinks,
      phone_number: data.phoneNumber,
      email: data.email,
      website: data.website,
    };
    // console.log(JSON.stringify(requestData, null, 2));

    axios.request({
      method: "patch",
      maxBodyLength: Infinity,
      url: `${baseURL}/organization/${id}/edit`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(requestData),
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4">
            <ImageUpload
              imageType="Cover"
              selectedImage={selectedCoverImage}
              onImageSelected={setSelectedCoverImage}
              // isEditable={isEditable}
            />
            <Input
              type="text"
              label="Organization Name"
              variant="faded"
              color="primary"
              value={organizationData.name}
              {...register("orgName")}
              isInvalid={errors.orgName}
              errorMessage={errors.orgName?.message}
              // disabled={!isEditable}
            />
          </div>
          <Textarea
            type="text"
            label="Organization Description"
            value={organizationData.description}
            variant="faded"
            color="primary"
            {...register("orgDescription")}
            isInvalid={errors.orgDescription}
            errorMessage={errors.orgDescription?.message}
            // disabled={!isEditable}
          />

          <div className="grid grid-cols-3 gap-4">
            {organizationData.country ? (
              <Input
                label="Country"
                variant="faded"
                color="primary"
                value={organizationData.country}
                disabled
              />
            ) : (
              <Select
                label="Country"
                variant="faded"
                color="primary"
                value={selectedCountry}
                onChange={handleCountryChange}
                required
              >
                {countrydata.map((country) => (
                  <SelectItem key={country.isoCode} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </Select>
            )}

            {organizationData.state ? (
              <Input
                label="State"
                variant="faded"
                color="primary"
                value={organizationData.state}
                disabled={true}
              />
            ) : (
              <Select
                label="State"
                variant="faded"
                color="primary"
                value={watch("state", { required: true })}
                onChange={(e) => {
                  setValue("state", e.target.value);
                  setSelectedState(e.target.value);
                }}
                disabled={!selectedCountry}
              >
                {stateData?.map((state) => (
                  <SelectItem key={state.isoCode} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </Select>
            )}
            {organizationData.city ? (
              <Input
                label="City"
                variant="faded"
                color="primary"
                value={organizationData.city}
                disabled
              />
            ) : (
              <Select
                label="City"
                variant="faded"
                color="primary"
                value={watch("city")}
                onChange={(e) => {
                  setValue("city", e.target.value);
                  setSelectedCity(e.target.value);
                }}
                disabled={!selectedCountry && !selectedState}
              >
                {cityData?.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </div>
          {/* Contact Detail Section  */}
          <div className="flex gap-3 flex-col rounded-lg">
            <div className="flex justify-between flex-col">
              <h1 className="text-xl font-medium text-primary">
                Contact Detail
              </h1>
              <div className="grid grid-cols-1 gap-3">
                {/* phone Number */}
                <Input
                  label="Phone Number"
                  variant="faded"
                  color="primary"
                  type="tel"
                  {...register("phoneNumber")}
                  value={watch("phoneNumber") || ""}
                  onChange={(e) => {
                    setValue("phoneNumber", e.target.value);
                  }}
                  error={errors.phoneNumber?.message}
                />
                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  variant="faded"
                  color="primary"
                  {...register("email")}
                  value={watch("email") || ""}
                  onChange={(e) => {
                    setValue("email", e.target.value);
                  }}
                  error={errors.email?.message}
                />
                {/* website */}
                <Input
                  label="Website"
                  variant="faded"
                  color="primary"
                  {...register("website")}
                  value={watch("website") || ""}
                  onChange={(e) => {
                    setValue("website", e.target.value);
                  }}
                  error={errors.website?.message}
                />
              </div>
            </div>
          </div>
          {/* Social Media Links */}

          <div className="flex gap-3 flex-col   rounded-lg">
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
                  const selectedValue = event.target.value;
                  setCurrentSocialPlatform(selectedValue);
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
            <Button
              color="primary"
              onClick={handleAddSocialLink}
              className="w-fit"
            >
              Add
            </Button>
            {socialLinks.length > 0 ? (
              socialLinks.map((link, i) => (
                <Card
                  key={i + 1}
                  className="p-3 border border-gray-300 grid grid-cols-3 justify-between"
                >
                  <div className="flex gap-2 items-center  ">
                    <a
                      href={link?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center gap-4"
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

                      <span>{link.link}</span>
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      color="error"
                      onClick={() => handleRemoveSocialLink(link.id)}
                      className="w-fit text-red-500 "
                    >
                      <ImCancelCircle className="text-3xl" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-danger">No Social Links added</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            size="md"
            color="danger"
            variant="bordered"
            className="w-fit my-5"
            type="submit"
          >
            Discard
          </Button>
          <Button
            size="md"
            color="primary"
            className="w-fit my-5"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
}

const socialMediaPlatforms = [
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Twitter", value: "TWITTER" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Other", value: "OTHER" },
];

const ImageUpload = ({ imageType, selectedImage, onImageSelected }) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      onImageSelected(fileUrl);
    },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      onClick={() => isEditable && open()}
      className={`relative h-[60px] w-[60px] border border-gray-300 rounded-lg border-dashed flex items-center justify-center`}
    >
      <input {...getInputProps()} />
      {selectedImage ? (
        <img
          src={selectedImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      ) : (
        <Image className="text-primary" />
      )}
    </div>
  );
};