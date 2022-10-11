import { useNavigate } from "react-router-dom";
import classNameTheme from "../../helpers/classnametheme";
import "./body.css";

const Body = ({ theme, countryList, isLoading }) => {
  let navigate = useNavigate();
  return (
    <div className={classNameTheme(theme, "body")} role="main">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="countryListContainer">
          {countryList?.length > 0 &&
            countryList?.map((country) => (
              <div
                key={country.name.official}
                className="country"
                onClick={() => navigate(`/${country.cca3}`)}
              >
                <div className="countryFlagImageContainer">
                  <img
                    className="countryFlagImage"
                    src={country.flags.svg}
                    alt={`The Flag of ${country.name.official}`}
                  />
                </div>
                <div className="countryInfo">
                  <p className="countryName fw-800">{country.name.common}</p>
                  <p className="countryPopulation">
                    <span className="fw-600">Population:</span>{" "}
                    {country.population.toLocaleString("en-US")}
                  </p>
                  <p className="countryRegion">
                    <span className="fw-600">Region:</span> {country.region}
                  </p>
                  <p className="countryCapital">
                    <span className="fw-600">Capital:</span>{" "}
                    {country.hasOwnProperty("capital")
                      ? Array.isArray(country.capital)
                        ? country.capital.join(", ")
                        : country.capital.toString()
                      : "None"}
                  </p>
                </div>
              </div>
            ))}
          {countryList?.status === 404 && (
            <p className="fw-800">No Countries Found</p>
          )}
          {countryList?.length === 0 && (
            <p className="fw-800">
              Could not find a country with the filter selected. Please try
              using "All"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
