"use client"

import Select from "react-select"
import useCountries from "@/app/hooks/useCountries"

export type SelectCountryValueType = {
  value: string,
  label: string,
}

interface SelectCountryProps {
  value?: SelectCountryValueType
  onChange: (value: SelectCountryValueType) => void
}

const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <Select
      isClearable
      placeholder="Anywhere"
      options={getAll()}
      value={value} //sending up
      onChange={(value) => onChange(value as SelectCountryValueType)} //sending up data
      className="mb-6 "
    >

    </Select>
  )
}

export default SelectCountry