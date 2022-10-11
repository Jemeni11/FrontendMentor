import { useContext, useState, useEffect } from "react";
import { themeContext } from "./store/theme-context";
import { countryContext } from "./store/country-context";
import classNameTheme from "./helpers/classnametheme";

import { Routes, Route } from "react-router-dom";
import { Header, Input, Body, Filter } from "./components";
import Country from "./pages/Country";

function App() {
  const theme = useContext(themeContext);
  const countries = useContext(countryContext);
  const [inputState, setInputState] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCountries = async (URL = "https://restcountries.com/v3.1/all") => {
    setIsLoading(true);
    const res = await fetch(URL);
    const resJson = await res.json();
    const resJsonSorted = await resJson.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    countries.setCountries(resJsonSorted);
    let cca3ToCountryNameObject = {};
    resJson.forEach(
      (country) => (cca3ToCountryNameObject[country.cca3] = country.name.common)
    );
    countries.setCCA3ToCountryName(cca3ToCountryNameObject);
    setCountryList(resJsonSorted);
    setIsLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    let filterArray =
      inputState.trim() === ""
        ? countries.countries
        : countries.countries?.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(inputState.trim().toLowerCase())
          );
    if (selectedRegion === "All") {
      setCountryList(filterArray);
    } else {
      setCountryList(
        filterArray?.filter((country) => country.region === selectedRegion)
      );
    }
  }, [selectedRegion, inputState, countries]);

  return (
    <div className={classNameTheme(theme, "app")}>
      <Header theme={theme} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={classNameTheme(theme, "inputFilterRow")}>
                <Input
                  theme={theme}
                  inputState={inputState}
                  setInputState={setInputState}
                />
                <Filter
                  theme={theme}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
              </div>
              <Body
                theme={theme}
                countryList={countryList}
                isLoading={isLoading}
              />
            </>
          }
        />
        <Route path=":cca3" element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
