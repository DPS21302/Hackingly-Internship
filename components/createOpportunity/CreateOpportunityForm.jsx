"use client";

import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { CreateOpportunitySchema } from "@/utils/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import CoverImageUpload from "./CoverImageUpload";
import SocialLinksField from "./SocialLinksField";
import AboutField from "./AboutField";
// import AboutField from "./AboutField";

export default function CreateOpportunityForm() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [about, setAbout] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateOpportunitySchema),
  });

  const onSubmit = (data) => {
    // add socialLinks data here
    const additionalData = { ...data };
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Cover Image */}
          <div>
            <CoverImageUpload />
          </div>
          <div className="flex flex-col gap-3 my-20">
            {/* Cover Image */}
            {/* Event Name */}
            <div className="flex gap-5">
              {/* Image Upload */}
              <CreateInputField
                type={"text"}
                name={"eventName"}
                label={"Event Name"}
                register={register}
                errors={errors}
              />

              <CreateInputField
                type={"text"}
                name={"eventDescription"}
                label={"Description"}
                placeholder={"Short description about event"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Select
                label="Opportunity Type"
                variant="faded"
                color="primary"
                {...register("eventType", { required: true })}
              >
                <SelectItem>Test</SelectItem>
              </Select>
              <RadioGroup
                label="Mode"
                orientation="horizontal"
                {...register("eventMode", { required: true })}
                isInvalid={errors.eventMode}
                errorMessage={errors.eventMode?.message}
              >
                <Radio value="ONLINE">Online</Radio>
                <Radio value="OFFLINE">Offline</Radio>
              </RadioGroup>
              <CreateInputField
                type={"text"}
                label={"Venue"}
                name={"eventVenue"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <CreateInputField
                type={"date"}
                placeholder={" "}
                name={"eventDate"}
                label={"Event Date"}
                register={register}
                errors={errors}
              />
              <CreateInputField
                type={"date"}
                placeholder={" "}
                name={"endDate"}
                label={"End Date"}
                register={register}
                errors={errors}
              />
              <CreateInputField
                type={"date"}
                placeholder={" "}
                name={"registrationDeadline"}
                label={"Registration Deadline"}
                register={register}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* TODO: Validation here for Participation type */}
              <div className="flex flex-col gap-2">
                <RadioGroup label="Participation Type" orientation="horizontal">
                  <Radio value="INDIVIDUAL">Individual</Radio>
                  <Radio value="TEAM">Team</Radio>
                </RadioGroup>
                <CreateInputField
                  name={"teamSize"}
                  type={"number"}
                  label={"Team size"}
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <Checkbox className="mb-1" {...register("isPaid")}>
                  Event is paid
                </Checkbox>
                <CreateInputField
                  type={"number"}
                  label={"Event Fees"}
                  name={"eventFees"}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            {/* Social Links */}
            {/* Get data from here... */}
            <SocialLinksField
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
            {/* About */}
            <AboutField about={about} setAbout={setAbout} />

            <Button type="submit" color="primary" className="w-fit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

const CreateInputField = ({
  register,
  errors,
  name,
  type,
  placeholder,
  label,
}) => (
  <Input
    type={type}
    label={label}
    placeholder={placeholder}
    color="primary"
    variant="faded"
    {...register(name, { required: `${label} is required` })}
    isInvalid={errors[name]}
    errorMessage={errors[name]?.message || ""}
  />
);
