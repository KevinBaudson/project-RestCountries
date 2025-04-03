import CountryModel from "../models/CountryModel.js";
import HomeView from "../views/HomeView.js";

import { Top10BiggestCountries } from "../components/Top10BiggestCountries.js";
import { Top10MostPopulous } from "../components/Top10MostPopulous.js";

class CountryController {
  constructor() {
    this.model = new CountryModel();
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.filteredCountries = [];

    this.top10Biggest = new Top10BiggestCountries("#biggest-countries");
    this.top10MostPopulous = new Top10MostPopulous("#most-populous-list");
  }

  async initHome() {
    await this.model.loadCountries();
    this.filteredCountries = this.sortAlphabetically(this.model.getAllCountries());
    this.render();
    this.renderTop10Lists();
    this.setupEventListeners();
  }
  sortAlphabetically(countries) {
    return countries
      .filter(country => country.name && country.name.common)
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
  renderTop10Lists() {
    const allCountries = this.model.getAllCountries();
    this.top10Biggest.render(allCountries);
    this.top10MostPopulous.render(allCountries);
  }
  render() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedCountries = this.filteredCountries.slice(startIndex, endIndex);

    HomeView.renderCards(paginatedCountries);
    HomeView.updatePageControls(this.currentPage, this.getTotalPages());
  }

  setupEventListeners() {
    document.getElementById("prev-page").addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render();
      }
    });

    document.getElementById("next-page").addEventListener("click", () => {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.render();
      }
    });

    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        const region = event.target.getAttribute("data-region");
        this.filterByRegion(region);
      });
    });
  }

  getTotalPages() {
    return Math.ceil(this.filteredCountries.length / this.itemsPerPage);
  }

  filterByRegion(region) {
    if (region === "All") {
      this.filteredCountries = this.sortAlphabetically(this.model.getAllCountries());
    } else {
      this.filteredCountries = this.sortAlphabetically(
        this.model.getAllCountries().filter((country) => country.region === region)
      );
    }
    this.currentPage = 1; 
    this.render();
  }
}

export default CountryController;
