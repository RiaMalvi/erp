import React, { useContext, useState } from "react";
import useAuth from "@/hooks/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

//assets
import logo from "@/assets/images/logo.png";
import { MdVerifiedUser, MdLock } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

//components
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import GoogleButton from "../atoms/google-button";
import IconButton from "@/components/atoms/button/icon";
import { AxiosError } from "axios";

type UserData = {
  identifier: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserData) => {
    const { identifier, password } = data;
    try {
      await login({ identifier, password });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-white">
            Welcome back! 👋
          </h1>
          <small className="text-gray-500 text-sm">
            Sign in to your account
          </small>
        </div>
      </div>
      <div className="flex justify-center">
        <GoogleButton />
      </div>
      <form
        className="mt-5 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <Input
          placeholder="Email or Username"
          adornment={{
            start: {
              icon: <MdVerifiedUser size={20} />,
            },
          }}
          name="identifier"
          register={register}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
          error={!!errors.identifier}
          helperText={errors.identifier?.message}
        />
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          adornment={{
            start: {
              icon: <MdLock size={20} />,
            },
            end: {
              icon: (
                <IconButton
                  onClick={(e) => setShowPassword(!showPassword)}
                  icon={
                    showPassword ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )
                  }
                />
              ),
            },
          }}
          register={register}
          name="password"
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
