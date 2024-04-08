import { type ClassValue, clsx } from "clsx";
import * as configs from "@/constants";

import { twMerge } from "tailwind-merge";
import qs from "query-string";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const simpleDate: Intl.DateTimeFormatOptions = {
    day: "2-digit", // Display day as a two-digit number
    month: "short", // Display month as a short name (e.g., Apr)
    year: "numeric", // Display year as a number
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedSimpleDate: string = new Date(dateString).toLocaleString(
    "en-US",
    simpleDate
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    simpleDate: formattedSimpleDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const removeSpaceAndCasesensitivity = (str: string) =>
  str.toLowerCase().replace(/\s/g, "");

export const isCitiesWithinArea = (latitude: number, longitude: number) => {
  const minLat = 47.9460886576076;
  const maxLat = 48.39901420809428;
  const minLon = 12.481255680127154;
  const maxLon = 13.183061833385718;

  return (
    latitude >= minLat &&
    latitude <= maxLat &&
    longitude >= minLon &&
    longitude <= maxLon
  );
};

export const formatDateToISOStringWithTimeZone = (date: Date | undefined) => {
  return date
    ?.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    ?.replace(/,/g, "");
};

export const getDropdownDescription = (
  dataKey: string | undefined,
  valueKey: string
) => {
  const list: any = configs[dataKey as keyof typeof configs];
  const match = list?.find(
    (item: { id: string; description: string }) => item.id === valueKey
  );

  return match?.description;
};

export const getDocumentName = (document: string) => {
  const urlParts = document.split("/");
  const filename = urlParts[urlParts.length - 1];

  return filename;
};
