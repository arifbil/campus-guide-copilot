"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

/* ===== KOMPONEN CAMPUS MAP ===== */

export default function CampusMap() {

  /* ===== STATE DATA LOKASI ===== */

  const [locations, setLocations] = useState([]);

  /* ===== AMBIL DATA LOKASI ===== */

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();

        setLocations(data);
      } catch (error) {
        console.error("Gagal mengambil data lokasi:", error);
      }
    };

    fetchLocations();
  }, []);

  /* ===== TAMPILAN PETA ===== */

  return (
    <div className="overflow-hidden rounded-2xl">

      <MapContainer
        center={[-3.8005, 114.8005]}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[500px] w-full"
      >

        {/* ===== SUMBER PETA OPENSTREETMAP ===== */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ===== MARKER LOKASI ===== */}

        {locations.map((location) => (

          <CircleMarker
            key={location.id}
            center={[
              Number(location.latitude),
              Number(location.longitude),
            ]}
            radius={10}
          >

            {/* ===== INFORMASI MARKER ===== */}

            <Popup>

              <div className="min-w-[180px] p-1">

                {/* ===== NAMA LOKASI ===== */}

                <h3 className="text-base font-bold text-slate-900">
                  📍 {location.nama}
                </h3>

                {/* ===== TIPE LOKASI ===== */}

                <p className="mt-2 text-sm text-slate-600">
                  <strong>Tipe:</strong> {location.tipe}
                </p>

                {/* ===== KOORDINAT ===== */}

                <p className="mt-1 text-xs text-slate-500">
                  Koordinat:
                  <br />
                  {Number(location.latitude).toFixed(6)},
                  {" "}
                  {Number(location.longitude).toFixed(6)}
                </p>

              </div>

            </Popup>

          </CircleMarker>

        ))}

      </MapContainer>

    </div>
  );
}