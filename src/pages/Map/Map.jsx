import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";
import proj4 from "proj4";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.css";

// Fix marker icon issue
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Define CRS for UTM Zone 50N
proj4.defs("EPSG:32650", "+proj=utm +zone=50 +datum=WGS84 +units=m +no_defs");

// Convert UTM to Lat/Lon
const convertUTMToLatLon = (x, y) => {
    try {
        return proj4("EPSG:32650", "EPSG:4326", [x, y]);
    } catch (error) {
        console.error("Error converting UTM to Lat/Lon:", error);
        return [0, 0]; // Default to a safe value if conversion fails
    }
};

// Dummy data: array of UTM coordinates (easting, northing)
const dummyUTMCoordinates = [
    [462200, 4311800], // Close to center
    [462250, 4311850],
    [462300, 4311900],
    [462400, 4312000],
    [462500, 4312100],
];

// Convert all UTM coordinates to Lat/Lon
const convertedCoordinates = dummyUTMCoordinates.map(([easting, northing]) => {
    const [lon, lat] = convertUTMToLatLon(easting, northing);
    return { lon, lat, easting, northing };
});

console.log("Converted Coordinates:", convertedCoordinates);

// Custom component to add WMS layer
const AddWMSLayer = () => {
    const map = useMap();

    useEffect(() => {
        const geoServerLayer = L.tileLayer.wms(
            "https://geoserver.logiasphere.com:8443/geoserver/ne/wms",
            {
                layers: "Peta_2023_2024_all_Maps",
                format: "image/png",
                transparent: true,
                attribution: "GeoServer © JBG",
            }
        );
        geoServerLayer.addTo(map);

        // Cleanup when component unmounts
        return () => {
            map.removeLayer(geoServerLayer);
        };
    }, [map]);

    return null;
};

const Map = () => {
    useEffect(() => {
        console.log("Map initialized.");
    }, []);

    return (
        <div className="map-container">
            <MapContainer
                center={[38.955244, 116.564899]} // Default coordinates
                zoom={13} // Adjust zoom level for closer view
                scrollWheelZoom={true}
                className="leaflet-map"
            >
                <TileLayer
                    url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="&copy; ArcGIS"
                />
                <AddWMSLayer />
                <ClusteredMarkers markers={convertedCoordinates} />
            </MapContainer>
        </div>
    );
};

const ClusteredMarkers = ({ markers }) => {
    const map = useMap();

    useEffect(() => {
        const clusterGroup = L.markerClusterGroup();

        markers.forEach(({ lon, lat, easting, northing }) => {
            const customIcon = L.icon({
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            });

            const marker = L.marker([lat, lon], { icon: customIcon });

            marker.bindPopup(
                `<strong>UTM Input:</strong><br>
                Easting: ${easting}<br>
                Northing: ${northing}<br>
                <strong>Converted to:</strong><br>
                Longitude: ${lon.toFixed(6)}<br>
                Latitude: ${lat.toFixed(6)}`
            );

            clusterGroup.addLayer(marker);
        });

        map.addLayer(clusterGroup);

        // Cleanup when component unmounts
        return () => {
            map.removeLayer(clusterGroup);
        };
    }, [map, markers]);

    return null;
};

export default Map;
