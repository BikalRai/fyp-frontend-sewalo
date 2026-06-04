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

import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";

// ─── Leaflet icon fix ────────────────────────────────────────────────────────
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ─── Geocoding helpers ───────────────────────────────────────────────────────
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

// ─── Map sub-components ──────────────────────────────────────────────────────
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: LatLng) => void;
}) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

function FlyTo({
  lat,
  lng,
  trigger,
}: {
  lat: number;
  lng: number;
  trigger: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) map.flyTo([lat, lng], 15);
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────
const AddressFormStep = () => {
  const { location, setLocation, setAddress } = useLocationStore();

  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");
  const [flyTrigger, setFlyTrigger] = useState<number>(0);

  const markerRef = useRef<LeafletMarker>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePositionChange = useCallback(
    async (lat: number, lng: number) => {
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

  return (
    <div className="grid gap-6">
      {/* ── Search bar ── */}
      <div className="grid gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
          Search Location
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-base pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. Baneshwor, Kathmandu"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-muted/30 text-sm text-text-dark placeholder:text-muted bg-white outline-none focus:border-accent transition-colors font-[Montserrat,sans-serif]"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex items-center gap-1.5 px-4 rounded-xl bg-accent text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <IoSearchOutline className="text-base" />
            {isSearching ? "Searching…" : "Search"}
          </button>
        </div>
        {searchError && (
          <p className="text-xs text-red-500 mt-1">{searchError}</p>
        )}
      </div>

      {/* ── Map ── */}
      <div className="grid gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
          Pin Your Location
        </label>
        <div className="relative rounded-xl overflow-hidden border border-muted/30">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "280px", width: "100%", cursor: "crosshair" }}
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
            title="Use my current location"
            className="absolute top-2.5 right-2.5 z-1000 w-9 h-9 rounded-lg bg-white border border-muted/20 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              width="16"
              height="16"
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

          {/* Drag hint */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center z-1000 pointer-events-none">
            <span className="text-[11px] text-gray-600 bg-white/85 px-3 py-1 rounded-full">
              {isDragging
                ? "Drop to set location"
                : "Tap map or drag pin to set location"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Detected address ── */}
      <div className="grid gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
          Detected Address
        </label>
        <div className="w-full px-4 py-3 rounded-xl border border-muted/30 text-sm bg-white min-h-12 flex items-center">
          {isGeocoding ? (
            <span className="text-muted">Looking up address…</span>
          ) : location.address ? (
            <span className="text-text-dark">{location.address}</span>
          ) : (
            <span className="text-muted">
              Pin a location on the map to see the address
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressFormStep;
