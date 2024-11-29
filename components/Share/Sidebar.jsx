import Image from "next/image";
import Link from "next/link";
import React from "react";
import allProductIcon from "../../asserts/all-product-icon.svg";
import shelterIcon from "../../asserts/shelterIcon.svg";
import donationIcon from "../../asserts/donationIcon.svg";
import logOutIcon from "../../asserts/logOutIcon.svg";
import memberIcon from "../../asserts/memberIcon.svg";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ slider, setSlider }) => {
  const router = useRouter();
  const location = usePathname();
  // console.log();
  return (
    <div className=" bg-[#F88D58] text-white h-[89vh] lg:h-[85vh] pt-5 lg:rounded-tr-3xl lg:rounded-br-3xl overflow-y-auto">
      {/* //* SideBar Collaps Buttons */}
      <div className="lg:hidden">
        {slider ? (
          <div className="flex justify-center items-end flex-col px-5">
            <button onClick={() => setSlider(!slider)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button onClick={() => setSlider(!slider)} className="ml-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
      </div>
      {/* //* SideBar Collaps Menus */}
      <div className={`${slider ? "block" : "hidden lg:block "}  h-[90%]`}>
        <h1 className="text-2xl cursor-pointer flex justify-start items-center px-5 mb-10">
          <Link href="/dashboard">
            <span className="font-bold">Dashboard</span>
          </Link>
        </h1>
        {/* For Laptop View  */}
        <div className="hidden lg:block relative h-full">
          <div>
            <ul className=" flex justify-center items-start flex-col gap-3 pe-10">
              <Link href="/dashboard/all-products" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/all-products"
                      ? "text-[#F88D58] bg-white"
                      : "text-white"
                  }`}
                >
                  <Image
                    src={allProductIcon}
                    alt="show-feedback"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/all-products"
                          ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                          : undefined,
                    }}
                  />
                  <p>All Products</p>
                </li>
              </Link>
              <Link href="/dashboard/shelter" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/shelter"
                      ? "text-[#F88D58] bg-white"
                      : "text-white"
                  }`}
                >
                  <Image
                    src={shelterIcon}
                    alt="Shelter"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/shelter"
                          ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                          : undefined,
                    }}
                  />
                  Shelter
                </li>
              </Link>
              <Link href="/dashboard/donation" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/donation"
                      ? "text-[#F88D58] bg-white"
                      : "text-white"
                  }`}
                >
                  <Image
                    src={donationIcon}
                    alt="donation"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/donation"
                          ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                          : undefined,
                    }}
                  />
                  <p>Donation</p>
                </li>
              </Link>
              <Link href="/dashboard/members" className="w-full">
                {" "}
                <li
                  className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg ${
                    location === "/dashboard/members"
                      ? "text-[#F88D58] bg-white"
                      : "text-white"
                  }`}
                >
                  <Image
                    src={memberIcon}
                    alt="members"
                    width={30}
                    style={{
                      filter:
                        location === "/dashboard/members"
                          ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                          : undefined,
                    }}
                  />
                  Members
                </li>
              </Link>
            </ul>
          </div>

          <div
            className={`flex items-center cursor-pointer absolute bottom-14 gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg text-white 
           `}
            onClick={() => {
              router.push("/login");
            }}
          >
            <Image src={logOutIcon} alt="show-feedback" width={30} />
            <p>Log Out</p>
          </div>
        </div>
        {/* For Mobile View */}
        <div className="block lg:hidden relative h-[90%]">
          <div>
            <ul className=" flex justify-center items-start flex-col gap-3  pe-5">
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/all-products"
                    ? "text-[#F88D58] bg-white"
                    : "text-white"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={allProductIcon}
                  alt="show-feedback"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/all-products"
                        ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/all-products">All Products</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/shelter"
                    ? "text-[#F88D58] bg-white"
                    : "text-white"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={shelterIcon}
                  alt="shelter"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/shelter"
                        ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/shelter">Shelter</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/donation"
                    ? "text-[#F88D58] bg-white"
                    : "text-white"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={donationIcon}
                  alt="Donation"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/donation"
                        ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/donation">Donation</Link>
              </li>
              <li
                className={`flex items-center gap-x-3 w-full py-3 px-2 text-lg rounded-tr-lg rounded-br-lg ${
                  location === "/dashboard/members"
                    ? "text-[#F88D58] bg-white"
                    : "text-white"
                }`}
                onClick={() => setSlider(!slider)}
              >
                <Image
                  src={memberIcon}
                  alt="members"
                  width={30}
                  style={{
                    filter:
                      location === "/dashboard/members"
                        ? "brightness(100%) invert(42%) sepia(83%) saturate(569%) hue-rotate(-2deg)"
                        : undefined,
                  }}
                />
                <Link href="/dashboard/members">Members</Link>
              </li>
            </ul>
          </div>
          <div
            className={`flex items-center cursor-pointer absolute bottom-0 gap-x-3 w-full py-3 px-2 text-lg lg:rounded-tr-lg lg:rounded-br-lg text-white 
           `}
            onClick={() => {
              router.push("/login");
              setSlider(!slider);
            }}
          >
            <Image src={logOutIcon} alt="show-feedback" width={30} />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
