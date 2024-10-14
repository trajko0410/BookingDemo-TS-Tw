"use client"

import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import PropertylistItem from "./PropertyItem"
import apiService from "@/app/services/apiService"

import useSearchModal from "@/app/hooks/useSearchModal"

export type ImageType = {
  image_url: string;  // The correct type of image
};


export type PropertyType = {
  id: string,
  title: string,
  price_per_night: number,
  is_favorite: boolean,
  images: ImageType[],
}

interface PropertyListProps {
  landlord_id?: string | null
  favorites?: boolean | null
}


const Propertylist: React.FC<PropertyListProps> = ({ landlord_id, favorites }) => {

  const zusSearchModal = useSearchModal()
  const params = useSearchParams()

  const country = zusSearchModal.query.country;
  const numGuests = zusSearchModal.query.guests;

  const checkinDate = zusSearchModal.query.checkIn;
  const checkoutDate = zusSearchModal.query.checkOut;
  const category = zusSearchModal.query.category;

  //console.log('searchQUery:', zusSearchModal.query);


  const [propertiesList, setPropertiesList] = useState<PropertyType[]>([])

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = propertiesList.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite

        if (is_favorite) {
          console.log("add to favorite")
        } else {
          console.log("remove")
        }
      }
      return property
    })

    setPropertiesList(tmpProperties)
  }


  const getProperties = async () => {
    let url = '/api/properties/'

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`
    } else if (favorites) {
      url += `?is_favorites=true`;
    } else {

      let urlQuery = '';

      if (country) {
        urlQuery += '&country=' + country
      }

      if (numGuests) {
        urlQuery += '&numGuests=' + numGuests
      }



      if (category) {
        urlQuery += '&category=' + category
      }

      if (checkinDate) {
        urlQuery += '&checkin=' + format(checkinDate, 'yyyy-MM-dd')
      }

      if (checkoutDate) {
        urlQuery += '&checkout=' + format(checkoutDate, 'yyyy-MM-dd')
      }

      if (urlQuery.length) {
        //console.log('Query:', urlQuery);

        urlQuery = '?' + urlQuery.substring(1);//satvimo ? ako nije pstavlejno i mena & pa moze biti prazno

        url += urlQuery;
      }
    }

    const tmpProperties = await apiService.get(url)

    console.log(tmpProperties, "TMP")


    setPropertiesList(tmpProperties.data.map((property: PropertyType) => {
      // Mark as favorite based on the favorites array
      property.is_favorite = tmpProperties.favorites.includes(property.id);
      return property;
    }));

  }


  useEffect(() => {
    getProperties()
  }, [category, zusSearchModal.query, params, favorites])


  return (
    <>
      {propertiesList.map((property) => {
        return (
          <PropertylistItem
            key={property.id}
            properties={property}
            markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
          />
        )
      })}

    </>
  )
}

export default Propertylist