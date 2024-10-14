import PropertyList from "../components/Property/PropertyList"
import Profile from "../components/UI/Profile"

import { getUserId } from "../lib/auth"
import apiService from "../services/apiService"

export type UserInfoType = {
  id: string;
  username: string;
  avatar: string;
  email: string;
};


const MyPropertiesPage = async () => {
  const userId = await getUserId()
  const userInfo = await apiService.get(`/api/auth/${userId}`);

  console.log(userInfo, "info")




  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">

      <Profile userInfo={userInfo}>

      </Profile>
      <h2 className="mb-2 mt-6 w-fit text-2xl">
        Your curently active properties on&nbsp;
        <span className="inline-block relative">Booking.com!
          <span className="block h-[4px] bg-gold rounded-full -mt-1"></span></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <PropertyList landlord_id={userId} />
      </div>
    </main>
  )
}

export default MyPropertiesPage