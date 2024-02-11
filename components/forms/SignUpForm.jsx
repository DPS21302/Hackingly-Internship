"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OTPSchema } from "@/utils/ValidationSchema";
import { useRouter } from "next/navigation";
import { baseURL } from "@/utils/BaseURL";
import Link from "next/link";
import Image from "next/image";
import SignupImg from "@/assets/svgs/signup-page.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmitOTP,
    setError: setErrorOTP,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(OTPSchema),
  });

  const onSubmit = async (data) => {
    const { firstName, lastName, username, password, email } = data;
    const requestedData = {
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      email,
    };

    try {
      const response = await axios.post(
        `${baseURL}/users/register/`,
        requestedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log(response.data);
        toast.success("OTP sent to your email");
        setFormData(requestedData);
        setShowOTPForm(true);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const { status } = err.response;
        setError("email", {
          message: status === 400 ? "Email already exists" : "Invalid",
        });
        toast.error("Email already exists");
      } else null;
    }
  };

  const onOTPSubmit = async (otpData) => {
    const { otp } = otpData;

    const payload = JSON.stringify({
      email: formData.email,
      otp: otp.toString(),
    });

    try {
      const otpResponse = await axios.post(
        `${baseURL}/users/verify/otp/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(otpResponse.data);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status } = error.response;
        setErrorOTP("otp", {
          message: status === 400 ? "Incorrect OTP" : "Invalid",
        });
        toast.error("Invalid OTP");
      } else null;
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="h-screen flex justify-center items-center md:p-5 p-0 border rounded-lg shadow-xl shadow-gray-200">
        <div className="w-[90%] mx-auto flex justify-center items-center h-full rounded-xl">
          {/* <!-- Left: Image --> */}
          <div className="md:w-1/2 hidden rounded-l-xl md:p-4 p-0 h-full md:flex justify-center items-center flex-col">
            {/* <Link as={RouteLink} to="/"> */}
            <Image src={SignupImg} width={500} alt="" />
            {/* </Link> */}
          </div>
          {/* <!-- Right: Login Form --> */}
          <div className="flex-1 md:p-14 p-0">
            {showOTPForm ? (
              <form onSubmit={handleSubmitOTP(onOTPSubmit)}>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-2xl font-medium">
                      An OTP has been sent to your email
                    </h1>
                  </div>
                  <Input
                    type="text"
                    label="OTP"
                    variant="faded"
                    color="primary"
                    {...register2("otp", { required: true })}
                    isInvalid={errors2.otp}
                    errorMessage={errors2.otp?.message}
                  />

                  <Button color="primary" size="lg" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                  {/* Title */}
                  <div className="my-2">
                    <p className="text-base font-medium">
                      Hi there, Welcome to{" "}
                      <span className="text-semibold text-primary">
                        Hackingly
                      </span>
                    </p>
                    <h1 className="text-2xl font-medium">
                      Let&apos;s create your account!
                    </h1>
                  </div>
                  {/* Signup form */}
                  <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        isRequired
                        type="text"
                        label="Your first name"
                        variant="faded"
                        color="primary"
                        {...register("firstName", { required: true })}
                        isInvalid={errors.firstName}
                        errorMessage={errors.firstName?.message}
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Your last name"
                        variant="faded"
                        color="primary"
                        {...register("lastName", { required: true })}
                        isInvalid={errors.lastName}
                        errorMessage={errors.lastName?.message}
                      />
                    </div>
                    <Input
                      isRequired
                      label="Create a username"
                      variant="faded"
                      color="primary"
                      type="text"
                      {...register("username", { required: true })}
                      isInvalid={errors.username}
                      errorMessage={errors.username?.message}
                    />
                    <Input
                      isRequired
                      label="Email"
                      variant="faded"
                      color="primary"
                      type="text"
                      {...register("email", { required: true })}
                      isInvalid={errors.email}
                      errorMessage={errors.email?.message}
                    />
                    <div className="flex flex-col gap-2">
                      <Input
                        isRequired
                        label="Create a password"
                        variant="faded"
                        color="primary"
                        type="password"
                        {...register("password")}
                        isInvalid={errors.password}
                        errorMessage={errors.password?.message}
                      />
                    </div>
                    <Input
                      isRequired
                      label="Confirm password"
                      variant="faded"
                      color="primary"
                      type="password"
                      {...register("confirmPassword")}
                      isInvalid={errors.confirmPassword}
                      errorMessage={errors.confirmPassword?.message}
                    />

                    <Button href="#" color="primary" size="lg" type="submit">
                      Sign Up
                    </Button>
                    <div className="inline-flex gap-1">
                      <p>Already have an account?</p>{" "}
                      <Link href="/login" className="text-[#8274e8]">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
