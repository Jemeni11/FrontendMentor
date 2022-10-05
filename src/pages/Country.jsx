import { useContext } from "react";
import { countryContext } from "../store/country-context";
import { themeContext } from "../store/theme-context";
import { useParams, useNavigate } from "react-router-dom";
import classNameTheme from "../helpers/classnametheme";
import "./country.css";

const Country = () => {
  const theme = useContext(themeContext);

  const countries = useContext(countryContext);
  const arrayOfCountries = countries.countries;

  const navigate = useNavigate();

  const params = useParams();
  const cca3 = params.cca3;

  const countryObject = arrayOfCountries.filter(
    (country) => country.cca3 === cca3
  );

  console.log(countryObject[0])
  console.log(countryObject[0].name)
  console.log(countryObject[0].name.nativeName)
  console.log(Object.entries(countryObject[0].name.nativeName))

  const nativeNameArray = Object.entries(countryObject[0]?.name.nativeName);
  const nativeName = nativeNameArray[nativeNameArray.length - 1][1].official;

  const noOfCapitals = countryObject[0].capital?.length;

  const currenciesArray = [];
  let currenciesString = "None";
  if (countryObject[0].hasOwnProperty('currencies')) {
    const currenciesObject = countryObject[0].currencies;
    for (const [key, value] of Object.entries(currenciesObject)) {
      currenciesArray.push(`${value.name} (${key})`);
    }
    currenciesString = currenciesArray.join(", ");
  } 

  const tldArray = countryObject[0].tld;
  const tldString = tldArray?.join(", ");

  const languagesObject = countryObject[0].languages;
  const languagesArray = [];
  for (const [, value] of Object.entries(languagesObject)) {
    languagesArray.push(`${value}`);
  }
  const languagesString = languagesArray.join(", ");

  return countryObject ? (
    <div className="countryDetailsPageContainer">
      <button onClick={() => navigate("/")}>Back</button>
      <div className={classNameTheme(theme, "countryDetailsPage")}>
        <div className="countryDetailsPageImageContainer">
          <img
            src={countryObject[0].flags.svg}
            alt={`The Flag of ${countryObject[0].name.official}`}
          />
        </div>
        <div className="countryDetailsPageInfoContainer">
          <h1>{countryObject[0].name.common}</h1>
          <div className="CDPI_Data">
            <div>
              <p>
                <span className="fw-600">Native Name: </span>
                {nativeName}
              </p>
              <p>
                <span className="fw-600">Population: </span>
                {countryObject[0].population.toLocaleString("en-US")}
              </p>
              <p>
                <span className="fw-600">Region: </span>
                {countryObject[0].region}
              </p>
              <p>
                <span className="fw-600">Sub Region: </span>
                {countryObject[0].subregion}
              </p>
              <p>
                <span className="fw-600">Capital(s): </span>
                {noOfCapitals >= 1 && countryObject[0].capital.join(", ")}
                {!noOfCapitals && "None" }
              </p>
            </div>
            <div>
              <p>
                <span className="fw-600">
                  Top Level Domain{tldArray.length > 1 ? "s" : ""}:{" "}
                </span>
                {tldString}
              </p>
              <p>
                <span className="fw-600">
                  Currenc{currenciesArray.length > 1 ? "ies" : "y"}:{" "}
                </span>
                {currenciesString}
              </p>
              <p>
                <span className="fw-600">
                  Language{languagesArray.length > 1 ? "s" : ""}:{" "}
                </span>
                {languagesString}
              </p>
            </div>
          </div>
          <div className="borderCountriesContainer">
            <p className="fw-800">Border&nbsp;Countries: </p>
            <div className="borderCountriesButtonsContainer">
              {countryObject[0].borders?.map((countryCCA3) => (
                <button
                  key={countryCCA3}
                  onClick={() => navigate(`/${countryCCA3}`)}
                >
                  {countries.cca3ToCountryName[countryCCA3]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <p>Nothing to see here</p>
    </>
  );
};

export default Country;
