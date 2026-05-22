import { useCallback, useEffect, useRef, useState } from "react";
import { useLocationStore } from "@/store/jobStore";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { LatLng, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    return data.display_name ?? "";
  } catch {
    return "";
  }
}

async function searchLocation(
  query: string,
): Promise<{ lat: number; lng: number; display_name: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=np`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    if (!data.length) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch {
    return null;
  }
}

interface MapClickHandlerProps {
  onMapClick: (latlng: LatLng) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

interface FlyToProps {
  lat: number;
  lng: number;
  trigger: number;
}

function FlyTo({ lat, lng, trigger }: FlyToProps) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) map.flyTo([lat, lng], 15);
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1.5px solid var(--color-muted)",
  fontSize: "14px",
  boxSizing: "border-box",
  background: "#fff",
  color: "var(--color-text-dark)",
  fontFamily: "Montserrat, sans-serif",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "var(--color-muted)",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  display: "block",
};

const LocationPicker = () => {
  const { location, phoneNumber, setLocation, setAddress, setPhoneNumber } =
    useLocationStore();

  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [flyTrigger, setFlyTrigger] = useState(0);

  const markerRef = useRef<LeafletMarker>(null);

  const handlePositionChange = useCallback(
    async (lat: number, lng: number): Promise<void> => {
      setLocation(lat, lng, "");
      setIsGeocoding(true);
      const address = await reverseGeocode(lat, lng);
      setAddress(address);
      setIsGeocoding(false);
    },
    [setLocation, setAddress],
  );

  const handleMapClick = useCallback(
    ({ lat, lng }: LatLng) => handlePositionChange(lat, lng),
    [handlePositionChange],
  );

  const handleMarkerDragEnd = useCallback(() => {
    setIsDragging(false);
    const marker = markerRef.current;
    if (marker) {
      const { lat, lng } = marker.getLatLng();
      handlePositionChange(lat, lng);
    }
  }, [handlePositionChange]);

  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        handlePositionChange(coords.latitude, coords.longitude);
        setFlyTrigger((t) => t + 1);
      },
      (err) => console.warn("Geolocation error:", err),
    );
  }, [handlePositionChange]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError("");
    const result = await searchLocation(searchQuery);
    if (result) {
      setLocation(result.lat, result.lng, result.display_name);
      setFlyTrigger((t) => t + 1);
    } else {
      setSearchError("Location not found. Try a different search.");
    }
    setIsSearching(false);
  }, [searchQuery, setLocation]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Search */}
      <section>
        <label style={labelStyle}>Search Location</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="e.g. Baneshwor, Kathmandu"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            style={{
              padding: "0 20px",
              borderRadius: "10px",
              border: "none",
              background: "var(--color-accent)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isSearching ? "not-allowed" : "pointer",
              opacity: isSearching ? 0.7 : 1,
              fontFamily: "Montserrat, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {isSearching ? "Searching…" : "Search"}
          </button>
        </div>
        {searchError && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-soft-danger)",
              marginTop: "6px",
            }}
          >
            {searchError}
          </p>
        )}
      </section>

      {/* Map */}
      <section>
        <label style={labelStyle}>Location</label>
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1.5px solid var(--color-muted)",
            position: "relative",
          }}
        >
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "300px", width: "100%", cursor: "crosshair" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
            <FlyTo lat={location.lat} lng={location.lng} trigger={flyTrigger} />
            <Marker
              ref={markerRef}
              position={[location.lat, location.lng]}
              draggable
              eventHandlers={{
                dragstart: () => setIsDragging(true),
                dragend: handleMarkerDragEnd,
              }}
            />
          </MapContainer>

          {/* My location button */}
          <button
            onClick={handleMyLocation}
            title="Use my location"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid var(--color-light-gray)",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="8" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
              <circle cx="12" cy="12" r="2" fill="#444" />
            </svg>
          </button>

          {/* Hint */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#555",
                background: "rgba(255,255,255,0.85)",
                padding: "3px 10px",
                borderRadius: "20px",
              }}
            >
              {isDragging
                ? "Drop to set location"
                : "Tap map or drag pin to set location"}
            </span>
          </div>
        </div>
      </section>

      {/* Address display */}
      <section>
        <label style={labelStyle}>Address</label>
        <div
          style={{
            ...inputStyle,
            minHeight: "48px",
            color: location.address
              ? "var(--color-text-dark)"
              : "var(--color-muted)",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isGeocoding
            ? "Looking up address…"
            : location.address ||
              "Pin a location on the map to see the address"}
        </div>
      </section>

      {/* Phone Number */}
      <section>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="e.g. 98XXXXXXXX"
          style={inputStyle}
        />
      </section>
    </div>
  );
};

export default LocationPicker;
