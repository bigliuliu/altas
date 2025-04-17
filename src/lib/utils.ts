import { Property } from "@/types/api-types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateTime(): string {
  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 24-hour format
  });
  return formattedDateTime;
}

export function getCoordinatesFromLink(link: string) {
  if (!link) return {};
  // Check if the link is a valid Google Maps place link
  if (!link.startsWith('https://www.google.com/maps/place/')) {
    return {};
  }
  // Extract latitude and longitude from the location string
  const latLongRegex = /https:\/\/www\.google\.com\/maps\/place\/.*@(-?\d+\.\d+),(-?\d+\.\d+).*z/;
  const match = link.match(latLongRegex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    // Do something with latitude and longitude (e.g., update form state)
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    return {
      lat: latitude,
      lng: longitude
    }
  } else {
    // Handle invalid location format
    console.error("Invalid location link format");
    return {}
  }
}

export function getAddressFromMapLink(mapLink: string): string | null {
  // Check if the link is a valid Google Maps place link
  if (!mapLink.startsWith('https://www.google.com/maps/place/')) {
    return null;
  }

  // Extract the part after "place/"
  const addressPart = mapLink.split('/place/')[1];

  // Split the address part by the first comma (",")
  const addressParts = addressPart.split(',');

  // If there's only one part, return null
  if (addressParts.length === 1) {
    return null;
  }

  // Return the first part (assuming it's the address name)
  return addressParts[0].trim();
}

export function convertToShortDateMonthDay(dateString: string): string {
  const date = new Date(dateString);
  const shortDateMonthDay = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return shortDateMonthDay;
}


export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  });
  return formattedDate;
}

export function parseDate(str: any): Date {
  const timestamp = Date.parse(str);
  if (isNaN(timestamp)) {
    return new Date();
  }
  return new Date(timestamp);
}

export const generateCoordinatesArray = (properties: Property[]) => {
  console.log('Properties', properties)
  const coordinatesArray = properties.map((property) => {
    const locationLink = property.propertyCoordinate
    if (locationLink) {
      const { lat, lng } = getCoordinatesFromLink(locationLink) as { lat: number; lng: number };
      return { lat, lng };
    }
  });
  return coordinatesArray;
};

export const convertBase64 = async (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export function constructMetadata({
  title = "Atlas KE",
  description = "Atlas is the leading blockchain powered land titles registry in Kenya committed to enhancing transparency around land ownership in Kenya and beyond",
  image = "/metadata/og.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@stevehoober254",
    },
    icons,
    metadataBase: new URL("https://atlas-ke.net/"),
    // themeColor: "#FFF",
  };
}
