"use client";
import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import HowDoYouPlay from "../HomePage/HowDoYouPlay";
import Pagination from "./Pagination";
import img1 from "../../asserts/memo.jpeg";
import img2 from "../../asserts/jack.jpeg";
import img3 from "../../asserts/lily.jpeg";
import img4 from "../../asserts/sparrow.jpeg";
import {
  useNearbyFriendsQuery,
  usePetProfileQuery,
  useUserProfileQuery,
} from "@/redux/api/features/profileApi";
import { useSelector } from "react-redux";
import { decodedToken } from "@/utils/jwt";
import Loader from "../ui/Loader";

const Friends = () => {
  const [petProfile, setPetProfile] = useState(null);
  const [userData, setUserData] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (token) {
      try {
        const userInfo = decodedToken(token);
        setUserData(userInfo);
      } catch (err) {
        setUserData(null);
      }
    }
  }, [token]);

  // Fetch pet profile
  const {
    data: petProfileData,
    error: petProfileError,
    isFetching: isFetchingPetProfile,
  } = usePetProfileQuery(
    { id: userData?.userId },
    {
      skip: !userData?.userId, // Skip query if userId is not available
    }
  );

  // Set pet profile data
  useEffect(() => {
    if (petProfileError) {
      setPetProfile(null);
    } else if (petProfileData) {
      setPetProfile(petProfileData);
    }
  }, [petProfileData, petProfileError]);

  // Fetch nearby friends
  const {
    data: nearByFriends,
    error,
    isFetching: nearByFriendsFetching,
  } = useNearbyFriendsQuery(
    { id: userData?.userId },
    {
      skip: !userData?.userId || isFetchingPetProfile, // Skip query if userId or petProfile is unavailable
    }
  );

  return (
    <div className="bg-[#FFFAF5]">
      <h1
        style={{ fontSize: "clamp(16px, 2vw + 1rem ,36px)" }}
        className="  text-center font-bold my-[50px]  text-[#302F51]"
      >
        FRIENDS NEAR YOU
      </h1>
      {petProfileError ? (
        <div className="text-center w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Please complete your and your pet profile to see friends near you
          </h2>
        </div>
      ) : nearByFriendsFetching ? (
        <Loader className="h-screen" />
      ) : (
        nearByFriends?.data?.map((petPartner, index) => (
          <Friend
            userData={userData}
            key={petPartner._id}
            petPartner={petPartner}
            index={index}
            petProfile={petProfile}
          />
        ))
      )}

      <div className="pt-[50px] ">
        <HowDoYouPlay />
      </div>

      <div className="text-[#302F51] text-center py-8 px-4 mb-[100px]">
        <h2 className="text-[40px]  font-semibold mb-4 text-gray-800">
          Disclaimer
        </h2>
        <p className="leading-relaxed text-[22px] text-justify md:mx-[150px] mx-[24px]">
          Woof Spot is designed to help dog owners connect with others in their
          community for activities like walks, hikes, and playdates. While we
          encourage positive interactions, it is important to use caution when
          meeting new people and dogs. Woof Spot does not vet users or guarantee
          the safety, behavior, or reliability of any individuals or their pets.
          By using our platform, you agree that Woof Spot is not responsible or
          liable for any negative experiences, injuries, or disputes that may
          arise from interactions between users. Always prioritize safety and
          good judgment when arranging meetups.
        </p>
      </div>
    </div>
  );
};

export default Friends;
