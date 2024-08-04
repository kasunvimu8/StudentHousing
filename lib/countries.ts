import { Description } from "@radix-ui/react-toast";
import { Country } from "country-state-city";

export const getAllcountries = () => {
  const countries = Country.getAllCountries();

  return countries.map((country) => ({
    id: country.isoCode,
    description: country.name,
  }));
};
