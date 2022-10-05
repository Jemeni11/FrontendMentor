import { createContext, useState } from "react";

export const countryContext = createContext({
  countries: [],
  setCountries: () => {},
  cca3ToCountryName: [],
  setCCA3ToCountryName: () => {},
});

export default function CountryContextProvider(props) {
  const [countries, setCountries] = useState([]);
  const [cca3ToCountryName, setCCA3ToCountryName] = useState({});

  return (
    <countryContext.Provider
      value={{
        countries,
        setCountries,
        cca3ToCountryName,
        setCCA3ToCountryName,
      }}
    >
      {props.children}
    </countryContext.Provider>
  );
}
