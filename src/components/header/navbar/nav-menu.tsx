'use client';
import { HiHome, HiUser, HiEnvelope } from "react-icons/hi2";

// nav data
export const navData = [
  {
    name: "home",
    path: "/",
    icon: <HiHome />,
  },
  {
    name: "profile",
    path: "/profile",
    icon: <HiUser />,
  },
  {
    name: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
  },
];

// next link
import Link from "next/link";

// next router
import { useRouter } from "next/navigation";

// components


//My Nav
const NavMenu = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className="bg-white border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-ms transition cursor-pointer">
      {/* inner */}
      <div
        className="hidden md:flex flex-row items-center justify-between"
      >
        {navData.map((link, index) => {
          return (
            <Link
              className={`${
                link.path === pathname && "text-teal-500"
              } relative flex items-center group hover:text-teal-500 transition-all duration-300 px-6`}
              href={link.path}
              key={index}
            >
              {/* tooltip */}
              <div className="hidden lg:block">{link.name}</div>

              {/* icon */}
              <div>{link.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};


export default NavMenu;