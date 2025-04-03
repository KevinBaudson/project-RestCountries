import API from "../services/api.js";
import Country from "../models/Country.js";

class CountryModel {
  constructor() {
    this.countries = [];
  }
  async loadCountries() {
    const data = await API.fetchCountriesAll();
    this.countries = data.map(
      (country) =>
        new Country(
          country.name.common,
          country.region,
          country.population,
          country.area,
          country.flags.png,
          country.borders,
          country.capital,
          country.languages,
          country.currencies,
          country.maps
        )
    );
  }
  getAllCountries() {
    return this.countries;
  }
  getCountriesByRegion(region) {
    return this.countries.filter((country) => country.region === region);
  }
  getTop10LargestCountries() {
    return [...this.countries].sort((a, b) => b.area - a.area).slice(0, 10);
  }
  getTop10MostPopulousCountries() {
    return [...this.countries]
      .sort((a, b) => b.population - a.population)
      .slice(0, 10);
  }
  searchCountriesByName(query) {
    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default CountryModel;
