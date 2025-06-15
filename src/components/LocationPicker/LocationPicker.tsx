import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Налаштування іконки маркера
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type LocationPickerProps = {
  value: string;
  onChange: (address: string) => void;
};

export const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
  const [showMap, setShowMap] = useState(false);
  const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(null);
  const [inputValue, setInputValue] = useState(value);

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      if (data.display_name) {
        setInputValue(data.display_name);
        onChange(data.display_name);
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
        setShowMap(false);
      },
    });
    return null;
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Виберіть локацію"
        onFocus={() => setShowMap(true)}
        readOnly
        className="main__input main__input--location"
      />

      {showMap && (
        <div className="locationPicker">
          <div className="locationPicker__map">
            <MapContainer
              center={markerPos || [50.4501, 30.5234]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {markerPos && <Marker position={markerPos} />}
            </MapContainer>
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="locationPicker__button"
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="44" rx="22" fill="#E4E7EB" />
                <path
                  d="M30 15.6114L28.3886 14L22 20.3886L15.6114 14L14 15.6114L20.3886 22L14 28.3886L15.6114 30L22 23.6114L28.3886 30L30 28.3886L23.6114 22L30 15.6114Z"
                  fill="#0F0E0E"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
