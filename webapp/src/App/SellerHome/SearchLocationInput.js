import React, { useState, useEffect, useRef } from "react";
import './SearchLocationInput.scss';
let autoComplete;

//main method to load 
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  //check if ready
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

//autocomplete cities in textbox method
function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

//check hanldes for city added
async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

//main function
function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBK-xckagY7ua5F0qsjtzDVnxL0-63BquU&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input className="addposting-cityTextBox" id="cityState"
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="City"
        value={query}
      />
    </div>
  );
}

export default SearchLocationInput;