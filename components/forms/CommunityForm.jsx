"use client";
import { baseURL } from "@/utils/BaseURL";
import axios from "axios";
import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import Error from "next/error";
import Link from "next/link";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
let CommunityInputBoxes = [
    {
      id: "name",
      type: "text",
      label: "Full Name",
    },
    {
      id: "email",
      type: "email",
      label: "Email",
    },
    {
      id: "phone_number",
      type: "number",
      label: "Phone Number",
    },
    
    {
      id: "designation",
      type: "text",
      label: "Designation",
    },
    {
      id: "community_name",
      type: "text",
      label: "Community Name",
    },
  ];
const CommunityForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]); 
  const [isBasedInClg, setIsBasedInClg] = useState(false);
  const [isOrganziedBefore, setIsOrganizedBefore] = useState(false);
  const [iscommunityAssWtCompany, setiscommunityAssWtCompany] = useState(false);
  const [isToCSelected, setIsToCSelected] = useState(false);

  useEffect(() => {
    setStates(State.getStatesOfCountry(selectedCountry));
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState, selectedCountry]);

  // Form handler here
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/leads/community/create/`,
        data
      );
      if (response.status === 201) {
        console.log(response.data);
        toast.success("Request Submitted Successfully");
        router.push("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting request");
    }
  };

  useEffect(() => {
    register("event_venue", { required: true });
    setValue("event_venue", "Online"); // Default value for category
  }, [register, setValue]);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="w-full p-6 bg-primary rounded-lg mt-2 mb-8">
        <div className="w-full md:w-9/10 flex items-center justify-center flex-col">
          <h2 className="text-2xl font-medium text-white">
            Community Hackathon
          </h2>
          <p className="text-sky-100 mt-3 text-base md:w-[90%] text-justify">
            At Hackingly we are committed to fostering innovation,
            collaboration, and positive change within educational institutions
            and local communities. Our community hackathons are a vibrant
            platform where students, educators, and community members come
            together to tackle real-world challenges and turn their ideas into
            reality.
          </p>
        </div>
        <div>{/* TODO: Add Illustration */}</div>
      </div>
      <div className="">
        <h1 className="text-xl font-medium mb-4">
          Fill up the form below to get started!
        </h1>
      </div>

      {/* ------------------ */}
      {/* For Community Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
          {CommunityInputBoxes?.map((item) => (
            <Input
              isRequired
              key={item.id}
              type={item.type}
              label={item.label}
              variant="faded"
              color="primary"
              {...register(item.id, { required: true })}
            />
          ))}
          <Input
            key={"url"}
            type={"text"}
            label={"Website"}
            variant="faded"
            color="primary"
            {...register("url")}
          />
          <Select
            label="Country"
            variant="faded"
            isRequired
            color="primary"
            {...register("country")}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setValue("country", e.target.value);
            }}
          >
            {countries.map((country) => (
              <SelectItem key={country.isoCode} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="State"
            variant="faded"
            color="primary"
            isRequired
            {...register("state")}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setValue("state", e.target.value);
            }}
            disabled={!selectedCountry}
          >
            {states.map((state) => (
              <SelectItem key={state.isoCode} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="City"
            variant="faded"
            color="primary"
            isRequired
            {...register("city")}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setValue("city", e.target.value);
            }}
            disabled={!selectedState}
          >
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </Select>

          <div className="flex flex-col ">
            <Checkbox
              className="mb-1"
              isSelected={isBasedInClg}
              onValueChange={setIsBasedInClg}
              // {...register("is_associated_with_college",{required:true})}
            >
              Community is based in college
            </Checkbox>
            <Input
              type="text"
              label="College Name"
              variant="faded"
              color="primary"
              isDisabled={isBasedInClg === false}
              {...register("college_name")}
            />
          </div>
          <div className="flex flex-col">
            <Checkbox
              className="mb-1"
              isSelected={isOrganziedBefore}
              onValueChange={setIsOrganizedBefore}
            >
              Organized Hackathon Before?
            </Checkbox>
            <Input
              type="text"
              label="Link to previous hackathon"
              variant="faded"
              color="primary"
              {...register("previous_event_link")}
              isDisabled={isOrganziedBefore === false}
            />
          </div>
          <div className="flex flex-col">
            <Checkbox
              className="mb-1"
              isSelected={iscommunityAssWtCompany}
              onValueChange={setiscommunityAssWtCompany}
            >
              community associate with company
            </Checkbox>
            <Input
              type="text"
              label="Company Name"
              variant="faded"
              color="primary"
              {...register("company_name")}
              isDisabled={iscommunityAssWtCompany === false}
            />
          </div>
          <div>
            <Select
              label="What do you want to organize?"
              variant="faded"
              color="primary"
              isRequired
              {...register("event_type", { required: true })}
              onChange={(e) => {
                setValue("event_type", e.target.value);
              }}
            >
              {eventData.map((item) => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Input
            type="text"
            label="Tentative title"
            variant="faded"
            color="primary"
            {...register("event_name", { required: true })}
            className="col-span-3 md:col-span-3 mb-6 md:mb-0"
            isRequired
          />
          <Textarea
            variant="faded"
            color="primary"
            label="What are you planning?"
            className="col-span-3 md:col-span-3 mb-6 md:mb-0"
            {...register("event_brief", { required: true })}
            isRequired
          />
        </div>

        <div className="grid grid-cols-3 items-center pt-5 gap-2">
          <Input
            type="date"
            label="Tentative Date"
            placeholder="  "
            variant="faded"
            color="primary"
            {...register("tentative_date", { required: true })}
          />
          <Input
            type="number"
            label="Expected Participants"
            variant="faded"
            color="primary"
            {...register("expected_participants", { required: true })}
          />

          <RadioGroup
            label="Mode"
            orientation="horizontal"
            color="primary"
            className="p-2 "
            {...register("mode", { required: false })}
            isRequired
          >
            <Radio
              value="Online"
              onClick={() => setValue("event_venue", "Online")}
            >
              Online
            </Radio>
            <Radio
              value="Hybrid"
              onClick={() => setValue("event_venue", "Hybrid")}
            >
              Hybrid
            </Radio>
            <Radio
              value="In Person"
              onClick={() => setValue("event_venue", "In Person")}
            >
              In Person
            </Radio>
            <Radio value="TBD" onClick={() => setValue("event_venue", "TBD")}>
              TBD
            </Radio>
          </RadioGroup>
        </div>

        <div className="mt-5 flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 p-3">
            <Checkbox
              size="md"
              onValueChange={setIsToCSelected}
              isSelected={isToCSelected}
              isRequired
            />

            <Link
              className="text-primary text-md font-medium underline-offset-2 underline "
              href="/terms"
              rel="noopener noreferrer"
              target="_blank"
            >
              I agree to terms and conditions
            </Link>
          </div>

          <Button
            size="lg"
            color="primary"
            className="w-fit "
            isDisabled={isToCSelected === false}
            // onClick={submitForm}
            type="submit"
          >
            Request Now
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommunityForm;

const eventData = [
  {
    id: "Hackathon",
    label: "Hackathon",
    value: "Hackathon",
  },
  {
    id: "Bootcamp",
    label: "Bootcamp",
    value: "Bootcamp",
  },
  {
    id: "Workshop",
    label: "Workshop",
    value: "Workshop",
  },
  {
    id: "Conference",
    label: "Conference",
    value: "Conference",
  },
  {
    id: "Meetup",
    label: "Meetup",
    value: "Meetup",
  },
  {
    id: "Others",
    label: "Others",
    value: "Others",
  },
];
