"use client"

import React, { useState } from 'react';
import Image from 'next/image';

type CarouselProps = {
  images: { image_url: string }[]; // Array of images
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" w-full max-w-md mx-auto">
      {images.length > 0 && (
        <Image



          fill
          src={images[currentIndex].image_url}
          alt={`Property Image ${currentIndex + 1}`}

          className=" hover:scale-105 transition duration-1000 object-cover  h-full w-full">
        </Image>

      )}
      <button
        onClick={prevImage}
        className="absolute h-10 w-10 left-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-center bg-white hover:bg-white/80 p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute h-10 w-10 right-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-center bg-white hover:bg-white/80 p-2 rounded-full"
      >
        &gt;
      </button>
      <div className="absolute top-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Carousel;