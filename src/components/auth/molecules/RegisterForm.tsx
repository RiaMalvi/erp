import React, { useState, useMemo, useRef } from "react";
import useAuth from "@/hooks/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Zoom, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usernameExists } from "@/lib/auth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

//assets
import logo from "@/assets/images/logo.png";
import bannerimage from "@/assets/images/signup-banner.jpg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { MoonLoader } from "react-spinners";

//components
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import GoogleButton from "../atoms/google-button";
import { AxiosError } from "axios";

type UserData = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const { register: signUp } = useAuth();

  const usernameAvailableStatus = {
    Available: <CiCircleCheck className="text-green-500" />,
    Unavailable: <CgUnavailable className="text-red-500" />,
    Loading: <MoonLoader size={20} color="#818cf8" />,
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameStatus, setUsernameStatus] = useState<
    keyof typeof usernameAvailableStatus | null
  >(null);
  const containerRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watch("password", "");
  const watchUsername = watch("username", "");

  useMemo(() => {
    if (watchUsername && watchUsername.length >= 3) {
      setUsernameStatus("Loading");
      usernameExists(watchUsername).then((res) => {
        setUsernameStatus(res ? "Unavailable" : "Available");
      });
    } else {
      setUsernameStatus(null);
    }
  }, [watchUsername]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(containerRef.current, {
      width: 0,
      duration: 0.6,
    });
  }, [containerRef.current]);

  const onSubmit = async (data: UserData) => {
    const { email, password, firstName, lastName, username } = data;
    const name = `${firstName} ${lastName}`;
    try {
      setLoading(true);
      await signUp({ email, password, name, username });
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 3000,
        transition: Zoom,
        icon: <span className="text-xl">🚀</span>,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-white sm:max-w-6xl max-w-[85vw] min-h-[200px] rounded-md shadow-lg border border-white grid grid-cols-2"
      ref={containerRef}
    >
      <div className="p-8">
        <div className="flex space-x-2 items-center">
          <Image src={logo} alt="logo" width={50} height={50} />
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl text-pallete1-headersmall font-semibold">
              Welcome to Startup Sync
            </h1>
            <p className="text-sm text-pallete1-headercaption">
              Enter your details to get started
            </p>
          </div>
        </div>
        <div className="px-8">
          <GoogleButton />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              name="username"
              register={register}
              error={!!errors.username}
              required
              adornment={{
                end: {
                  icon: usernameStatus
                    ? usernameAvailableStatus[usernameStatus]
                    : null,
                },
              }}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Username should be at least 3 characters",
                },
                validate: (value) => {
                  return (
                    usernameStatus === "Available" ||
                    "Username is not available"
                  );
                },
              }}
              helperText={errors.username?.message}
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                register={register}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                rules={{
                  required: "This field is required",
                }}
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                register={register}
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              register={register}
              name="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                register={register}
                error={!!errors.password}
                required
                helperText={errors.password?.message}
                adornment={{
                  end: {
                    icon: showPassword ? (
                      <IoMdEyeOff
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoMdEye
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ),
                  },
                }}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters",
                  },
                }}
              />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                adornment={{
                  end: {
                    icon: showConfirmPassword ? (
                      <IoMdEyeOff
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoMdEye
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="cursor-pointer"
                      />
                    ),
                  },
                }}
                error={!!errors.confirmPassword}
                required
                helperText={errors.confirmPassword?.message}
                rules={{
                  required: "This field is required",
                  validate: (value) =>
                    value === watchPassword || "Password does not match",
                }}
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className="bg-[url(/images/signup-banner.jpg)] bg-cover bg-center rounded-r-md p-5"></div>
    </div>
  );
};

export default RegisterForm;
