import CountryModel from "../models/CountryModel.js";

export class ContinentDetails {
  constructor(region) {
    this.region = region;
    this.container = document.querySelector(".div-details-region");
    this.countryModel = new CountryModel();
  }

  async getLanguagesAndCurrencies(countries) {
    const languageCounts = {};
    const currencyCounts = {};


    countries.forEach((country) => {
      if (country.languages) {
        let languagesArray = Array.isArray(country.languages)
          ? country.languages
          : typeof country.languages === "object"
          ? Object.values(country.languages)
          : [country.languages];

        languagesArray.forEach((lang) => {
          languageCounts[lang] = (languageCounts[lang] || 0) + 1;
        });
      }

      if (country.currencies && typeof country.currencies === "object") {
  
        Object.values(country.currencies).forEach((currency) => {
          let currencyName =
            currency?.name || (typeof currency === "string" ? currency : null);
          if (currencyName) {

            currencyCounts[currencyName] =
              (currencyCounts[currencyName] || 0) + 1;
          }
        });
      }
    });

    const mostCommonLanguages =
      Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([lang]) => lang)
        .filter((lang) => lang && lang.trim() !== "") 
        .join(", ") || "No data available";

    const mostCommonCurrencies =
      Object.entries(currencyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([curr]) => curr)
        .join(", ") || "No data available";

    return { languages: mostCommonLanguages, currencies: mostCommonCurrencies };
  }

  async render() {
    try {
      await this.countryModel.loadCountries();
      const countriesOfContinent = this.countryModel.getCountriesByRegion(
        this.region
      );

      if (!countriesOfContinent || countriesOfContinent.length === 0) {
        this.container.innerHTML = `<p>No data available for ${this.region}.</p>`;
        return;
      }

      const { languages, currencies } = await this.getLanguagesAndCurrencies(
        countriesOfContinent
      );

      const largestCountry = countriesOfContinent.reduce(
        (largest, country) => (country.area > largest.area ? country : largest),
        { area: 0, name: { common: "Unknown" } }
      );

      const totalPopulation = countriesOfContinent.reduce(
        (total, country) => total + (country.population || 0),
        0
      );

      this.container.innerHTML = `    
        <div class="d-flex flex-column  justify-content-center align-items-center mt-3">
          <h2>Curiosities about ${this.region}</h2>
          <ul>
            <li>🌎 <strong >Number of countries:</strong> ${
              countriesOfContinent.length
            }</li>
            <li>🗣 <strong >Most common languages:</strong> ${languages}</li>
            <li>💰 <strong >Most common currencies:</strong> ${currencies}</li>
            <li>👥 <strong>Total population:</strong> ${totalPopulation.toLocaleString()}</li>
            <li>📏 <strong>Largest country by area:</strong> ${
              largestCountry.name.common
            } - ${largestCountry.area.toLocaleString()} km²</li>
          </ul>
        </div>`;
    } catch (error) {
      console.error("Error loading region details:", error);
      this.container.innerHTML = `<p>Error loading details for ${this.region}.</p>`;
    }
  }
}
