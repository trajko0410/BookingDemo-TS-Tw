import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  dataImages: File[];
  setDataImages: React.Dispatch<React.SetStateAction<File[]>>; // Updated setter type
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader = ({ dataImages, setDataImages, errors, setErrors }: ImageUploaderProps) => {

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      // Check if adding new files exceeds the limit of 10
      if (dataImages.length + selectedFiles.length > 10) {
        setErrors((prevErrors: string[]) => [
          ...prevErrors,
          'You can upload a maximum of 10 images.',
        ]);
        return;
      }

      setDataImages((prevImages: File[]) => [...prevImages, ...selectedFiles]);
      setErrors([]); // Clear errors on valid upload
    }
  };

  const removeImage = (index: number) => {
    setDataImages((prevImages: File[]) => prevImages.filter((_, i) => i !== index));
    setErrors([]); // Clear errors on image removal
  };

  return (
    <div className="pt-3 pb-6 space-y-4">
      <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={setImage}
        />
      </div>

      {dataImages.length > 0 ? (
        <div className="h-64 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Responsive grid */}
            {dataImages.map((image, index) => (
              <div key={index} className="relative w-full h-[150px]"> {/* Relative positioning for the button */}
                <div
                  onClick={() => removeImage(index)}

                  className="p-1 bg-black/50 z-30 absolute right-1 top-1 hover:bg-black/80 transition duration-300 rounded-full cursor-pointer"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <Image
                  fill
                  alt={`Uploaded image ${index + 1}`}
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 ml-1">No images uploaded yet.</p>
      )}
      {errors.map((error, index) => (
        <div
          key={index}
          className="p-5 mb-4 bg-red-400 text-red rounded-xl opacity-80"
        >
          {error}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
