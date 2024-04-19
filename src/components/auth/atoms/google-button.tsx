import Image from "next/image";
import Button from "@/components/atoms/button";
import googleicon from "@/assets/svg/google.svg";

const GoogleButton = () => {
  return (
    <Button className="bg-white !text-gray-600 flex mt-6 mb-8 items-center justify-center gap-2 border w-full transition-none hover:bg-gray-100">
      <Image src={googleicon} alt="google" width={20} height={20} />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default GoogleButton;
