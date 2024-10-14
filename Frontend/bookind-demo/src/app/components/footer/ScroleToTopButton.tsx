// components/ScrollToTopButton.tsx

"use client"; // Indicate that this component uses client-side features
import { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 flex items-center justify-center p-3 bg-booking text-white rounded-full shadow-xl hover:bg-bookingLight transition duration-500 h-[50px] w-[50px] hover:scale-105"
        aria-label="Scroll to top"
      >
        <span className="text-2xl ">↑</span> {/* Added text-2xl for larger arrow */}
      </div>
    )
  );
};

export default ScrollToTopButton;
