import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

const SidebarLogo = () => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        text-2xl
        text-orange-700
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <FaChevronDown size={31}  />
    </div>
  );
};

export default SidebarLogo;
