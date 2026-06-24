"use client";
import { useLoginUserMutation } from "@/services/auth";
import { error } from "console";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { email } from "zod";

type formData = {
    email: string;
    password: string;
};

export default function FormExampleComponent() {
    // calling login custom hook
    const [loginRequest, { data: loginResponse, error }] =
        useLoginUserMutation();
    // 1. delcare object using with useForm
    const { register, handleSubmit, reset, setError } = useForm({
        // 2. set default values
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 3. create handleSubmit to track value from input form
    const onSubmit = (data: formData) => {
        try {
            loginRequest({
                email: data?.email,
                password: data?.password,
            });
            console.log(error);

            if (data != null) {
                toast("You have login successfully!");
            }
        } catch (error) {
            toast.error("You need to login again!");
        }
        //  console.log("===> Form Data Email: ", data?.email);
        //  console.log("===> Form Data Password: ", data?.password);
    };
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
    <h1 className="mb-2 text-center text-3xl font-bold">
      Login
    </h1>

    <p className="mb-8 text-center text-sm text-gray-500">
      Welcome back! Please sign in.
    </p>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email
        </label>

        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="john@example.com"
          className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Password
        </label>

        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800"
      >
        Login
      </button>
    </form>
  </div>
</div>
    );
}