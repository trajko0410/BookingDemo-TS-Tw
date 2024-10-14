import ScrollToTopButton from './ScroleToTopButton'; // Ensure to import your ScrollToTopButton component

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-4 flex flex-col justify-between min-h-[100px]">
      <div className="container mx-auto flex flex-col items-center text-center mb-4">
        <h2 className="text-lg font-bold">Booking.com</h2>
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>

      {/* Email Section */}
      <div className="bg-gray-900 p-2 flex justify-center items-center text-center lg:flex-row md:flex-row flex-col">
        <p className="text-sm text-gray-400"> Email me at </p>&nbsp;
        <a
          href="mailto:filiptrajkovic04@gmail.com"
          className="underline cursor-pointer text-gray-400 hover:text-gray-300 transition duration-300 lg:mt-0 md:mt-0 -mt-6 mr-1"
        >
          filiptrajkovic04@gmail.com
        </a>

        <p className="text-sm text-gray-400">
          this is just a demo website.
        </p>
      </div>

      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
