import React, { FormEvent, useState, useEffect } from "react";
import { resourceLimits } from "worker_threads";
import { addressSearch } from '../../services/gecodeSearchSevice'

type Props = {
  clinics: any,
  setLocation: (value: any) => void;
  setFilteredClinics: (value: any) => void;
}

export const SearchBar = (props: Props) => {
  const {clinics, setLocation, setFilteredClinics} = props
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
      const filteredClinics: any[] = []
      if(firstResult){
        geocodeApiResult.data.results.forEach((result:any) => {
          const foundClinic = clinics.find((clinic:any) => {
            const lat = result.geometry.location.lat
            const long = result.geometry.location.lng
            return Number(clinic.lat) === lat && Number(clinic.long) === long
          })
          if(foundClinic)filteredClinics.push(foundClinic)
        })
        console.log('CLinicas filtradas:',filteredClinics)
        setFilteredClinics(filteredClinics)
        setLocation({ lat: firstResult.geometry.location.lat, lng: firstResult.geometry.location.lng })
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