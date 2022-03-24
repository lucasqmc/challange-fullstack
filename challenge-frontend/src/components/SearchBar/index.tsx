import React, { FormEvent, useState, useEffect } from "react";
import { resourceLimits } from "worker_threads";
import { addressSearch } from '../../services/gecodeSearchSevice'

type Props = {
  clinics: any,
  setLocation: (value: any) => void;
  setOldLocation: (value: any) => void;
  setFilteredClinics: (value: any) => void;
}

export const SearchBar = (props: Props) => {
  const {clinics, setLocation, setFilteredClinics,setOldLocation} = props
  const [searchBarAddress, setSearchBarAddress ] = useState("");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    console.log('ENDEREÇO SEARCH BAR:',searchBarAddress)
    if(searchBarAddress.trim() === ''){
      setFilteredClinics([])
    }
    else {
      const geocodeApiResult = await addressSearch(searchBarAddress)
      console.log('Resultado requisição SEARCH BAR:', geocodeApiResult)
      const firstResult = geocodeApiResult.data.results[0]
      if(firstResult){
        const lat = firstResult.geometry.location.lat
        const long = firstResult.geometry.location.lng
        const clinicsOnCoordinate = clinics.filter((clinic: any) => {
          return Number(clinic.lat) === lat && Number(clinic.long) === long
        })
        console.log('CLinicas filtradas:',clinicsOnCoordinate)
        setFilteredClinics(clinicsOnCoordinate)
        setLocation({ lat: lat, lng: long })
        setOldLocation({ lat: lat, lng: long })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="page-form-search-bar">
      <div className="container" >
        <input
          type="text"
          className="text_input"
          id="address"
          placeholder="Endereço"
          value={searchBarAddress}
          onChange={(event) => setSearchBarAddress(event.target.value)}
        />
        <button type="submit" className="btn">BUSCAR</button>
      </div>
    </form>
  )
}