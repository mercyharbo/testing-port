/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import apiClient from "@/src/utils/apiUtil";

const formSchema = z.object({
  messages: z.string().min(30, "Please write a short note"),
});
type FormData = z.infer<typeof formSchema>;
const Apply = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  //API CALL FOR JOB APPLICATION
  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    try {
      const job_id = "67fcd93cebfc61fb19993c30";
      const res = await apiClient.post(`/apply?job_id=${job_id}`, data);
      if (res.status === 200 || res.status === 201) {
        reset();
        navigate.push("/job-hub/applied");
        return res.data;
      } else {
        throw new Error(`Signup failed with status ${res.status}`);
      }
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Job application failed"
      );
    }

    reset();
  };
  return (
    <main className="bodyMargin shadow my-10 py-5 text-primary flex flex-col gap-2 font-raleway">
      <h2 className="px-5 subHeading">Graphics Designer</h2>
      <h2 className="px-5 text-xs lg:text-lg">by Uxper Group of Companies</h2>
      <div className="bg-primary px-5 py-10 text-white font-inter">
        Kindly review your Application
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg mx-auto  my-10 w-11/12 center-flexCol gap-6">
        <textarea
          id="messages"
          {...register("messages")}
          placeholder="Do you have any notes or information you want
them to know?"
          className="w-full bg-gray100 p-3 rounded  focus:border-1 focus:outline-none focus:border-secondary transition-colors duration-200 min-h-60"
        />
        {errors.messages && (
          <p className="text-red500 text-sm">{errors.messages.message}</p>
        )}
        <button
          className="bg-primary text-white px-5 py-2 rounded"
          type="submit">
          Submit your Application
        </button>
      </form>
    </main>
  );
};

export default Apply;
