import Logo from "../UI/Logo";
import ListProperty from "./ListProperty";
import UserNavigation from "./UserNavigation";


const MainNavBar = async () => {

  return (
    <div className="bg-booking">
      <div className="p-2 flex justify-between mx-auto h-16 items-center max-w-[1500px] gap-4">

        <Logo />

        <div className="flex items-center gap-4">
          <ListProperty />
          <UserNavigation />
        </div>
      </div>

    </div >
  )
}

export default MainNavBar

