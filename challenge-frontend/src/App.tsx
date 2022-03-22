import "leaflet/dist/leaflet.css";

import React, { FormEvent, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";

import mapPin from "./pin.svg";

import "./App.css";

const initialPosition = { lat: -23.685, lng: -46.521 };

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

type Position = {
  longitude: number;
  latitude: number;
};

function App() {

  const [position, setPosition] = useState<Position | null>(null);

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [location, setLocation] = useState(initialPosition);


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!address || !name) return;

    setName("");
    setAddress(null);
    setPosition(null);
  }

  return (
    <div id="page-map">
      <main>
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
            <div className="input-block">
              <label htmlFor="address">Endereço</label>

            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Cadastrar
          </button>
        </form>
      </main>

      <MapContainer
        center={location}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />

        {position && (
          <Marker
            icon={mapPinIcon}
            position={[position.latitude, position.longitude]}
          ></Marker>
        )}

      </MapContainer>
    </div>
  );
}

export default App;