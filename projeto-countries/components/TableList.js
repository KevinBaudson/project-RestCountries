export class Table {
  constructor(countries) {
    this.countries = countries;
    this.itemsPerPage = 10; 
    this.currentPage = 1; 
    this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
  }

  getCountriesForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.countries.slice(start, end);
  }

  createTable() {
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-responsive";

    const table = document.createElement("table");
    table.className = "table table-striped table-hover";

    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Continent</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        ${this.getCountriesForCurrentPage()
          .map(
            (country) => `
          <tr class="clickable-row" data-country-name="${country.name.common}"
              data-country-id="${country.cca3}" data-country-pop="${country.population}"
              data-country-region="${country.region}" data-country-flag="${country.flags.svg}"
              data-country-capital="${country.capital ? country.capital[0] : "N/A"}"
              data-country-languages="${country.languages ? Object.values(country.languages).join(", ") : "N/A"}"
              data-country-currencies="${country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}"
              data-country-borders="${country.borders ? country.borders.join(", ") : "None"}"
              data-country-maps="${country.maps ? country.maps.googleMaps : "#"}">
            <td>${country.name.common}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.region}</td>
            <td>
              <img src="${country.flags.svg}" alt="Flag of ${country.name.common}"
                class="img-fluid" style="width: 40px; height: 40px; object-fit: cover;">
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>`;

    tableContainer.appendChild(table);

    table.querySelectorAll(".clickable-row").forEach((row) => {
      row.classList.add("cursor-pointer");
      row.addEventListener("click", (e) => {
        const countryData = {
          name: e.currentTarget.getAttribute("data-country-name"),
          id: e.currentTarget.getAttribute("data-country-id"),
          population: e.currentTarget.getAttribute("data-country-pop"),
          region: e.currentTarget.getAttribute("data-country-region"),
          flag: e.currentTarget.getAttribute("data-country-flag"),
          capital: e.currentTarget.getAttribute("data-country-capital"),
          languages: e.currentTarget.getAttribute("data-country-languages"),
          currencies: e.currentTarget.getAttribute("data-country-currencies"),
          borders: e.currentTarget.getAttribute("data-country-borders"),
          maps: e.currentTarget.getAttribute("data-country-maps"),
        };

        sessionStorage.setItem("countryData", JSON.stringify(countryData));
        window.location.href = "details.html";
      });
    });

    return tableContainer;
  }

  createPagination() {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container text-center mt-3";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.className = "btn btn-primary mx-1";
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render(this.container);
      }
    });

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
    pageIndicator.className = "mx-2";

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "btn btn-primary mx-1";
    nextButton.disabled = this.currentPage === this.totalPages;
    nextButton.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.render(this.container);
      }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(nextButton);

    return paginationContainer;
  }

  render(container) {
    this.container = container;
    container.innerHTML = "";
    container.appendChild(this.createTable());
    container.appendChild(this.createPagination());
  }
}
