import { useEffect, useRef, useState } from "react";
import { MapPin, DownloadSimple } from "@phosphor-icons/react";

interface City {
  name: string;
  lat: number;
  lng: number;
}

interface MarkerWithCity {
  city: string;
  marker: google.maps.Marker;
}

const cities: City[] = [
  { name: "Nairobi", lat: -1.286389, lng: 36.817223 },
  { name: "Kiambu", lat: -1.1667, lng: 36.8333 },
  { name: "Nakuru", lat: -0.3031, lng: 36.08 },
  { name: "Mombasa", lat: -4.0435, lng: 39.6682 },
  { name: "Kisumu", lat: -0.0917, lng: 34.7679 },
];

const citySectionsMap: Record<string, { section: string; block: string }[]> = {
  Kiambu: [
    { section: "Kiambu Municipality", block: "Block 1" },
    { section: "Thika Municipality", block: "Block 9" },
    { section: "Ruiru/Kiu", block: "Block 6 (Githurai Ting'ang'a)" },
    { section: "Gatundu South", block: "Block 2" },
    { section: "Juja/Kalimoni", block: "Block 1" },
  ],
  Nakuru: [
    { section: "Nakuru Municipality", block: "Block 1" },
    { section: "Naivasha Municipality", block: "Block 5" },
    { section: "Molo Township", block: "Block 3" },
    { section: "Gilgil Township", block: "Block 2" },
    { section: "Subukia West", block: "Block 2 (Wiumiririe)" },
    { section: "Rongai", block: "Block 1" },
    { section: "Njoro", block: "Block 2" },
    { section: "Bahati", block: "Block 1" },
    { section: "Kuresoi", block: "Block 2" },
    { section: "Elburgon Township", block: "Block 1" },
  ],
  Kisumu: [
    { section: "Kisumu Municipality", block: "Block 1" },
    { section: "Kisumu Municipality", block: "Block 2" },
    { section: "Maseno Township", block: "Block 3" },
    { section: "Muhoroni Township", block: "Block 4" },
    { section: "Ahero Township", block: "Block 5" },
  ],
  Mombasa: [
    { section: "Mombasa Mainland North", block: "Block 1" },
    { section: "Mombasa Mainland South", block: "Block 2" },
    { section: "Mombasa Island", block: "Block 3" },
    { section: "Kisauni", block: "Block 4" },
    { section: "Likoni", block: "Block 5" },
  ],
  Nairobi: [
    { section: "Muthaiga West", block: "Block 8" },
    { section: "Bernhard", block: "Block 12" },
    { section: "Lavington", block: "Block 13" },
    { section: "Thompson", block: "Block 15" },
    { section: "Kilimani", block: "Block 17" },

    { section: "Upper Hill", block: "Block 19" },
    { section: "Kenya High", block: "Block 21" },
    { section: "Riverside", block: "Block 22" },
    { section: "Kileleshwa", block: "Block 23" },
    { section: "Aboretum", block: "Block 26" },

    { section: "Lower Kilimani", block: "Block 27" },
    { section: "South Hill", block: "Block 31" },
    { section: "Parklands North", block: "Block 35" },
    { section: "City Park", block: "Block 37" },
    { section: "Pangani", block: "Block 40" },

    { section: "Starehe & Park Road", block: "Block 42" },
    { section: "Mathari", block: "Block 45" },
    { section: "Dagoretti Mutuini", block: "Block 48" },
    { section: "Eastleigh North", block: "Block 49" },
    { section: "Ofafa Jericho & Makongeni", block: "Block 51" },

    { section: "New Kibera", block: "Block 61" },
    { section: "Dagoretti Kangemi", block: "Block 64" },
    { section: "Dagoretti Riruta Satellite", block: "Block 66" },
    { section: "South B", block: "Block 67" },
    { section: "Gigiri", block: "Block 91" },

    { section: "Lake View Estate", block: "Block 92" },
    { section: "Nairobi South", block: "Block 93" },
    { section: "Spring Valley", block: "Block 95" },
    { section: "Kitsuru", block: "Block 101" },
    { section: "Komarock", block: "Block 111" },

    { section: "Runda", block: "Block 112" },
    { section: "Balozi", block: "Block 142" },
    { section: "Galleria", block: "Block 148" },
    { section: "Ngomongo", block: "Block 159" },
    { section: "Marurui", block: "Block 183" },

    { section: "Gachie", block: "Block 199" },
    { section: "Karura Spring Valley", block: "Block 218" },
    { section: "Karura Forest", block: "Block 237" },
  ],
};

const KenyaMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Nairobi");
  const [availableSections, setAvailableSections] = useState<
    { section: string; block: string }[]
  >(citySectionsMap["Nairobi"] || []);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<MarkerWithCity[]>([]);

  const lightMapStyle: google.maps.MapTypeStyle[] = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [{ visibility: "on" }],
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&language=en`;
    script.async = true;

    script.onload = () => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: -1.286389, lng: 36.817223 },
          zoom: 6,
          styles: lightMapStyle,
        }
      );

      mapRef.current = map;

      markersRef.current = cities.map((city) => {
        const marker = new google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
          map,
          title: city.name,
          icon: getMarkerIcon(city.name === selectedCity),
        });

        marker.addListener("click", () => {
          handleCitySelect(city.name);
        });

        return { city: city.name, marker };
      });
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    markersRef.current.forEach(({ city, marker }) => {
      marker.setIcon(getMarkerIcon(city === selectedCity));
    });

    const selected = cities.find((c) => c.name === selectedCity);
    if (selected && mapRef.current) {
      mapRef.current.setCenter({ lat: selected.lat, lng: selected.lng });
      mapRef.current.setZoom(10);
    }
  }, [selectedCity]);

  const getMarkerIcon = (isSelected: boolean): google.maps.Symbol => {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: isSelected ? 10 : 6,
      fillColor: isSelected ? "#FF0000" : "#4285F4",
      fillOpacity: 1,
      strokeWeight: 1,
    };
  };

  const [formData, setFormData] = useState({
    section: "",
    block: "",
  });

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setFormData({ section: "", block: "" });
    setAvailableSections(citySectionsMap[cityName] || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "section" ? { block: "" } : {}), // reset block if section changes
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // download logic or data submit
    console.log("Submitted:", selectedCity, formData);
  };

  return (
    <div className="w-full h-auto mt-10 flex flex-col gap-4">
      <div id="map" className="w-full h-[600px]" />
      <div className="grid grid-cols-3 gap-4">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCitySelect(city.name)}
            className={`font-jakarta px-3 py-2 rounded-lg text-sm font-medium transition ${
              selectedCity === city.name
                ? "bg-[#008D48] text-white"
                : "bg-white text-[#11171E]"
            } hover:bg-opacity-80`}
          >
            {city.name}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col mt-14">
        <span className="flex flex-row font-sans font-semibold text-[18px] text-[#11171E] mb-8">
          <MapPin size={20} color="#00A86B" className="mr-2" /> {selectedCity}
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-around w-full font-jakarta"
        >
          <div className="flex flex-col items-start">
            <label
              htmlFor="section"
              className="text-[#11171E] font-medium text-sm mb-2"
            >
              Select Registration Section
            </label>
            <select
              required
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="border-2 border-[#D0D5DD] rounded-lg bg-white py-3 px-6 w-full focus:outline-none"
            >
              <option value="">Select a section</option>
              {availableSections.map((item, index) => (
                <option key={index} value={item.section}>
                  {item.section}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-start my-2 mt-4">
            <label
              htmlFor="block"
              className="text-[#11171E] font-medium text-sm mb-2"
            >
              Select Block
            </label>
            <select
              required
              name="block"
              value={formData.block}
              onChange={handleChange}
              className="border-2 border-[#D0D5DD] rounded-lg bg-white py-3 px-6 w-full focus:outline-none"
            >
              <option value="">Select a block</option>
              {availableSections
                .filter((item) => item.section === formData.section)
                .map((item, index) => (
                  <option key={index} value={item.block}>
                    {item.block}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg text-white bg-[#008D48] font-jakarta text-sm flex flex-row items-center justify-center mt-4"
          >
            <DownloadSimple size={20} className="mr-3" />
            Download Registry Index Map
          </button>
        </form>
      </div>
    </div>
  );
};

export default KenyaMap;
