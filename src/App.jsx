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
  const [countryList, setCountryList] = useState(countries.countries);

  const getCountries = async (URL = "https://restcountries.com/v3.1/all") => {
    const res = await fetch(URL);
    const resJson = await res.json();
    countries.setCountries(resJson);
    let cca3ToCountryNameObject = {};
    resJson.forEach(
      (country) =>
        (cca3ToCountryNameObject[country.cca3] = country.name.common)
    );
    countries.setCCA3ToCountryName(cca3ToCountryNameObject);
  };

  useEffect(() => {
    getCountries();
    setCountryList(countries.countries);
  }, []);

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
                  getCountries={getCountries}
                />
                <Filter
                  theme={theme}
                  countriesCtx={countries}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  setCountryList={setCountryList}
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
