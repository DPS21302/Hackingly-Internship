"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { baseURL } from "@/utils/BaseURL";
import { redirect, useRouter } from "next/navigation";

const SupportForm = () => {
  const router = useRouter();
  const inputBoxes = [
    { id: "name", type: "text", label: "Name" },
    { id: "email", type: "email", label: "Email Id" },
    { id: "mobile_number", type: "tel", label: "Mobile No." },
    { id: "organization", type: "text", label: "Organization" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}/leads/contactmessage/create/`,
        data
      );
      if (response.status === 201) {
        console.log(response.data);
        toast.success("Your message has been sent successfully");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error("Error in sending message");
      }
    }
  };

  useEffect(() => {
    register("category", { required: true });
    setValue("category", "Support"); // Default value for category
  }, [register, setValue]);

  return (
    <>
      <Toaster />
      <div className="flex md:flex-row flex-col items-center justify-center text-primary">
        <div className="w-full md:w-[70%] p-5 border shadow-sm shadow-gray-200 m-4 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Form</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {inputBoxes.map((item) => (
              <Input
                key={item.id}
                isRequired
                label={item.label}
                type={item.type}
                variant="filled"
                color="primary"
                size="lg"
                labelPlacement="outside"
                isInvalid={errors[item.id]}
                {...register(item.id, { required: true })}
              />
            ))}
            <Textarea
              label="What’s On Your Mind"
              isRequired
              variant="filled"
              color="primary"
              labelPlacement="outside"
              {...register("message", { required: true })}
            />
            <RadioGroup
              color="primary"
              label="You want to connect with us for?"
            >
              <Radio
                value="Support"
                onClick={() => setValue("category", "Support")}
              >
                Support
              </Radio>
              <Radio
                value="Partnership"
                onClick={() => setValue("category", "Partnership")}
              >
                Partnership
              </Radio>
              <Radio
                value="Sales"
                onClick={() => setValue("category", "Sales")}
              >
                Sales (Demos & Pricing)
              </Radio>
            </RadioGroup>
            <Button type="submit" size="lg" color="primary" className="w-full">
              Submit Your Details
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupportForm;
