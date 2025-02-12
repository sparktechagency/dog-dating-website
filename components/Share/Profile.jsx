"use client";
import Image from "next/image";

import EditProfile from "./EditProfile/EditProfile";
import { useEffect, useState } from "react";
import EditPetProfille from "./EditProfile/EditPetProfille";
import { useSelector } from "react-redux";
import { decodedToken } from "@/utils/jwt";
import { useMyProfileQuery } from "@/redux/api/features/authApi";
import CreateUserProfile from "./addProfile/CreateUserProfile";
import {
  usePetProfileQuery,
  useUserProfileQuery,
} from "@/redux/api/features/profileApi";
import { getImageUrl } from "@/helpers/config/envConfig";
import CreatePetProfile from "./addProfile/CreatePetProfile";
import Loader from "../ui/Loader";
import WoofHero from "@/asserts/woofHero.png";
import WoofSupporter from "@/asserts/woofSupporter.png";
import { Tooltip } from "antd";

export default function Profile() {
  const [createUserProfile, setCreateUserProfile] = useState(false);
  const [createPetProfile, setCreatePetProfile] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [petProfileEdit, setPetProfileEdit] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
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

  // Fetch user profile
  const {
    data: userProfileData,
    error: userProfileError,
    isFetching: isFetchingProfile,
  } = useUserProfileQuery(
    { id: userData?.userId },
    {
      skip: !userData, // Skip query if userData is null
    }
  );

  // Fetch pet profile
  const {
    data: petProfileData,
    error: petProfileError,
    isFetching: isFetchingPetProfile,
  } = usePetProfileQuery(
    { id: userData?.userId },
    {
      skip: !userData || isFetchingProfile, // Skip query if userData is null or user profile is still fetching
    }
  );

  // Handle user profile data or error
  useEffect(() => {
    if (userProfileError) {
      setUserProfile(null);
    } else if (userProfileData) {
      setUserProfile(userProfileData);
    }
  }, [userProfileData, userProfileError]);

  // Handle pet profile data or error
  useEffect(() => {
    if (petProfileError) {
      setPetProfile(null);
    } else if (petProfileData) {
      setPetProfile(petProfileData);
    }
  }, [petProfileData, petProfileError]);

  const toggleCreateProfile = () => {
    setCreateUserProfile((prev) => !prev);
  };

  const toggleCreatePetProfile = () => {
    setCreatePetProfile((prev) => !prev);
  };

  const toggleEditProfile = () => {
    setProfileEdit((prev) => !prev);
  };

  const toggleEditPetProfile = () => {
    setPetProfileEdit((prev) => !prev);
  };

  // const petProfile = {
  //   name: "Murphy Bear",
  //   photo: ced,
  //   address: "1234 Sunset Blvd, Los Angeles, California, USA",
  //   age: "2",
  //   gender: "Male",
  //   size: "Small (10 – 30 lbs)",
  //   neutered: "Yes",
  //   playStyle: "Focused Play; throw the ball!",
  //   crowdPreference: "I'm comfortable with small groups",
  //   playpreferences: "I'm comfortable in any crowd",
  //   locationPreference: "Backyard/Home playdate",
  //   describe: "Type your Response",
  // };

  const url = getImageUrl();
  const userImage = url + userProfile?.data?.image;

  const petImage = url + petProfile?.data?.image;

  if (isFetchingProfile || isFetchingPetProfile) {
    return <Loader className={"h-screen"} />;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* My Profile Section */}
      {userProfile?.data?.userId?._id ? (
        <div className="flex-1  p-6 ">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          <div className="flex items-center mb-6">
            <Image
              loading="lazy"
              src={userImage}
              alt="Profile"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-20 object-cover aspect-square rounded-full ring-1 ring-[#F88D58] mr-4"
            />
            <h3 className="text-xl font-semibold">{userProfile?.data?.name}</h3>
            <div className="flex items-center gap-1 ml-2">
              {userProfile?.data?.userId?.isSupported && (
                <Tooltip title="Woof Spot Supporter">
                  <Image
                    loading="lazy"
                    src={WoofSupporter}
                    className="size-5"
                    width={1000}
                    height={1000}
                    alt="WoofSupporter"
                  />
                </Tooltip>
              )}
              {userProfile?.data?.userId?.isHero && (
                <Tooltip title="Woof Spot Hero">
                  <Image
                    loading="lazy"
                    src={WoofHero}
                    className="size-5"
                    width={1000}
                    height={1000}
                    alt="WoofHero"
                  />
                </Tooltip>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                readOnly
                className="input input-bordered w-full bg-gray-100"
                value={userProfile?.data?.address}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile no
              </label>
              <input
                type="tel"
                readOnly
                className="input input-bordered w-full bg-gray-100"
                value={userProfile?.data?.mobile}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                readOnly
                className="input input-bordered w-full bg-gray-100"
                value={userProfile?.data?.email}
              />
            </div>

            <div className="text-end">
              <button
                onClick={toggleEditProfile}
                className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none  mt-4 w-fit "
              >
                Edit
              </button>
            </div>
            {profileEdit && (
              <div className="inset-0 fixed flex justify-center items-center bg-black/20 z-50 ">
                <EditProfile
                  toggleEditProfile={toggleEditProfile}
                  profileEdit={profileEdit}
                  setProfileEdit={setProfileEdit}
                  userProfile={userProfile}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1  p-6 h-screen">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          <p className="text-2xl font-bold mb-6">
            No Profile Found, Please Create your own Profile
          </p>
          <button
            onClick={toggleCreateProfile}
            className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none w-full mt-4"
          >
            Create Profile
          </button>
          {createUserProfile && (
            <div className="inset-0 overflow-y-auto fixed flex justify-center items-center bg-black/20 z-50 ">
              <CreateUserProfile
                toggleCreateProfile={toggleCreateProfile}
                createUserProfile={createUserProfile}
                setCreateUserProfile={setCreateUserProfile}
                myProfileData={userData}
              />
            </div>
          )}
        </div>
      )}

      {/* Pets Profile Section */}
      {petProfile?.data?.userId?._id ? (
        <div className="flex-1  p-6 ">
          <h2 className="text-2xl font-bold mb-6">Pets Profile</h2>
          <div className="flex items-center mb-6">
            <Image
              loading="lazy"
              src={petImage}
              alt="Profile"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-20 object-cover aspect-square rounded-full ring-1 ring-[#F88D58] mr-4"
            />
            <h3 className="text-xl font-semibold">{petProfile?.data?.name}</h3>
            <div className="flex items-center gap-1 ml-2">
              {petProfile?.data?.userId?.isSupported && (
                <Tooltip title="Woof Spot Supporter">
                  <Image
                    loading="lazy"
                    src={WoofSupporter}
                    className="size-5"
                    width={1000}
                    height={1000}
                    alt="WoofSupporter"
                  />
                </Tooltip>
              )}
              {petProfile?.data?.userId?.isHero && (
                <Tooltip title="Woof Spot Hero">
                  <Image
                    loading="lazy"
                    src={WoofHero}
                    className="size-5"
                    width={1000}
                    height={1000}
                    alt="WoofHero"
                  />
                </Tooltip>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.address}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.age}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.gender}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.size}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Neutered/Spayed
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.neuteredSpayed}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How do you play?
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.howDoYouPlay}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you like a crowd?
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.doYouLikeACrowd}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Play/size preferences
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.playSizePreferences}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location preferences
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                readOnly
                value={petProfile?.data?.locationPreferences}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How would your Best Friend (aka human) describe you?
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                readOnly
                value={petProfile?.data?.description}
              />
            </div>
            <div onClick={toggleEditPetProfile} className="text-end">
              <button className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none w-fit mt-4">
                Edit
              </button>
            </div>

            {petProfileEdit && (
              <div className="inset-0 fixed  py-10 flex justify-center  bg-black/20 z-50 overflow-y-scroll ">
                <EditPetProfille
                  toggleEditPetProfile={toggleEditPetProfile}
                  petProfileEdit={petProfileEdit}
                  setPetProfileEdit={setPetProfileEdit}
                  myProfileData={userData}
                  petProfile={petProfile}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1  p-6 ">
          <h2 className="text-2xl font-bold mb-6">Pets Profile</h2>
          <p className="text-2xl font-bold mb-6">
            No Profile Found, Please Create your pet Profile
          </p>
          <button
            onClick={toggleCreatePetProfile}
            className="btn bg-[#F88D58] hover:bg-orange-600 text-white border-none w-full mt-4"
          >
            Create Pet Profile
          </button>
          {createPetProfile && (
            <div className="inset-0 overflow-y-auto fixed flex justify-center items-center bg-black/20 z-50 ">
              <CreatePetProfile
                toggleCreatePetProfile={toggleCreatePetProfile}
                createPetProfile={createPetProfile}
                setCreatePetProfile={setCreatePetProfile}
                myProfileData={userData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
