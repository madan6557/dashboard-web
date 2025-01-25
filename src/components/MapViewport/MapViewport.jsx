import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import proj4 from "proj4";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./MapViewport.css";

// Fix marker icon issue
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Define CRS for UTM Zone 50N
proj4.defs("EPSG:32750", "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs");

// Convert UTM to Lat/Lon
function UTMtoLatLng(northing, easting) {
    try {
        const longlatCoordinates = proj4("EPSG:32750", "EPSG:4326", [easting, northing]);
        if (isFinite(longlatCoordinates[0]) && isFinite(longlatCoordinates[1])) {
            return [longlatCoordinates[1], longlatCoordinates[0]]; // Return [lat, lng]
        } else {
            console.warn("Invalid coordinates from UTM conversion:", longlatCoordinates);
            return null; // Return null if conversion is invalid
        }
    } catch (error) {
        console.error("UTM conversion error:", error);
        return null;
    }
}

// Custom component to add WMS layer
const AddWMSLayer = () => {
    const map = useMap();

    useEffect(() => {
        let geoServerLayer = null;

        // Function to toggle WMS layer
        const toggleWMSLayer = () => {
            if (map.getZoom() >= 14) {
                if (!geoServerLayer) {
                    geoServerLayer = L.tileLayer.wms(
                        "https://geoserver.logiasphere.com:8443/geoserver/ne/wms",
                        {
                            layers: "Peta_2023_2024_all_Maps",
                            format: "image/png",
                            transparent: true,
                            attribution: "GeoServer © JBG",
                            zIndex: 2,
                            maxZoom: 22,
                        }
                    );
                    geoServerLayer.addTo(map);
                }
            } else {
                if (geoServerLayer) {
                    map.removeLayer(geoServerLayer);
                    geoServerLayer = null;
                }
            }
        };

        // Attach zoomend event to toggle WMS layer
        map.on("zoomend", toggleWMSLayer);

        // Initial check to toggle WMS layer
        toggleWMSLayer();

        // Cleanup event listener when component unmounts
        return () => {
            map.off("zoomend", toggleWMSLayer);
            if (geoServerLayer) {
                map.removeLayer(geoServerLayer);
            }
        };
    }, [map]);

    return null;
};


const MapViewport = ({ dataset, onClick }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        console.log("Map initialized.");
        // eslint-disable-next-line
    }, []);

    return (
        <div className="map-wrapper">
            <MapContainer
                center={[-3.9041126496685287, 115.02151371533008]} // Initial center of the map
                zoom={14}
                scrollWheelZoom={true}
                className="leaflet-map"
                maxZoom={22}
            >
                {/* Base map: ArcGIS */}
                <TileLayer
                    url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; ArcGIS"
                    zIndex={1}
                />

                {/* GeoServer layer */}
                <AddWMSLayer />

                {/* Add clustered markers */}
                <ClusteredMarkers
                    dataset={dataset}
                    onClick={onClick}
                    selectedMarker={selectedMarker}
                    setSelectedMarker={setSelectedMarker}
                />
            </MapContainer>
        </div>
    );
};

const ClusteredMarkers = ({ dataset, onClick, selectedMarker, setSelectedMarker }) => {
    const map = useMap();

    useEffect(() => {
        const clusterGroup = L.markerClusterGroup({
            maxClusterRadius: 5,
        });

        dataset.forEach(({ id_plant, easting, northing, status }) => {
            const latLng = UTMtoLatLng(parseFloat(northing), parseFloat(easting)); // Convert UTM to [lat, lng]

            if (latLng) {
                const [lat, lng] = latLng;

                // Determine marker color based on status
                let markerColor;
                if (status === "Hidup") {
                    markerColor = "--primary-green";
                } else if (status === "Merana/Kritis") {
                    markerColor = "--primary-orange";
                } else {
                    markerColor = "--gray-500";
                }

                const customIcon = L.divIcon({
                    className: `custom-marker`,
                    html: `<div style="background-color: var(${markerColor}); width: 8px; height: 8px; border-radius: 50%; border: 2px solid ${selectedMarker === id_plant ? "blue" : "white"
                        }"></div>`,
                });

                const marker = L.marker([lat, lng], { icon: customIcon });

                // Bind popup to marker
                const popupContent = `
            <div>
              <strong>ID Plant:</strong> ${id_plant}<br>
              <strong>Status:</strong> ${status}<br>
              <strong>UTM Coordinates:</strong><br>
              Easting: ${easting}<br>
              Northing: ${northing}<br>
              <strong>Lat/Lon:</strong><br>
              Lat: ${lat.toFixed(6)}<br>
              Lon: ${lng.toFixed(6)}
            </div>
          `;
                marker.bindPopup(popupContent);

                // Add click event to marker
                marker.on("click", () => {
                    setSelectedMarker(id_plant); // Set selected marker
                    onClick(id_plant); // Trigger onClick callback
                    map.setView([lat, lng], 20); // Zoom to selected marker
                    marker.openPopup(); // Open popup on marker click
                });

                clusterGroup.addLayer(marker);
            } else {
                console.warn(`Skipping invalid marker for ID Plant: ${id_plant}`);
            }
        });

        map.addLayer(clusterGroup);

        // Cleanup when component unmounts
        return () => {
            map.removeLayer(clusterGroup);
        };
    }, [map, dataset, onClick, selectedMarker]);

    return null;
};

export default MapViewport;
