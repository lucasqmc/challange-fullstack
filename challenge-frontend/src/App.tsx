import "leaflet/dist/leaflet.css";
import React, { FormEvent, useState, useEffect } from "react";
import { MapContainer, Marker,TileLayer, useMap} from "react-leaflet";
import Leaflet from "leaflet";
import mapPin from "./pin.svg";
import { addressSearch } from './services/gecodeSearchSevice'
import { addressComponentExtractor } from './helpers/addressComponentExtractor'
import ClinicService from "./services/clinicService"
import { ClinicCard } from "./components/ClinicCard"
import { SearchBar } from "./components/SearchBar"
import "./App.css";

const initialPosition = { lat: -23.685, lng: -46.521 };

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

type ClinicAddress = {
  address_type: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  country: string;
  lat: string;
  long: string;
};

type ClinicCardInfo = {
  name: string,
  address_type: string,
  lat: string,
  long:string,
  neighborhood:string, 
}

function App() {
  const [clinics, setClinics] = useState<Array<ClinicAddress>>([])
  const [filteredClinics, setFilteredClinics] = useState<Array<ClinicCardInfo>>([])
  const [position, setPosition] = useState(initialPosition);
  const [clinicAddress, setClinicAddress] = useState<ClinicAddress | null>(null);
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [addressLat, setAddressLat] = useState("");
  const [addressLong, setAddressLong] = useState("");
  const [location, setLocation] = useState(initialPosition);
  const [oldLocation, setOldLocation] = useState(initialPosition);
  
  async function getClinics() {
    ClinicService.getClinics().then(result => {
      setClinics(result.data)
    })
  }

  useEffect(() => {
    getClinics()
    setAddressLat('')
    setAddressLong('')
  },[])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!address || !name || !cnpj || !addressLong || !addressLat) return;
    const clinicRequestObject = {
      "name": name,
      "cnpj": cnpj,
      "address_type": clinicAddress?.address_type,
      "number": clinicAddress?.number,
      "neighborhood": clinicAddress?.neighborhood,
      "complement": clinicAddress?.complement,
      "city": clinicAddress?.city,
      "state": clinicAddress?.state,
      "country": clinicAddress?.country,
      "lat": clinicAddress?.lat ,
      "long": clinicAddress?.long
    }
    const requestResult =  await ClinicService.createClinic(clinicRequestObject)
    if(requestResult.status == 201) {
      getClinics()
      clearForm()
    }
  }

  function ChangeMapView({coords} : {coords:any}) {
    
    const map = useMap();
    if(JSON.stringify(coords) != JSON.stringify(oldLocation))map.setView(coords, 20);
    return null;
  }

  async function clearForm() {
    setAddressLat('')
    setAddressLong('')
    setClinicAddress(null)
    setName('')
    setCnpj('')
    setAddress('')
    setFilteredClinics([])
  }

  async function searchAddressOnRegister() {
    if (!address) return;
    const geocodeApiResult = await addressSearch(address)
    const firstResult = geocodeApiResult.data.results[0]
    if(firstResult){
      setAddressLat(firstResult.geometry.location.lat.toString())
      setAddressLong(firstResult.geometry.location.lng.toString())
    }

    setClinicAddress({
      address_type: addressComponentExtractor(firstResult,'route'),
      number: addressComponentExtractor(firstResult,'street_number'),
      neighborhood: addressComponentExtractor(firstResult,'sublocality'),
      complement: addressComponentExtractor(firstResult,'postal_code'),
      city: addressComponentExtractor(firstResult,'administrative_area_level_2'),
      state: addressComponentExtractor(firstResult,'administrative_area_level_1'),
      country: addressComponentExtractor(firstResult,'country'),
      lat: firstResult.geometry.location.lat.toString(),
      long: firstResult.geometry.location.lng.toString(),
    })
  }

  return (
    
    <div id="page-map">

      <SearchBar  clinics={clinics} setLocation={setLocation} setOldLocation={setOldLocation} setFilteredClinics={setFilteredClinics}></SearchBar>

      <form onSubmit={handleSubmit} className="page-form">
        <fieldset>
          <legend>Cadastro de clinica</legend>
          <div className="input-block">
            <input
              id="name"
              placeholder="Nome da clinica"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-block">
            <input
              id="cnpj"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
            />
          </div>
          <div className="container" >
            <input
             type="text" 
             className="text_input"
             id="address"
             placeholder="Endereço"
             value={address}
             onChange={(event) => setAddress(event.target.value)}
            />
            <div  onClick={searchAddressOnRegister} className="form-search-btn">BUSCAR</div>
          </div>
          <div className="coordinates-container" >
            <input
             type="text" 
             className="coordinate_text_input"
             id="address"
             placeholder="lat"
             value={addressLat}
             onChange={(event) => setAddressLat(event.target.value)}
             disabled
            />
          <input
             type="text" 
             className="coordinate_text_input"
             id="address"
             placeholder="long"
             value={addressLong}
             onChange={(event) => setAddressLong(event.target.value)}
             disabled
            />
          </div>
        </fieldset>
        <button className="confirm-button" type="submit">
          Cadastrar
        </button>
      </form>
      {
        filteredClinics[0] && 
        (
          <ClinicCard
            name={filteredClinics[0]?.name}
            address_type={filteredClinics[0]?.address_type}
            lat={filteredClinics[0]?.lat}
            long={filteredClinics[0]?.long}
            neighborhood={filteredClinics[0]?.neighborhood}
            position='left'
          />
        )
      }
      {
        filteredClinics[1] &&
        (
          <ClinicCard
            name={filteredClinics[1]?.name}
            address_type={filteredClinics[1]?.address_type}
            lat={filteredClinics[1]?.lat}
            long={filteredClinics[1]?.long}
            neighborhood={filteredClinics[1]?.neighborhood}
            position='center'
          />
        )
      }
      {
        filteredClinics[2] &&
        (
          <ClinicCard
            name={filteredClinics[2]?.name}
            address_type={filteredClinics[2]?.address_type}
            lat={filteredClinics[2]?.lat}
            long={filteredClinics[2]?.long}
            neighborhood={filteredClinics[2]?.neighborhood}
            position='right'
          />
        )
      }
      <MapContainer
        center={initialPosition}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />

        {location !== oldLocation && (
            <ChangeMapView coords={location} />
          )
        }

        { filteredClinics.length === 0 && clinics.map((clinic: any) => {
          return (
            <Marker
              key={`f-${clinic.id}`}
              icon={mapPinIcon}
              position={{ lat: Number(clinic.lat), lng: Number(clinic.long) }}
            />
          )
        })}

        {filteredClinics.length > 0 && filteredClinics.map((clinic: any) => {
          return (
            <Marker
              key={`c-${clinic.id}`}
              icon={mapPinIcon}
              position={{ lat: Number(clinic.lat), lng: Number(clinic.long) }}
            />
          )
        })}
      </MapContainer>
    </div>
  );
}
export default App;