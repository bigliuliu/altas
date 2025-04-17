import React, { useEffect, useMemo, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";


interface MapProps {
  coordinates?: { lat: number; lng: number }[]; // Optional coordinates
  defaultPin?: { lat: number; lng: number }; // Optional default coordinates
}

const Map: React.FC<MapProps> = ({ coordinates, defaultPin = { lat: -1.313333, lng: 36.7365 } }) => {
  console.log('COORDINATES', coordinates)
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //   init a marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;


      //map options
      const mapOptions: google.maps.MapOptions = {
        center: coordinates?.length ? coordinates[0] : defaultPin,
        zoom: 7,
        mapId: 'My Property'
      };

      // SETUP MAP
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const customMarkerURL = `https://api.geoapify.com/v1/icon?type=awesome&color=%23b91f12&size=small&icon=globe&noWhiteCircle=true&scaleFactor=2&apiKey=${process.env.NEXT_PUBLIC_GEOPIFY_API_KEY}`

      // Create the marker instances
      coordinates?.forEach((coordinate, index) => {
        new Marker({
          map: map,
          position: coordinate,
          icon: {
            url: customMarkerURL,
            scaledSize: new google.maps.Size(50, 50),
          },
          title: ``,
        });
      });
    };

    initMap();
  }, [coordinates, defaultPin]);

  return <div ref={mapRef} className="rounded-2xl h-[400px]" />;
};

export default Map;
