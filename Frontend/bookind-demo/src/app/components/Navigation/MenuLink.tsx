"use client"

interface MenuLinkProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick, isActive }) => {
  return (
    <div
      className={`px-5 py-4 hover:bg-gray-100 transition cursor-pointer rounded-lg ${label === "LogOut" ? "text-red-400" : "text-black"}   ${isActive ? "bg-gray-200/80 font-bold transition duration-300" : "hover:bg-gray-100"} transition duration-300 `}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default MenuLink