"use client";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import img1 from "../../asserts/fp1.png";
import img2 from "../../asserts/fp2.png";
import img3 from "../../asserts/fp3.png";
import img4 from "../../asserts/fp4.png";
import img5 from "../../asserts/fp5.png";
import img6 from "../../asserts/fp6.png";
import img7 from "../../asserts/fp7.png";
import img8 from "../../asserts/fp8.png";
import img9 from "../../asserts/fp9.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useState } from "react";
import DonateNow from "./DonateNow/DonateNow";
import Link from "next/link";
import DonateSuccess from "./DonateNow/DonateSuccess";
import DonateButtonPage from "./DonateNow/DonateButtonPage";
import { useGetAllShelterQuery } from "@/redux/api/features/shelterApi";
import { getImageUrl } from "@/helpers/config/envConfig";
import { ConfigProvider, Pagination } from "antd";
import DonatePayment from "./DonateNow/DonatePayment";

const FeaturedPups = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDonation, setIsOpenDonation] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentDonationopen, setPaymentDonationOpen] = useState(false);
  const [id, setId] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [page, setPage] = useState(1);
  const [donationAmount, setDonationAmount] = useState();

  const openModal = (id, shelter) => {
    setSelectedShelter(shelter);
    setId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const closeDonationModal = () => setIsOpenDonation(false);

  const { data: shelterData, isFetching } = useGetAllShelterQuery({ page });

  const url = getImageUrl();

  return (
    <div className="bg-[#FFFAF5] ">
      {/* Hero Section */}
      <div
        className="relative w-full md:h-[35vw]  h-[40vh]  bg-cover bg-no-repeat bg-right-top md:-mt-10 mt-16"
        style={{ backgroundImage: "url(/fpb.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-white absolute lg:left-36 md:left-16 lg:top-1/4 md:top-10 text-center ">
            <h1 className="lg:text-[3.75vw] md:text-[36px] text-[22px] font-bold ">
              COMMUNITY SUPPORT
            </h1>
            <p className="md:mt-2 lg:text-[1.25vw] md:text-[16px] text-[9px] md:w-[45vw] w-[70vw] ms-0 md:ms-3">
              Meet your future best friend! We spotlight local shelter dogs
              waiting for their forever homes. From tail-waggers to belly-rub
              lovers, each pup is ready to be part of your family and rescue you
              right back. Every wag deserves a home!
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="py-[50px] bg-[#FFFAF5]">
        <h2 className="lg:text-[2.083vw] text-[2em] text-center font-bold mb-8">
          Meet our Featured Shelter Pups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[100px] gap-x-[24px] mx-[7.8125vw]">
          {shelterData?.data?.map((shelter) => (
            <div
              onClick={() => openModal(shelter?._id, shelter)}
              key={shelter?._id}
              className=" cursor-pointer relative bg-white shadow-lg rounded-lg overflow-hidden   min-h-[74.3321vh] flex flex-col justify-end items-center"
            >
              {/* Image Section with Full Width and Height */}
              <div className="absolute inset-0">
                <Image
                  src={url + shelter?.image}
                  alt={shelter?.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover object-top "
                />
              </div>

              {/* Black overlay on the left side */}
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              {/* Text and Icon Overlay */}
              <div className="relative z-10 text-white p-4 flex justify-between items-center w-full">
                <span className="lg:text-[1.2vw] text-[18px] font-semibold">
                  {shelter?.name}
                </span>
                {/* <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer lg:text-[1.2vw] text-[18px] font-semibold" onClick={()=>openModal(shelter?.id)}>
                 Fetch My Info<FiExternalLink className="lg:text-[1.2vw] text-[18px]" />
                  </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-20 mb-10">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#F88D58",
                  colorPrimary: "#F3F3F3",
                  colorPrimaryHover: "#F3F3F3",
                },
              },
            }}
          >
            <Pagination
              onChange={(page) => setPage(page)}
              pageSize={12}
              total={shelterData?.meta?.total}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#FFFAF5] pb-[50px] xl:px-[420px] text-center ">
        <p className="xl:text-[1.2vw] lg:text-[20px] text-[18px] mb-4 lg:mx-0 mx-3">
          Your donation helps give shelter dogs the care and love they need
          while waiting for their forever homes. Every contribution makes a tail
          wag and a heart hopeful. Click below to make a difference today!
        </p>
        <button
          onClick={() => setIsOpenDonation(true)}
          className="md:mt-[50] mt-5 text-white no-underline bg-[#F88D58] hover:bg-black 
                 xl:px-[48px] xl:py-[20px] lg:px-[38px] lg:py-[16px] md:px-[28px] md:py-[10px] 
                 px-[48px] py-[20px] md:mb-0 mb-4 md:text-fluid-button text-[18px] flex justify-center 
                 items-center gap-[16px] rounded-lg mx-auto"
        >
          Donate Now <MdOutlineArrowOutward />
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
            <DonateNow
              closeModal={closeModal}
              setOpen={setOpen}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              id={id}
              selectedShelter={selectedShelter}
            />
          </div>
        )}

        {isOpenDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
            <DonateButtonPage
              closeModal={closeDonationModal}
              setPaymentDonationOpen={setPaymentDonationOpen}
              setIsOpen={setIsOpenDonation}
              donationAmount={donationAmount}
              setDonationAmount={setDonationAmount}
              isOpen={isOpenDonation}
            />
          </div>
        )}
        {paymentDonationopen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
            <DonatePayment
              setPaymentDonationOpen={setPaymentDonationOpen}
              donationAmount={donationAmount}
              setDonationAmount={setDonationAmount}
              setOpen={setOpen}
            />
          </div>
        )}

        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
            <DonateSuccess setOpen={setOpen} open={open} id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPups;
