import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.country}`,
        })),
      };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="flex justify-center max-w-lg">
      <AsyncPaginate
        className="w-full md:w-80 text-black"
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={{
          control: (base) => ({
            ...base,
            height: "50px", // Adjust height
            borderRadius: "8px", // Rounded corners
          }),
          input: (base) => ({
            ...base,
            fontSize: "16px", // Adjust font size
          }),
        }}
      />
    </div>
  );
};

export default Search;
