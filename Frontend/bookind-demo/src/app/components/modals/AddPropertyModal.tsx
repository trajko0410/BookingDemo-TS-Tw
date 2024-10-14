"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/usePropertyModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";

import CustomButton from "../UI/CustomButton";
import SelectCountry, { SelectCountryValueType } from "../UI/SelectCountry";
import ImageUploader from "../UI/imageUploader";


import apiService from "@/app/services/apiService";
import { reset } from "canvas-confetti";

interface CategoryOptionType {
  value: string;
  label: string;
}

const category: CategoryOptionType[] = [
  { value: "bnb", label: "BNB" },
  { value: "cottages", label: "Cottage" },
  { value: "cabins", label: "Cabin" },
  { value: "hotels", label: "Hotel" },
  { value: "villas", label: "Villa" },
  { value: "apartments", label: "Apartment" },
];

const AddPropertyModal = () => {
  const router = useRouter();
  const zusAddPropertyModal = useAddPropertyModal();
  const zusSuccessModal = useSuccessModal()

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  //setData STEP1
  const [dataCategory, setDataCategory] = useState<SingleValue<CategoryOptionType>>(null);
  const setCategory = (selectedOption: SingleValue<CategoryOptionType>) => {
    setDataCategory(selectedOption);
  };

  //STEP 2
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");

  //STEP 3
  const [dataPrice, setDataPrice] = useState("");
  const [dataGuests, setDataGuests] = useState("");

  //step 4
  const [dataCountry, setDataCountry] = useState<SelectCountryValueType>();

  //step 5 (Images)
  const [dataImages, setDataImages] = useState<File[]>([]);

  //RESET FORM DATA
  const resetFormData = () => {
    setDataCategory(null);
    setDataTitle("");
    setDataDescription("");
    setDataPrice("");
    setDataGuests("");
    setDataCountry(undefined);
    setDataImages([]);
    setCurrentStep(1); // Optionally reset to the first step
    setErrors([]); // Clear any errors
  };

  //submit
  const submitForm = async () => {
    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImages.length > 0
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory.value);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      dataImages.forEach((image) => {
        formData.append("images", image); // Use 'images[]' to handle multiple files
      });



      const response = await apiService.post("/api/properties/create/", formData);
      //console.log(response, "REs")

      if (response.success) {
        router.push("/?added=true");
        zusAddPropertyModal.close();
        zusSuccessModal.open()
        resetFormData()
      } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) => error);
        setErrors(tmpErrors);
      }
    }
  };

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>
          <Select value={dataCategory} onChange={setCategory} options={category} className="mb-6" />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe your place</h2>
          <input
            type="text"
            value={dataTitle}
            onChange={(e) => setDataTitle(e.target.value)}
            className="w-full p-4 border border-gray-600 rounded-xl mb-6"
            placeholder="Title"
          />
          <textarea
            value={dataDescription}
            onChange={(e) => setDataDescription(e.target.value)}
            className="w-full h-[200px] p-4 border border-gray-600 rounded-xl mb-6"
            placeholder="Description"
          />
          <div className="mt-4 space-y-4">
            <CustomButton
              label='Previous'
              className='mb-2 bg-black hover:bg-gray-800 transition duration-300'
              onClick={() => setCurrentStep(1)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
          </div>

        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>
          <input
            type="number"
            value={dataPrice}
            onChange={(e) => setDataPrice(e.target.value)}
            className="w-full p-4 border border-gray-600 rounded-xl mb-6"
            placeholder="Price per night"
          />
          <input
            type="number"
            value={dataGuests}
            onChange={(e) => setDataGuests(e.target.value)}
            className="w-full p-4 border border-gray-600 rounded-xl mb-6"
            placeholder="Maximum number of guests"
          />
          <div className="mt-4 space-y-4">
            <CustomButton
              label='Previous'
              className='mb-2 bg-black hover:bg-gray-800 transition duration-300'
              onClick={() => setCurrentStep(2)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
          </div>
        </>
      ) : currentStep === 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <SelectCountry value={dataCountry} onChange={setDataCountry} />
          <div className="mt-4 space-y-4">
            <CustomButton
              label='Previous'
              className='mb-2 bg-black hover:bg-gray-800 transition duration-300'
              onClick={() => setCurrentStep(3)}
            />
            <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <ImageUploader
            dataImages={dataImages}
            setDataImages={setDataImages}
            errors={errors}
            setErrors={setErrors}
          />
          <div className="mt-4 space-y-4">
            <CustomButton
              label='Previous'
              className='mb-2 bg-black hover:bg-gray-800 transition duration-300'
              onClick={() => setCurrentStep(4)}
            />
            <CustomButton label="Submit" onClick={submitForm} />
          </div>
        </>
      )}
    </>
  );

  return (
    <Modal
      isOpen={zusAddPropertyModal.isOpen}
      close={zusAddPropertyModal.close}
      label="Add property"
      content={content}
    />
  );
};

export default AddPropertyModal;
