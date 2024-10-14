import Image from "next/image"
import { useRouter } from "next/navigation"
import { PropertyType } from "./PropertyList"

import FavoriteButton from "../UI/favoriteButton"
import useUserId from "@/app/hooks/useUserId"

import defaultPhoto from "../../../../public/empty.jpg"


interface PropertyProps {
  properties: PropertyType
  markFavorite?: (is_favorite: boolean) => void
  userId?: string | null
}

const PropertyItem: React.FC<PropertyProps> = ({ properties, markFavorite }) => {
  const router = useRouter()
  const zusUserId = useUserId()


  return (
    <>
      <div className="cursor-pointer mb-8">
        <div

          className="relative overflow-hidden aspect-square rounded-xl shadow-xl">
          <Image
            onClick={() => router.push(`/property/${properties.id}`)}
            fill
            src={properties.images && properties.images.length > 0 ? properties.images[0].image_url : defaultPhoto}
            alt="property-image"
            sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
            className="hover:scale-110 object-cover transition duration-1000 h-full w-full">
          </Image>
          {zusUserId.userId !== null && (
            <div className="z-100">

              {markFavorite && (
                <FavoriteButton
                  id={properties.id}
                  is_favorite={properties.is_favorite}
                  markFavorite={(is_favorite) => markFavorite(is_favorite)}

                />
              )}
            </div>
          )}

        </div>

        <div className="mt-2">
          <p className="text-lg font-bold">{properties.title}</p>
        </div>
        <div className="mt-2 ">
          <p className="text-sm text-gray-500"><strong>${properties.price_per_night}</strong> per night</p>
        </div>


      </div>
    </>
  )
}

export default PropertyItem