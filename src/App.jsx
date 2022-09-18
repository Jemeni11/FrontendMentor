import { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Tooltip,
} from "react-leaflet";
import SearchArrow from "./assets/images/icon-arrow.svg";
import CustomMarkerIcon from "./assets/images/icon-location.svg";

const myIcon = L.icon({
  iconUrl: CustomMarkerIcon,
});

function LocationMarker({ position, ipaddress }) {
  const mapMe = useMap();
  mapMe.flyTo(position);

  return (
    <Marker position={position} icon={myIcon}>
      <Tooltip>IP Address {ipaddress} is located here.</Tooltip>
    </Marker>
  );
}

function App() {
  const [IPAddress, setIPAddress] = useState("8.8.8.8");
  const [fetchedAddressData, setFetchedAddressData] = useState({
    IPAddress: " - ",
    Location: " - ",
    Timezone: "- ",
    ISP: "- ",
  });
  const [position, setPosition] = useState({ lat: 37.38605, lng: -122.08385 });
  const IP_GEOLOCATION_API_KEY = import.meta.env.VITE_IP_GEOLOCATION_API_KEY;
  const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${IP_GEOLOCATION_API_KEY}&ipAddress=${IPAddress}`;

  const getIPAddressData = async () => {
    if (IPAddress.trim() === "") return;
    const res = await fetch(API_URL);
    if (res.ok) {
      const data = await res.json();
      setFetchedAddressData({
        IPAddress: data.ip,
        Location: `${data.location.city}, ${data.location.region}\n${data.location.postalCode}`,
        Timezone: `UTC ${data.location.timezone}`,
        ISP: data.isp,
      });
      setPosition({ lat: data.location.lat, lng: data.location.lng });
    } else {
      console.error(res.statusText);
      alert(`${res.statusText} error`);
    }
  };

  useEffect(() => {
    getIPAddressData();
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <p>IP Address Tracker</p>
        <div className="IP_InputContainer">
          <input
            type="text"
            name="IP_Input"
            id="IP_Input"
            value={IPAddress}
            onChange={(e) => setIPAddress(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          <button onClick={getIPAddressData}>
            <img src={SearchArrow} alt="Search Button" />
          </button>
        </div>
        <div className="IP_DetailsContainer">
          <div className="IP_Details">
            <div>
              <small>IP ADDRESS</small>
              <p>{fetchedAddressData.IPAddress}</p>
            </div>
            <div>
              <small>LOCATION</small>
              <p>{fetchedAddressData.Location}</p>
            </div>
            <div>
              <small>TIMEZONE</small>
              <p>{fetchedAddressData.Timezone}</p>
            </div>
            <div>
              <small>ISP</small>
              <p>{fetchedAddressData.ISP}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Map">
        <MapContainer center={position} zoom={13} style={{ height: "inherit" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} ipaddress={IPAddress} />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
