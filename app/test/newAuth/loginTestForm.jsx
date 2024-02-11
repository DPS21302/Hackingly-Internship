"use client";
import React, {  useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useForm } from "react-hook-form";
import { LoginSchema } from "@/utils/ValidationSchema";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import LoginImg from "@/assets/svgs/login.svg";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data) => {
    // signIn("credentials", { ...data, callbackUrl: "/events" },
    // toast.promise(signIn("credentials", { ...data, callbackUrl: "/events" }), {
    //   loading: "Logging in...",
    //   success: "Logged in successfully",
    //   error: "Incorrect email or password",
    // }));
  };
   
  return (
    <>
    <Toaster />
      <div className=" flex justify-center items-center">
        <div className="w-full mx-auto flex justify-center items-center h-full bg-white">
          {/* <!-- Login Form --> */}
          <div className="flex-1 p-14">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
                <div className="my-2">
                  <h1 className="text-2xl font-medium">
                    Hi, Welcome back to{" "}
                    <span className="text-primary font-semibold">
                      Hackingly
                    </span>
                  </h1>
                </div>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  variant="faded"
                  color="primary"
                  {...register("email", { required: true })}
                  isInvalid={errors.email}
                  errorMessage={errors.email?.message}
                />
                <div>
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
                  <div className="inline-flex gap-1 text-sm items-center mt-2">
                    <p>Forgot account details?</p>{" "}
                    <Link href="/signup" className="text-sm ">
                      Reset account
                    </Link>
                  </div>
                </div>
                {/* Incorrect pass or email Msg */}
                {errors.root && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.root.message}
                  </div>
                )}
                <Button href="#" color="primary" size="lg" type="submit" className="text-xl">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;


// export const getServerSideProps = async () => {
//     const res = await axiosInstance.post("/users/login/");
//     console.log(res);

//     return {
//       props: {
//         data: "hello",
//       },
//     };

// }