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

  const getCountries = async (URL = "https://restcountries.com/v3.1/all") => {
    const res = await fetch(URL);
    const resJson = await res.json();
    countries.setCountries(resJson);
    let cca3ToCountryNameObject = {};
    resJson.forEach(
      (country) => (cca3ToCountryNameObject[country.cca3] = country.name.common)
    );
    countries.setCCA3ToCountryName(cca3ToCountryNameObject);
    setCountryList(resJson);
    console.log(countryList);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    let filterArray =
      inputState.trim() === ""
        ? countryList
        : countries.countries?.filter((country) =>
            country.name.common.toLowerCase().includes(inputState.toLowerCase())
          );
    if (selectedRegion === "All" && inputState.trim() !== "") {
      setCountryList(filterArray);
    } else if (selectedRegion === "All" && inputState.trim() === "") {
      setCountryList(countries.countries);
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
              <Body theme={theme} countryList={countryList} />
            </>
          }
        />
        <Route path=":cca3" element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
