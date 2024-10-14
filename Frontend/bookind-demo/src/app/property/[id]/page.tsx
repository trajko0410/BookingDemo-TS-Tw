import Image from "next/image"
import Link from "next/link"

import ReservationSideBar from "@/app/components/Property/ReservationSideBar"
import PropertyItemCarosel from "../../components/UI/PropertyItemCarosel"
import Comments from "../../components/comments/Coments"

import apiService from "@/app/services/apiService"
import { getUserId } from "@/app/lib/auth"

import CommentModal from "../../components/modals/CommentModal"

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {

  const property = await apiService.get(`/api/properties/${params.id}`)
  const userId = await getUserId()

  let user = null; // Initialize user as null

  // Fetch user details if userId exists
  if (userId) {
    user = await apiService.get(`/api/auth/${userId}`);
  } else {
    console.log("User needs to log in");
  }


  return (
    <>
      <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-6">
        <div className="w-full mb-4 h-[64vh] overflow-hidden rounded-xl relative">
          <PropertyItemCarosel images={property.images} />

        </div>


        <div className=" grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="py-6 pr-6 col-span-3">
            <h1 className="mb-4 w-fit text-4xl">
              <span className="inline-block relative">{property.title}
                <span className="block h-[5px] bg-gold rounded-full -mt-1"></span></span>
            </h1>
            <span className="mb-6 block text-lg text-gray-600">This property accommodates <span className="font-semibold">{property.guests} guests</span>.</span>

            <hr></hr>

            <Link
              href={`/landlord/${property.landlord.id}`}
              className="py-6 flex items-center space-x-4">

              <Image
                src={`${property.landlord.avatar}`}
                alt="Profile pic"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px]"
              />



              <p><strong>{property.landlord.username}</strong> is your host.</p>
            </Link>

            <hr></hr>
            <p className="mt-6 text-lg">{property.description}</p>


          </div>

          <ReservationSideBar property={property} userId={userId} >

          </ReservationSideBar>
        </div>

        <Comments property={property} user={user} />
      </main>
      <CommentModal propertyId={params.id} />
    </>
  )
}

export default PropertyDetailPage