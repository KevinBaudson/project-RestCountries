import CountryController from "../controllers/CountryController.js";
import API from "../services/api.js";
import { Details } from "../components/Details.js";
import { ContinentDetails } from "../components/ContinentDetails.js";
import { Table } from "../components/TableList.js";
const containerCards = document.querySelector("#container-cards");
const containerDetails = document.querySelector("#container-details");
const tableContainer = document.querySelector("#table-container");
const contactUs = document.querySelector("#contact-us");
const loadingSpinner = document.querySelector("#loading"); 

const dropdownItems = document.querySelectorAll(".dropdown-item");
const detailsContainer = document.querySelector(".div-details-region");

document.addEventListener("DOMContentLoaded", async () => {
  if (containerCards) {
    const controller = new CountryController();
    
    loadingSpinner.classList.remove("d-none");

    try {
      await controller.initHome();
    } finally {
 
      loadingSpinner.classList.add("d-none");
    }

    dropdownItems.forEach((item) => {
      item.addEventListener("click", async (event) => {
        event.preventDefault();
        const region = item.getAttribute("data-region");

        if (region !== "All") {
          detailsContainer.innerHTML = "";
          detailsContainer.style.display = "block";

          const detailsComponent = new ContinentDetails(region);
          await detailsComponent.render();
        } else {
          detailsContainer.style.display = "none";
        }
      });
    });
  } else if (containerDetails) {
    const detailsInstance = new Details("container-details");
    detailsInstance.render();
  } else if (tableContainer) {
    try {
      loadingSpinner.classList.remove("d-none");

      const countries = await API.fetchCountriesAll();
      const tableList = new Table(countries);
      tableList.render(tableContainer);

      const searchInput = document.querySelector("#search-input");

      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const searchTerm = event.target.value.trim();
          tableList.filterCountries(searchTerm);
        });
      }
    } catch (error) {
      console.error(error);
      tableContainer.innerHTML = '<p>Error when searching for countries</p>';
    } finally {

      loadingSpinner.classList.add("d-none");
    }
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
