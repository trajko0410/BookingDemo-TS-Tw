"use client";

import { useEffect, useState } from "react"
import { differenceInDays, eachDayOfInterval, format } from "date-fns"

import DatePicker from "../UI/Calender"
import useLoginModal from "../../hooks/useLoginModal"
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection"
}

export type Property = {
  id: string,
  guests: number,
  price_per_night: number,
}

interface ReservationSideBarProps {
  userId: string | null
  property: Property
}

const ReservationSideBar: React.FC<ReservationSideBarProps> = ({ userId, property }) => {
  const zusLogInModal = useLoginModal()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<any>(initialDateRange)
  const [nights, setNights] = useState<number>(1)
  const [fee, setFee] = useState<number>(0)
  const [guests, setGusets] = useState<string>("1")
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [bookedDates, setBookedDates] = useState<Date[]>([])

  const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1) //[1,2,3,4...]

  const bookHandler = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData
        formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
        formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
        formData.append('number_of_nights', nights.toString());
        formData.append('total_price', totalPrice.toString());
        formData.append('guests', guests);

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`, "formdata");
        });

        const response = await apiService.post(`/api/properties/${property.id}/book/`, formData)

        if (response.success) {
          console.log('Booking successful')
          router.push("/")

        } else {
          console.log('Something went wrong...');
        }
      }
    } else {
      zusLogInModal.open()
    }
  }

  const _setDateRange = (selections: any) => {
    const newStartDate = new Date(selections.startDate)
    const newEndDate = new Date(selections.endDate)

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  const getReservations = async () => {
    const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

    let dates: Date[] = []
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date)
      })

      dates = [...dates, ...range]
    })
    setBookedDates(dates)
  }

  useEffect(() => {
    getReservations()
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      )
      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100 * 5);
        setFee(Number(_fee.toFixed(2))); // Round fee to 2 decimal places
        setTotalPrice(Number((dayCount * property.price_per_night + _fee).toFixed(2))); // Round totalPrice to 2 decimal places
        setNights(dayCount)
      } else {
        const _fee = (property.price_per_night / 100) * 5;
        setFee(Number(_fee.toFixed(2))); // Round fee to 2 decimal places
        setTotalPrice(Number((property.price_per_night + _fee).toFixed(2))); // Round totalPrice to 2 decimal places
        setNights(1)
      }
    }
  }, [dateRange])

  return (
    <aside className="mt-6 p-6 lg:col-span-2 col-span-1 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

      <DatePicker
        value={dateRange}
        onChange={(value) => _setDateRange(value.selection)}
        bookedDates={bookedDates}
      ></DatePicker>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="block font-bold text-xs mb-2">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGusets(e.target.value)}
          className="w-full -m-1 text-xm">
          {guestsRange.map(guest => (
            <option key={guest} value={guest}>{guest}</option>
          ))}
        </select>
      </div>
      <div
        onClick={bookHandler}
        className="w-full mb-6 py-6 text-center bg-booking rounded-xl hover:bg-bookingLight transition duration-300 text-white">
        Book
      </div>
      <div className="mb-4 flex justify-between align-center">
        <p>${property.price_per_night} * {nights} nights</p>
        <p>${(property.price_per_night * nights).toFixed(2)}</p> {/* Round total */}
      </div>
      <div className="mb-4 flex justify-between align-center">
        <p>Airbnb fee</p>
        <p>${fee}</p> {/* Rounded fee */}
      </div>
      <hr />
      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>${totalPrice}</p> {/* Rounded total price */}
      </div>
    </aside>
  )
}

export default ReservationSideBar
