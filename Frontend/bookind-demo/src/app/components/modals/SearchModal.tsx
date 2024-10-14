'use client';

import Modal from "./Modal";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../UI/Calender";
import CustomButton from "../UI/CustomButton";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectCountry, { SelectCountryValueType } from "../UI/SelectCountry";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const SearchModal = () => {
  let content = (<></>);

  const zussearchModal = useSearchModal();


  const [numGuests, setNumGuests] = useState<string>('1');
  const [country, setCountry] = useState<SelectCountryValueType>();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //
  //

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      country: country?.label,
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      category: ''
    }

    zussearchModal.setQuery(newSearchQuery);
    zussearchModal.close();
  }

  //
  // Set date range

  const _setDateRange = (selection: Range) => {
    if (zussearchModal.step === 'checkin') {
      zussearchModal.open('checkout');
    } else if (zussearchModal.step === 'checkout') {
      zussearchModal.open('details');
    }

    setDateRange(selection);
  }

  //
  // Contents
  //Countries
  const contentLocation = (
    <>
      <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

      <SelectCountry
        value={country}
        onChange={(value) => setCountry(value as SelectCountryValueType)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="Check in date ->"
          onClick={() => zussearchModal.open('checkin')}
        />
      </div>
    </>
  )

  //CHECKIN
  const contentCheckin = (
    <>
      <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Location"
          onClick={() => zussearchModal.open('location')}
        />

        <CustomButton
          label="Check out date ->"
          onClick={() => zussearchModal.open('checkout')}
        />
      </div>
    </>
  )

  //CHECKOUT
  const contentCheckout = (
    <>
      <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check in date"
          onClick={() => zussearchModal.open('checkin')}
        />

        <CustomButton
          label="Details ->"
          onClick={() => zussearchModal.open('details')}
        />
      </div>
    </>
  )

  //DETAILS
  const contentDetails = (
    <>
      <h2 className="mb-6 text-2xl">Details</h2>

      <div className="space-y-4">
        <div className="space-y-4">
          <label>Number of guests:</label>
          <input
            type="number"
            min="1"
            value={numGuests}
            placeholder="Number of guests..."
            onChange={(e) => setNumGuests(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-4">
        <CustomButton
          label="<- Check out date"
          onClick={() => zussearchModal.open('checkout')}
        />

        <CustomButton
          label="Search"
          onClick={closeAndSearch}
        />
      </div>
    </>
  )

  if (zussearchModal.step == 'location') {
    content = contentLocation;
  } else if (zussearchModal.step == 'checkin') {
    content = contentCheckin;
  } else if (zussearchModal.step == 'checkout') {
    content = contentCheckout;
  } else if (zussearchModal.step == 'details') {
    content = contentDetails;
  }

  return (
    <Modal
      label="Search"
      content={content}
      close={zussearchModal.close}
      isOpen={zussearchModal.isOpen}
    />
  )
}

export default SearchModal;