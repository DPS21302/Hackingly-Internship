"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Textarea,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import { baseURL } from "@/utils/BaseURL";
import Error from "next/error";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

let CompanyInputBoxes = [
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
    id: "company_name",
    type: "text",
    label: "Company Name",
  },
  {
    id: "designation",
    type: "text",
    label: "Designation",
  },
];
const BusinessForm = () => {
  const router = useRouter();
  const [isOrganziedBefore, setIsOrganizedBefore] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();
  const [isToCSelected, setIsToCSelected] = useState(false);
  // Enable company name if 'associated with company' is checked
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]); 

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  useEffect(() => {
    setStates(State.getStatesOfCountry(selectedCountry));
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState, selectedCountry]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/leads/corporate/create/`,
        data
      );
      if (response.status === 201) {
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
            Business Hackathon
          </h2>
          <p className="text-sky-100 mt-3 text-base md:w-[90%] text-justify">
            At Hackingly, we understand that innovation is the lifeblood of
            successful businesses. Our business hackathons provide a structured
            and dynamic environment for corporations to spark creativity, solve
            complex challenges, and drive tangible results. If you're looking to
            foster innovation, engage your team, and tackle critical issues
            head-on, our business hackathons are the answer.
          </p>
        </div>
        <div>{/* TODO: Add Illustration */}</div>
      </div>
      <div className="">
        <h1 className="text-xl font-medium mb-4">
          Fill up the form below to get started!
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid md:grid-cols-3 flex flex-col gap-5">
          {CompanyInputBoxes.map((item) => {
            return (
              <Input
                isRequired
                name={item.id}
                key={item.id}
                type={item.type}
                label={item.label}
                variant="faded"
                color="primary"
                {...register(item.id, { required: true })}
              />
            );
          })}
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
            color="primary"
            {...register("country")}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setValue("country", e.target.value);
            }}
            isRequired
          >
            {countries.map((country) => (
              <SelectItem key={country.isoCode} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </Select>

          {/* {selectedCountry && ( */}
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
          {/* )} */}
          {/* {selectedCountry && selectedState && ( */}
          
          {/* <Input
            label="City"
            variant="faded"
            color="primary"
            {...register("city")}
            isRequired
            disabled={!selectedState}
          /> */}
          
          {/* )} */}
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
            {cities.map(city => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </Select>

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
          <div className="flex flex-col mt-5">
            <Checkbox
              className="mb-1"
              isSelected={isOrganziedBefore}
              onValueChange={setIsOrganizedBefore}
              //   {...register("organized_event_before")}
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

        <div className="mt-5 flex flex-col gap-2 ">
          <div className="flex flex-row gap-2">
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
        </div>
        <Button
          className="w-fit mt-5"
          size="lg"
          color="primary"
          isDisabled={isToCSelected === false}
          // onClick={submitForm}
          type="submit"
        >
          Request Now
        </Button>
      </form>
    </>
  );
};

export default BusinessForm;

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
