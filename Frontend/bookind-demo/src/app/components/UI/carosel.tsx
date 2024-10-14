'use client'

import { useState, useEffect } from 'react';

import BNBimage from "../../../../public/45450056.jpeg"
import CottangesImage from "../../../../public/45450074.jpeg"
import CabinsImage from "../../../../public/52979454.jpeg"
import HotelsImage from "../../../../public/57584488.jpeg"
import VilasImage from "../../../../public/100235855.jpeg"
import ApartmentsImage from "../../../../public/119467716.jpeg"

import Image from 'next/image';

import useSearchModal, { SearchQuery } from '@/app/hooks/useSearchModal';

const Carousel = () => {
  const searchModal = useSearchModal()

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(4); // Default to 4 images

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [category, setCategory] = useState(searchModal.query.category);


  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,

      category: _category
    }

    searchModal.setQuery(query);
  }




  const images = [
    { src: BNBimage, name: "BNB", serachParams: "bnb" },
    { src: CottangesImage, name: "Cottages", serachParams: "cottages" },
    { src: CabinsImage, name: "Cabins", serachParams: "cabins" },
    { src: HotelsImage, name: "Hotels", serachParams: "hotel" },
    { src: VilasImage, name: "Villas", serachParams: "villas" },
    { src: ApartmentsImage, name: "Apartments", serachParams: "apartments" },
  ];

  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth < 1024) {
        setImagesPerView(2);
      } else {
        setImagesPerView(4);
      }
    };
    // Set the initial value based on screen size
    updateImagesPerView();

    // Listen for window resize to update the number of images per view
    window.addEventListener('resize', updateImagesPerView);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateImagesPerView);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - imagesPerView : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= images.length - imagesPerView ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-[1500px] mx-auto  overflow-hidden mt-4  px-2 relative group">


      {/* Carousel Items */}
      <div
        className="flex align-center transition-transform duration-500 mb-12 mt-6 lg:gap-5 gap-4"
        style={{ transform: `translateX(-${currentIndex * (102 / imagesPerView)}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className={`lg:w-[24%] w-[49%] h-64 flex-shrink-0 ${category === image.serachParams ? "border-4 border-gold rounded-xl" : "border-2 border-transparent"} transition duration-300`} onClick={() => _setCategory(image.serachParams)}>

            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              className={`object-cover w-full h-full rounded-lg mx-auto shadow-xl transition duration-300 ease-in-out hover:scale-105  ${isButtonHovered ? 'lg:blur-sm' : ''}`}

            />

            <h2 className='ml-2 font-bluesans font-semibold text-xl mt-4'><span className="inline-block relative">{image.name}
              <span className={`${category === image.serachParams ? "block h-[4px] bg-gold rounded-full -mt-1" : ""}`}></span></span></h2>
          </div>

        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className="absolute h-10 w-10 left-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-center bg-white hover:bg-white/80 p-2 rounded-full "
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={goToNext}
        className="absolute h-10 w-10 right-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-center bg-white hover:bg-white/80 p-2 rounded-full"
      >
        &gt;
      </button>


    </div>
  );
};

export default Carousel;