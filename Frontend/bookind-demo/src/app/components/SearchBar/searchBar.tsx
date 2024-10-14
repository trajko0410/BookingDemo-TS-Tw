"use client";

import { useState, useEffect } from "react";
import useSearchModal from "@/app/hooks/useSearchModal";

const SearchBar = () => {
  const zusSearchModal = useSearchModal();

  const [location, setLocation] = useState<string>("Wanted Location");
  const [checkInDate, setCheckInDate] = useState<string>("Add dates");
  const [checkOutDate, setCheckOutDate] = useState<string>("Add dates");
  const [guests, setGuests] = useState<any>("Add guests");

  const query = zusSearchModal.query;

  useEffect(() => {
    // Safely handle the possible Date objects in the query
    setLocation(query.country || "Wanted Location");

    // Convert dates to string format if they are Date objects
    setCheckInDate(query.checkIn ? formatDate(query.checkIn) : "Add dates");
    setCheckOutDate(query.checkOut ? formatDate(query.checkOut) : "Add dates");
    setGuests(query.guests || "Add guests");
  }, [query]);

  // Function to format Date objects
  const formatDate = (date: Date): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleDateString(); // Adjust the format as needed
    }
    return "Invalid date"; // Fallback for invalid dates
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <div
        className="bg-gold lg:-mt-8 -mt-4 ml-20 mr-20 rounded-lg relative p-1 shadow-xl"
        onClick={() => zusSearchModal.open("location")}
      >
        <div className="flex lg:flex-row flex-col items-center justify-between gap-1">
          {/* First Div - Location */}
          <div className="cursor-pointer h-[48px] lg:h-[60px] flex-grow lg:w-[50%] min-w-[150px] px-8 flex flex-col justify-center rounded-lg bg-gray-100 w-full">
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm">{location}</p>
          </div>

          {/* Remaining Divs - Check In, Check Out, Who */}
          <div className="cursor-pointer h-[48px] lg:h-[60px] flex-grow lg:flex-[1] min-w-[130px] px-8 flex flex-col justify-center rounded-lg bg-gray-100 w-full">
            <p className="text-xs font-semibold">Check in</p>
            <p className="text-sm">{checkInDate}</p>
          </div>

          <div className="cursor-pointer h-[48px] lg:h-[60px] flex-grow lg:flex-[1] min-w-[130px] px-8 flex flex-col justify-center rounded-lg bg-gray-100 w-full">
            <p className="text-xs font-semibold">Check out</p>
            <p className="text-sm">{checkOutDate}</p>
          </div>

          <div className="cursor-pointer h-[48px] lg:h-[60px] flex-grow lg:flex-[1] min-w-[100px] px-8 flex flex-col justify-center rounded-lg bg-gray-100 w-full">
            <p className="text-xs font-semibold">Guests</p>
            <p className="text-sm lg:text-center">{guests}</p>
          </div>

          {/* Search Button */}
          <div className="cursor-pointer h-[48px] lg:h-[60px] px-8 flex flex-col justify-center text-center rounded-lg bg-bookingLight hover:bg-booking transition lg:w-auto w-full text-white">
            Search
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
