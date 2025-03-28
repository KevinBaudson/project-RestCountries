import {
  fetchCountriesAll,
  fetchCountriesByRegion,
  showDetailsByContinent,
} from "../services/api.js";

import { Card } from "../components/Card.js";
import { Details } from "../components/Details.js";
import { Table } from "../components/TableList.js";
import { Top10MostPopulous } from "../components/Top10MostPopulous.js"
import { Top10BiggestCountries } from "../components/Top10BiggestCountries.js";

function showLoading() {
  document.getElementById("loading").classList.remove("d-none");
}

function hideLoading() {
  document.getElementById("loading").classList.add("d-none");
}


document.addEventListener("DOMContentLoaded", async () => {
  const containerCards = document.querySelector("#container-cards");
  const mainSearchList = document.querySelector("#main-search-list");
  const containerDetails = document.querySelector("#container-details");
  const contactUs = document.querySelector("#contact-us");

  if (containerCards) {
    let currentPage = 1;
    const countriesPerPage = 12;
    let allCountries = [];

    sessionStorage.removeItem("countryData");

    const mostPopulousList = new Top10MostPopulous('#most-populous-list');
    const BiggestCountries = new Top10BiggestCountries("#biggest-countries");

    const fetchCountriesData = async () => {
      showLoading();
     try {
      const countries = await fetchCountriesAll();
      allCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      renderPage();
      mostPopulousList.render(countries);
      BiggestCountries.render(countries);
     } catch (error) {
      console.error(error);
     }finally{
      hideLoading()
     }
    };

    const renderPage = () => {
      const startIndex = (currentPage - 1) * countriesPerPage;
      const endIndex = startIndex + countriesPerPage;
      const countriesToDisplay = allCountries.slice(startIndex, endIndex);

      containerCards.innerHTML = "";

      countriesToDisplay.forEach((country) => {
        const card = new Card(country);
        containerCards.appendChild(card.render());
      });

      updatePagination();
    };

    const updatePagination = () => {
      const totalPages = Math.ceil(allCountries.length / countriesPerPage);

      const prevPageButton = document.querySelector("#prev-page");
      const nextPageButton = document.querySelector("#next-page");
      const pageInfo = document.querySelector("#page-info");

      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      
      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage === totalPages;
    };

    const prevPageButton = document.querySelector("#prev-page");
    const nextPageButton = document.querySelector("#next-page");

    prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });

    nextPageButton.addEventListener("click", () => {
      const totalPages = Math.ceil(allCountries.length / countriesPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });

    await fetchCountriesData();

    const dropdownItems = document.querySelectorAll(".dropdown-item");

    dropdownItems.forEach((item) => {
      item.addEventListener("click", async () => {
        const region = item.dataset.region;

        if (region) {
          const countries = await fetchCountriesByRegion(region);
          showDetailsByContinent(region);

          allCountries = countries;
          currentPage = 1;
          renderPage();
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
      showLoading()
     try {
      const table = new Table(filteredCountries);
      table.render(tableContainer);
     } catch (error) {
      console.error(error);
     }finally{
      hideLoading()
     }
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
