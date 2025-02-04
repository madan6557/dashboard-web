import React, { useEffect, useState, useContext, useRef } from "react";
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
import { getAllApprovedPlants } from "../../api/controller/mapDataProviderController";
import { SiteIDContext } from "../../context/SiteIDContext";

// Fix default marker icon
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

let BlueIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [14, 40],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
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
            return null;
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

        map.on("zoomend", toggleWMSLayer);
        toggleWMSLayer();

        return () => {
            map.off("zoomend", toggleWMSLayer);
            if (geoServerLayer) {
                map.removeLayer(geoServerLayer);
            }
        };
    }, [map]);

    return null;
};

const MapViewport = ({ location, focus, onFind, onClick }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [plantsData, setPlantsData] = useState([]);
    const findMarkerRef = useRef(null); // Gunakan ref untuk menyimpan marker FindMarker
    const { selectedSite } = useContext(SiteIDContext);

    // Fetch plant data
    const fetchPlantsLocationData = async () => {
        try {
            const response = await getAllApprovedPlants("", selectedSite, location);
            setPlantsData(response.data);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            fetchPlantsLocationData();
        } // eslint-disable-next-line
    }, [selectedSite, location]);

    // Handle marker click
    const handleMarkerClick = (id_plant) => {
        setSelectedMarker(id_plant);

        // Hapus FindMarker saat marker lain diklik
        if (findMarkerRef.current) {
            findMarkerRef.current.remove();
            findMarkerRef.current = null;
        }

        if (onClick) onClick(id_plant);
    };

    return (
        <div className="map-wrapper">
            <MapContainer
                center={[-3.9041126496685287, 115.02151371533008]}
                zoom={14}
                scrollWheelZoom={true}
                className="leaflet-map"
                maxZoom={22}
            >
                <TileLayer
                    url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; ArcGIS"
                    zIndex={1}
                />

                <AddWMSLayer />

                <ClusteredMarkers
                    dataset={plantsData}
                    onClick={handleMarkerClick}
                    selectedMarker={selectedMarker}
                    setSelectedMarker={setSelectedMarker}
                />

                {focus && <FocusMarker focus={focus} />}
                {onFind && <FindMarker onFind={onFind} dataset={plantsData} findMarkerRef={findMarkerRef} />}
            </MapContainer>
        </div>
    );
};

// Component for clustered plant markers
const ClusteredMarkers = ({ dataset, onClick, selectedMarker, setSelectedMarker }) => {
    const map = useMap();

    useEffect(() => {
        const clusterGroup = L.markerClusterGroup({ maxClusterRadius: 5 });

        dataset.forEach(({ id_plant, easting, northing, status, location }) => {
            const latLng = UTMtoLatLng(parseFloat(northing), parseFloat(easting));

            if (latLng) {
                const [lat, lng] = latLng;

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
                    html: `<div style="background-color: var(${markerColor}); width: 8px; height: 8px; border-radius: 50%; border: 2px solid ${selectedMarker === id_plant ? "blue" : "white"}"></div>`,
                });

                const marker = L.marker([lat, lng], { icon: customIcon });

                const popupContent = `
                <div>
                    <strong>ID Plant:</strong> ${id_plant}<br>
                    <strong>Location:</strong> ${location}<br>
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

                marker.on("click", () => {
                    setSelectedMarker(id_plant);
                    if (onClick) onClick(id_plant);
                    map.setView([lat, lng], 22);
                    marker.openPopup();
                });

                clusterGroup.addLayer(marker);
            }
        });

        map.addLayer(clusterGroup);

        return () => {
            map.removeLayer(clusterGroup);
        };// eslint-disable-next-line
    }, [map, dataset, onClick, selectedMarker]);

    return null;
};

// Component to find and highlight a specific plant
const FindMarker = ({ onFind, dataset, findMarkerRef }) => {
    const map = useMap();

    useEffect(() => {
        if (onFind) {
            const foundPlant = dataset.find(plant => plant.id_plant === onFind.id_plant);

            if (foundPlant) {
                const { easting, northing } = foundPlant;
                const latLng = UTMtoLatLng(parseFloat(northing), parseFloat(easting));

                if (latLng) {
                    // Hapus marker lama jika ada
                    if (findMarkerRef.current) {
                        findMarkerRef.current.remove();
                    }

                    // Tambahkan marker baru
                    const newMarker = L.marker(latLng, { icon: BlueIcon, zIndexOffset: 2 }).addTo(map);
                    map.setView(latLng, 19);

                    // Simpan marker baru ke ref
                    findMarkerRef.current = newMarker;
                }
            }
        }

        return () => {
            // Hapus marker saat komponen unmount atau `onFind` berubah
            if (findMarkerRef.current) {
                findMarkerRef.current.remove();
                findMarkerRef.current = null;
            }
        };// eslint-disable-next-line
    }, [onFind, dataset]); // Memantau perubahan `onFind` dan `dataset`

    return null;
};


// Component for focused plant marker
const FocusMarker = ({ focus }) => {
    const map = useMap();  

    useEffect(() => {
        if (focus) {
            const { easting, northing } = focus;
            console.log(focus);
            const latLng = UTMtoLatLng(parseFloat(northing), parseFloat(easting));

            if (latLng) {
                const marker = L.marker(latLng, { icon: BlueIcon,  zIndexOffset: 1 }).addTo(map);
                map.setView(latLng, 19);

                return () => {
                    map.removeLayer(marker);
                };
            }
        }
    }, [map, focus]);

    return null;
};

export default MapViewport;
