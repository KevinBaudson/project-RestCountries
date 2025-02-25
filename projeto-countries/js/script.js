import {
  fetchCountriesAll,
  fetchCountriesByRegion,
  showDetailsByContinent,
} from "../services/api.js";

import { Card } from "../components/Card.js";
import { Details } from "../components/Details.js";
import { Table } from "../components/TableList.js";

document.addEventListener("DOMContentLoaded", async () => {
  const containerCards = document.querySelector("#container-cards");
  const mainSearchList = document.querySelector("#main-search-list");
  const containerDetails = document.querySelector("#container-details");
  const contactUs = document.querySelector("#contact-us");

  if (containerCards) {

    const showCardsInitial = async () => {
      const countriesAll = await fetchCountriesAll()
        countriesAll.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common)
        }).forEach(country => {
          const card = new Card(country);
          containerCards.appendChild(card.render());
        })
    }

showCardsInitial()

    const dropdownItems = document.querySelectorAll(".dropdown-item");

    dropdownItems.forEach((item) => {
      item.addEventListener("click", async () => {
        const region = item.dataset.region;

        if (region) {
          const countries = await fetchCountriesByRegion(region);
          showDetailsByContinent(region);

          containerCards.innerHTML = "";

          countries.forEach((country) => {
            const card = new Card(country);
            containerCards.appendChild(card.render());
          });
        }
      });
    });
  } else if (mainSearchList) {
    const tableContainer = document.getElementById("table-container");
    const searchInput = document.getElementById("search");

    let allCountries = await fetchCountriesAll();
    allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    let filteredCountries = [...allCountries];

    function renderTable() {
      const table = new Table(filteredCountries);
      table.render(tableContainer);
    }

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      filteredCountries = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
      renderTable();
    });

    renderTable();
  } else if (containerDetails) {
    const details = new Details("container-details");
    details.render();
  } else if (contactUs) {
    (() => {
      "use strict";

      const forms = document.querySelectorAll(".needs-validation");

      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }
});
