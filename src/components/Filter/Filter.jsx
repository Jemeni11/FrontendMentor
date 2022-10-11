import { useState } from "react";
import classNameTheme from "../../helpers/classnametheme";
import ExpandMore from "../../assets/images/icon-expand_more.svg";
import ExpandLess from "../../assets/images/icon-expand_less.svg";
import "./filter.css";

const Filter = ({ theme, selectedRegion, setSelectedRegion }) => {
  const [showRegionsListToggle, setShowRegionsListToggle] = useState(false);
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div
      aria-label="region-filter"
      className={classNameTheme(theme, "regionFilter")}
    >
      <button
        onClick={() => setShowRegionsListToggle((prevState) => !prevState)}
      >
        <p>
          {selectedRegion === "All" ? (
            <>Filter&nbsp;by&nbsp;Region</>
          ) : (
            selectedRegion
          )}
        </p>
        <img
          className="arrowHead"
          src={showRegionsListToggle ? ExpandMore : ExpandLess}
          alt="expand"
        />
      </button>
      {showRegionsListToggle && (
        <ul className="regionsList">
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => {
                setSelectedRegion(region);
                setShowRegionsListToggle(false);
              }}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
