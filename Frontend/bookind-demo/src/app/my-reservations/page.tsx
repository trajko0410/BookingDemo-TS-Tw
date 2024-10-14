import Link from "next/link"
import Image from "next/image"

import apiService from "../services/apiService"
import defaultPhoto from "../../../public/empty.jpg"
import { getUserId } from "../lib/auth"


const MyReservationPage = async () => {
  const userId = await getUserId()

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    )
  }
  const reservations = await apiService.get("/api/auth/my-reservations/")

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h2 className="my-6 text-2xl text-left w-full">
        My current reservations on&nbsp;
        <span className="inline-block relative">Booking.com!
          <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
      </h2>
      <div className="space-y-4">
        {reservations.map((reservation: any) => {
          const propertyImages = reservation.property.images;
          const firstImage = propertyImages.length > 0 ? propertyImages[0].image_url : defaultPhoto;
          return (
            <div key={reservation.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    fill
                    src={firstImage}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                <p className="mb-2"><strong>Check in date:</strong> {reservation.start_date}</p>
                <p className="mb-2"><strong>Check out date:</strong> {reservation.end_date}</p>

                <p className="mb-2"><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>

                <Link
                  href={`/property/${reservation.property.id}`}
                  className="mt-6 inline-block cursor-pointer py-4 px-6 bg-booking hover:bg-bookingLight transition duration-300 text-white rounded-xl"
                >
                  Go to property
                </Link>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}

export default MyReservationPage