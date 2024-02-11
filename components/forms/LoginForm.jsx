"use client";
import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/utils/ValidationSchema";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import LoginImg from "@/assets/svgs/login.svg";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response.ok) {
      toast.success("Logged in successfully");
      router.push("/events");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-screen flex justify-center items-center md:p-20 p-0">
        <div className="w-full md:w-[80%] mx-auto flex justify-center border items-center h-full rounded-2xl bg-white shadow-xl shadow-gray-200">
          <div className="md:w-1/2 hidden md:flex justify-center items-center flex-col">
            <Image src={LoginImg} width={500} alt="" />
          </div>
          <div className="flex-1 p-8 md:p-14">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-medium text-center">
                  Hi, Welcome back to{" "}
                  <span className="text-primary font-semibold">Hackingly</span>
                </h1>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  variant="faded"
                  color="primary"
                  {...register("email", { required: true })}
                  isInvalid={errors.email}
                  errorMessage={errors.email?.message}
                />
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    variant="faded"
                    color="primary"
                    {...register("password")}
                    isInvalid={errors.password}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <div className="justify-center flex items-center pt-3 ">
                    <div className="inline-flex gap-1 text-sm items-center">
                      <p>Forgot your account details?</p>{" "}
                      <Link href="/signup" className="text-sm">
                        Reset account
                      </Link>
                    </div>
                  </div>
                </div>
                {errors.root && (
                  <div className="text-red-500 text-sm">
                    {errors.root.message}
                  </div>
                )}
                <Button color="primary" size="lg" type="submit">
                  Login
                </Button>
                <div className="text-center">
                  <p>Don&apos;t have an account?</p>{" "}
                  <Link href="/signup">Create an account</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
