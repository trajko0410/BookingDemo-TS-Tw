import Image from "next/image"

import PropertyList from "@/app/components/Property/PropertyList"
import apiService from "@/app/services/apiService"
import { getUserId } from "@/app/lib/auth"


const LandlordPage = async ({ params }: { params: { id: string } }) => {


  const landlords = await apiService.get(`/api/auth/${params.id}`)
  const userId = await getUserId()



  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-6 ">
      <div className="ml-3 flex  flex-col mb-6">
        <h2 className="mb-2 w-fit text-2xl">
          Find the perfect property on&nbsp;
          <span className="inline-block relative">Booking.com!
            <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
        </h2>
        <p className="text-sm text-neutral-400 font-thin">
          From cheap hotels to luxury rooms and everything in between.
        </p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-grey-300 shadow-xl">
            <Image
              src={"http://127.0.0.1:8000/" + landlords.avatar} //to env file this
              alt="Landlord pic"
              width={200}
              height={200}
              className="rounded-full w-[200px] h-[200px]"
            />

            <h1 className=" mt-6 text-2xl">{landlords.username}</h1>

            {userId != params.id &&
              <h2 className="mt-2">{landlords.email}</h2>
            }


          </div>

        </aside>
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6 grid grid-cols-1 md:grid-cols-3  gap-6">
          <PropertyList
            landlord_id={landlords.id}

          ></PropertyList>
        </div>
      </div>
    </main>
  )
}

export default LandlordPage