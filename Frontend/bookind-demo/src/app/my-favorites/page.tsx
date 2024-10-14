import PropertyList from "../components/Property/PropertyList";
import { getUserId } from "../lib/auth";

const MyFavoritePage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12 flex justify-center items-center min-h-screen">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 flex flex-col items-center justify-center ">
      <h2 className="my-6 text-2xl text-left w-full">
        My favorite properties on&nbsp;
        <span className="inline-block relative">Booking.com!
          <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
      </h2>
      <p className="text-left w-full text-gray-600 mb-8">
        Welcome to your personalized favorites! Here you'll find all the properties you've loved and saved for future stays. Whether you're planning a vacation, a weekend getaway, or just browsing for inspiration, keep track of your top picks right here.
      </p>

      <p className="text-left w-full text-gray-600 mb-8">
        You can view your favorite properties, check availability, and make bookings when you're ready. Don't see what you're looking for? Use the search feature to discover more options and add them to your favorites list.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <PropertyList favorites={true} />
      </div>
    </main>
  );
};

export default MyFavoritePage;
