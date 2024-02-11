"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { OpportunityHomeSchema } from "@/utils/ValidationSchema";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { baseURL } from "@/utils/BaseURL";

import { useParams, useRouter } from "next/navigation";

const OppRegisterBtn = ({ opportunityData }) => {
  // console.log(opportunityData)
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(OpportunityHomeSchema),
    defaultValues: {
      eduIsPursuing: false,
      eduYear: 0,
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const genderValues = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "prefer not to say" },
    { label: "Others", value: "others" },
  ];

  const [buttonText, setButtonText] = useState("Register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pursing, setPursing] = useState(false);
  const eduIsPursuing = watch("eduIsPursuing");

  useEffect(() => {
    setPursing(eduIsPursuing);
  }, [eduIsPursuing]);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState(""); // Reset state when country changes
  };
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    // Reset city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setButtonText("Login to Register");
      return;
    }

    if (!opportunityData) return;

    if (
      opportunityData.registration_deadline &&
      new Date(opportunityData.registration_deadline) <=
        new Date().getDate().toLocaleString
    ) {
      setButtonText("Registration Closed");
      setIsDisabled(true);
      return;
    }

    if (opportunityData.is_registered) {
      setButtonText("Registered");
    } else {
      setButtonText("Register");
    }
  }, [isLoggedIn, opportunityData]);

  const handleClick = async () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsDisabled(true);
    setButtonText("Registering...");
    try {
      const res = await axios.post(
        `${baseURL}/opportunity/${id}/register/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Register Response: ", res.data);
      if (res.status === 200 || res.status === 201) {
        setButtonText("Registered");
        toast.success("Registered Successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error in Registering: ", error);
      toast.error("Error in Registering");
      setButtonText("Register");
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
    }
  }, []);
  const { data: session, status } = useSession();
  const token = session?.user?.data?.access;

  const onSubmit = async (data) => {
    console.log("submit data", data);

    const {
      city,
      state,
      country,
      dateOfBirth,
      pincode,
      phoneNumber,
      eduName,
      eduStartYear,
      eduEndYear,
      eduDescription,
      eduCity,
      eduState,
      eduCountry,
      eduDegree,
      eduField,
      eduYear,
      eduIsPursuing,
      gender,
    } = data;

    function formatDateX(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    const requestedData = {
      date_of_birth: formatDateX(dateOfBirth),
      pincode,
      city,
      state,
      country,
      phone_number: phoneNumber,
      gender,
      education: [
        {
          name: eduName,
          city: eduCity,
          state: eduState,
          country: eduCountry,
          degree: eduDegree,
          start_date: formatDateX(eduStartYear),
          end_date: formatDateX(eduEndYear),
          description: eduDescription,
          still_enrolled: eduIsPursuing,
          year: Number(eduYear),
          major: eduField,
        },
      ],
    };
    console.log("Requested Data: ", requestedData);

    try {
      const response = await axios.patch(`${baseURL}/profile/`, requestedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        setButtonText("Registered");
        console.log("Profile Updated Successfully", response.data);
        toast.success("Profile Updated Successfully");
        onOpenChange();
        await handleClick();
      }
    } catch (error) {
      console.error("Error in form submission: ", error);
      toast.error("Error in form submission");
    }
  };
  return (
    <>
      {(isLoggedIn &&
        opportunityData.can_register === true &&
        opportunityData.is_registered === false) ||
      buttonText === "Login to Register" ? (
        <div>
          <Button
            size="lg"
            color={buttonText === "Registered" ? "success" : "primary"}
            isDisabled={buttonText === "Registered"}
            onClick={() => {
              if (buttonText === "Login to Register") {
                router.push("/login");
              } else {
                handleClick();
              }
            }}
          >
            {buttonText}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            size="lg"
            onPress={onOpen}
            color={buttonText === "Registered" ? "success" : "primary"}
            isDisabled={buttonText === "Registered" ? true : false}
          >
            {buttonText}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Update Profile
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <Input
                            isRequired
                            type="date"
                            name="dateOfBirth"
                            labelPlacement="outside"
                            placeholder=" "
                            label="Date of Birth"
                            variant="faded"
                            color="primary"
                            {...register("dateOfBirth", {
                              required: true,
                            })}
                            isInvalid={errors.dateOfBirth}
                            errorMessage={errors.dateOfBirth?.message}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="flex flex-col gap-1">
                            {/* <Select
                              isRequired
                              label="Country"
                              {...register("country", { required: true })}
                              onChange={handleCountryChange}
                              isInvalid={errors.country}
                              errorMessage={errors.country?.message}
                            >
                              {Country.getAllCountries().map((country) => (
                                <SelectItem
                                  key={country.isoCode}
                                  value={country.name}
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </Select> */}
                            <Input
                              isRequired
                              label="Country"
                              variant="faded"
                              color="primary"
                              {...register("country")}
                              type="text"
                              // disabled={!selectedState}
                              isInvalid={errors.country}
                              errorMessage={errors.country?.message}
                            />
                          </div>
                          <div>
                            {/* <Select
                              label="State"
                              {...register("state", { required: true })}
                              // onChange={handleStateChange}
                              disabled={!selectedCountry}
                              isInvalid={errors.state}
                              errorMessage={errors.state?.message}
                            >
                              {State.getStatesOfCountry(selectedCountry).map(
                                (state) => (
                                  <SelectItem
                                    key={state.isoCode}
                                    value={state.name}
                                  >
                                    {state.name}
                                  </SelectItem>
                                )
                              )}
                            </Select> */}
                            <Input
                              isRequired
                              label="State"
                              variant="faded"
                              color="primary"
                              {...register("state")}
                              type="text"
                              // disabled={!selectedState}
                              isInvalid={errors.state}
                              errorMessage={errors.state?.message}
                            />
                          </div>
                          <div className="flex flex-col">
                            <Input
                              isRequired
                              label="City"
                              variant="faded"
                              color="primary"
                              {...register("city")}
                              type="text"
                              // disabled={!selectedState}
                              isInvalid={errors.city}
                              errorMessage={errors.city?.message}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <Input
                            isRequired
                            type="text"
                            name="pincode"
                            placeholder=""
                            label="Pin Code"
                            variant="faded"
                            {...register("pincode", {
                              required: true,
                            })}
                            color="primary"
                            isInvalid={errors.pincode}
                            errorMessage={errors.pincode?.message}
                          />
                          <Select
                            {...register("gender")}
                            onChange={(e) => setValue("gender", e.target.value)}
                            isRequired
                            label="Gender"
                            variant="faded"
                            color="primary"
                          >
                            {genderValues.map((gender) => (
                              <SelectItem
                                key={gender.value}
                                value={gender.value}
                              >
                                {gender.label}
                              </SelectItem>
                            ))}
                          </Select>
                          <Input
                            isRequired
                            type="tel"
                            {...register("phoneNumber", {
                              required: "Phone Number is required",
                            })}
                            placeholder=""
                            label="Phone Number"
                            variant="faded"
                            color="primary"
                            isInvalid={errors.phoneNumber}
                            errorMessage={errors.phoneNumber?.message}
                          />
                        </div>

                        <div className="flex gap-3 flex-col rounded-lg">
                          <div className="p-5 border rounded-lg">
                            <h1 className="text-xl font-medium text-primary">
                              Education Details
                            </h1>
                            <div className="grid grid-cols-1 gap-3">
                              {/* Institute Name */}
                              <Input
                                isRequired
                                label="Institute Name"
                                variant="faded"
                                color="primary"
                                type="text"
                                {...register("eduName", {
                                  required: true,
                                })}
                                isInvalid={errors.eduName}
                                errorMessage={errors.eduName?.message}
                              />

                              {/* Country, State, City */}
                              <div className="grid grid-cols-3 gap-2">
                                <Input
                                  isRequired
                                  label="Country"
                                  variant="faded"
                                  color="primary"
                                  type="text"
                                  {...register("eduCountry", {
                                    required: true,
                                  })}
                                  isInvalid={errors.eduCountry}
                                  errorMessage={errors.eduCountry?.message}
                                />
                                <Input
                                  isRequired
                                  label="State"
                                  variant="faded"
                                  color="primary"
                                  type="text"
                                  {...register("eduState", {
                                    required: true,
                                  })}
                                  isInvalid={errors.eduState}
                                  errorMessage={errors.eduState?.message}
                                />
                                <Input
                                  isRequired
                                  label="City"
                                  variant="faded"
                                  color="primary"
                                  {...register("eduCity", {
                                    required: true,
                                  })}
                                  type="text"
                                  isInvalid={errors.eduCity}
                                  errorMessage={errors.eduCity?.message}
                                />
                              </div>

                              {/* Degree, Field of Study */}
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  isRequired
                                  label="Degree"
                                  variant="faded"
                                  color="primary"
                                  type="text"
                                  {...register("eduDegree", {
                                    required: true,
                                  })}
                                  isInvalid={errors.eduDegree}
                                  errorMessage={errors.eduDegree?.message}
                                />
                                <Input
                                  isRequired
                                  label="Field of Study"
                                  variant="faded"
                                  color="primary"
                                  type="text"
                                  {...register("eduField", {
                                    required: true,
                                  })}
                                  isInvalid={errors.eduField}
                                  errorMessage={errors.eduField?.message}
                                />
                              </div>

                              {/* Start Year, Currently Enrolled, End Year */}
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex flex-col gap-1">
                                  <Input
                                    isRequired
                                    type="date"
                                    placeholder=" "
                                    label="Start Date"
                                    labelPlacement="outside"
                                    variant="faded"
                                    color="primary"
                                    {...register("eduStartYear", {
                                      required: true,
                                    })}
                                    isInvalid={errors.eduStartYear}
                                    errorMessage={errors.eduStartYear?.message}
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Checkbox
                                    {...register("eduIsPursuing")}
                                    onChange={() => setPursing(!pursing)}
                                  >
                                    Still Enrolled?
                                  </Checkbox>
                                  <div className="flex flex-col gap-1">
                                    {!pursing && (
                                      <Input
                                      placeholder=" "
                                        variant="faded"

                                      color="primary"
                                        type="date"
                                        label="End Date"
                                        {...register("eduEndYear", {
                                          required: !pursing,
                                        })}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <Input
                                  label="Current Year"
                                  variant="faded"
                                  color="primary"
                                  type="number"
                                  {...register("eduYear")}
                                  isInvalid={errors.eduYear}
                                  errorMessage={errors.eduYear?.message}
                                />
                                <Textarea
                                  label="Description"
                                  variant="faded"
                                  color="primary"
                                  type="text"
                                  {...register("eduDescription", {
                                    required: true,
                                  })}
                                  isInvalid={errors.eduDescription}
                                  errorMessage={errors.eduDescription?.message}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          // onPress={onClose}
                        >
                          Submit
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};

export default OppRegisterBtn;
