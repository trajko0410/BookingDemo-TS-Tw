
import HeroSection from "./components/UI/Hero"
import SearchBar from "./components/SearchBar/searchBar";
import Carousel from "./components/UI/carosel";
import PropertyList from "./components/Property/PropertyList";

export default function Home() {
  return (
    <main className=" mx-auto ">
      <HeroSection />
      <section className="max-w-[1500px] mx-auto">
        <SearchBar />
        <Carousel />


        <div className=" mt-20 font-bluesans font-bold">
          <div className="ml-3 flex  flex-col">
            <h2 className="mb-2 w-fit text-2xl">
              Find the perfect property on&nbsp;
              <span className="inline-block relative">Booking.com!
                <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
            </h2>
            <p className="text-sm text-neutral-400 font-thin">
              From cheap hotels to luxury rooms and everything in between.
            </p>


          </div>

          <div className="mt-8 mx-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <PropertyList />
          </div>
        </div>
      </section>
    </main>
  );
}
