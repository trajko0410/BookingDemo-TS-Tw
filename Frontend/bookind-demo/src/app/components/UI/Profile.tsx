"use client";

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import Image from "next/image";
import { UserInfoType } from "@/app/my-properties/page";
import apiService from '@/app/services/apiService';
import defaultPhoto from "../../../../public/empty.jpg"; // Make sure this path is correct

interface ProfileProps {
  userInfo: UserInfoType;
}

const Profile: React.FC<ProfileProps> = ({ userInfo: initialUserInfo }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>(initialUserInfo);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageUrl = uploadedImageUrl || (userInfo.avatar ? "http://127.0.0.1:8000/" + userInfo.avatar : defaultPhoto.src);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];

      // Create a temporary URL for the image preview
      const tempImageUrl = URL.createObjectURL(tmpImage);
      setUploadedImageUrl(tempImageUrl); // Show the temporary preview
      uploadImage(tmpImage);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await apiService.post("api/auth/uploadavatar", formData);

      if (response.success) {
        //console.log('Upload successful:', response);

        // Dynamically update the userInfo with the new avatar URL
        setUserInfo((prev) => ({
          ...prev,
          avatar: response.avatar_url, // Update the avatar in userInfo
        }));
        setUploadedImageUrl(null);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error instanceof Error ? error.message : error);
    }
  };

  return (
    <div className="rounded-lg mt-6 border-[4px] border-gold shadow-xl p-8 bg-white">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0 w-200 h-200">
          <Image
            src={imageUrl}
            alt="User Avatar"
            width={200}
            height={200}
            className="rounded-full object-cover w-[100px] h-[100px] shadow-md"
          />
        </div>

        <div className="flex flex-col text-center md:text-left">
          <h2 className=" text-3xl font-bold text-gray-900  mb-2 w-fit ">

            <span className="inline-block relative">{userInfo.username}
              <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
          </h2>

          <p className="text-lg text-gray-500 mb-4">{userInfo.email}</p>

          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Upload an avatar to build a more personal connection with potential renters. A profile with a photo helps increase trust and transparency, making it easier to engage with others. Show who you are and start connecting today!
          </p>

          <form>
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-4 py-2 w-full bg-booking text-white rounded-md hover:bg-bookingLight transition duration-300"
            >
              Upload Avatar
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={setImage}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
