import { useContext } from "react";
import { countryContext } from "../store/country-context";
import { themeContext } from "../store/theme-context";
import { useParams, useNavigate } from "react-router-dom";
import classNameTheme from "../helpers/classnametheme";
import BackArrow from "../assets/images/icon-backspace.svg";
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

  let countryJSX = <p>Loading ...</p>;

  if (countryObject?.length > 0) {
    const nativeNameArray = Object.entries(countryObject[0]?.name.nativeName);
    const nativeName = nativeNameArray[nativeNameArray.length - 1][1].official;

    const noOfCapitals = countryObject[0].capital?.length;

    const currenciesArray = [];
    let currenciesString = "None";
    if (countryObject[0].hasOwnProperty("currencies")) {
      const currenciesObject = countryObject[0].currencies;
      for (const [key, value] of Object.entries(currenciesObject)) {
        currenciesArray.push(`${value.name} (${key})`);
      }
      currenciesString = currenciesArray.join(", ");
    }

    const tldString = countryObject[0].hasOwnProperty("tld")
      ? countryObject[0].tld.join(", ")
      : "None";

    const languagesObject = countryObject[0].languages;
    const languagesArray = [];
    for (const [, value] of Object.entries(languagesObject)) {
      languagesArray.push(`${value}`);
    }
    const languagesString = languagesArray.join(", ");

    countryJSX = (
      <div className="countryDetailsPageContainer">
        <button onClick={() => navigate("/")}>
          <img src={BackArrow} alt="go back" />
          <span>Back</span>
        </button>
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
                  {!noOfCapitals && "None"}
                </p>
              </div>
              <div>
                <p>
                  <span className="fw-600">Top Level Domain: </span>
                  {tldString}
                </p>
                <p>
                  <span className="fw-600">Currencies: </span>
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
                {countryObject[0].borders?.length > 0 ? (
                  countryObject[0].borders?.map((countryCCA3) => (
                    <button
                      key={countryCCA3}
                      onClick={() => navigate(`/${countryCCA3}`)}
                    >
                      {countries.cca3ToCountryName[countryCCA3]}
                    </button>
                  ))
                ) : (
                  <p>None</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return countryObject?.length > 0 ? (
    countryJSX
  ) : (
    <>
      <p>Nothing to see here</p>
    </>
  );
};

export default Country;
