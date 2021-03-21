import React from "react";
import "../HotelSearchResults-part/searchResult.css";
import Button from "@material-ui/core/Button";

function SearchResult({ location, checkin, checkout }) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <h4 className="font-bold mt-5">Searching Result</h4>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 col-6">
            <h2 className="font-bold text-left">
              Your Search results in {location}
            </h2>
            <p className="text-left">
              {checkin} - {checkout}
            </p>
          </div>
          <div className="col-md-4 col-6 ">
            <Button variant="contained" style={{ backgroundColor: "#20c997" }}>
              Change Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
